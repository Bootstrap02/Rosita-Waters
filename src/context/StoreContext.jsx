import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CONFIG, fmt } from "../data/config.js";
import { apiRequest } from "../api.js";

const StoreContext = createContext(null);

function read(key, fallback) {
  try {
    const v = localStorage.getItem("rar_" + key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem("rar_" + key, JSON.stringify(value));
  } catch {
    /* quota or private mode: the demo keeps working in memory */
  }
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState({});
  const [siteConfig, setSiteConfig] = useState({
    ...CONFIG,
    brand: "",
    company: "",
    address: "",
    phones: [],
    whatsapp: "",
    email: "",
    socials: {},
  });
  const [tenantKey, setTenantKey] = useState("");
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({});
  const [productsError, setProductsError] = useState("");
  const [contentError, setContentError] = useState("");
  const productsLoaded = useRef(false);
  const productsRef = useRef([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState("list");
  const [toast, setToast] = useState({ text: "", on: false });
  const toastTimer = useRef(null);

  useEffect(() => {
    if (tenantKey) write(`cart_${tenantKey}`, cart);
  }, [cart, tenantKey]);
  useEffect(() => {
    if (tenantKey) write(`customer_${tenantKey}`, customer);
  }, [customer, tenantKey]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = useCallback((text) => {
    setToast({ text, on: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, on: false })),
      2200,
    );
  }, []);

  // One request on page load: tenant branding, all content sections and products.
  useEffect(() => {
    let active = true;
    apiRequest("/site")
      .then(({ config, content: sections = {}, products: rawProducts = [] }) => {
        if (!active) return;

        // products
        const remoteProducts = rawProducts.map((product) => ({
          id: product._id,
          name: product.name,
          cat: product.category,
          size: product.size,
          pack: product.pack,
          price: product.price,
          desc: product.description || "",
          img: product.images?.[0]?.secure_url || "",
          images: product.images || [],
          inStock: product.inStock !== false,
        }));
        productsLoaded.current = true;
        productsRef.current = remoteProducts;
        setProducts(remoteProducts);
        setProductsError("");

        // content sections
        const header = sections.header || {};
        const footer = sections.footer || {};
        setContentError("");
        setContent({
          ...header,
          ...(sections.home || {}),
          ...(sections.about
            ? { aboutText: sections.about.intro || sections.about.body || "" }
            : {}),
          ...(sections.footer
            ? {
                footerAddress: footer.address,
                footerEmail: footer.email,
                // only include socials that actually have a link, so empty
                // footer fields don't hide the ones saved in the site settings
                ...(Object.values({
                  facebook: footer.facebook,
                  instagram: footer.instagram,
                  x: footer.x,
                  tiktok: footer.tiktok,
                }).some(Boolean)
                  ? {
                      socials: Object.fromEntries(
                        Object.entries({
                          facebook: footer.facebook,
                          instagram: footer.instagram,
                          x: footer.x,
                          tiktok: footer.tiktok,
                        }).filter(([, url]) => url)
                      ),
                    }
                  : {}),
              }
            : {}),
        });

        // tenant config (logo, brand, contact, images, ...). Content edited in the
        // admin's header/footer sections wins over the generic settings.
        const { tenantKey: remoteTenantKey, tenantName, ...tenantConfig } = config;
        setTenantKey(remoteTenantKey);
        const savedCart = read(`cart_${remoteTenantKey}`, []);
        setCart(savedCart.filter((line) => remoteProducts.some((p) => p.id === line.id)));
        setCustomer(read(`customer_${remoteTenantKey}`, {}));
        setSiteConfig((previous) => ({
          ...previous,
          ...tenantConfig,
          tenantKey: remoteTenantKey,
          brand: tenantConfig.brand || tenantName,
          company: footer.company || tenantConfig.company || tenantName,
          ...(header.phone ? { phones: [header.phone] } : {}),
          ...(header.whatsapp ? { whatsapp: header.whatsapp } : {}),
          ...(footer.address ? { address: footer.address } : {}),
          ...(footer.email ? { email: footer.email } : {}),
        }));
      })
      .catch((error) => {
        if (!active) return;
        productsLoaded.current = true;
        productsRef.current = [];
        setProducts([]);
        setCart([]);
        setContent({});
        setProductsError(error.message);
        setContentError(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  const byId = useCallback(
    (id) => products.find((p) => p.id === id),
    [products],
  );

  const cartCount = useCallback(
    () => cart.reduce((a, l) => a + l.qty, 0),
    [cart],
  );

  const cartTotal = useCallback(
    () =>
      cart.reduce((a, l) => {
        const p = products.find((x) => x.id === l.id);
        return a + (p ? p.price * l.qty : 0);
      }, 0),
    [cart, products],
  );

  const addToCart = useCallback(
    (id, qty = 1) => {
      setCart((prev) => {
        const line = prev.find((x) => x.id === id);
        return line
          ? prev.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x))
          : [...prev, { id, qty }];
      });
      showToast("Added to your order list");
    },
    [showToast],
  );

  const setQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x,
      ),
    );
  }, []);

  const removeLine = useCallback((id) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openDrawer = useCallback((step = "list") => {
    setDrawerStep(step);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const orderMessage = useMemo(() => {
    const lines = cart
      .map((l) => {
        const p = byId(l.id);
        if (!p) return "";
        return (
          `- ${l.qty} x ${p.name} (${p.pack})` +
          (siteConfig.showPrices ? ` = ${fmt(p.price * l.qty, siteConfig)}` : "")
        );
      })
      .join("\n");
    return (
      `Hello ${siteConfig.brand}, I would like to order:\n${lines}\n` +
      (siteConfig.showPrices ? `Estimated total: ${fmt(cartTotal(), siteConfig)}\n` : "") +
      `\nName: ${customer.name || ""}\nPhone: ${customer.phone || ""}\n${
        customer.mode === "pickup"
          ? "Pickup"
          : `Delivery address: ${customer.addr || ""}`
      }\nNote: ${customer.note || "None"}`
    );
  }, [cart, byId, cartTotal, customer, siteConfig]);

  const saveProduct = useCallback(async (draft) => {
    const formData = new FormData();
    const fields = {
      name: draft.name,
      category: draft.cat,
      size: draft.size,
      pack: draft.pack,
      price: String(draft.price),
      description: draft.desc || "",
    };
    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
    if (draft.imageFile) formData.append("images", draft.imageFile);
    const product = await apiRequest(
      draft.id ? `/products/${draft.id}` : "/products",
      { method: draft.id ? "PUT" : "POST", body: formData },
    );
    const saved = {
      id: product._id,
      name: product.name,
      cat: product.category,
      size: product.size,
      pack: product.pack,
      price: product.price,
      desc: product.description || "",
      img: product.images?.[0]?.secure_url || "",
      images: product.images || [],
    };
    setProducts((previous) =>
      draft.id
        ? previous.map((item) => (item.id === draft.id ? saved : item))
        : [...previous, saved],
    );
    return saved;
  }, []);

  const deleteProduct = useCallback(async (id) => {
    await apiRequest(`/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const resetDemo = useCallback(() => {
    ["cart", "customer"].forEach((k) => {
      try {
        localStorage.removeItem(`rar_${k}_${tenantKey}`);
      } catch {
        /* ignore */
      }
    });
    setCart([]);
    setCustomer({});
  }, [tenantKey]);

  const value = useMemo(
    () => ({
      products,
      content,
      setContent,
      siteConfig,
      productsError,
      contentError,
      cart,
      customer,
      setCustomer,
      byId,
      cartCount,
      cartTotal,
      orderMessage,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      saveProduct,
      deleteProduct,
      resetDemo,
      drawerOpen,
      drawerStep,
      setDrawerStep,
      openDrawer,
      closeDrawer,
      toast,
      showToast,
    }),
    [
      products,
      content,
      siteConfig,
      productsError,
      contentError,
      cart,
      customer,
      byId,
      cartCount,
      cartTotal,
      orderMessage,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      saveProduct,
      deleteProduct,
      resetDemo,
      drawerOpen,
      drawerStep,
      openDrawer,
      closeDrawer,
      toast,
      showToast,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

