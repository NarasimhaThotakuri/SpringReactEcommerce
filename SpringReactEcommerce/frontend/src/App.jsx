import React, { useEffect, useState } from 'react'

export default function App() {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        return res.json()
      })
      .then((data) => setProducts(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading products…</div>
  if (error) return <div>Error loading products: {error}</div>
  if (!products || products.length === 0) return <div>No products found</div>

  return (
    <div className="app">
      <header>
        <h1>Products</h1>
      </header>
      <main>
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — ${p.price}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
