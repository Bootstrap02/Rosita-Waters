import { Link } from 'react-router-dom';
import { IMG } from '../data/images.js';
import { useStore } from '../context/StoreContext.jsx';
import PageHead from '../components/PageHead.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { IMAGE_PLACEHOLDER } from '../data/config.js';

const VALUES = [
  { title: 'Purity', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.' },
  { title: 'Reliability', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
  { title: 'Trust', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
];

const PROCESS = [
  { title: 'Sourcing', text: 'Lorem ipsum dolor sit amet.' },
  { title: 'Purifying', text: 'Consectetur adipiscing elit.' },
  { title: 'Filling', text: 'Sed do eiusmod tempor.' },
  { title: 'Packing', text: 'Incididunt ut labore et dolore.' },
];

export default function About() {
  const { content, siteConfig } = useStore();

  return (
    <>
      <PageHead
        title={`About ${siteConfig.brand}`}
        sub={`Produced and packed by ${siteConfig.company}.`}
        crumb="About us"
      />

      <section className="section">
        <div className="wrap about-grid">
          <div>
            <h2>A Lagos water business people know by name.</h2>
            <p className="lede">{content.aboutText}</p>
            <p style={{ marginTop: 16, color: 'var(--grey)' }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link className="btn btn-red" to="/contact">
                Talk to us
              </Link>
            </div>
          </div>
          <div className="dropframe">
            <div className="ring" />
            <div className="shape">
              <img
                src={siteConfig.images?.family || (siteConfig.tenantKey === 'rosita-waters' ? IMG.family : IMAGE_PLACEHOLDER)}
                alt={`A family enjoying ${siteConfig.brand}`}
                style={{ objectPosition: 'center 25%' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <h2>What we stand for</h2>
          <div className="values">
            {VALUES.map((v) => (
              <div className="val" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="trust">
            <div className="pic">
              <img src={siteConfig.images?.factory || (siteConfig.tenantKey === 'rosita-waters' ? IMG.factory : IMAGE_PLACEHOLDER)} alt="Production line" />
            </div>
            <div>
              <h2>From source to seal</h2>
              <p className="lede">
                A short walk through how every Rar product is made. Replace with the client's real
                process.
              </p>
            </div>
          </div>
          <div className="process">
            {PROCESS.map((p) => (
              <div key={p.title}>
                <b>{p.title}</b>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <div className="split-head" style={{ margin: 0 }}>
            <div>
              <h2>The original {siteConfig.brand} flyer</h2>
              <p className="lede">
                Shown here so the client can see how the printed brand carries onto the site.
              </p>
            </div>
            <img
              src={siteConfig.images?.flyer || (siteConfig.tenantKey === 'rosita-waters' ? IMG.flyer : IMAGE_PLACEHOLDER)}
              alt={`${siteConfig.brand} printed flyer`}
              style={{ width: 'min(300px,100%)', borderRadius: 16, border: '2px solid var(--line)' }}
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
