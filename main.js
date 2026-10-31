// SentirseBien E-commerce - Main JavaScript
// Manages products catalog, cart state, dynamic rendering, and WhatsApp Checkout

// Import Vercel Analytics
import { inject } from '@vercel/analytics';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Configuration
const WHATSAPP_NUMBER = "573224559027"; // Client's WhatsApp number (+57 3224559027)
let catalogProducts = [];
const FALLBACK_IMG = 'marca/logo-sentirsebien.png';
// Foto del producto: recorte limpio en WebP (public/productos/<id>.webp)
const productImage = (p) => (p && p.imagen) ? p.imagen : FALLBACK_IMG;
const cartItemImage = (item) => (item.image && item.image.includes('/')) ? item.image : FALLBACK_IMG;
// Bloque de imagen con efecto "producto flotante"
const minPrice = (p) => Math.min(...p.presentaciones.map(x => x.precio));
const floatingImage = (p) => {
  const tags = (p.etiquetas || []).slice(0, 3).map((t, i) => `<span class="float-tag t${i + 1}">${t}</span>`).join('');
  const sizes = p.presentaciones.map(x => x.peso || x.volumen || x.cantidad || x.tipo).join(' · ');
  return `
        <div class="product-card-image-wrapper product-float" data-id="${p.id}">
          <span class="product-float-glow" aria-hidden="true"></span>
          ${p.modelo3d ? '<span class="float-3d jar3d" aria-hidden="true"></span>' : ''}
          <img src="${productImage(p)}" alt="${p.nombre}" class="product-card-image" loading="lazy" decoding="async" width="360" height="360" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
          <span class="product-float-shadow" aria-hidden="true"></span>
          <span class="product-float-tags" aria-hidden="true">${tags}</span>
          <span class="product-float-glass" aria-hidden="true"><strong>${p.nombre}</strong><span>${sizes} · ${p.presentaciones.length > 1 ? 'desde ' : ''}${formatCOP(minPrice(p))}</span></span>
        </div>`;
};
// Inclinación 3D que sigue el mouse y toque en celular
function initFloatingProducts() {
  if (window.__floatInit) return; window.__floatInit = true;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || reduce) return;
    const el = e.target.closest && e.target.closest('.product-card');
    if (!el) return;
    const f = el.querySelector('.product-float'); if (!f) return;
    if (f.querySelector('.float-3d')) { card3DEnter(el); card3DMove(el, e); }
    const r = f.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    f.style.setProperty('--ry', `${(x - 0.5) * 34}deg`);
    f.style.setProperty('--rx', `${(0.5 - y) * 18}deg`);
    f.style.setProperty('--mx', `${x * 100}%`);
    f.style.setProperty('--my', `${y * 100}%`);
  }, { passive: true });
  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest && e.target.closest('.product-card');
    if (!el || el.contains(e.relatedTarget)) return;
    const f = el.querySelector('.product-float');
    if (f) { f.style.setProperty('--ry', '0deg'); f.style.setProperty('--rx', '0deg'); }
    if (card3D && card3D.card === el) card3DLeave();
  });
  // En celular: el primer toque hace saltar el producto; el segundo abre la ficha
  document.addEventListener('click', (e) => {
    const f = e.target.closest && e.target.closest('.product-float');
    if (!f) return;
    const touch = window.matchMedia('(hover: none)').matches;
    if (touch && !f.classList.contains('is-active')) {
      document.querySelectorAll('.product-float.is-active').forEach(x => x.classList.remove('is-active'));
      f.classList.add('is-active');
      f.style.setProperty('--ry', '-12deg'); f.style.setProperty('--rx', '4deg');
      const card = f.closest('.product-card');
      if (card && f.querySelector('.float-3d')) { card3DEnter(card); card3D && (card3D.last = [Math.PI * 0.35, 0]); setTimeout(() => card3D && card3D.viewer && card3D.viewer.point(Math.PI * 0.35, 0), 50); }
      return;
    }
    window.quickViewProduct(f.dataset.id);
  });
}
// Imagen de cada presentación (tarro, bolsa...). Si aún no existe, usa la principal más pequeña.
const presentationImage = (p, i) => (p.presentaciones[i] && p.presentaciones[i].imagen) || productImage(p);
function morphImage(img, product, idx) {
  if (!img) return;
  const src = presentationImage(product, idx);
  const bigger = (product.presentaciones[idx].precio || 0) >= Math.max(...product.presentaciones.map(x => x.precio));
  const apply = () => {
    img.classList.remove('morph-out');
    img.classList.add('morph-in');
    img.style.setProperty('--size', String(product.presentaciones[idx].escala || 1));
    img.onerror = function () { this.onerror = null; this.src = productImage(product); this.style.setProperty('--size', bigger ? '1' : String(0.72 + 0.14 * (product.presentaciones.length - 1 - idx))); };
    img.src = src;
    setTimeout(() => img.classList.remove('morph-in'), 650);
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { apply(); return; }
  img.classList.add('morph-out');
  setTimeout(apply, 260);
}
// Tocar una presentación en la tarjeta cambia el empaque y el precio
document.addEventListener('click', (e) => {
  const t = e.target.closest && e.target.closest('.variant-tag[data-idx]');
  if (!t) return;
  e.stopPropagation();
  const product = catalogProducts.find(p => p.id === t.dataset.id); if (!product) return;
  const idx = +t.dataset.idx; const card = t.closest('.product-card');
  card.querySelectorAll('.variant-tag').forEach(b => { const on = b === t; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  morphImage(card.querySelector('.product-card-image'), product, idx);
  const price = card.querySelector('.product-card-price');
  if (price) price.textContent = formatCOP(product.presentaciones[idx].precio);
  card.dataset.idx = idx;
});
const hasInvimaNote = (p) => (p.beneficios || []).some(b => b.includes('*'));
let cart = JSON.parse(localStorage.getItem('sentirsebien_cart')) || [];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Vercel Web Analytics
  inject();
  
  initCommonUI();
  fetchCatalog();
});

// Common UI Initializations (Header, Cart Drawer)
function initCommonUI() {
  initCebollinGreeting();
  // Hamburger Menu
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const open = navMenu.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      menuToggle.innerHTML = open
        ? '<i class="fas fa-times" aria-hidden="true"></i>'
        : '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
  }

  // Cart Drawer Opening/Closing
  const cartBtn = document.getElementById('cart-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');

  if (cartBtn && cartOverlay) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  if (cartOverlay) {
    // Close on X button
    if (cartClose) {
      cartClose.addEventListener('click', () => {
        cartOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    }
    // Close on clicking overlay background
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
                cartOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Update Cart Count Badge on load
  updateCartBadge();
  renderCartItems();
}

// Fetch Catalog Data
async function fetchCatalog() {
  try {
    const response = await fetch('Catalogo.json');
    if (!response.ok) {
      throw new Error('No se pudo cargar el catálogo de productos');
    }
    catalogProducts = await response.json();
    initFloatingProducts();
    
    // Check which page we are on and render accordingly
    const isHomePage = document.getElementById('featured-products-grid') !== null;
    const isShopPage = document.getElementById('shop-products-grid') !== null;
    
    if (isHomePage) {
      renderFeaturedProducts();
    }
    if (isShopPage) {
      initShopFilters();
      renderShopProducts();
    }

    // Check URL parameters or hash to open a specific product
    checkURLForProduct();
  } catch (error) {
    console.error('Error fetching catalog:', error);
  }
}

// Format Currency to Colombian Peso (COP)
function formatCOP(number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(number);
}

// Update Cart Badge Count
function updateCartBadge() {
  const badgeCount = cart.reduce((total, item) => total + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = badgeCount;
    badge.style.display = badgeCount > 0 ? 'flex' : 'none';
  });
}

// Render Cart Drawer Content
function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  const checkoutBtn = document.getElementById('checkout-whatsapp-btn');
  
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-shopping-basket"></i>
        <p>Tu carrito está vacío</p>
        <a href="tienda.html" class="btn btn-outline" style="margin-top: 1.5rem;">Ir a la tienda</a>
      </div>
    `;
    if (subtotalVal) subtotalVal.textContent = formatCOP(0);
    const totalVal0 = document.getElementById('cart-total-val');
    if (totalVal0) totalVal0.textContent = formatCOP(0);
    if (checkoutBtn) checkoutBtn.setAttribute('disabled', 'true');
    return;
  }

  if (checkoutBtn) checkoutBtn.removeAttribute('disabled');

  let html = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    // Default placeholder image if target is missing
    const imageSrc = cartItemImage(item);

    html += `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-image">
          <img src="${imageSrc}" alt="${item.name}" onerror="this.onerror=null;this.src='marca/logo-sentirsebien.png'">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="cart-item-presentation">${item.presentationType} - ${item.size}</p>
          <div class="cart-item-qty">
            <span class="qty-btn dec" onclick="changeCartQty(${index}, -1)">-</span>
            <span class="qty-val">${item.quantity}</span>
            <span class="qty-btn inc" onclick="changeCartQty(${index}, 1)">+</span>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${formatCOP(itemTotal)}</span>
          <i class="fas fa-trash-alt cart-item-remove" onclick="removeCartItem(${index})"></i>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (subtotalVal) subtotalVal.textContent = formatCOP(subtotal);
  const totalVal = document.getElementById('cart-total-val');
  if (totalVal) totalVal.textContent = formatCOP(subtotal);
}

// Global functions for cart mutations (attached to window for inline onclick triggers)
window.changeCartQty = (index, delta) => {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  renderCartItems();
};

window.removeCartItem = (index) => {
  cart.splice(index, 1);
  saveCart();
  updateCartBadge();
  renderCartItems();
};

function saveCart() {
  localStorage.setItem('sentirsebien_cart', JSON.stringify(cart));
}

// Add Item to Cart
function addToCart(product, presentationIndex, qty = 1) {
  const presentation = product.presentaciones[presentationIndex];
  const size = presentation.peso || presentation.volumen || presentation.cantidad || "Estándar";
  
  // Create unique key based on product ID and presentation details
  const cartItemId = `${product.id}-${presentation.tipo}-${size}`;
  
  const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += qty;
  } else {
    cart.push({
      cartItemId: cartItemId,
      id: product.id,
      name: product.nombre,
      price: presentation.precio,
      presentationType: presentation.tipo + (presentation.variedad ? ` (${presentation.variedad})` : ''),
      size: size,
      image: presentation.imagen || product.imagen,
      quantity: qty
    });
  }
  
  saveCart();
  updateCartBadge();
  renderCartItems();
  
  // Open Cart Drawer to show user the result
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartOverlay) {
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// Add product to cart by ID (first/default presentation)
window.addToCartByDefault = (productId, idx = 0) => {
  const product = catalogProducts.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, Math.min(idx || 0, product.presentaciones.length - 1), 1);
};

// Check URL for product parameter or hash to open modal
function checkURLForProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || urlParams.get('producto') || window.location.hash.substring(1);
  
  if (productId) {
    const product = catalogProducts.find(p => p.id === productId);
    if (product) {
      // Small timeout to ensure everything is rendered
      setTimeout(() => {
        window.quickViewProduct(productId);
      }, 300);
    }
  }
}

// State for Cart Drawer (items or checkout form)
window.cartViewState = "items";

// Back to Cart Items view
window.backToCartItems = () => {
  window.cartViewState = "items";
  
  // Restore Header Title and Back Button
  const header = document.querySelector('.cart-header');
  if (header) {
    header.innerHTML = `
      <h2>Mi Carrito</h2>
      <div class="cart-close-btn" id="cart-close" onclick="document.getElementById('cart-overlay').classList.remove('open'); document.body.style.overflow = 'auto';">&times;</div>
    `;
  }
  
  // Re-render items
  renderCartItems();
  
  // Update footer button
  const checkoutBtn = document.getElementById('checkout-whatsapp-btn');
  if (checkoutBtn) {
    checkoutBtn.innerHTML = `<i class="fab fa-whatsapp" style="margin-right: 0.5rem; font-size: 1.2rem;"></i> Finalizar Pedido por WhatsApp`;
  }
};

// WhatsApp Checkout / Form toggle
window.checkoutWhatsApp = () => {
  if (cart.length === 0) return;

  if (window.cartViewState === "items") {
    // Transition to checkout form
    window.cartViewState = "checkout";
    
    // Modify Header to show Back Button
    const header = document.querySelector('.cart-header');
    if (header) {
      header.innerHTML = `
        <div class="cart-back-btn" onclick="window.backToCartItems()"><i class="fas fa-arrow-left"></i></div>
        <h2>Datos de Envío</h2>
        <div class="cart-close-btn" id="cart-close" onclick="document.getElementById('cart-overlay').classList.remove('open'); document.body.style.overflow = 'auto';">&times;</div>
      `;
    }
    
    // Render Checkout Form inside items container
    const container = document.getElementById('cart-items-container');
    if (container) {
      container.innerHTML = `
        <div class="checkout-form">
          <div class="form-group">
            <label for="checkout-name">Nombre Completo *</label>
            <input type="text" id="checkout-name" placeholder="Ej: Juan Pérez" class="form-control" required />
          </div>
          
          <div class="form-group">
            <label for="checkout-phone">Número de Contacto (Colombia) *</label>
            <input type="tel" id="checkout-phone" placeholder="Ej: 3224559027" class="form-control" required />
            <span class="form-error" id="phone-error">Debe ser un número celular válido de 10 dígitos que empiece con 3.</span>
          </div>
          
          <div class="form-group">
            <label for="checkout-payment">Método de Pago *</label>
            <select id="checkout-payment" class="form-control">
              <option value="Nequi">Nequi</option>
              <option value="Daviplata (Llave)">Daviplata (Llave)</option>
              <option value="Transferencia Bancaria (Bancolombia)">Transferencia Bancaria (Bancolombia)</option>
              <option value="Pago contra entrega en efectivo">Pago contra entrega en efectivo</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="checkout-address">Dirección de Entrega</label>
            <input type="text" id="checkout-address" placeholder="Ej: Calle 100 # 15-22, Apto 301 (Opcional)" class="form-control" />
          </div>

          <div class="form-group">
            <button type="button" id="map-toggle-btn" class="btn btn-outline btn-block" style="margin-top: 0.5rem;" onclick="window.toggleCheckoutMap()">
              <i class="fas fa-map-marker-alt"></i> Señalar ubicación en mapa (Bogotá)
            </button>
            <div id="checkout-map" style="display: none; height: 220px; margin-top: 1rem; border-radius: 8px; border: 1px solid var(--border-color); z-index: 1;"></div>
            <input type="hidden" id="checkout-latlong" />
          </div>
        </div>
      `;
    }
    
    // Change Footer Button Text
    const checkoutBtn = document.getElementById('checkout-whatsapp-btn');
    if (checkoutBtn) {
      checkoutBtn.innerHTML = `<i class="fab fa-whatsapp" style="margin-right: 0.5rem; font-size: 1.2rem;"></i> Confirmar y Enviar Pedido`;
    }
  } else {
    // Perform validation and send message
    const nameInput = document.getElementById('checkout-name');
    const phoneInput = document.getElementById('checkout-phone');
    const paymentSelect = document.getElementById('checkout-payment');
    const addressInput = document.getElementById('checkout-address');
    const latlongInput = document.getElementById('checkout-latlong');
    const phoneError = document.getElementById('phone-error');
    
    if (!nameInput || !phoneInput || !paymentSelect) return;
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const payment = paymentSelect.value;
    const address = addressInput ? addressInput.value.trim() : '';
    const latlong = latlongInput ? latlongInput.value : '';
    
    // Colombian Mobile validation: starts with 3, total 10 digits
    const phoneRegex = /^3\d{9}$/;
    
    if (!name) {
      alert("Por favor ingresa tu nombre completo.");
      nameInput.focus();
      return;
    }
    
    if (!phoneRegex.test(phone)) {
      if (phoneError) phoneError.style.display = 'block';
      phoneInput.focus();
      return;
    } else {
      if (phoneError) phoneError.style.display = 'none';
    }
    
    // Build WhatsApp message
    let message = `¡Hola SentirseBien! 🌟 Me gustaría realizar un pedido desde el sitio web:\n\n`;
    message += `🛒 *RESUMEN DEL PEDIDO:*\n`;
    
    let subtotal = 0;
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      message += `• *${item.name}*\n  _${item.presentationType} [${item.size}]_ \n  ${item.quantity} x ${formatCOP(item.price)} = *${formatCOP(itemTotal)}*\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL A PAGAR: ${formatCOP(subtotal)} COP*\n\n`;
    message += `📍 *DATOS DEL CLIENTE:*\n`;
    message += `• *Nombre:* ${name}\n`;
    message += `• *Teléfono:* ${phone}\n`;
    message += `• *Método de Pago:* ${payment}\n`;
    
    if (address) {
      message += `• *Dirección:* ${address}\n`;
    }
    
    if (latlong) {
      message += `• *Ubicación del Mapa:* https://www.google.com/maps?q=${latlong}\n`;
    }
    
    message += `\n📌 _Por favor, confírmenme el despacho de mi pedido._`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    
    // Clear cart upon redirection
    cart = [];
    saveCart();
    updateCartBadge();
    window.backToCartItems();
    
    // Close Drawer
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
    
    window.open(whatsappUrl, '_blank');
  }
};

// Map script dynamic loader
function loadLeaflet() {
  return new Promise((resolve, reject) => {
    if (window.L) {
      resolve();
      return;
    }
    
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Leaflet'));
    document.head.appendChild(script);
  });
}

let leafletMap = null;
let leafletMarker = null;

window.toggleCheckoutMap = async () => {
  const mapContainer = document.getElementById('checkout-map');
  const toggleBtn = document.getElementById('map-toggle-btn');
  if (!mapContainer) return;

  if (mapContainer.style.display === 'none') {
    mapContainer.style.display = 'block';
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Ocultar mapa';
    
    try {
      await loadLeaflet();
      initLeafletMap();
    } catch (err) {
      console.error(err);
      alert('No se pudo cargar el mapa de OpenStreetMap. Por favor escribe tu dirección manualmente.');
    }
  } else {
    mapContainer.style.display = 'none';
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Señalar ubicación en mapa (Bogotá)';
  }
};

function initLeafletMap() {
  if (leafletMap) {
    // If already initialized, invalidate size so it fits inside the drawer div properly
    setTimeout(() => {
      leafletMap.invalidateSize();
    }, 100);
    return;
  }

  // Centered in Bogotá
  const bogotaCenter = [4.65, -74.09];
  leafletMap = L.map('checkout-map').setView(bogotaCenter, 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(leafletMap);

  // Click map handler
  leafletMap.on('click', (e) => {
    const { lat, lng } = e.latlng;
    setMapMarker(lat, lng);
  });
}

function setMapMarker(lat, lng) {
  if (leafletMarker) {
    leafletMarker.setLatLng([lat, lng]);
  } else {
    leafletMarker = L.marker([lat, lng], { draggable: true }).addTo(leafletMap);
    leafletMarker.on('dragend', (e) => {
      const position = leafletMarker.getLatLng();
      updateAddressInput(position.lat, position.lng);
    });
  }
  updateAddressInput(lat, lng);
}

function updateAddressInput(lat, lng) {
  const latlongInput = document.getElementById('checkout-latlong');
  const addressInput = document.getElementById('checkout-address');
  
  if (latlongInput) latlongInput.value = `${lat.toFixed(6)},${lng.toFixed(6)}`;
  
  if (addressInput) {
    addressInput.value = `Ubicación en Bogotá (Coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)})`;
  }
}

// Carousel controller
let carouselIndex = 0;
function initCarousel() {
  const track = document.getElementById('featured-products-grid');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!track || !prevBtn || !nextBtn) return;

  const getSlideWidth = () => {
    const firstSlide = track.querySelector('.product-card');
    if (!firstSlide) return 300;
    return firstSlide.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
  };

  const updateCarousel = () => {
    const slideWidth = getSlideWidth();
    const slidesVisible = Math.floor(track.parentElement.getBoundingClientRect().width / slideWidth);
    const maxIndex = Math.max(0, track.children.length - slidesVisible);
    
    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;

    track.style.transform = `translateX(-${carouselIndex * slideWidth}px)`;
    
    prevBtn.disabled = carouselIndex === 0;
    nextBtn.disabled = carouselIndex >= maxIndex;
  };

  prevBtn.addEventListener('click', () => {
    carouselIndex = Math.max(0, carouselIndex - 1);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    carouselIndex++;
    updateCarousel();
  });

  // Handle Resize
  window.addEventListener('resize', updateCarousel);
  
  // Delayed initial update to ensure DOM clientWidth is rendered
  setTimeout(updateCarousel, 300);
}


// ---- Visor 3D (solo productos con etiqueta plana: campo modelo3d) ----
const supportsWebGL = (() => { try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; } })();
function mount3D(container, product, opts = {}) {
  if (!supportsWebGL || !product || !product.modelo3d) return Promise.resolve(null);
  return import('./colmare3d.js').then(m => m.mountJar3D(container, { label: product.modelo3d, ...opts })).catch(() => null);
}
// Tarjetas: al pasar el mouse el tarro sale de la tarjeta en 3D y gira según dónde esté el puntero
let card3D = null; // { card, box, viewer, timer }
function card3DEnter(card) {
  const box = card.querySelector('.float-3d'); if (!box || !supportsWebGL) return;
  if (card3D && card3D.card === card) { clearTimeout(card3D.timer); return; }
  card3DLeave(true);
  const product = catalogProducts.find(p => p.id === card.querySelector('.product-float').dataset.id);
  const entry = { card, box, viewer: null, timer: null };
  card3D = entry;
  mount3D(box, product, { fit: 0.92, interactive: false, autoSpin: false }).then(v => {
    if (card3D !== entry) { v && v.dispose(); return; }
    entry.viewer = v; if (v && entry.last) v.point(...entry.last);
  });
}
function card3DMove(card, e) {
  if (!card3D || card3D.card !== card) return;
  const r = card.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
  card3D.last = [(x - 0.5) * Math.PI * 1.9, (y - 0.5) * 0.25];
  card3D.viewer && card3D.viewer.point(...card3D.last);
}
function card3DLeave(now) {
  if (!card3D) return;
  const entry = card3D;
  const kill = () => { entry.viewer && entry.viewer.dispose(); if (card3D === entry) card3D = null; };
  if (now) { kill(); return; }
  entry.viewer && entry.viewer.release();
  clearTimeout(entry.timer); entry.timer = setTimeout(kill, 700);
}
let modal3D = null, modal3DToken = 0;
function setModal3D(product) {
  const wrap = document.querySelector('.modal-image-wrapper');
  const token = ++modal3DToken;
  if (modal3D) { modal3D.dispose(); modal3D = null; }
  if (!wrap) return;
  let box = wrap.querySelector('.modal-3d');
  if (!product || !product.modelo3d || !supportsWebGL) { wrap.classList.remove('has-3d'); if (box) box.remove(); return; }
  if (!box) { box = document.createElement('div'); box.className = 'modal-3d jar3d'; box.innerHTML = '<span class="jar3d-hint"><i class="fas fa-hand-pointer" aria-hidden="true"></i> Arrástralo para girarlo</span>'; wrap.appendChild(box); }
  wrap.classList.add('has-3d');
  mount3D(box, product, { fit: 0.8 }).then(v => { if (token !== modal3DToken) { v && v.dispose(); return; } modal3D = v; if (!v) wrap.classList.remove('has-3d'); });
}
function initFeatured3D() {
  const box = document.getElementById('colmare-3d');
  if (!box) return;
  const product = catalogProducts.find(p => p.id === box.dataset.id);
  if (!product) return;
  const price = document.getElementById('colmare-3d-price');
  if (price) price.textContent = formatCOP(product.presentaciones[0].precio);
  if (!supportsWebGL) { box.classList.add('no-3d'); return; }
  const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { io.disconnect(); mount3D(box, product, { fit: 0.8 }); } }, { rootMargin: '200px' });
  io.observe(box);
}


// Cebollín saluda con alegría cada 15 segundos (solo cuando se ve en pantalla)
function initCebollinGreeting() {
  const hero = document.querySelector('.cebollin-hero');
  const actor = hero && hero.querySelector('.cebollin-actor');
  const bubble = hero && hero.querySelector('.cebollin-bubble');
  if (!actor || !bubble) return;
  const saludos = [
    '¡Hola, hola! 👋<br>¡Qué alegría verte!',
    '¡Hola! Soy Cebollín.<br>Te acompaño en la cocina.',
    '¿Preparamos algo rico hoy?',
    '¡Hola de nuevo! 🌱<br>Aquí sigo, en la cocina.',
    '¿Ya viste las recetas de la semana?'
  ];
  let i = 0, visible = false, timer = null;
  const saludar = () => {
    if (!visible || document.hidden) return;
    actor.classList.remove('is-greeting'); hero.classList.remove('is-greeting'); bubble.classList.remove('is-new');
    void actor.offsetWidth; // reinicia la animación
    i = (i + 1) % saludos.length;
    bubble.innerHTML = saludos[i];
    actor.classList.add('is-greeting'); hero.classList.add('is-greeting'); bubble.classList.add('is-new');
    setTimeout(() => { actor.classList.remove('is-greeting'); hero.classList.remove('is-greeting'); }, 2300);
  };
  // Parpadeo natural: cada 2,5 a 5,5 s, a veces doble
  const parpadear = () => {
    if (visible && !document.hidden) {
      actor.classList.remove('is-blinking'); void actor.offsetWidth; actor.classList.add('is-blinking');
      if (Math.random() < 0.25) setTimeout(() => { actor.classList.remove('is-blinking'); void actor.offsetWidth; actor.classList.add('is-blinking'); }, 320);
    }
    setTimeout(parpadear, 2500 + Math.random() * 3000);
  };
  setTimeout(parpadear, 1800);
  new IntersectionObserver(([en]) => {
    const was = visible; visible = en.isIntersecting;
    if (visible && !was) { setTimeout(saludar, 600); clearInterval(timer); timer = setInterval(saludar, 15000); }
    if (!visible) clearInterval(timer);
  }, { threshold: 0.35 }).observe(hero);
}

// Render Home Page Featured Products (all catalog products for carousel)
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products-grid');
  if (!container || catalogProducts.length === 0) return;

  let html = '';
  catalogProducts.forEach(product => {
    
    // Generate variants badges HTML
    const variantsHtml = product.presentaciones.map((p, i) => {
      const sizeLabel = p.peso || p.volumen || p.cantidad || '';
      const varLabel = p.variedad ? ` (${p.variedad})` : '';
      return `<button type="button" class="variant-tag${i === 0 ? ' active' : ''}" data-id="${product.id}" data-idx="${i}" aria-pressed="${i === 0}">${p.tipo} ${sizeLabel}${varLabel}</button>`;
    }).join('');

    html += `
      <div class="product-card">
        ${floatingImage(product)}
        <div class="product-card-content">
          <span class="product-card-category">${product.categoria}</span>
          <h3 class="product-card-title">${product.nombre}</h3>
          <p class="product-card-benefits">${product.descripcion}</p>
          
          <div class="product-card-variants">
            ${variantsHtml}
          </div>
          <p class="product-card-price">${product.presentaciones.length > 1 ? '<span>Desde</span> ' : ''}${formatCOP(Math.min(...product.presentaciones.map(x => x.precio)))}</p>
          
          <div class="product-card-footer">
            <button onclick="window.addToCartByDefault('${product.id}', +(this.closest('.product-card').dataset.idx || 0))" class="btn btn-primary btn-block">
              <i class="fas fa-shopping-bag" style="margin-right: 0.5rem;"></i> Añadir al Carrito
            </button>
            <button onclick="window.quickViewProduct('${product.id}')" class="btn btn-outline btn-block">Ver Detalles</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  initCarousel();
  initFeatured3D();
}

// Comprar por necesidad (tienda.html?necesidad=...)
const NECESIDADES = {
  colagenos: { nombre: 'Colágenos', ids: ['colmare', 'colageno-marino-crema-coco'] },
  deporte: { nombre: 'Deporte y proteína', ids: ['super-mega-gainer-gmn', 'mega-gainer-gmn', 'creatina-gmn'] },
  desayunos: { nombre: 'Desayunos y batidos', ids: ['superalimento-quinua-amaranto', 'colmare', 'colageno-marino-crema-coco'] },
  familia: { nombre: 'Para la familia', ids: ['maca-negra-maca-roja', 'calcio-coral-marino', 'factor-transferencia'] },
  despensa: { nombre: 'Despensa natural', ids: ['stevia-jarabe', 'cafe-brusca'] }
};
let currentNeed = new URLSearchParams(location.search).get('necesidad');
function renderNeedChip() {
  const grid = document.getElementById('shop-products-grid'); if (!grid) return;
  let chip = document.getElementById('need-chip');
  if (!currentNeed || !NECESIDADES[currentNeed]) { if (chip) chip.remove(); return; }
  if (!chip) { chip = document.createElement('div'); chip.id = 'need-chip'; chip.className = 'need-chip'; grid.parentElement.insertBefore(chip, grid); }
  chip.innerHTML = `Mostrando: <strong>${NECESIDADES[currentNeed].nombre}</strong> <button type="button" aria-label="Ver todos los productos">Ver todos <i class="fas fa-xmark" aria-hidden="true"></i></button>`;
  chip.querySelector('button').onclick = () => { currentNeed = null; history.replaceState(null, '', location.pathname); renderNeedChip(); renderShopProducts(); };
}
// Shop Filtering and Logic
let currentCategory = 'all';
let searchQuery = '';

function initShopFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('shop-search');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.getAttribute('data-category');
      renderShopProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderShopProducts();
    });
  }
}

function renderShopProducts() {
  const container = document.getElementById('shop-products-grid');
  if (!container || catalogProducts.length === 0) return;
  renderNeedChip();

  // Apply filters
  let filtered = catalogProducts;
  if (currentNeed && NECESIDADES[currentNeed]) filtered = filtered.filter(p => NECESIDADES[currentNeed].ids.includes(p.id));
  
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.categoria.toLowerCase().includes(currentCategory.toLowerCase()) || 
                                     (currentCategory === 'pulverizados' && p.categoria.includes('Pulverizados')) ||
                                     (currentCategory === 'aceites' && p.categoria.includes('Aceites')) ||
                                     (currentCategory === 'homeopaticos' && p.categoria.includes('Homeopáticos')) ||
                                     (currentCategory === 'jarabes' && p.categoria.includes('Jarabes')) ||
                                     (currentCategory === 'alimentacion' && p.categoria.includes('Alimentación')));
  }

  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.nombre.toLowerCase().includes(searchQuery) || 
      p.descripcion.toLowerCase().includes(searchQuery) ||
      p.categoria.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <i class="fas fa-search-minus" style="font-size: 3rem; margin-bottom: 1.5rem; display: block; color: var(--border-color);"></i>
        <h3>No encontramos productos que coincidan con tu búsqueda</h3>
        <p style="margin-top: 0.5rem;">Intenta con otros términos o cambia la categoría.</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(product => {

    // Generate variants badges HTML
    const variantsHtml = product.presentaciones.map((p, i) => {
      const sizeLabel = p.peso || p.volumen || p.cantidad || '';
      const varLabel = p.variedad ? ` (${p.variedad})` : '';
      return `<button type="button" class="variant-tag${i === 0 ? ' active' : ''}" data-id="${product.id}" data-idx="${i}" aria-pressed="${i === 0}">${p.tipo} ${sizeLabel}${varLabel}</button>`;
    }).join('');

    html += `
      <div class="product-card">
        ${floatingImage(product)}
        <div class="product-card-content">
          <span class="product-card-category">${product.categoria}</span>
          <h3 class="product-card-title">${product.nombre}</h3>
          <p class="product-card-benefits">${product.descripcion}</p>
          
          <div class="product-card-variants">
            ${variantsHtml}
          </div>
          <p class="product-card-price">${product.presentaciones.length > 1 ? '<span>Desde</span> ' : ''}${formatCOP(Math.min(...product.presentaciones.map(x => x.precio)))}</p>
          
          <div class="product-card-footer">
            <button onclick="window.addToCartByDefault('${product.id}', +(this.closest('.product-card').dataset.idx || 0))" class="btn btn-primary btn-block">
              <i class="fas fa-shopping-bag" style="margin-right: 0.5rem;"></i> Añadir al Carrito
            </button>
            <button onclick="window.quickViewProduct('${product.id}')" class="btn btn-outline btn-block">Ver Detalles</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Product Quick View Modal Controller
let activeProduct = null;
let activePresentationIndex = 0;

window.quickViewProduct = (productId) => {
  const product = catalogProducts.find(p => p.id === productId);
  if (!product) return;

  activeProduct = product;
  activePresentationIndex = 0;

  // Update hash without reloading page
  if (window.location.hash !== `#${productId}`) {
    window.history.replaceState(null, null, `#${productId}`);
  }

  // Inject schema for SEO
  injectProductSchema(product);

  const modalOverlay = document.getElementById('product-modal-overlay');
  if (!modalOverlay) return;

  // Render Modal Content
  const modalImg = document.getElementById('modal-product-img');
  const modalCat = document.getElementById('modal-product-category');
  const modalTitle = document.getElementById('modal-product-title');
  const modalDesc = document.getElementById('modal-product-desc');
  const modalBenefitsList = document.getElementById('modal-product-benefits-list');
  const modalPresentationOptions = document.getElementById('modal-presentation-options');
  const modalPrice = document.getElementById('modal-product-price');

  setModal3D(product);
  if (modalImg) {
    modalImg.src = presentationImage(product, 0); modalImg.style.setProperty('--size', '1');
    modalImg.alt = product.nombre;
    modalImg.onerror = function() { this.onerror = null; this.src = FALLBACK_IMG; };
  }
  if (modalCat) modalCat.textContent = product.categoria;
  if (modalTitle) modalTitle.textContent = product.nombre;
  if (modalDesc) modalDesc.textContent = product.descripcion;
  
  if (modalBenefitsList) {
    if (product.beneficios.length > 0) {
      modalBenefitsList.parentElement.style.display = 'block';
      modalBenefitsList.innerHTML = product.beneficios.map(b => `
        <li><i class="fas fa-check-circle" aria-hidden="true"></i><span>${b}</span></li>
      `).join('') + (hasInvimaNote(product) ? '<li class="modal-legal-note">*Declaración aceptada por el INVIMA para el nutriente.</li>' : '');
    } else {
      modalBenefitsList.parentElement.style.display = 'none';
    }
  }

  // Render presentations selector
  if (modalPresentationOptions) {
    modalPresentationOptions.innerHTML = product.presentaciones.map((p, idx) => {
      const sizeLabel = p.peso || p.volumen || p.cantidad || '';
      const varLabel = p.variedad ? ` - ${p.variedad}` : '';
      return `
        <button class="presentation-option ${idx === 0 ? 'active' : ''}" 
                data-index="${idx}" 
                onclick="window.selectModalPresentation(${idx})">
          ${p.tipo} ${sizeLabel}${varLabel}
        </button>
      `;
    }).join('');
  }

  // Update Price
  if (modalPrice) {
    modalPrice.textContent = formatCOP(product.presentaciones[0].precio);
  }

  // Open Modal
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.selectModalPresentation = (index) => {
  activePresentationIndex = index;
  const options = document.querySelectorAll('.presentation-option');
  options.forEach((opt, idx) => {
    if (idx === index) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  const modalPrice = document.getElementById('modal-product-price');
  if (modalPrice && activeProduct) {
    modalPrice.textContent = formatCOP(activeProduct.presentaciones[index].precio);
  }
  if (activeProduct) morphImage(document.getElementById('modal-product-img'), activeProduct, index);
};

window.closeProductModal = () => {
  setModal3D(null);
  const modalOverlay = document.getElementById('product-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
  
  // Remove schema
  const schema = document.getElementById('product-jsonld-schema');
  if (schema) schema.remove();
  
  // Clear hash from URL
  if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname + window.location.search);
  }
  
  activeProduct = null;
};

window.addActiveProductToCart = () => {
  if (!activeProduct) return;
  addToCart(activeProduct, activePresentationIndex, 1);
  window.closeProductModal();
};

// SEO helper: Dynamically inject product structured data
function injectProductSchema(product) {
  const existingSchema = document.getElementById('product-jsonld-schema');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  const defaultPresentation = product.presentaciones[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.nombre,
    "image": new URL(productImage(product), window.location.href).href,
    "description": product.descripcion,
    "brand": {
      "@type": "Brand",
      "name": (product.categoria + product.nombre).includes("GMN") ? "GMN" : "ZOI"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "COP",
      "price": defaultPresentation.precio,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "url": window.location.href
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'product-jsonld-schema';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
}
