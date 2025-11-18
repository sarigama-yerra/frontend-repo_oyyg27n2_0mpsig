function Hero() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-sky-900 to-emerald-950" />
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="Pliva river"
          className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-900/50 to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl text-emerald-50">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Nature, river and mountains at your doorstep</h1>
          <p className="mt-4 text-emerald-100/90 text-lg">Slow down by the Pliva river in Šipovo. Stay in a cozy container cabin or roam in a fully equipped van. Minimalist comfort, warm details, and plenty of photo‑ready moments.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#booking" className="px-5 py-3 rounded-lg bg-emerald-400 text-emerald-900 font-semibold hover:bg-emerald-300 transition">Check availability</a>
            <a href="#explore" className="px-5 py-3 rounded-lg border border-emerald-200/30 text-emerald-50 hover:bg-emerald-800/30 transition">Things to do</a>
          </div>
          <p className="mt-6 text-emerald-100/80">From €55/night — Instagram‑friendly spots included</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
