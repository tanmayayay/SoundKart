import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="wordmark" to="/" style={{ textAlign: 'left' }}>SOUND<em>KART</em></Link>
            <p>India's home for musical instruments & pro audio. Genuine gear, honest prices.</p>
            <p className="venture">A NAAD INFINITY VENTURE</p>
          </div>
          <div>
            <h5>Shop</h5>
            <Link to="/shop?cat=guitars">Guitars</Link>
            <Link to="/shop?cat=keyboards">Keyboards & synths</Link>
            <Link to="/shop?cat=drums">Drums & percussion</Link>
            <Link to="/shop?cat=headphones">Headphones</Link>
            <Link to="/shop?cat=speakers">Speakers & monitors</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link to="/about">Our story</Link>
            <Link to="/studio-builder">Studio builder</Link>
            <Link to="/shop?cat=bundles">Studio bundles</Link>
            <Link to="/collections">Collections</Link>
          </div>
          <div>
            <h5>Care</h5>
            <Link to="/account">Your account</Link>
            <Link to="/cart">Your bag</Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">WhatsApp us</a>
            <Link to="/about">Gear care guide</Link>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 SoundKart · A Naad Infinity Venture</span>
          <span>EMI · COD · UPI · Pan-India shipping</span>
        </div>
      </div>
    </footer>
  )
}
