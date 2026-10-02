import { useState } from 'react';
import { phoneIntl, waLink } from '../data/config.js';
import { useStore } from '../context/StoreContext.jsx';
import PageHead from '../components/PageHead.jsx';
import { SocialLinks } from '../components/Icons.jsx';

const TOPICS = ['General question', 'Bulk or event order', 'Become a distributor', 'Delivery question'];

export default function Contact() {
  const { showToast, content, siteConfig, contentError } = useStore();
  const phones = content.phone ? [content.phone] : siteConfig.phones;
  const email = content.footerEmail || siteConfig.email;
  const address = content.footerAddress || siteConfig.address;
  const whatsapp = content.whatsapp || siteConfig.whatsapp;
  const socials = content.socials || siteConfig.socials;
  const [form, setForm] = useState({ n: '', p: '', t: TOPICS[0], m: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    window.location.href =
      'mailto:' +
      email +
      '?subject=' +
      encodeURIComponent(form.t + ' from ' + form.n) +
      '&body=' +
      encodeURIComponent(form.m + '\n\nPhone: ' + form.p);
    showToast('Opening your email app');
  };

  return (
    <>
      <PageHead
        title="Contact us"
        sub="Order by phone or WhatsApp, or send a message."
        crumb="Contact"
      />
      {contentError ? (
        <div className="wrap notice" role="alert">Some website contact details could not be loaded: {contentError}</div>
      ) : null}

      <section className="section">
        <div className="wrap contact">
          <div className="info">
            <div className="box">
              <h4>Call or WhatsApp</h4>
              {phones.map((n) => (
                <a key={n} href={'tel:' + phoneIntl(n)}>
                  {n}
                </a>
              ))}
              <a
                href={waLink(`Hello ${siteConfig.brand}, I have a question.`, whatsapp)}
                target="_blank"
                rel="noopener"
                style={{ color: '#1a8a49', marginTop: 6 }}
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="box">
              <h4>Visit or send mail</h4>
              <p>
                {siteConfig.company}
                <br />
                {address}
              </p>
            </div>
            <div className="box">
              <h4>Email</h4>
              <a href={'mailto:' + email}>{email}</a>
            </div>
            <div className="box">
              <h4>Follow {siteConfig.brand}</h4>
              <SocialLinks socials={socials} className="dark" />
            </div>
            <div className="mapbox">
              <iframe
                title={`Map to ${address}`}
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              />
            </div>
            <a
              className="btn btn-line btn-sm"
              style={{ justifySelf: 'start' }}
              target="_blank"
              rel="noopener"
              href="https://www.google.com/maps/search/?api=1&query=Anthony+Village+Lagos+Nigeria"
            >
              Open in Google Maps
            </a>
          </div>

          <form className="f" onSubmit={submit}>
            <h3>Send a message</h3>
            <div className="two">
              <label>
                Your name
                <input name="n" value={form.n} onChange={set('n')} required autoComplete="name" />
              </label>
              <label>
                Phone number
                <input
                  name="p"
                  value={form.p}
                  onChange={set('p')}
                  required
                  inputMode="tel"
                  autoComplete="tel"
                />
              </label>
            </div>
            <label>
              What is this about?
              <select name="t" value={form.t} onChange={set('t')}>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea name="m" value={form.m} onChange={set('m')} required />
            </label>
            <button className="btn btn-red" type="submit" style={{ justifySelf: 'start' }}>
              Send message
            </button>
            <div className="notice">
              This form opens your email app with the message addressed to {siteConfig.brand}.
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
