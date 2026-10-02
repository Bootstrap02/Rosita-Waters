import { Link } from 'react-router-dom';
import { phoneIntl } from '../data/config.js';
import { useStore } from '../context/StoreContext.jsx';

export default function CtaBand() {
  const { content, siteConfig } = useStore();
  const phone = content.phone || siteConfig.phones[0];
  return (
    <section className="cta">
      <div className="wrap">
        <h2>Ready to order? It takes a minute.</h2>
        <div className="btns">
          <Link className="btn btn-white" to="/products">
            Choose products
          </Link>
          <a
            className="btn btn-line"
            style={{ borderColor: '#fff', color: '#fff' }}
            href={'tel:' + phoneIntl(phone)}
          >
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
