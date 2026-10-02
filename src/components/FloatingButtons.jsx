import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { CartIcon, WhatsAppIcon } from './Icons.jsx';
import { waLink } from '../data/config.js';

export default function FloatingButtons() {
  const { cartCount, openDrawer, content, siteConfig } = useStore();

  return (
    <>
      <button className="fab cart" onClick={() => openDrawer('list')} aria-label="Open order list">
        <CartIcon size={24} />
        <span className="n">{cartCount()}</span>
      </button>
      <a
        className="fab wa"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        href={waLink(`Hello ${siteConfig.brand}, I have a question.`, content.whatsapp || siteConfig.whatsapp)}
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
