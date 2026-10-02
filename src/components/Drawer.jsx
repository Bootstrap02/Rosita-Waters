import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fmt, phoneIntl, waLink } from '../data/config.js';
import { useStore } from '../context/StoreContext.jsx';
import { apiRequest } from '../api.js';

function Head({ title, onClose }) {
  return (
    <header>
      <h3>{title}</h3>
      <button className="x" onClick={onClose} aria-label="Close">
        &times;
      </button>
    </header>
  );
}

function Qty({ qty, onDelta }) {
  return (
    <div className="qty">
      <button onClick={() => onDelta(-1)} aria-label="Less">
        &minus;
      </button>
      <span>{qty}</span>
      <button onClick={() => onDelta(1)} aria-label="More">
        +
      </button>
    </div>
  );
}

function ListStep() {
  const { cart, byId, cartTotal, setQty, removeLine, closeDrawer, setDrawerStep, siteConfig } = useStore();

  return (
    <>
      <div className="body">
        {cart.map((line) => {
          const p = byId(line.id);
          if (!p) return null;
          return (
            <div className="line" key={line.id}>
              <img src={p.img} alt="" />
              <div>
                <b>{p.name}</b>
                <small>{p.pack}</small>
                <Qty qty={line.qty} onDelta={(d) => setQty(line.id, d)} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>{siteConfig.showPrices ? fmt(p.price * line.qty, siteConfig) : ''}</b>
                <br />
                <button className="rm" onClick={() => removeLine(line.id)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ft">
        {siteConfig.showPrices ? (
          <div className="total">
            <span>Estimated total</span>
            <span>{fmt(cartTotal(), siteConfig)}</span>
          </div>
        ) : null}
        <button className="btn btn-red" onClick={() => setDrawerStep('details')}>
          Continue
        </button>
        <button className="btn btn-line btn-sm" onClick={closeDrawer}>
          Keep shopping
        </button>
      </div>
    </>
  );
}

function DetailsStep() {
  const { customer, setCustomer, setDrawerStep, showToast } = useStore();
  const [form, setForm] = useState({
    name: customer.name || '',
    phone: customer.phone || '',
    mode: customer.mode || 'delivery',
    addr: customer.addr || '',
    note: customer.note || '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      showToast('Add your name and phone number');
      return;
    }
    if (form.mode === 'delivery' && !form.addr.trim()) {
      showToast('Add a delivery address');
      return;
    }
    setCustomer({
      name: form.name.trim(),
      phone: form.phone.trim(),
      mode: form.mode,
      addr: form.addr.trim(),
      note: form.note.trim(),
    });
    setDrawerStep('send');
  };

  return (
    <>
      <form className="body" onSubmit={submit} id="checkout-form">
        <label>
          Your name
          <input
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
          />
        </label>
        <label>
          Phone number
          <input value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
        </label>
        <label>
          Delivery or pickup
          <select value={form.mode} onChange={set('mode')}>
            <option value="delivery">Deliver to me</option>
            <option value="pickup">I will pick up</option>
          </select>
        </label>
        <label>
          Delivery address
          <textarea value={form.addr} onChange={set('addr')} style={{ minHeight: 80 }} />
        </label>
        <label>
          Note (optional)
          <input value={form.note} onChange={set('note')} />
        </label>
        <p className="muted" style={{ fontSize: '.9rem' }}>
          {siteConfig.brand} confirms price, stock and delivery time when they receive your order.
        </p>
      </form>
      <div className="ft">
        <button className="btn btn-red" type="submit" form="checkout-form">
          Choose how to send
        </button>
        <button className="btn btn-line btn-sm" onClick={() => setDrawerStep('list')}>
          Back
        </button>
      </div>
    </>
  );
}

function SendStep() {
  const { customer, cart, byId, cartTotal, orderMessage, clearCart, setDrawerStep, showToast, siteConfig, content } = useStore();
  const [lastOrder, setLastOrder] = useState(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const msg = encodeURIComponent(orderMessage);

  const submitOrder = async () => {
    setBusy(true);
    try {
      const data = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          customer: {
            name: customer.name,
            phone: customer.phone,
            mode: customer.mode,
            address: customer.addr,
            note: customer.note,
          },
          items: cart.map((line) => {
            const product = byId(line.id);
            return {
              productId: line.id,
              name: product.name,
              pack: product.pack,
              qty: line.qty,
              unitPrice: product.price,
            };
          }),
          total: cartTotal(),
        }),
      });
      setLastOrder(data);
      clearCart();
    } catch (error) {
      setBusy(false);
      showToast(`Could not send: ${error.message}`);
      return;
    }
    setBusy(false);
  };

  if (lastOrder) {
    return (
      <>
        <div className="body">
          <div className="ok">
            <b>Thank you, {lastOrder.customer.name}.</b>
            <br />
            Your order reference is <b>{lastOrder.ref}</b>. The {siteConfig.brand} team will contact you on{' '}
            {lastOrder.customer.phone} to confirm price and delivery.
          </div>
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--navy)' }}>
              Order details
            </summary>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontSize: '.85rem',
                background: 'var(--mist)',
                padding: 14,
                borderRadius: 12,
                marginTop: 10,
              }}
            >
              {JSON.stringify(lastOrder, null, 2)}
            </pre>
          </details>
        </div>
        <div className="ft">
          <Link
            className="btn btn-navy btn-sm"
            to="/products"
            onClick={() => navigate('/products')}
          >
            Back to products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="body">
        <div className="notice">
          Submit directly to {siteConfig.brand}, or use one of the other contact options.
        </div>
        <div className="channels">
          <button
            className="ch"
            style={{ borderColor: 'var(--red)' }}
            onClick={submitOrder}
            disabled={busy}
          >
            <span className="dot" style={{ background: 'var(--red)' }}>
              &#10003;
            </span>
            <span>
              {busy ? 'Sending…' : `Send order to ${siteConfig.brand}`}
              <small>Submits directly to the order system</small>
            </span>
          </button>
          <a
            className="ch wa"
            target="_blank"
            rel="noopener"
            href={waLink(orderMessage, content.whatsapp || siteConfig.whatsapp)}
            onClick={() => showToast('Order message ready to send')}
          >
            <span className="dot">&#9993;</span>
            <span>
              Send on WhatsApp
              <small>Fastest. Your list is filled in for you</small>
            </span>
          </a>
          <a className="ch tel" href={'tel:' + phoneIntl(content.phone || siteConfig.phones[0])}>
            <span className="dot">&#9742;</span>
            <span>
              Call to order
              <small>{content.phone || siteConfig.phones[0]}</small>
            </span>
          </a>
          <a
            className="ch mail"
            href={
              'mailto:' +
              (content.footerEmail || siteConfig.email) +
              '?subject=' +
              encodeURIComponent('Order request from ' + (customer.name || 'a customer')) +
              '&body=' +
              msg
            }
            onClick={() => showToast('Order message ready to send')}
          >
            <span className="dot">@</span>
            <span>
              Send by email
              <small>{content.footerEmail || siteConfig.email}</small>
            </span>
          </a>
        </div>
        <details style={{ marginTop: 8 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--navy)' }}>
            Preview your message
          </summary>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--body)',
              fontSize: '.92rem',
              background: 'var(--mist)',
              padding: 14,
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            {orderMessage}
          </pre>
        </details>
      </div>
      <div className="ft">
        <button className="btn btn-line btn-sm" onClick={() => setDrawerStep('details')}>
          Back
        </button>
      </div>
    </>
  );
}

export default function Drawer() {
  const { drawerOpen, drawerStep, closeDrawer, cart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  const titles = {
    list: 'Your order list',
    details: 'Your details',
    send: 'Send your order',
    done: 'Order sent',
  };

  const browse = () => {
    closeDrawer();
    navigate('/products');
  };

  let body = null;
  if (drawerStep === 'send') body = <SendStep />;
  else if (!cart.length) body = <EmptyStep onBrowse={browse} />;
  else if (drawerStep === 'details') body = <DetailsStep />;
  else body = <ListStep />;

  return (
    <>
      <div className={'scrim' + (drawerOpen ? ' on' : '')} onClick={closeDrawer} />
      <aside
        className={'drawer' + (drawerOpen ? ' on' : '')}
        aria-label="Order list"
        aria-hidden={!drawerOpen}
      >
        <Head title={titles[drawerStep]} onClose={closeDrawer} />
        {body}
      </aside>
    </>
  );
}

function EmptyStep({ onBrowse }) {
  return (
    <div className="body">
      <div className="empty">
        Your order list is empty.
        <br />
        <br />
        <button className="btn btn-navy btn-sm" onClick={onBrowse}>
          Browse products
        </button>
      </div>
    </div>
  );
}
