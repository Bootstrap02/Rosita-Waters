import { Link } from 'react-router-dom';
import { IMG } from '../data/images.js';
import { useStore } from '../context/StoreContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { IMAGE_PLACEHOLDER } from '../data/config.js';

const CATEGORIES = [
  { key: 'sachet', img: IMG.sachets2, alt: 'Rar sachet water', title: 'Sachet water', text: 'The everyday pure water. 500ml, sold by the bag.' },
  { key: 'bottled', img: IMG.bottles50, alt: 'Rar bottled water', title: 'Bottled water', text: '50cl and 75cl bottles for on-the-go hydration.' },
  { key: 'jug', img: IMG.jug, alt: 'Rar 20L bottle', title: '20L refills', text: 'For dispensers at home, school and work.', style: { objectPosition: 'center 30%' } },
  { key: 'dispenser', img: IMG.dispenser, alt: 'Rar water dispenser', title: 'Dispensers', text: 'Two-tap dispensers that fit our 20L bottle.', style: { objectPosition: 'center 20%' } },
];

const POINTS = [
  { icon: '✓', title: 'Purified and filtered', text: 'Placeholder copy about the purification process. Sed do eiusmod tempor incididunt ut labore.' },
  { icon: '●', title: 'Clean, hygienic packing', text: 'Placeholder copy about sealing and handling. Ut enim ad minim veniam, quis nostrud.' },
  { icon: '★', title: 'Approved and traceable', text: 'Space for the NAFDAC number and quality checks once the client confirms them.' },
];

const STEPS = [
  { title: 'Pick your products', text: 'Browse the range and add items to your order list with the quantity you need.' },
  { title: 'Send your list', text: 'Choose WhatsApp, a phone call or email. Your list is written out for you.' },
  { title: 'We confirm and deliver', text: 'The team confirms price and timing, then delivers or sets it aside for pickup.' },
];

const WHO = [
  'Homes and families',
  'Offices',
  'Schools',
  'Events and weddings',
  'Shops and retailers',
  'Churches and mosques',
];

export default function Home() {
  const { content, products, productsError, contentError, siteConfig } = useStore();
  const featured = products.slice(0, 3);
  const clientImage = (key, defaultImage) =>
    siteConfig.images?.[key]
    || (siteConfig.tenantKey === 'rosita-waters' ? defaultImage : IMAGE_PLACEHOLDER);

  return (
    <>
      {productsError || contentError ? (
        <div className="wrap notice" role="alert">
          {productsError ? `Products unavailable: ${productsError}. ` : ''}
          {contentError ? `Website content unavailable: ${contentError}` : ''}
        </div>
      ) : null}
      <section className="hero">
        <div className="wrap">
          <div>
            <h1>
              {content.heroTitle}
              <span className="sub">{content.heroSub}</span>
            </h1>
            <p>{content.heroText}</p>
            <div className="hero-cta">
              <Link className="btn btn-red" to="/products">
                Order water
              </Link>
              <Link className="btn btn-line" to="/about">
                About {siteConfig.brand}
              </Link>
            </div>
          </div>
          <div className="dropframe">
            <div className="ring" />
            <div className="shape">
              <img src={clientImage('homeHero', IMG.hero)} alt={`Two people enjoying ${siteConfig.brand}`} />
            </div>
            <span className="ribbon tag">Your trusted brand</span>
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30 C240 70 480 0 720 30 S1200 60 1440 20 V60 H0Z" fill="#fff" />
        </svg>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-head">
            <div>
              <h2>Everything you drink, from one source.</h2>
              <p className="lede">Four ways to get {siteConfig.brand}, whether it is for one person or a whole office.</p>
            </div>
            <Link className="btn btn-line" to="/products">
              See all products
            </Link>
          </div>
          <div className="cats">
            {CATEGORIES.map((c) => (
              <Link className="cat" key={c.key} to={'/products/' + c.key}>
                <img src={clientImage(c.key, c.img)} alt={c.alt} style={c.style} />
                <div className="txt">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap trust">
          <div className="pic">
            <img src={clientImage('factory', IMG.factory)} alt={`Bottling line at the ${siteConfig.brand} production facility`} />
          </div>
          <div>
            <h2>Made carefully, packed cleanly.</h2>
            <p className="lede">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Every bottle and sachet is
              filled, sealed and packed in one place.
            </p>
            <ul className="points">
              {POINTS.map((p) => (
                <li key={p.title}>
                  <span className="ic">{p.icon}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-head">
            <div>
              <h2>Popular right now</h2>
            </div>
            <Link className="btn btn-line" to="/products">
              View all
            </Link>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section navyband">
        <div className="wrap">
          <h2>How ordering works</h2>
          <p className="lede" style={{ color: '#C9D5F2' }}>
            No account, no sign-up. Pick what you need and send it to us.
          </p>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="no">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-head" style={{ marginBottom: 0 }}>
            <div>
              <h2>Who buys {siteConfig.brand}</h2>
              <p className="lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="who">
                {WHO.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
