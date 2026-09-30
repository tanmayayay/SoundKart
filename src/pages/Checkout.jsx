import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'
import { inr } from '../data/products.js'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { FREE_SHIPPING_ABOVE, SHIPPING_FLAT } from './CartPage.jsx'
import './commerce.css'

const PAYMENTS_API = import.meta.env.VITE_PAYMENTS_API || 'http://localhost:4000'
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || ''
// Placeholder merchant details — replace with real ones via env before launch.
const MERCHANT_UPI = import.meta.env.VITE_MERCHANT_UPI || 'soundkart@upi'
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
const ORDERS_KEY = 'soundkart-orders'

const METHOD_LABEL = {
  razorpay: 'Razorpay',
  upi: 'UPI Direct',
  cod: 'Cash on Delivery',
  whatsapp: 'WhatsApp Order',
}

const FIELDS = [
  { key: 'name', label: 'Full name', placeholder: 'Aarav Sharma', autoComplete: 'name' },
  { key: 'phone', label: 'Mobile number', placeholder: '98765 43210', inputMode: 'numeric', autoComplete: 'tel' },
  { key: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email', autoComplete: 'email' },
  { key: 'address', label: 'Street address', placeholder: 'Flat / house, street, landmark', autoComplete: 'street-address', full: true },
  { key: 'city', label: 'City', placeholder: 'Bengaluru', autoComplete: 'address-level2' },
  { key: 'state', label: 'State', placeholder: 'Karnataka', autoComplete: 'address-level1' },
  { key: 'pincode', label: 'Pincode', placeholder: '560001', inputMode: 'numeric', autoComplete: 'postal-code' },
]

const validators = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your full name.'),
  phone: (v) => (/^[6-9]\d{9}$/.test(v.replace(/\s/g, '')) ? '' : 'Enter a valid 10-digit mobile number.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.'),
  address: (v) => (v.trim().length >= 8 ? '' : 'Please enter your street address with a landmark.'),
  city: (v) => (v.trim().length >= 2 ? '' : 'Please enter your city.'),
  state: (v) => (v.trim().length >= 2 ? '' : 'Please enter your state.'),
  pincode: (v) => (/^[1-9][0-9]{5}$/.test(v.trim()) ? '' : 'Enter a valid 6-digit pincode.'),
}

function loadRazorpayScript() {
  if (typeof window !== 'undefined' && window.Razorpay) return Promise.resolve(true)
  return new Promise((resolve) => {
    try {
      const s = document.createElement('script')
      s.src = 'https://checkout.razorpay.com/v1/checkout.js'
      s.async = true
      s.onload = () => resolve(true)
      s.onerror = () => resolve(false)
      document.body.appendChild(s)
    } catch {
      resolve(false)
    }
  })
}

function makeOrderId() {
  return 'SK-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

function readOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveOrder(order) {
  try {
    const orders = readOrders()
    orders.unshift(order)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch {
    /* order confirmation still shows from memory */
  }
}

async function persistOrderRemote(order) {
  if (!isSupabaseConfigured || !supabase) return
  try {
    const { data: { session } } = await supabase.auth.getSession()
    await supabase.from('orders').insert({
      user_id: session?.user?.id || null,
      items: order.items.map((i) => ({
        id: i.id, name: i.name, price_inr: i.price, qty: i.qty,
      })),
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      status: order.paymentStatus === 'paid' ? 'paid' : 'placed',
      payment_method: order.paymentMethod,
      address: {
        name: order.address.name,
        phone: order.address.phone,
        line1: order.address.address,
        city: order.address.city,
        state: order.address.state,
        pincode: order.address.pincode,
      },
    })
  } catch {
    /* table may not exist yet — local history still works */
  }
}

function whatsappLink(order) {
  const lines = [
    `New order ${order.id} — SoundKart`,
    ...order.items.map((i) => `- ${i.name} x ${i.qty} — ${inr(i.price * i.qty)}`),
    `Total: ${inr(order.total)} (${METHOD_LABEL[order.paymentMethod] || order.paymentMethod})`,
    `Name: ${order.address.name}`,
    `Phone: ${order.address.phone}`,
    `Address: ${order.address.address}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`,
  ]
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

const NEXT_STEPS = {
  razorpay: {
    title: 'Payment successful',
    body: 'We have received your payment. Your gear will be serial-verified and shipped within 1–2 days. Tracking details will arrive on SMS and email.',
  },
  upi: {
    title: 'Order placed',
    body: 'Please complete your UPI payment, then confirm with us on WhatsApp so we can dispatch without delay.',
  },
  cod: {
    title: 'Order placed',
    body: 'Keep cash or UPI ready — you pay when your order arrives. We will call once to confirm before dispatch.',
  },
  whatsapp: {
    title: 'Order composed',
    body: 'We opened WhatsApp with your order details — just press send and we will confirm your order on chat.',
  },
}

export default function Checkout() {
  const { items, subtotal, count, clear } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState('address') // address | payment | done
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' })
  const [errors, setErrors] = useState({})
  const [method, setMethod] = useState('cod')
  const [notice, setNotice] = useState('')
  const [placing, setPlacing] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)
  const [copied, setCopied] = useState(false)

  const shipping = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FLAT
  const total = subtotal + shipping

  if (items.length === 0 && step !== 'done') {
    return (
      <div className="wrap cm-page">
        <div className="cm-empty">
          <p className="eyebrow">Checkout</p>
          <h2>Your bag is empty.</h2>
          <p className="lede" style={{ margin: '16px 0 32px' }}>Add some gear before checking out.</p>
          <Link className="btn btn-solid" to="/shop">Browse the gear</Link>
        </div>
      </div>
    )
  }

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const submitAddress = (e) => {
    e.preventDefault()
    const next = {}
    for (const f of FIELDS) {
      const err = validators[f.key](form[f.key] || '')
      if (err) next[f.key] = err
    }
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setNotice('')
      setStep('payment')
      window.scrollTo(0, 0)
    }
  }

  const payWithRazorpay = (order) =>
    new Promise((resolve) => {
      const fail = (msg) => {
        setNotice(msg)
        resolve('failed')
      }
      if (!RAZORPAY_KEY_ID) {
        fail('Online payments are not configured yet (missing Razorpay key). Please choose Cash on Delivery or WhatsApp Order.')
        return
      }
      let rzpOrder
      const run = async () => {
        const ok = await loadRazorpayScript()
        if (!ok || !window.Razorpay) {
          fail('Could not load the Razorpay checkout. Check your connection, or choose Cash on Delivery / WhatsApp Order.')
          return
        }
        try {
          const res = await fetch(`${PAYMENTS_API}/api/razorpay/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: order.total * 100, currency: 'INR', receipt: order.id }),
          })
          if (!res.ok) throw new Error(`order request failed (${res.status})`)
          rzpOrder = await res.json()
        } catch {
          setNotice(
            'The payments backend is not running, so we could not start the online payment. ' +
            'Your bag is safe — please choose Cash on Delivery or WhatsApp Order instead.'
          )
          resolve('unavailable')
          return
        }
        const rz = new window.Razorpay({
          key: RAZORPAY_KEY_ID,
          amount: rzpOrder.amount,
          currency: 'INR',
          name: 'SoundKart',
          description: `Order ${order.id}`,
          order_id: rzpOrder.id,
          prefill: { name: order.address.name, email: order.address.email, contact: order.address.phone },
          theme: { color: '#ff5c1a' },
          modal: {
            ondismiss: () => {
              setNotice('The payment window was closed — no charge was made. You can try again or choose another method.')
              resolve('failed')
            },
          },
          handler: async (resp) => {
            try {
              const vres = await fetch(`${PAYMENTS_API}/api/razorpay/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resp),
              })
              if (!vres.ok) throw new Error(`verify failed (${vres.status})`)
              resolve('paid')
            } catch {
              fail('Payment was made but verification failed. Please contact us on WhatsApp with your order id — do not pay again.')
            }
          },
        })
        rz.on('payment.failed', () => fail('The payment did not go through. You can try again or choose another method.'))
        rz.open()
      }
      run()
    })

  const placeOrder = async () => {
    if (placing) return
    setNotice('')
    setPlacing(true)
    const order = {
      id: makeOrderId(),
      date: new Date().toISOString(),
      items: items.map(({ id, qty, product }) => ({ id, qty, name: product.name, price: product.price, img: product.img })),
      address: { ...form },
      paymentMethod: method,
      paymentStatus: 'pending',
      subtotal,
      shipping,
      total,
    }
    try {
      if (method === 'razorpay') {
        const result = await payWithRazorpay(order)
        if (result === 'unavailable' || result === 'failed') {
          setPlacing(false)
          return
        }
        order.paymentStatus = 'paid'
      } else if (method === 'upi') {
        order.paymentStatus = 'awaiting-upi'
      }
      saveOrder(order)
      persistOrderRemote(order)
      clear()
      setPlacedOrder(order)
      setStep('done')
      window.scrollTo(0, 0)
      if (method === 'whatsapp') {
        window.open(whatsappLink(order), '_blank', 'noopener')
      }
    } finally {
      setPlacing(false)
    }
  }

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(MERCHANT_UPI)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = MERCHANT_UPI
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* noop */ }
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /* ——— confirmation screen ——— */
  if (step === 'done' && placedOrder) {
    const next = NEXT_STEPS[placedOrder.paymentMethod] || NEXT_STEPS.cod
    return (
      <div className="wrap cm-page">
        <div className="cm-confirm">
          <span className="cm-check" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 12.5 9.5 18 20 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <p className="eyebrow" style={{ marginTop: 28 }}>Order {placedOrder.id}</p>
          <h2>{next.title}</h2>
          <p className="lede" style={{ margin: '16px auto 0', maxWidth: '52ch' }}>{next.body}</p>

          {placedOrder.paymentMethod === 'upi' && (
            <div className="cm-upi-box">
              <p>Pay <b className="cm-price">{inr(placedOrder.total)}</b> to</p>
              <div className="cm-upi-row">
                <code>{MERCHANT_UPI}</code>
                <button className="btn btn-ghost" style={{ padding: '10px 20px' }} onClick={copyUpi}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <a className="btn btn-solid" href={whatsappLink(placedOrder)} target="_blank" rel="noreferrer" style={{ marginTop: 18 }}>
                Confirm on WhatsApp
              </a>
            </div>
          )}

          <div className="cm-card cm-confirm-card">
            <div className="cm-row"><span>Items</span><span>{placedOrder.items.reduce((s, i) => s + i.qty, 0)}</span></div>
            <div className="cm-row"><span>Payment</span><span>{METHOD_LABEL[placedOrder.paymentMethod]}</span></div>
            <div className="cm-row"><span>Deliver to</span><span className="cm-right">{placedOrder.address.name}, {placedOrder.address.city} — {placedOrder.address.pincode}</span></div>
            <div className="cm-row cm-total-row"><span>Total</span><span className="cm-price">{inr(placedOrder.total)}</span></div>
          </div>

          <div className="cm-confirm-actions">
            <Link className="btn btn-solid" to="/shop">Continue shopping</Link>
            <Link className="btn btn-ghost" to="/account">View my orders</Link>
          </div>
        </div>
      </div>
    )
  }

  const methods = [
    { id: 'razorpay', title: 'Razorpay', desc: 'UPI, cards, netbanking & wallets', badge: 'Test mode until KYC' },
    { id: 'upi', title: 'UPI Direct', desc: 'Pay to our UPI id, then confirm on WhatsApp', badge: null },
    { id: 'cod', title: 'Cash on Delivery', desc: 'Pay in cash or UPI when your order arrives', badge: 'Most popular' },
    { id: 'whatsapp', title: 'WhatsApp Order', desc: 'We compose the order as a chat message for you', badge: null },
  ]

  return (
    <div className="wrap cm-page">
      <p className="eyebrow">Checkout</p>
      <h2 style={{ marginBottom: 28 }}>Almost yours.</h2>

      <div className="cm-steps">
        {['Address', 'Payment', 'Done'].map((label, i) => {
          const idx = step === 'address' ? 0 : step === 'payment' ? 1 : 2
          return (
            <span key={label} className={`cm-step ${i < idx ? 'past' : ''} ${i === idx ? 'now' : ''}`}>
              <b>{i + 1}</b> {label}
            </span>
          )
        })}
      </div>

      <div className="cm-grid">
        <div>
          {step === 'address' && (
            <form className="cm-card" onSubmit={submitAddress} noValidate>
              <h3 className="cm-title" style={{ fontSize: 22, marginBottom: 24 }}>Delivery address</h3>
              <div className="cm-form-grid">
                {FIELDS.map((f) => (
                  <div className={`cm-field ${f.full ? 'full' : ''}`} key={f.key}>
                    <label htmlFor={`co-${f.key}`}>{f.label}</label>
                    <input
                      id={`co-${f.key}`}
                      className={`cm-input ${errors[f.key] ? 'invalid' : ''}`}
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      inputMode={f.inputMode}
                      autoComplete={f.autoComplete}
                      onChange={(e) => setField(f.key, e.target.value)}
                    />
                    {errors[f.key] && <p className="cm-err">{errors[f.key]}</p>}
                  </div>
                ))}
              </div>
              <button className="btn btn-solid cm-full" type="submit" style={{ marginTop: 28 }}>
                Continue to payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="cm-card">
              <div className="cm-pay-head">
                <h3 className="cm-title" style={{ fontSize: 22 }}>Payment method</h3>
                <button className="cm-remove" onClick={() => setStep('address')}>Edit address</button>
              </div>
              <div className="cm-methods" role="radiogroup" aria-label="Payment method">
                {methods.map((m) => (
                  <label key={m.id} className={`cm-method ${method === m.id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment-method"
                      value={m.id}
                      checked={method === m.id}
                      onChange={() => { setMethod(m.id); setNotice('') }}
                    />
                    <span className="cm-radio" aria-hidden="true" />
                    <span className="cm-method-body">
                      <span className="cm-method-title">
                        {m.title}
                        {m.badge && <span className="cm-badge">{m.badge}</span>}
                      </span>
                      <span className="cm-method-desc">{m.desc}</span>
                    </span>
                  </label>
                ))}
              </div>

              {method === 'upi' && (
                <div className="cm-upi-box">
                  <p>After placing the order, pay <b className="cm-price">{inr(total)}</b> to</p>
                  <div className="cm-upi-row">
                    <code>{MERCHANT_UPI}</code>
                    <button type="button" className="btn btn-ghost" style={{ padding: '10px 20px' }} onClick={copyUpi}>
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {notice && <p className="cm-notice" role="alert">{notice}</p>}

              <button className="btn btn-solid cm-full" onClick={placeOrder} disabled={placing} style={{ marginTop: 24 }}>
                {placing
                  ? 'Please wait…'
                  : method === 'razorpay'
                    ? `Pay ${inr(total)} online`
                    : method === 'whatsapp'
                      ? 'Place order on WhatsApp'
                      : `Place order · ${inr(total)}`}
              </button>
              <p className="cm-fine cm-center" style={{ marginTop: 14 }}>
                By placing this order you agree to our shipping & returns policy.
              </p>
            </div>
          )}
        </div>

        <aside className="cm-card cm-summary">
          <h3 className="cm-title" style={{ fontSize: 22, marginBottom: 20 }}>Order summary</h3>
          <div className="cm-mini-lines">
            {items.map(({ id, qty, product }) => (
              <div className="cm-mini-line" key={id}>
                <img src={product.img} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <span>Qty {qty}</span>
                </div>
                <b>{inr(product.price * qty)}</b>
              </div>
            ))}
          </div>
          <div className="cm-row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <div className="cm-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? <b className="cm-free">Free</b> : inr(shipping)}</span>
          </div>
          <div className="cm-row cm-total-row"><span>Total</span><span className="cm-price">{inr(total)}</span></div>
          {step === 'payment' && (
            <button className="cm-remove" onClick={() => navigate('/cart')}>Back to bag</button>
          )}
        </aside>
      </div>
    </div>
  )
}
