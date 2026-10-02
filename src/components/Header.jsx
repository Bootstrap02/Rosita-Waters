import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { BrandMark, CartIcon } from './Icons.jsx';

const LINKS = [
  { to: '/', label: 'Home', key: 'home' },
  { to: '/products', label: 'Products', key: 'products' },
  { to: '/how-to-order', label: 'How to order', key: 'how-to-order' },
  { to: '/about', label: 'About us', key: 'about' },
  { to: '/contact', label: 'Contact', key: 'contact' },
];

function activeKey(pathname) {
  if (pathname.startsWith('/product/') || pathname.startsWith('/products/')) return 'products';
  if (pathname.startsWith('/products')) return 'products';
  const found = LINKS.find((l) => l.to === pathname);
  return found ? found.key : '';
}

export default function Header() {
  const { cartCount, openDrawer, content, siteConfig } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const active = activeKey(pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site">
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label={`${siteConfig.brand} home`}>
          {siteConfig.images?.logo ? (
            <img src={siteConfig.images.logo} alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
          ) : (
            <BrandMark size={40} />
          )}
          <span>
            <b>{siteConfig.brand}</b>
            <small>{content.tagline || 'Your trusted brand'}</small>
          </span>
        </Link>

        <ul className={'menu' + (menuOpen ? ' open' : '')} id="menu">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link className={active === l.key ? 'on' : ''} to={l.to}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navtools">
          <button className="cartbtn" onClick={() => openDrawer('list')} aria-label="Open order list">
            <CartIcon />
            <span className="lbl">Order list</span>
            <span className="n">{cartCount()}</span>
          </button>
          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            &#9776;
          </button>
        </div>
      </div>
    </header>
  );
}
