function Explore() {
  const items = [
    { title: 'Pliva Waterfalls', img: 'https://images.unsplash.com/photo-1528821154947-1aa3d51cb090?q=80&w=1200&auto=format&fit=crop', desc: 'Impressive cascades and crystal‑clear pools near Jajce.' },
    { title: 'Pliva Lake', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop', desc: 'Serene waters perfect for kayaking, picnics and calm sunsets.' },
    { title: 'Hiking Trails', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop', desc: 'Forested paths and mountain viewpoints all around Šipovo.' },
    { title: 'Local Food', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop', desc: 'Ćevapi, pies and fresh trout—comforting and delicious.' },
    { title: 'Cultural Visits', img: 'https://images.unsplash.com/photo-1542367597-8849ebf52bb9?q=80&w=1200&auto=format&fit=crop', desc: 'Historic Jajce, wooden watermills and centuries of heritage.' },
    { title: 'Adventure Sports', img: 'https://images.unsplash.com/photo-1526470498-2b0921aa5e1b?q=80&w=1200&auto=format&fit=crop', desc: 'Rafting, MTB trails and winter activities for the bold.' },
  ]

  return (
    <section id="explore" className="py-16 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-900">Best things to do in Bosnia</h2>
        <p className="mt-1 text-emerald-800/80">Waterfalls, hikes, lakes and hearty food—everything close by.</p>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl overflow-hidden bg-white border border-emerald-900/10">
              <div className="aspect-[4/3]">
                <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-emerald-900">{it.title}</h3>
                <p className="text-emerald-800/80 text-sm mt-1">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Explore
