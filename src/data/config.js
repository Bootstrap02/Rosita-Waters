export const CONFIG = {
  brand: 'Rar Water',
  company: 'Rosarita Ventures Limited',
  address: '3, Okey Dimoli Avenue, Off Primate Adejobi Crescent, Anthony Village, Lagos, Nigeria',
  phones: ['08099993604', '08169547498', '08092184396'],
  whatsapp: '2348099993604',
  email: 'info@example.com',
  socials: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    x: 'https://x.com/',
    tiktok: 'https://tiktok.com/',
    youtube: 'https://youtube.com/',
  },
  showPrices: true,
  currency: '\u20A6',
};

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'https://client-backend-1-tl1r.onrender.com'
).replace(/\/+$/, '');

export const IMAGE_PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#E8F1FB'/></svg>"
);

export const CATS = {
  sachet: 'Sachet water',
  bottled: 'Bottled water',
  jug: '20L refill bottles',
  dispenser: 'Water dispensers',
};

export const fmt = (n, config = CONFIG) => config.currency + Number(n).toLocaleString('en-NG');
export const priceText = (p, config = CONFIG) => (config.showPrices ? fmt(p.price, config) : 'Price on request');
export const phoneIntl = (n) => '+234' + String(n).replace(/^0/, '');
export const waLink = (text, whatsapp = CONFIG.whatsapp) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
