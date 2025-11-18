import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const { pathname } = useLocation()
  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === to ? 'bg-emerald-700/20 text-emerald-100' : 'text-emerald-50/80 hover:text-white hover:bg-emerald-700/20'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b border-white/10 bg-emerald-900/40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400" />
          <span className="text-emerald-50 font-semibold tracking-wide">Pliva Retreat</span>
        </Link>
        <nav className="flex items-center gap-2">
          {navLink('/', 'Home')}
          {navLink('/booking', 'Booking')}
          {navLink('/explore', 'Explore')}
          {navLink('/account', 'Login / Account')}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
