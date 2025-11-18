import { useState } from 'react'

function Auth() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      if (mode === 'register') {
        const res = await fetch(`${base}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
        const data = await res.json(); if (!res.ok) throw new Error(data.detail || 'Failed')
        setMsg('Account created. You can now log in.')
        setMode('login')
      } else {
        const res = await fetch(`${base}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
        const data = await res.json(); if (!res.ok) throw new Error(data.detail || 'Failed')
        setMsg(`Welcome back, ${data.name}!`)
      }
    } catch (e) { setMsg(e.message) }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-emerald-50 border border-emerald-900/10 rounded-xl p-6">
          <div className="flex gap-2 mb-4">
            <button onClick={()=>setMode('login')} className={`px-3 py-2 rounded ${mode==='login'?'bg-emerald-600 text-white':'bg-white border border-emerald-200 text-emerald-700'}`}>Login</button>
            <button onClick={()=>setMode('register')} className={`px-3 py-2 rounded ${mode==='register'?'bg-emerald-600 text-white':'bg-white border border-emerald-200 text-emerald-700'}`}>Create account</button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode==='register' && (
              <div>
                <label className="block text-sm text-emerald-800/90 mb-1">Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 rounded border border-emerald-200" />
              </div>
            )}
            <div>
              <label className="block text-sm text-emerald-800/90 mb-1">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 rounded border border-emerald-200" />
            </div>
            <div>
              <label className="block text-sm text-emerald-800/90 mb-1">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 rounded border border-emerald-200" />
            </div>
            <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500">{mode==='register'?'Create account':'Login'}</button>
          </form>
          {msg && <p className="mt-3 text-emerald-800">{msg}</p>}
        </div>
      </div>
    </section>
  )
}

export default Auth
