import { Link } from 'react-router-dom';
import { phoneIntl } from '../data/config.js';
import PageHead from '../components/PageHead.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { useStore } from '../context/StoreContext.jsx';

const PROCESS = [
  { title: '1. Browse', text: 'Open Products and choose a group.' },
  { title: '2. Add', text: 'Set the quantity and tap Add to order.' },
  { title: '3. Send', text: 'Open your order list, add your details, choose WhatsApp, call or email.' },
  { title: '4. Confirm', text: 'We confirm price and delivery time, then deliver.' },
];

const FAQ = [
  {
    q: 'What sizes and packs do you sell?',
    a: 'Sachet water (500ml), bottled water (50cl and 75cl) and 20L refill bottles. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    open: true,
  },
  {
    q: 'Do you deliver, and where?',
    a: 'Placeholder answer about delivery areas and timing across Lagos. Sed do eiusmod tempor incididunt ut labore.',
  },
  {
    q: 'Is there a minimum order?',
    a: 'Placeholder answer about minimum quantities. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    q: 'How do I pay?',
    a: 'Placeholder answer about payment on delivery or transfer. Duis aute irure dolor in reprehenderit.',
  },
  {
    q: 'Can you supply events, schools or shops?',
    a: 'Yes. Placeholder answer about bulk and distributor orders. Excepteur sint occaecat cupidatat non proident.',
  },
];

export default function HowToOrder() {
  const { siteConfig } = useStore();
  return (
    <>
      <PageHead
        title="How to order"
        sub={`Three easy ways to get ${siteConfig.brand}. No account needed.`}
        crumb="How to order"
      />

      <section className="section">
        <div className="wrap">
          <h2>Pick the way that suits you</h2>
          <div className="chgrid">
            <div className="box">
              <h3>WhatsApp</h3>
              <p>Build your order list on the site and send it in one tap. Fastest option.</p>
              <Link className="btn btn-navy btn-sm" to="/products">
                Start your list
              </Link>
            </div>
            <div className="box">
              <h3>Phone call</h3>
              <p>Prefer to talk? Call and tell us what you need.</p>
              {siteConfig.phones.map((n) => (
                <a
                  key={n}
                  href={'tel:' + phoneIntl(n)}
                  style={{ display: 'block', fontWeight: 700, color: 'var(--navy)', textDecoration: 'none' }}
                >
                  {n}
                </a>
              ))}
            </div>
            <div className="box">
              <h3>Email</h3>
              <p>Good for bulk, event and office orders.</p>
              <a href={'mailto:' + siteConfig.email} style={{ fontWeight: 700, color: 'var(--navy)' }}>
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <h2>Step by step</h2>
          <div className="process" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            {PROCESS.map((s) => (
              <div key={s.title} style={{ background: '#fff' }}>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ marginBottom: 26 }}>Questions people ask</h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q} open={f.open}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
