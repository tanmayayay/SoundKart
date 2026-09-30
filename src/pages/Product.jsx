import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, products, inr, catName } from '../data/products.js'
import { useCart } from '../store/cart.jsx'
import ProductCard from '../components/ProductCard.jsx'
import './catalog.css'

const TRUST = [
  ['100% genuine gear', 'Sourced from authorised brand partners — serial-verified before dispatch.'],
  ['GST invoice included', 'Every order ships with a GST invoice for pros, institutions and resellers.'],
  ['No-cost EMI available', 'Split orders above ₹9,999 into easy monthly instalments.'],
  ['7-day easy returns', 'Changed your mind? Unused gear in original packaging goes back, no questions.'],
]

function Stars({ rating }) {
  const full = Math.round(rating || 0)
  return (
    <span className="stars" aria-label={`Rated ${rating} out of 5`}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  )
}

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [variantIdx, setVariantIdx] = useState(0)

  const p = getProduct(id)

  if (!p) {
    return (
      <div className="wrap cat-page">
        <p className="eyebrow">Not found</p>
        <h1>That gear is gone.</h1>
        <p className="lede cat-sub" style={{ margin: '14px 0 30px' }}>
          It may have sold out or moved collections. The rest of the store is still here.
        </p>
        <Link className="btn btn-solid" to="/shop">Back to shop</Link>
      </div>
    )
  }

  const variant = (p.variants && p.variants[variantIdx]) || null
  const unitPrice = p.price + (variant ? variant.priceDelta || 0 : 0)
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  const savePct = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0

  const buyNow = () => {
    addItem(p, qty)
    navigate('/checkout')
  }

  return (
    <div className="wrap cat-page">
      <p className="crumb">
        <Link to="/">Home</Link> &nbsp;/&nbsp; <Link to="/shop">Shop</Link> &nbsp;/&nbsp; <Link to={`/shop?cat=${p.category}`}>{catName(p.category)}</Link> &nbsp;/&nbsp; {p.name}
      </p>

      <div className="pd-grid">
        <div className="pd-img">
          {p.tag && <span className="prod-tag">{p.tag}</span>}
          <img src={p.img} alt={p.name} />
        </div>

        <div className="pd-info">
          {p.tag && <p className="eyebrow">{p.tag}</p>}
          <h1>{p.name}</h1>
          <p className="pd-weight">{p.brand} · <Stars rating={p.rating} /> {p.rating} ({p.reviews?.toLocaleString('en-IN')} reviews)</p>
          <p className="pd-price">
            {inr(unitPrice)}
            {p.mrp && <small>{inr(p.mrp + (variant ? variant.priceDelta || 0 : 0))}</small>}
            {savePct > 0 && <span className="pd-save">Save {savePct}%</span>}
          </p>
          <p className="lede pd-blurb">{p.blurb}</p>

          {p.variants && p.variants.length > 1 && (
            <div className="variant-row">
              <p className="variant-label">Option</p>
              <div className="pill-row">
                {p.variants.map((v, i) => (
                  <button
                    key={v.name}
                    className={`pill${i === variantIdx ? ' active' : ''}`}
                    onClick={() => setVariantIdx(i)}
                  >
                    {v.name}{v.priceDelta ? ` · +${inr(v.priceDelta)}` : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="qty-row">
            <div className="qty" aria-label="Quantity">
              <button onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((n) => Math.min(9, n + 1))} aria-label="Increase quantity">+</button>
            </div>
          </div>

          <div className="pd-actions">
            <button className="btn btn-solid" onClick={() => addItem(p, qty)}>Add to bag</button>
            <button className="btn btn-ghost" onClick={buyNow}>Buy now</button>
          </div>

          <ul className="trust-mini">
            {TRUST.map(([b, t]) => (
              <li key={b}>
                <span className="dot" />
                <span><b>{b}</b> — {t}</span>
              </li>
            ))}
          </ul>

          <details className="acc" open>
            <summary>Specifications</summary>
            <div className="acc-body">
              {(p.specs || []).map((s) => (
                <div key={s}>• {s}<br /></div>
              ))}
              <b>Brand:</b> {p.brand} (sample data)
              <br />
              <b>Warranty:</b> 1-year brand warranty
            </div>
          </details>
          <details className="acc">
            <summary>Shipping & returns</summary>
            <div className="acc-body">
              Dispatched in 1–2 working days in protective, insured packaging —
              free shipping on orders above ₹4,999. 7-day easy returns on unused
              gear in original packaging.
            </div>
          </details>
          <details className="acc">
            <summary>Gear care</summary>
            <div className="acc-body">
              Keep instruments in a dry room away from direct sun; wipe strings
              after playing to double their life. Electronics prefer stable power —
              a surge protector is the cheapest insurance your studio will ever buy.
            </div>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related">
          <h2>You may also like</h2>
          <div className="cat-grid">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
