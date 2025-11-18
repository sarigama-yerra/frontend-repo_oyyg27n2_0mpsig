import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Offerings from './components/Offerings'
import Booking from './components/Booking'
import Explore from './components/Explore'
import Auth from './components/Auth'

function App() {
  return (
    <div className="min-h-screen bg-emerald-900/5 text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <Offerings />
        <Booking />
        <Explore />
        <Auth />
        <footer className="py-10 text-center text-emerald-800/70">© {new Date().getFullYear()} Pliva Retreat — Peaceful, minimalist stays by the river</footer>
      </main>
    </div>
  )
}

export default App
