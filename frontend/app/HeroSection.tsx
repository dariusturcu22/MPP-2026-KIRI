export function HeroSection() {
  return (
    <section className="relative h-screen max-h-145 overflow-hidden">
      <img
        src="/hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-16 h-full flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-cream-bg mb-8 max-w-md leading-tight">
          Property management, simplified.
        </h1>
        <div className="max-w-2xl space-y-4">
          <p className="text-lg text-brown-light leading-relaxed">
            Kiri is a centralized platform designed for landlords to manage
            multiple properties and automate communication with tenants.
          </p>
          <p className="text-lg text-brown-light leading-relaxed">
            Its philosophy is to minimize manual administration by integrating
            essential property management workflows — maintenance, legal
            documentation, scheduling, and utilities — directly into the
            application.
          </p>
        </div>
      </div>
    </section>
  );
}
