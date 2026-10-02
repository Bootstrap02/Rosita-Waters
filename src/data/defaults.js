import { IMG } from './images.js';

export const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Rar Sachet Water 500ml',
    cat: 'sachet',
    size: '500ml',
    pack: 'Bag of 20 sachets',
    price: 400,
    img: IMG.sachets2,
    desc: 'Cold-ready, hygienically sealed sachets. Affordable, portable and made for everyday thirst. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 'p2',
    name: 'Rar Sachet Water, 10 bag bundle',
    cat: 'sachet',
    size: '500ml',
    pack: '10 bags (200 sachets)',
    price: 3800,
    img: IMG.sachet,
    desc: 'A bundle for shops, events and offices. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'p3',
    name: 'Rar Bottled Water 50cl',
    cat: 'bottled',
    size: '50cl',
    pack: 'Pack of 12 bottles',
    price: 1500,
    img: IMG.bottles50,
    desc: 'Crisp and clean in a handy 50cl bottle. Ideal for the car, the classroom and the meeting room. Ut enim ad minim veniam.',
  },
  {
    id: 'p4',
    name: 'Rar Bottled Water 75cl',
    cat: 'bottled',
    size: '75cl',
    pack: 'Pack of 12 bottles',
    price: 2100,
    img: IMG.bottles75,
    desc: 'A larger bottle for longer days. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  },
  {
    id: 'p5',
    name: 'Rar 20L Refill Bottle',
    cat: 'jug',
    size: '20 litres',
    pack: '1 bottle (refill)',
    price: 1800,
    img: IMG.jug,
    desc: 'Made for dispensers at home and in the office. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
  },
  {
    id: 'p6',
    name: 'Rar Water Dispenser',
    cat: 'dispenser',
    size: 'Fits 20L bottle',
    pack: '1 unit',
    price: 45000,
    img: IMG.dispenser,
    desc: 'A standing dispenser with two taps. Pair it with a Rar 20L refill. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.',
  },
];

export const DEFAULT_CONTENT = {
  heroTitle: 'Pure water for every Lagos home and office.',
  heroSub: '...so pure and refreshing',
  heroText:
    'Sachet water, bottled water and 20L refills, produced and packed by Rosarita Ventures Limited and delivered to your door.',
  aboutText:
    'Rar Water is produced and packed by Rosarita Ventures Limited in Anthony Village, Lagos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
};
