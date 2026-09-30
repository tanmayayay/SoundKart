import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { inr } from '../data/products.js'
import './commerce.css'

const PROFILE_KEY = 'soundkart-profile'
const ORDERS_KEY = 'soundkart-orders'

const METHOD_LABEL = {
  razorpay: 'Razorpay',
  upi: 'UPI Direct',
  cod: 'Cash on Delivery',
  whatsapp: 'WhatsApp Order',
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

function OrderList({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="cm-empty-orders">
        <p className="lede">No orders yet. When you place one, it will appear here.</p>
        <Link className="btn btn-ghost" to="/shop" style={{ marginTop: 18 }}>Browse the collection</Link>
      </div>
    )
  }
  return (
    <div className="cm-orders">
      {orders.map((o) => (
        <div className="cm-order" key={o.id || Math.random()}>
          <div className="cm-order-head">
            <div>
              <b className="cm-order-id">{o.id || 'Order'}</b>
              <span className="cm-order-date">{o.date ? fmtDate(o.date) : ''}</span>
            </div>
            <span className="cm-badge">{METHOD_LABEL[o.paymentMethod] || o.paymentMethod || '—'}</span>
          </div>
          <div className="cm-order-items">
            {(o.items || []).slice(0, 4).map((i, idx) => (
              i.img
                ? <img key={idx} src={i.img} alt={i.name || ''} title={`${i.name || ''} × ${i.qty || 1}`} />
                : <span key={idx} className="cm-order-item-text">{i.name} × {i.qty}</span>
            ))}
            {(o.items || []).length > 4 && (
              <span className="cm-order-more">+{(o.items || []).length - 4} more</span>
            )}
          </div>
          <div className="cm-row">
            <span>{(o.items || []).reduce((s, i) => s + (i.qty || 1), 0)} items</span>
            <span className="cm-price">{inr(o.total || 0)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ——— demo-mode auth (no Supabase configured) ——— */
function DemoAuth({ onDone }) {
  const [tab, setTab] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }
    if (tab === 'signup' && name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }
    const profile = {
      name: tab === 'signup' ? name.trim() : email.split('@')[0],
      email: email.trim().toLowerCase(),
      demo: true,
    }
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    } catch { /* noop */ }
    onDone(profile)
  }

  return (
    <div className="cm-card" style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h3 className="cm-title" style={{ fontSize: 24 }}>Your account</h3>
        <span className="cm-badge">Demo mode</span>
      </div>
      <p className="cm-fine" style={{ marginBottom: 24 }}>
        Cloud sign-in is not configured yet, so accounts are stored on this device only.
        Connect Supabase to enable real accounts.
      </p>
      <div className="cm-tabs">
        {['signin', 'signup'].map((t) => (
          <button
            key={t}
            type="button"
            className={tab === t ? 'active' : ''}
            onClick={() => { setTab(t); setError('') }}
          >
            {t === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        ))}
      </div>
      <form onSubmit={submit} noValidate>
        {tab === 'signup' && (
          <div className="cm-field">
            <label htmlFor="da-name">Full name</label>
            <input id="da-name" className="cm-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Sharma" autoComplete="name" />
          </div>
        )}
        <div className="cm-field">
          <label htmlFor="da-email">Email</label>
          <input id="da-email" className="cm-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </div>
        <div className="cm-field">
          <label htmlFor="da-pass">Password</label>
          <input id="da-pass" className="cm-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete={tab === 'signup' ? 'new-password' : 'current-password'} />
        </div>
        {error && <p className="cm-err" role="alert">{error}</p>}
        <button className="btn btn-solid cm-full" type="submit" style={{ marginTop: 20 }}>
          {tab === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </div>
  )
}

/* ——— real Supabase auth ——— */
function SupabaseAuth({ session }) {
  const [tab, setTab] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setBusy(true)
    try {
      if (tab === 'signup') {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { name: name.trim() } },
        })
        if (err) throw err
        if (data.session) {
          setInfo('Account created — welcome.')
        } else {
          setInfo('Account created. Please check your email to confirm, then sign in.')
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (err) throw err
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  void session

  return (
    <div className="cm-card" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h3 className="cm-title" style={{ fontSize: 24, marginBottom: 24 }}>Your account</h3>
      <div className="cm-tabs">
        {['signin', 'signup'].map((t) => (
          <button
            key={t}
            type="button"
            className={tab === t ? 'active' : ''}
            onClick={() => { setTab(t); setError(''); setInfo('') }}
          >
            {t === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        ))}
      </div>
      <form onSubmit={submit} noValidate>
        {tab === 'signup' && (
          <div className="cm-field">
            <label htmlFor="sa-name">Full name</label>
            <input id="sa-name" className="cm-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Sharma" autoComplete="name" />
          </div>
        )}
        <div className="cm-field">
          <label htmlFor="sa-email">Email</label>
          <input id="sa-email" className="cm-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </div>
        <div className="cm-field">
          <label htmlFor="sa-pass">Password</label>
          <input id="sa-pass" className="cm-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete={tab === 'signup' ? 'new-password' : 'current-password'} />
        </div>
        {error && <p className="cm-err" role="alert">{error}</p>}
        {info && <p className="cm-notice" role="status">{info}</p>}
        <button className="btn btn-solid cm-full" type="submit" disabled={busy} style={{ marginTop: 20 }}>
          {busy ? 'Please wait…' : tab === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </div>
  )
}

function Profile({ profile, orders, onSignOut, remoteNote }) {
  const initial = (profile.name || profile.email || '?').trim().charAt(0).toUpperCase()
  return (
    <div>
      <div className="cm-card cm-profile">
        <span className="cm-avatar" aria-hidden="true">{initial}</span>
        <div className="cm-profile-body">
          <h3 className="cm-title" style={{ fontSize: 24 }}>{profile.name || 'Welcome'}</h3>
          <p className="cm-fine">{profile.email}</p>
          {profile.demo && <span className="cm-badge" style={{ marginTop: 8 }}>Demo mode</span>}
        </div>
        <button className="btn btn-ghost" onClick={onSignOut}>Sign out</button>
      </div>

      <h3 className="cm-title" style={{ fontSize: 22, margin: '48px 0 20px' }}>Order history</h3>
      {remoteNote && <p className="cm-fine" style={{ marginBottom: 16 }}>{remoteNote}</p>}
      <OrderList orders={orders} />
    </div>
  )
}

export default function Account() {
  const [demoProfile, setDemoProfile] = useState(() => readJSON(PROFILE_KEY, null))
  const [session, setSession] = useState(null)
  const [remoteOrders, setRemoteOrders] = useState(null)

  const localOrders = readJSON(ORDERS_KEY, [])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return
    let cancelled = false
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setSession(data.session || null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!cancelled) setSession(s)
    })
    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  // Try the Supabase `orders` table when available; fail soft.
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !session) {
      setRemoteOrders(null)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20)
        if (!cancelled && !error && Array.isArray(data)) setRemoteOrders(data)
      } catch {
        /* table may not exist — local history still shows */
      }
    })()
    return () => { cancelled = true }
  }, [session])

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      try { await supabase.auth.signOut() } catch { /* noop */ }
      setSession(null)
    } else {
      try { localStorage.removeItem(PROFILE_KEY) } catch { /* noop */ }
      setDemoProfile(null)
    }
  }

  const orders = [...(remoteOrders || []), ...localOrders]

  return (
    <div className="wrap cm-page" style={{ maxWidth: 880 }}>
      <p className="eyebrow">Account</p>
      <h2 style={{ marginBottom: 36 }}>Your stage.</h2>

      {!isSupabaseConfigured || !supabase ? (
        demoProfile ? (
          <Profile profile={demoProfile} orders={orders} onSignOut={signOut} />
        ) : (
          <DemoAuth onDone={setDemoProfile} />
        )
      ) : session ? (
        <Profile
          profile={{
            name: session.user?.user_metadata?.name || session.user?.email?.split('@')[0],
            email: session.user?.email,
          }}
          orders={orders}
          onSignOut={signOut}
          remoteNote={remoteOrders && remoteOrders.length > 0 ? 'Including orders synced from your account.' : undefined}
        />
      ) : (
        <SupabaseAuth session={session} />
      )}
    </div>
  )
}
