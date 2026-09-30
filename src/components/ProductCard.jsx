import { Link } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'
import { inr } from '../data/products.js'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const p = product

  return (
    <div className="prod-card">
      <Link to={`/product/${p.id}`} className="img card-link" aria-label={p.name}>
        {p.tag && <span className="prod-tag">{p.tag}</span>}
        <img src={p.img} alt={p.name} loading="lazy" />
      </Link>
      <div className="prod-body">
        <Link to={`/product/${p.id}`} className="card-link">
          <h3>{p.name}</h3>
        </Link>
        <p className="prod-wt">{p.brand}{p.specs && p.specs[0] ? ` · ${p.specs[0].split(',')[0]}` : ''}</p>
        <div className="prod-row">
          <span className="price">
            {inr(p.price)}
            {p.mrp && <small>{inr(p.mrp)}</small>}
          </span>
          <button
            className="add-btn"
            onClick={() => addItem(p, 1)}
            aria-label={`Add ${p.name} to bag`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
