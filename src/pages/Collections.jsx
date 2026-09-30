import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'
import './catalog.css'

export default function Collections() {
  return (
    <div className="wrap cat-page">
      <p className="eyebrow">Collections</p>
      <h1>
        Every aisle of<br />
        the music store.
      </h1>
      <p className="lede cat-sub" style={{ marginTop: 14 }}>
        Eight rooms of gear — from your first guitar to a full pro studio.
      </p>

      <div className="coll-grid-3">
        {categories.map((c) => (
          <Link className="coll-card" to={`/shop?cat=${c.slug}`} key={c.slug}>
            <div className="img">
              <img src={c.img} alt={c.name} loading="lazy" />
            </div>
            <h3>{c.name}</h3>
            <p>{c.note}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
