import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'
import { getProduct, inr } from '../data/products.js'
import './catalog.css'

const SLOTS = [
  {
    key: 'interface',
    title: 'Audio interface',
    note: 'Your mic and instrument plug in here.',
    options: ['scarlett-solo', 'um2-basic'],
    none: 'No interface — I already have one',
  },
  {
    key: 'monitors',
    title: 'Studio monitors',
    note: 'Hear your mix the way the world will.',
    options: ['jbl-305p', 'eris-35', 'rokit-5'],
    none: 'No monitors — headphones only',
  },
  {
    key: 'headphones',
    title: 'Headphones',
    note: 'For tracking, mixing and late nights.',
    options: ['hd280', 'm40x', 'dt770'],
    none: null,
  },
  {
    key: 'mic',
    title: 'Microphone',
    note: 'Vocals, acoustic instruments, podcasts.',
    options: ['sm58', 'at2020', 'nt1'],
    none: 'No mic — instrumental setup',
  },
]

const steps = [
  ['1', 'Pick your chain', 'Interface, monitors, headphones and mic — the four links every home studio needs.'],
  ['2', 'Match your budget', 'Options at every price. The total updates live as you pick — no surprises at checkout.'],
  ['3', 'We ship it as one kit', 'Everything arrives together, tested and matched, with setup help on WhatsApp.'],
]

export default function StudioBuilder() {
  const { addItem, openCart } = useCart()
  const [picks, setPicks] = useState(() => Object.fromEntries(SLOTS.map((s) => [s.key, s.options[0]])))

  const chosen = SLOTS.map((s) => (picks[s.key] === 'none' ? null : getProduct(picks[s.key]))).filter(Boolean)
  const total = chosen.reduce((s, p) => s + p.price, 0)

  const addBundle = () => {
    chosen.forEach((p) => addItem(p, 1))
    openCart()
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Studio Builder</p>
          <h1>Compose your own<br />home studio.</h1>
          <p className="lede" style={{ marginTop: 18, maxWidth: '56ch' }}>
            An interface alone is a box. An interface with its monitors, its
            headphones, its mic — that is a studio, ready to record. Pick each
            link in the chain below and watch your studio come together.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="builder-steps" style={{ marginTop: 0 }}>
            {steps.map(([n, h, p]) => (
              <div className="builder-step" key={n}>
                <span className="num">{n}</span>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="builder-slots">
            {SLOTS.map((slot) => (
              <div className="builder-slot" key={slot.key}>
                <div className="slot-head">
                  <div>
                    <h3>{slot.title}</h3>
                    <p>{slot.note}</p>
                  </div>
                </div>
                <div className="slot-options">
                  {slot.options.map((id) => {
                    const p = getProduct(id)
                    const active = picks[slot.key] === id
                    return (
                      <button
                        key={id}
                        className={`slot-option${active ? ' active' : ''}`}
                        onClick={() => setPicks((prev) => ({ ...prev, [slot.key]: id }))}
                        aria-pressed={active}
                      >
                        <img src={p.img} alt={p.name} />
                        <span className="slot-opt-name">{p.name}</span>
                        <span className="slot-opt-price">{inr(p.price)}</span>
                      </button>
                    )
                  })}
                  {slot.none && (
                    <button
                      className={`slot-option slot-none${picks[slot.key] === 'none' ? ' active' : ''}`}
                      onClick={() => setPicks((prev) => ({ ...prev, [slot.key]: 'none' }))}
                      aria-pressed={picks[slot.key] === 'none'}
                    >
                      <span className="slot-opt-name">{slot.none}</span>
                      <span className="slot-opt-price">₹0</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="builder-total">
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Your studio</p>
              <p className="builder-items">
                {chosen.length > 0 ? chosen.map((p) => p.name).join(' · ') : 'Pick at least one piece to begin.'}
              </p>
            </div>
            <div className="builder-total-right">
              <p className="builder-total-price">{inr(total)}</p>
              <button className="btn btn-solid" onClick={addBundle} disabled={chosen.length === 0}>
                Add studio to bag
              </button>
            </div>
          </div>

          <p className="lede" style={{ marginTop: 40, textAlign: 'center' }}>
            Prefer a ready-made kit? <Link to="/shop?cat=bundles" className="link-arrow">Browse studio bundles →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
