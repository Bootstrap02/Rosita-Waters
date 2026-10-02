import { Link } from 'react-router-dom';
import { CATS, priceText } from '../data/config.js';
import { useStore } from '../context/StoreContext.jsx';
import { IMAGE_PLACEHOLDER } from '../data/config.js';

export default function ProductCard({ product }) {
  const { addToCart, siteConfig } = useStore();
  const catLabel = CATS[product.cat] || product.cat;

  return (
    <article className="card">
      <Link className="im" to={'/product/' + product.id} aria-label={'View ' + product.name}>
        <img src={product.img || IMAGE_PLACEHOLDER} alt={product.name} loading="lazy" />
      </Link>
      <div className="bd">
        <span className="kind">{catLabel}</span>
        <h3>
          <Link to={'/product/' + product.id} style={{ textDecoration: 'none' }}>
            {product.name}
          </Link>
        </h3>
        <div className="spec">
          {product.size} &middot; {product.pack}
        </div>
        <div className="foot">
          <span className="price">{priceText(product, siteConfig)}</span>
          <span style={{ display: 'flex', gap: 8 }}>
            <Link className="btn btn-line btn-sm" to={'/product/' + product.id}>
              View
            </Link>
            <button className="btn btn-red btn-sm" onClick={() => addToCart(product.id)}>
              Add to order
            </button>
          </span>
        </div>
      </div>
    </article>
  );
}
