import heroImg from './assets/hero.webp'
import guitarImg from './assets/product-guitar.webp'
import headphonesImg from './assets/product-headphones.webp'
import keyboardImg from './assets/product-keyboard.webp'

const inr = (n) => '₹' + n.toLocaleString('en-IN')

/* sample catalogue — real manufacturer import replaces this later */
const products = [
  { id: 1, name: 'Acoustic Guitar · Dreadnought', spec: 'Solid spruce top · Natural', price: 12999, mrp: 15999, tag: 'Bestseller', img: guitarImg },
  { id: 2, name: 'Studio Headphones · Closed-back', spec: '45mm drivers · 32Ω', price: 7499, mrp: 9999, tag: 'Bestseller', img: headphonesImg },
  { id: 3, name: '49-Key MIDI Keyboard', spec: 'Velocity pads · USB-C', price: 18999, mrp: 22999, tag: null, img: keyboardImg },
  { id: 4, name: 'Electric Guitar · S-Style', spec: 'Alder body · Maple neck', price: 21999, mrp: null, tag: null, img: guitarImg },
  { id: 5, name: 'Wireless Headphones · ANC', spec: '40h battery · Bluetooth 5.3', price: 11999, mrp: 14999, tag: null, img: headphonesImg },
  { id: 6, name: '61-Key Workstation Synth', spec: '1000+ tones · Aftertouch', price: 34999, mrp: null, tag: 'Pro pick', img: keyboardImg },
  { id: 7, name: 'Studio Monitor Speakers · Pair', spec: '5" woofers · 70W', price: 24999, mrp: 29999, tag: 'Pro pick', img: heroImg },
  { id: 8, name: 'Cajón · Birchwood', spec: 'Adjustable snare · Bag incl.', price: 6499, mrp: null, tag: null, img: heroImg },
]

const categories = [
  { name: 'Guitars', note: 'Acoustic, electric & bass', img: guitarImg },
  { name: 'Keyboards & Synths', note: 'MIDI, workstations, pianos', img: keyboardImg },
  { name: 'Drums & Percussion', note: 'Kits, cajóns, tabla', img: heroImg },
  { name: 'Headphones', note: 'Studio, wireless & IEMs', img: headphonesImg },
  { name: 'Speakers & Monitors', note: 'PA, monitors & amps', img: heroImg },
  { name: 'Strings & Cables', note: 'Strings, wires & picks', img: guitarImg },
]

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24"><path d={d} strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const ICONS = {
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35',
  user: 'M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  bag: 'M6 8h15l-1.5 12.5a1 1 0 0 1-1 .5h-13a1 1 0 0 1-1-.5L3 8Zm4 0V6a4 4 0 0 1 8 0v2',
}

function App() {
  return (
    <>
      <div className="announce">Festive Sale — up to 40% off studio essentials</div>

      <header className="site-header">
        <div className="wrap header-in">
          <nav className="nav">
            <a href="#shop">Shop</a>
            <a href="#categories">Categories</a>
            <a href="#studio">Studios</a>
          </nav>
          <a className="wordmark" href="#">SOUND<em>KART</em></a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <nav className="nav">
              <a href="#deals">Deals</a>
              <a href="#support">Support</a>
            </nav>
            <div className="header-icons">
              <button aria-label="Search"><Icon d={ICONS.search} /></button>
              <button aria-label="Account"><Icon d={ICONS.user} /></button>
              <button aria-label="Bag"><Icon d={ICONS.bag} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* ——— hero ——— */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">120+ brands · 15,000+ products · 500+ cities</p>
            <h1>Everything you need to <em>make music.</em></h1>
            <p className="lede">
              Guitars, keyboards, drums, headphones, speakers, strings, cables —
              genuine gear with GST invoice, EMI options, and doorstep delivery
              across India.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-solid" href="#shop">Shop bestsellers</a>
              <a className="btn btn-ghost" href="#categories">Browse categories</a>
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
      <section id="categories">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Categories</p>
              <h2>Find your instrument.</h2>
            </div>
            <a className="link-arrow" href="#shop">View all →</a>
          </div>
          <div className="cat-grid">
            {categories.map((c) => (
              <a className="cat-card" href="#shop" key={c.name}>
                <div className="img"><img src={c.img} alt={c.name} /></div>
                <div className="body">
                  <div><h3>{c.name}</h3><p>{c.note}</p></div>
                  <span className="go">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ——— bestsellers ——— */}
      <section id="shop" className="band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Bestsellers</p>
              <h2>What India is playing.</h2>
              <p className="lede">Sample catalogue — the full manufacturer range plugs in here.</p>
            </div>
            <a className="link-arrow" href="#shop">Shop all →</a>
          </div>
          <div className="prod-grid">
            {products.map((p) => (
              <div className="prod-card" key={p.id}>
                <div className="img">
                  {p.tag && <span className="prod-tag">{p.tag}</span>}
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="prod-body">
                  <h3>{p.name}</h3>
                  <p className="prod-spec">{p.spec}</p>
                  <div className="prod-row">
                    <span className="price">{inr(p.price)}{p.mrp && <small>{inr(p.mrp)}</small>}</span>
                    <button className="add-btn">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— studio band ——— */}
      <section id="studio">
        <div className="wrap studio-grid">
          <div>
            <p className="eyebrow">Home studio builder</p>
            <h2>Your first studio,<br />under ₹50,000.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              We bundle beginner-to-pro studio kits — interface, monitors,
              headphones and mic — matched to your budget and your room.
            </p>
            <ul className="check-list">
              <li><span className="tick">✓</span>Curated bundles for bedroom producers & podcasters</li>
              <li><span className="tick">✓</span>Free video call with a gear specialist before you buy</li>
              <li><span className="tick">✓</span>7-day easy returns, 1-year brand warranty</li>
            </ul>
            <a className="btn btn-solid" href="#shop">Build my studio</a>
          </div>
          <div className="studio-img"><img src={heroImg} alt="Home studio setup" /></div>
        </div>
      </section>

      <footer id="support">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a className="wordmark" href="#">SOUND<em>KART</em></a>
              <p>India's home for musical instruments & pro audio. Genuine gear, honest prices.</p>
              <p className="venture">A NAAD INFINITY VENTURE</p>
            </div>
            <div>
              <h5>Shop</h5>
              <a href="#shop">Guitars</a><a href="#shop">Keyboards</a>
              <a href="#shop">Drums</a><a href="#shop">Headphones</a>
            </div>
            <div>
              <h5>Company</h5>
              <a href="#studio">Studio builder</a><a href="#deals">Deals</a>
              <a href="#support">Support</a><a href="#support">About</a>
            </div>
            <div>
              <h5>Help</h5>
              <a href="#support">Track order</a><a href="#support">Shipping</a>
              <a href="#support">Returns</a><a href="#support">Contact</a>
            </div>
          </div>
          <div className="foot-base">
            <span>© 2026 SoundKart · A Naad Infinity Venture</span>
            <span>EMI · COD · UPI · Pan-India shipping</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
