import { Link } from 'react-router-dom';
import { phoneIntl } from '../data/config.js';
import { BrandMark, SocialLinks } from './Icons.jsx';
import { useStore } from '../context/StoreContext.jsx';

export default function Footer() {
  const { content, siteConfig } = useStore();
  const phones = content.phone ? [content.phone] : siteConfig.phones;
  const email = content.footerEmail || siteConfig.email;
  const address = content.footerAddress || siteConfig.address;
  const socials = content.socials || siteConfig.socials;

  return (
    <footer className="site">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link className="brand" to="/">
              <span>
                <b>{siteConfig.brand}</b>
              </span>
            </Link>
            <p style={{ marginTop: 14, fontSize: '.98rem' }}>
              {`Pure and refreshing water from ${siteConfig.company}, Lagos. Sachet, bottled and 20L`}
              refills.
            </p>
            <SocialLinks socials={socials} />
          </div>

          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Products</h4>
            <Link to="/products/sachet">Sachet water</Link>
            <Link to="/products/bottled">Bottled water</Link>
            <Link to="/products/jug">20L refill bottles</Link>
            <Link to="/products/dispenser">Water dispensers</Link>
          </div>

          <div>
            <h4>Reach us</h4>
            {phones.map((n) => (
              <a key={n} href={'tel:' + phoneIntl(n)}>
                {n}
              </a>
            ))}
            <a href={'mailto:' + email}>{email}</a>
            <span style={{ display: 'block', paddingTop: 8, fontSize: '.92rem' }}>
              {address}
            </span>
          </div>
        </div>

        <div className="legal">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.brand}. {siteConfig.company}
          </span>
          <a href="https://campusify.net/" style={{ display: 'inline' }}>Admin sign in</a>
        </div>
      </div>
    </footer>
  );
}
