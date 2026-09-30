import { Link } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24"><path d={d} strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const ICONS = {
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35',
  user: 'M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  bag: 'M6 8h15l-1.5 12.5a1 1 0 0 1-1 .5h-13a1 1 0 0 1-1-.5L3 8Zm4 0V6a4 4 0 0 1 8 0v2',
}

export default function Header() {
  const { count, openCart } = useCart()
  return (
    <>
      <div className="announce">Festive Sale — up to 40% off studio essentials</div>
      <header className="site-header">
        <div className="wrap header-in">
          <nav className="nav">
            <Link to="/shop">Shop</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/studio-builder">Studio Builder</Link>
          </nav>
          <Link className="wordmark" to="/">SOUND<em>KART</em></Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <nav className="nav">
              <Link to="/shop?cat=bundles">Bundles</Link>
              <Link to="/about">About</Link>
            </nav>
            <div className="header-icons">
              <Link to="/shop" aria-label="Search"><Icon d={ICONS.search} /></Link>
              <Link to="/account" aria-label="Account"><Icon d={ICONS.user} /></Link>
              <button onClick={openCart} aria-label="Bag" className="bag-btn">
                <Icon d={ICONS.bag} />
                {count > 0 && <span className="cart-count">{count}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
