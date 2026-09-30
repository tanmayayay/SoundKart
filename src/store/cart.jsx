import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'soundkart-cart'
const MAX_QTY = 99

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (i) => i && typeof i.id === 'string' && Number.isFinite(i.qty) && i.qty > 0
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — cart simply won't persist */
    }
  }, [items])

  const addItem = useCallback((product, qty = 1) => {
    if (!product || !product.id) return
    const q = Math.max(1, Math.min(MAX_QTY, Math.floor(qty) || 1))
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(MAX_QTY, i.qty + q) } : i
        )
      }
      return [...prev, { id: product.id, qty: q }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const setQty = useCallback((id, qty) => {
    const q = Math.floor(qty)
    setItems((prev) =>
      q <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, q) } : i))
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  // Join with product data; drop lines whose product no longer exists.
  const detailed = useMemo(
    () =>
      items
        .map((i) => ({ ...i, product: getProduct(i.id) }))
        .filter((i) => i.product),
    [items]
  )

  const count = useMemo(
    () => detailed.reduce((sum, i) => sum + i.qty, 0),
    [detailed]
  )

  const subtotal = useMemo(
    () => detailed.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [detailed]
  )

  const value = useMemo(
    () => ({
      items: detailed,
      rawItems: items,
      addItem,
      removeItem,
      setQty,
      clear,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
    }),
    [detailed, items, addItem, removeItem, setQty, clear, count, subtotal, isOpen, openCart, closeCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
