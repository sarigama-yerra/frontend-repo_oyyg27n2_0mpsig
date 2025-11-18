import { useEffect, useMemo, useState } from 'react'

function Day({ d, onPick }) {
  return (
    <button
      onClick={() => d.available && onPick(d.date)}
      className={`w-10 h-10 rounded grid place-items-center text-sm border transition ${
        d.available ? 'bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-gray-100 border-gray-200 text-gray-400 line-through cursor-not-allowed'
      }`}
      title={d.available ? 'Available' : 'Unavailable'}
    >
      {new Date(d.date).getDate()}
    </button>
  )
}

function Calendar({ offering, start, end, onChange }) {
  const [days, setDays] = useState([])

  useEffect(() => {
    if (!offering || !start || !end) return
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offering_id: offering, start_date: start, end_date: end })
      })
      const data = await res.json()
      setDays(data.days || [])
    }
    load()
  }, [offering, start, end])

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d => (
        <Day key={d.date} d={d} onPick={(dt) => onChange(dt)} />
      ))}
    </div>
  )
}

function Booking() {
  const [offering, setOffering] = useState('cabin')
  const [start, setStart] = useState(() => new Date().toISOString().slice(0,10))
  const [end, setEnd] = useState(() => new Date(Date.now()+ 1000*60*60*24*14).toISOString().slice(0,10))
  const [guests, setGuests] = useState(2)
  const [quote, setQuote] = useState(null)
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const requestQuote = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    // We simulate quote by calling availability then computing days selected if user picks later
    const nights = Math.max(0, Math.ceil((new Date(end)- new Date(start))/(1000*60*60*24)))
    // Fetch offerings to get price
    const off = await fetch(`${base}/offerings`).then(r=>r.json())
    const current = (off.items||[]).find(i=>i.id===offering)
    if (!current) return setQuote(null)
    setQuote({ nights, price_per_night: current.price_per_night, total: nights*current.price_per_night })
  }

  const confirm = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: email, offering_id: offering, start_date: start, end_date: end, guests })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Booking failed')
      setMsg(`Booked! Total €${data.total_price}`)
    } catch (e) {
      setMsg(e.message)
    }
  }

  return (
    <section id="booking" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-900">Book your stay</h2>
        <p className="mt-1 text-emerald-800/80">Transparent pricing, live availability and easy checkout.</p>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="bg-emerald-50 border border-emerald-900/10 rounded-xl p-4">
            <label className="block text-sm text-emerald-800/90 mb-1">Choose</label>
            <select value={offering} onChange={e=>setOffering(e.target.value)} className="w-full p-2 rounded border border-emerald-200 bg-white">
              <option value="cabin">Container Cabin</option>
              <option value="van">Fully Equipped Van</option>
            </select>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-sm text-emerald-800/90 mb-1">From</label>
                <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="w-full p-2 rounded border border-emerald-200"/>
              </div>
              <div>
                <label className="block text-sm text-emerald-800/90 mb-1">To</label>
                <input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="w-full p-2 rounded border border-emerald-200"/>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-emerald-800/90 mb-1">Guests</label>
              <input type="number" min="1" value={guests} onChange={e=>setGuests(parseInt(e.target.value)||1)} className="w-full p-2 rounded border border-emerald-200"/>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={requestQuote} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500">Get quote</button>
              <button onClick={confirm} className="px-4 py-2 border border-emerald-600 text-emerald-700 rounded hover:bg-emerald-50">Confirm booking</button>
            </div>

            {msg && <p className="mt-3 text-emerald-800">{msg}</p>}
          </div>
          <div className="lg:col-span-2 bg-white border border-emerald-900/10 rounded-xl p-4">
            <h3 className="font-medium text-emerald-900 mb-2">Availability</h3>
            <Calendar offering={offering} start={start} end={end} onChange={()=>{}} />

            {quote && (
              <div className="mt-4 p-3 rounded border bg-emerald-50 border-emerald-200 text-emerald-900">
                <p><strong>{quote.nights}</strong> nights x €{quote.price_per_night} = <strong>€{quote.total}</strong></p>
                <p className="text-sm text-emerald-800/80">Attractive prices for a premium, photo‑worthy experience.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking
