import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Drawer from './components/Drawer.jsx';
import Toast from './components/Toast.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import HowToOrder from './pages/HowToOrder.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { useStore } from './context/StoreContext.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  const { siteConfig } = useStore();
  useEffect(() => {
    document.title = siteConfig.brand
      ? `${siteConfig.brand} | ${siteConfig.tagline || 'Welcome'}`
      : 'Website';
  }, [siteConfig.brand, siteConfig.tagline]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:filter" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
      <Drawer />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ScrollToTop />
        <Shell />
      </HashRouter>
    </StoreProvider>
  );
}
