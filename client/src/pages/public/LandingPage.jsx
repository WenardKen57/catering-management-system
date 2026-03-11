import "./LandingPage.css";

const LandingPage = () => {
  const eventTypes = [
    {
      title: "Corporate Galas",
      desc: "Precision-timed service and sophisticated menus for high-profile business events.",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      title: "Refined Weddings",
      desc: "A seamless culinary journey designed to complement your unique love story.",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
    },
    {
      title: "Private Soirées",
      desc: "Exceptional dining experiences brought to the comfort of your private residence.",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-inner">
          <span className="gold-label">Catering Excellence</span>
          <h1>
            Minimalist Dining. <br /> Maximum Flavor.
          </h1>
          <button className="cta-gold">Make a Reservation</button>
        </div>
      </header>

      {/* Event Types */}
      <section id="about" className="events-section">
        <h2 className="section-heading">Event Specialization</h2>
        <div className="event-grid">
          {eventTypes.map((item, idx) => (
            <div className="event-card" key={idx}>
              <div className="icon-wrapper">{item.svg}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="packages-section">
        <h2 className="section-heading light">Our Best Packages</h2>
        <div className="package-grid">
          {[
            {
              name: "Silver",
              price: "45",
              items: ["Buffet Service", "Soft Drinks", "Standard Decor"],
            },
            {
              name: "Gold",
              price: "85",
              items: ["Plated Dinner", "Full Bar", "Floral Design"],
            },
            {
              name: "Platinum",
              price: "125",
              items: ["Chef Tasting", "Premium Spirits", "Event Planning"],
            },
          ].map((pkg, idx) => (
            <div className="pkg-card" key={idx}>
              <span className="pkg-tier">{pkg.name}</span>
              <div className="pkg-price">
                ${pkg.price}
                <span>/pp</span>
              </div>
              <ul className="pkg-list">
                {pkg.items.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
              <button className="pkg-btn">Reserve {pkg.name}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2 className="section-heading">Visual Journal</h2>
        <div className="carousel-container">
          <div className="carousel-track">
            <div
              className="gal-img"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1555244162-803834f70033?w=800')",
              }}
            ></div>
            <div
              className="gal-img"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800')",
              }}
            ></div>
            <div
              className="gal-img"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800')",
              }}
            ></div>
            <div
              className="gal-img"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1530103862676-de88b6b08fd3?w=800')",
              }}
            ></div>
          </div>
        </div>
        <p className="carousel-hint">Drag horizontally to explore</p>
      </section>
    </div>
  );
};

export default LandingPage;
