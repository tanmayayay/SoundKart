import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'
import { inr } from '../data/products.js'
import '../pages/commerce.css'

const FREE_SHIPPING_ABOVE = 4999

export default function CartDrawer() {
  const { items, subtotal, count, isOpen, closeCart, setQty, removeItem } = useCart()
  const navigate = useNavigate()

  if (!isOpen) return null

  const remaining = Math.max(0, FREE_SHIPPING_ABOVE - subtotal)
  const go = (to) => {
    closeCart()
    navigate(to)
  }

  return (
    <>
      <div className="cm-overlay" onClick={closeCart} aria-hidden="true" />
      <aside className="cm-drawer" role="dialog" aria-label="Shopping bag">
        <div className="cm-drawer-head">
          <h3 className="cm-title">Your Bag {count > 0 && <span className="cm-count">({count})</span>}</h3>
          <button className="cm-icon-btn" onClick={closeCart} aria-label="Close bag">×</button>
        </div>

        {items.length === 0 ? (
          <div className="cm-drawer-empty">
            <p className="cm-title" style={{ fontSize: 22 }}>Your bag is empty.</p>
            <p className="lede" style={{ fontSize: 14, margin: '10px 0 24px' }}>
              Great tone waits for no one.
            </p>
            <button className="btn btn-solid" onClick={() => go('/shop')}>Start shopping</button>
          </div>
        ) : (
          <>
            <div className="cm-drawer-items">
              {items.map(({ id, qty, product }) => (
                <div className="cm-line" key={id}>
                  <img className="cm-thumb" src={product.img} alt={product.name} />
                  <div className="cm-line-body">
                    <p className="cm-line-name">{product.name}</p>
                    <p className="cm-line-meta">{product.brand} · {inr(product.price)}</p>
                    <div className="cm-line-actions">
                      <span className="cm-qty">
                        <button onClick={() => setQty(id, qty - 1)} aria-label="Decrease quantity">−</button>
                        <span>{qty}</span>
                        <button onClick={() => setQty(id, qty + 1)} aria-label="Increase quantity">+</button>
                      </span>
                      <button className="cm-remove" onClick={() => removeItem(id)}>Remove</button>
                    </div>
                  </div>
                  <span className="cm-line-total">{inr(product.price * qty)}</span>
                </div>
              ))}
            </div>

            <div className="cm-drawer-foot">
              {remaining > 0 ? (
                <p className="cm-ship-note">Add <b>{inr(remaining)}</b> more for free shipping</p>
              ) : (
                <p className="cm-ship-note cm-free">You have unlocked free shipping</p>
              )}
              <div className="cm-ship-bar"><span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_ABOVE) * 100)}%` }} /></div>
              <div className="cm-row cm-total-row">
                <span>Subtotal</span>
                <span className="cm-price">{inr(subtotal)}</span>
              </div>
              <p className="cm-fine">Shipping & taxes calculated at checkout.</p>
              <button className="btn btn-solid cm-full" onClick={() => go('/checkout')}>Checkout</button>
              <button className="btn btn-ghost cm-full" onClick={() => go('/cart')}>View bag</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
