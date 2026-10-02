import { Link, useParams } from 'react-router-dom';
import { CATS } from '../data/config.js';
import { useStore } from '../context/StoreContext.jsx';
import PageHead from '../components/PageHead.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Products() {
  const { filter } = useParams();
  const { products, productsError } = useStore();
  const f = filter || 'all';
  const list = products.filter((p) => !filter || f === 'all' || p.cat === filter);

  return (
    <>
      <PageHead
        title="Our products"
        sub="Sachet water, bottled water, 20L refills and dispensers."
        crumb="Products"
      />

      <section className="section">
        <div className="wrap">
          <div className="filters" role="tablist">
            <Link className={'chip' + (f === 'all' ? ' on' : '')} to="/products">
              All
            </Link>
            {Object.entries(CATS).map(([key, label]) => (
              <Link
                className={'chip' + (f === key ? ' on' : '')}
                key={key}
                to={'/products/' + key}
                style={{ textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {productsError ? (
            <div className="notice" role="alert">Products are currently unavailable: {productsError}</div>
          ) : list.length ? (
            <div className="grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">No products in this group yet.</div>
          )}

        </div>
      </section>

      <CtaBand />
    </>
  );
}
