import { Link } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'
import heroImg from '../assets/hero.webp'
import drumsImg from '../assets/product-drums.webp'
import { products, categories, inr } from '../data/products.js'
import './catalog.css'

const bestsellers = products.filter((p) => p.tag === 'Bestseller').slice(0, 4)

export default function Home() {
  const { addItem } = useCart()
  return (
    <>
      {/* ——— hero ——— */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">120+ brands · 15,000+ products · 500+ cities</p>
            <h1>Everything you<br />need to <em>make music.</em></h1>
            <p className="lede">
              Guitars, keyboards, drums, headphones, speakers, strings, cables —
              genuine gear with GST invoice, EMI options, and doorstep delivery across India.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-solid" to="/shop">Shop bestsellers</Link>
              <Link className="btn btn-ghost" to="/studio-builder">Build my studio</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><b>15k+</b><span>products</span></div>
              <div className="stat"><b>120+</b><span>brands</span></div>
              <div className="stat"><b>4.8★</b><span>42k reviews</span></div>
            </div>
          </div>
          <div className="hero-img"><img src={heroImg} alt="Home studio with guitar, MIDI keyboard, monitors and headphones" /></div>
        </div>
      </section>

      {/* ——— trust ——— */}
      <div className="trust">
        <div className="wrap trust-in">
          {[['100% genuine gear', 'Authorised brand partners'],
            ['GST invoice included', 'For pros & institutions'],
            ['No-cost EMI available', 'On orders above ₹9,999'],
            ['Pan-India shipping', 'Insured, trackable delivery'],
          ].map(([b, p]) => (
            <div className="trust-item" key={b}><span className="dot" /><p><b>{b}</b>{p}</p></div>
          ))}
        </div>
      </div>

      {/* ——— categories ——— */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Categories</p>
              <h2>Find your instrument.</h2>
            </div>
            <Link className="link-arrow" to="/collections">View all →</Link>
          </div>
          <div className="cat-grid">
            {categories.slice(0, 6).map((c) => (
              <Link className="cat-card" to={`/shop?cat=${c.slug}`} key={c.slug}>
                <div className="img"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <h3>{c.name}</h3>
                <p>{c.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ——— bestsellers ——— */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Bestsellers</p>
              <h2>What India is playing.</h2>
            </div>
            <Link className="link-arrow" to="/shop">Shop all →</Link>
          </div>
          <p className="lede" style={{ marginBottom: 36, color: 'var(--muted)', fontSize: 14 }}>
            Sample catalogue — the full brand range plugs in here.
          </p>
          <div className="prod-grid">
            {bestsellers.map((p) => (
              <div className="prod-card" key={p.id}>
                <Link to={`/product/${p.id}`} className="img card-link">
                  {p.tag && <span className="prod-tag">{p.tag}</span>}
                  <img src={p.img} alt={p.name} loading="lazy" />
                </Link>
                <div className="prod-body">
                  <Link to={`/product/${p.id}`} className="card-link"><h3>{p.name}</h3></Link>
                  <p className="prod-wt">{p.brand}</p>
                  <div className="prod-row">
                    <span className="price">{inr(p.price)}{p.mrp && <small>{inr(p.mrp)}</small>}</span>
                    <button className="add-btn" onClick={() => addItem(p, 1)}>Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— studio builder teaser ——— */}
      <section className="builder">
        <div className="wrap builder-grid">
          <div className="builder-img"><img src={drumsImg} alt="Drum kit in a home studio" loading="lazy" /></div>
          <div>
            <p className="eyebrow">Home studio builder</p>
            <h2>Your first studio, under ₹50,000.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              We bundle beginner-to-pro studio kits — interface, monitors, headphones
              and mic — matched to your budget and your room.
            </p>
            <ul className="tick-list">
              <li><span className="tick">✓</span>Curated bundles for bedroom producers & podcasters</li>
              <li><span className="tick">✓</span>Free video call with a gear specialist before you buy</li>
              <li><span className="tick">✓</span>7-day easy returns, 1-year brand warranty</li>
            </ul>
            <Link className="btn btn-solid" to="/studio-builder">Build my studio</Link>
          </div>
        </div>
      </section>

      {/* ——— pro picks ——— */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Pro picks</p>
              <h2>Serious gear, serious players.</h2>
            </div>
            <Link className="link-arrow" to="/shop">Shop all →</Link>
          </div>
          <div className="prod-grid">
            {products.filter((p) => p.tag === 'Pro pick').slice(0, 4).map((p) => (
              <div className="prod-card" key={p.id}>
                <Link to={`/product/${p.id}`} className="img card-link">
                  {p.tag && <span className="prod-tag">{p.tag}</span>}
                  <img src={p.img} alt={p.name} loading="lazy" />
                </Link>
                <div className="prod-body">
                  <Link to={`/product/${p.id}`} className="card-link"><h3>{p.name}</h3></Link>
                  <p className="prod-wt">{p.brand}</p>
                  <div className="prod-row">
                    <span className="price">{inr(p.price)}{p.mrp && <small>{inr(p.mrp)}</small>}</span>
                    <button className="add-btn" onClick={() => addItem(p, 1)}>Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— venture strip ——— */}
      <section className="venture-strip">
        <div className="wrap venture-in">
          <div>
            <p className="eyebrow">A Naad Infinity Venture</p>
            <h2>Built by people who live music.</h2>
            <p className="lede" style={{ marginTop: 14 }}>
              SoundKart is the gear arm of Naad Infinity — the same crew behind
              Strings, tying India's music industry together.
            </p>
          </div>
          <Link className="btn btn-ghost" to="/about">Our story</Link>
        </div>
      </section>

      {/* ——— newsletter ——— */}
      <section className="band">
        <div className="wrap news">
          <p className="eyebrow">The Soundcheck</p>
          <h2>First dibs on drops & deals.</h2>
          <p className="lede" style={{ marginTop: 14 }}>New gear, restocks and price drops — twice a month, no noise.</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@example.com" aria-label="Email" />
            <button className="btn btn-solid" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  )
}
