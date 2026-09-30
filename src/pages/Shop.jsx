import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories, brands, catName } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './catalog.css'

const PRICES = [
  ['all', 'Any price'],
  ['under10', 'Under ₹10,000'],
  ['10to25', '₹10,000 – ₹25,000'],
  ['above25', 'Above ₹25,000'],
]
const SORTS = [
  ['featured', 'Featured'],
  ['low', 'Price: low to high'],
  ['high', 'Price: high to low'],
  ['rating', 'Top rated'],
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const paramCat = params.get('cat')
  const validCat = (s) => s === 'all' || categories.some((c) => c.slug === s)

  const [cat, setCatState] = useState(validCat(paramCat) ? paramCat : 'all')
  const [brand, setBrand] = useState('all')
  const [price, setPrice] = useState('all')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('featured')

  const setCat = (slug) => {
    setCatState(slug)
    setBrand('all')
    setParams(slug === 'all' ? {} : { cat: slug })
  }

  const clearAll = () => {
    setCatState('all')
    setBrand('all')
    setPrice('all')
    setQ('')
    setSort('featured')
    setParams({})
  }

  const filtered = useMemo(() => {
    let list = cat === 'all' ? [...products] : products.filter((p) => p.category === cat)
    if (brand !== 'all') list = list.filter((p) => p.brand === brand)
    if (price === 'under10') list = list.filter((p) => p.price < 10000)
    if (price === '10to25') list = list.filter((p) => p.price >= 10000 && p.price <= 25000)
    if (price === 'above25') list = list.filter((p) => p.price > 25000)
    const needle = q.trim().toLowerCase()
    if (needle) {
      list = list.filter((p) =>
        (p.name + ' ' + p.brand + ' ' + (p.blurb || '')).toLowerCase().includes(needle)
      )
    }
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    return list
  }, [cat, brand, price, q, sort])

  return (
    <div className="wrap cat-page">
      <p className="eyebrow">Shop</p>
      <h1>{cat === 'all' ? 'Shop all' : catName(cat)}</h1>
      <p className="lede cat-sub">
        Genuine gear from authorised brand partners — every order ships insured,
        with a GST invoice and brand warranty.
      </p>

      <div className="filters">
        <div className="pill-row" role="tablist" aria-label="Categories">
          <button className={`pill${cat === 'all' ? ' active' : ''}`} onClick={() => setCat('all')}>
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              className={`pill${cat === c.slug ? ' active' : ''}`}
              onClick={() => setCat(c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="filter-controls">
          <input
            className="search-input"
            type="search"
            placeholder="Search guitars, mics, monitors…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search products"
          />
          <select className="select" value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Filter by brand">
            <option value="all">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select className="select" value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Filter by price">
            {PRICES.map(([v, label]) => (
              <option key={v} value={v}>{label}</option>
            ))}
          </select>
          <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            {SORTS.map(([v, label]) => (
              <option key={v} value={v}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="result-count">
        Showing {filtered.length} of {products.length} products
      </p>

      {filtered.length > 0 ? (
        <div className="cat-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No gear matches those filters.</h2>
          <p>Try a different brand, price range, or search term — or start over.</p>
          <button className="btn btn-solid" onClick={clearAll}>Clear all filters</button>
        </div>
      )}
    </div>
  )
}
