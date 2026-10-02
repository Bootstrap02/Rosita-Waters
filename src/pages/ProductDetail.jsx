import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATS, priceText, waLink } from '../data/config.js';
import { useStore } from '../context/StoreContext.jsx';
import PageHead from '../components/PageHead.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { IMAGE_PLACEHOLDER } from '../data/config.js';

export default function ProductDetail() {
  const { id } = useParams();
  const { byId, products, addToCart, siteConfig } = useStore();
  const [qty, setQty] = useState(1);
  const p = byId(id);

  useEffect(() => {
    setQty(1);
  }, [id]);

  if (!p) {
    return (
      <>
        <PageHead
          title="Product not found"
          sub="This product may have been removed."
          crumb="Products"
        />
        <section className="section">
          <div className="wrap">
            <Link className="btn btn-navy" to="/products">
              Back to products
            </Link>
          </div>
        </section>
      </>
    );
  }

  const related = products
    .filter((x) => x.id !== p.id && x.cat === p.cat)
    .concat(products.filter((x) => x.id !== p.id && x.cat !== p.cat))
    .slice(0, 3);

  const catLabel = CATS[p.cat] || p.cat;

  return (
    <>
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div className="crumbs" style={{ color: 'var(--grey)' }}>
            <Link to="/" style={{ color: 'var(--navy)' }}>
              Home
            </Link>{' '}
            /{' '}
            <Link to="/products" style={{ color: 'var(--navy)' }}>
              Products
            </Link>{' '}
            / {p.name}
          </div>

          <div className="detail">
            <div className="big">
              <img src={p.img || IMAGE_PLACEHOLDER} alt={p.name} />
            </div>
            <div>
              <span className="kind" style={{ color: 'var(--red)', fontWeight: 700 }}>
                {catLabel}
              </span>
              <h1 style={{ margin: '8px 0 14px' }}>{p.name}</h1>
              <div className="price" style={{ fontSize: '1.8rem' }}>
                {priceText(p, siteConfig)} <small>per {p.pack.toLowerCase()}</small>
              </div>
              <p style={{ marginTop: 16, color: 'var(--grey)' }}>{p.desc}</p>

              <dl className="specs">
                <div>
                  <dt>Size</dt>
                  <dd>{p.size}</dd>
                </div>
                <div>
                  <dt>Sold as</dt>
                  <dd>{p.pack}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{catLabel}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>Lagos, confirmed on order</dd>
                </div>
              </dl>

              <div className="buyrow">
                <div className="qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Less">
                    &minus;
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="More">
                    +
                  </button>
                </div>
                <button className="btn btn-red" onClick={() => addToCart(p.id, qty)}>
                  Add to order list
                </button>
                <a
                  className="btn btn-line"
                  href={waLink('Hello, I am interested in ' + p.name, siteConfig.whatsapp)}
                  target="_blank"
                  rel="noopener"
                >
                  Ask on WhatsApp
                </a>
              </div>

              <div className="notice" style={{ marginTop: 22 }}>
                <b>How to order:</b> add it to your order list, then send the list by WhatsApp, call,
                or email.{' '}
                <Link to="/how-to-order" style={{ color: 'var(--navy)', fontWeight: 700 }}>
                  Read the full guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <h2 style={{ marginBottom: 30 }}>You may also need</h2>
          <div className="grid">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
