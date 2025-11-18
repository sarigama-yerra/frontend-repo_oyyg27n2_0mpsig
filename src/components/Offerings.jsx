import { useEffect, useState } from 'react'

function Card({ title, desc, price, amenities, photos }) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-xl overflow-hidden shadow-sm border border-emerald-900/10">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img src={photos?.[0]} alt={title} className="w-full h-full object-cover"/>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold text-emerald-900">{title}</h3>
          <p className="text-emerald-700 font-medium">€{price}/night</p>
        </div>
        <p className="mt-2 text-sm text-emerald-800/80">{desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {amenities?.slice(0,5).map(a => (
            <span key={a} className="px-2 py-1 text-xs rounded bg-emerald-50 border border-emerald-900/10 text-emerald-700">{a}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Offerings() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/offerings`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="py-14 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-900">Stay your way</h2>
        <p className="mt-1 text-emerald-800/80">Choose the renovated container cabin or the fully equipped van.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-emerald-800/80">Loading...</p>
          ) : (
            items.map(it => (
              <Card key={it.id} title={it.title} desc={it.description} price={it.price_per_night} amenities={it.amenities} photos={it.photos} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Offerings
