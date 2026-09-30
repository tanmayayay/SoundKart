import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'
import { inr } from '../data/products.js'
import './commerce.css'

export const FREE_SHIPPING_ABOVE = 4999
export const SHIPPING_FLAT = 149

export default function CartPage() {
  const { items, subtotal, count, setQty, removeItem } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="wrap cm-page">
        <div className="cm-empty">
          <p className="eyebrow">Your bag</p>
          <h2>Nothing here yet.</h2>
          <p className="lede" style={{ margin: '16px 0 32px' }}>
            Every great track starts with the right gear — start with the bestsellers.
          </p>
          <Link className="btn btn-solid" to="/shop">Browse the gear</Link>
        </div>
      </div>
    )
  }

  const shipping = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FLAT
  const total = subtotal + shipping

  return (
    <div className="wrap cm-page">
      <p className="eyebrow">Your bag</p>
      <h2 style={{ marginBottom: 40 }}>{count} {count === 1 ? 'item' : 'items'}</h2>

      <div className="cm-grid">
        <div>
          <div className="cm-card cm-lines">
            {items.map(({ id, qty, product }) => (
              <div className="cm-line" key={id}>
                <img className="cm-thumb" src={product.img} alt={product.name} />
                <div className="cm-line-body">
                  <p className="cm-line-name">{product.name}</p>
                  <p className="cm-line-meta">{product.brand}</p>
                  <div className="cm-line-actions">
                    <span className="cm-qty">
                      <button onClick={() => setQty(id, qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(id, qty + 1)} aria-label="Increase quantity">+</button>
                    </span>
                    <button className="cm-remove" onClick={() => removeItem(id)}>Remove</button>
                  </div>
                </div>
                <div className="cm-line-right">
                  <span className="cm-price">{inr(product.price * qty)}</span>
                  {product.mrp && (
                    <span className="cm-mrp">{inr(product.mrp * qty)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Link className="link-arrow cm-continue" to="/shop">← Continue shopping</Link>
        </div>

        <aside className="cm-card cm-summary">
          <h3 className="cm-title" style={{ fontSize: 22, marginBottom: 20 }}>Order summary</h3>
          <div className="cm-row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <div className="cm-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? <b className="cm-free">Free</b> : inr(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p className="cm-fine">Free insured shipping on orders above {inr(FREE_SHIPPING_ABOVE)}.</p>
          )}
          <div className="cm-row cm-total-row"><span>Total</span><span className="cm-price">{inr(total)}</span></div>
          <button className="btn btn-solid cm-full" onClick={() => navigate('/checkout')}>
            Proceed to checkout
          </button>
          <p className="cm-fine cm-center">EMI · COD · UPI · Secure checkout</p>
        </aside>
      </div>
    </div>
  )
}
