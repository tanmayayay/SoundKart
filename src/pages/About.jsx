import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.webp'
import './catalog.css'

const values = [
  { n: '01', h: 'Genuine, always', p: 'Every product comes from authorised brand partners and is serial-verified before dispatch. No grey imports, no fakes — the warranty card in the box is real.' },
  { n: '02', h: 'Priced for India', p: 'No-cost EMI on orders above ₹9,999, GST invoices for pros and institutions, and pan-India insured shipping. Pro gear should not need a pro budget.' },
  { n: '03', h: 'Musicians first', p: 'Free video calls with gear specialists before you buy, 7-day returns, and setup help on WhatsApp after delivery. We want the gear played, not shelved.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About SoundKart · A Naad Infinity Venture</p>
          <h1>Built by people<br />who live music.</h1>
          <p className="lede" style={{ marginTop: 18, maxWidth: '58ch' }}>
            SoundKart is the gear arm of Naad Infinity — the same crew behind
            Strings, the platform tying India's music industry together. We kept
            meeting brilliant musicians held back by one thing: trustworthy gear
            at honest prices, delivered anywhere in the country. So we built the
            store we wished existed.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap about-grid">
          <div className="about-img"><img src={heroImg} alt="Home studio with guitar, keyboard, monitors and headphones" /></div>
          <div>
            <p className="eyebrow">What we believe</p>
            <div className="steps">
              {values.map((s) => (
                <div className="step" key={s.n}>
                  <span className="num">{s.n}</span>
                  <div><h4>{s.h}</h4><p>{s.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">The mother company</p>
              <h2>Naad Infinity.</h2>
            </div>
          </div>
          <p className="lede" style={{ maxWidth: '64ch' }}>
            Naad Infinity is building the 360° ecosystem for Indian music —
            Strings connects artists, venues and collaborators; SoundKart puts
            the instruments in their hands. One crew, one mission: more music,
            made in India.
          </p>
          <div style={{ marginTop: 36 }}>
            <Link className="btn btn-solid" to="/shop">Shop the gear</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Gear care guide</p>
              <h2>Make it last.</h2>
            </div>
          </div>
          <div className="care-grid">
            {[
              ['Strings', 'Wipe down after every session — sweat is the enemy. A fresh set every 1–3 months keeps the sparkle.'],
              ['Wood instruments', 'Keep them out of direct sun and monsoon damp. A hard case and a humidifier strip do the rest.'],
              ['Electronics', 'Stable power is everything. A surge protector is the cheapest insurance your studio will ever buy.'],
              ['Mics & headphones', 'Store mics upright in their pouch; coil cables loosely, never yank. Your future self says thanks.'],
            ].map(([h, p]) => (
              <div className="care-card" key={h}>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
