/**
 * ==========================================================================
 * MARKETPLACE PLATFORM - UNIFIED MASTER JAVASCRIPT (script.js)
 * ==========================================================================
 * Handles all frontend interactions, state simulation, reactive drawers,
 * search, cart, wishlist, compare, modals, timers, and dashboard controllers.
 */

// --- GLOBAL SAMPLE DATA FOR MARKETPLACE SIMULATION ---
const MARKETPLACE_DATA = {
  products: [
    {
      id: 'prod-1',
      name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      category: 'Electronics',
      price: 349.99,
      originalPrice: 399.99,
      discount: '12% OFF',
      rating: 4.9,
      reviews: 1240,
      seller: 'Stackly Sound & Tech',
      verified: true,
      badge: 'Bestseller',
      image: 'assets/headphones.webp',
      description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented noise cancellation. Crystal clear hands-free calling and up to 30-hour battery life.',
      specs: { 'Battery': '30 Hours', 'Connectivity': 'Bluetooth 5.2', 'Weight': '250g', 'Warranty': '2 Years' }
    },
    {
      id: 'prod-2',
      name: 'Ultra-Thin Chronograph Minimalist Watch',
      category: 'Fashion',
      price: 189.00,
      originalPrice: 249.00,
      discount: '24% OFF',
      rating: 4.8,
      reviews: 840,
      seller: 'Nordic Timepieces',
      verified: true,
      badge: 'Hot Deal',
      image: 'assets/watch.webp',
      description: 'Handcrafted sapphire crystal lens, Italian genuine leather strap, water-resistant to 50 meters. Minimalist luxury crafted for modern professionals.',
      specs: { 'Movement': 'Japanese Quartz', 'Case': '316L Stainless Steel', 'Water Resistance': '5 ATM', 'Warranty': '5 Years' }
    },
    {
      id: 'prod-3',
      name: 'Ergonomic Mesh Executive Chair with Lumbar Support',
      category: 'Home & Living',
      price: 299.50,
      originalPrice: 420.00,
      discount: '28% OFF',
      rating: 4.7,
      reviews: 512,
      seller: 'ErgoDesign Studio',
      verified: true,
      badge: 'Trending',
      image: 'assets/chair.webp',
      description: 'Dynamic 3D lumbar support system with breathable elastomeric mesh, 4D adjustable armrests, and synchro-tilt mechanism engineered for all-day posture support.',
      specs: { 'Max Load': '150 kg', 'Recline': '135 Degrees', 'Material': 'BIFMA-Certified Mesh', 'Warranty': '10 Years' }
    },
    {
      id: 'prod-4',
      name: 'Organic Botanical Skin Revitalizing Elixir (50ml)',
      category: 'Beauty',
      price: 68.00,
      originalPrice: 85.00,
      discount: '20% OFF',
      rating: 4.9,
      reviews: 320,
      seller: 'Lumière Naturals',
      verified: true,
      badge: 'Organic',
      image: 'assets/skincare.webp',
      description: 'Cold-pressed bioactive plant extracts, niacinamide, and hyaluronic acid for luminous skin rejuvenation and 24-hour hydration lock.',
      specs: { 'Volume': '50 ml', 'Skin Type': 'All Skin Types', 'Formula': '100% Vegan & Cruelty-Free', 'Origin': 'France' }
    },
    {
      id: 'prod-5',
      name: 'HydroCarbon Pro Carbon Fiber Road Bicycle Helmet',
      category: 'Sports',
      price: 145.00,
      originalPrice: 195.00,
      discount: '25% OFF',
      rating: 4.8,
      reviews: 190,
      seller: 'AeroVelocity Sports',
      verified: true,
      badge: 'New',
      image: 'assets/helmet.webp',
      description: 'Wind-tunnel tested aerodynamic profile with integrated MIPS rotational impact protection, 18 high-flow cooling vents, and ultra-light dial fit system.',
      specs: { 'Weight': '210g', 'Safety Certification': 'CPSC & CE EN1078', 'Sizes': 'S, M, L', 'Warranty': '3 Years' }
    },
    {
      id: 'prod-6',
      name: 'Smart OBD2 Bluetooth Diagnostic Car Scanner Pro',
      category: 'Automotive',
      price: 89.99,
      originalPrice: 120.00,
      discount: '25% OFF',
      rating: 4.6,
      reviews: 430,
      seller: 'AutoPulse Systems',
      verified: true,
      badge: 'Smart Tech',
      image: 'assets/scanner.webp',
      description: 'Real-time vehicle telemetry, engine fault code clearing, live sensor graphs, and fuel efficiency optimization directly to your smartphone.',
      specs: { 'Compatibility': 'All 1996+ OBD2 Cars', 'App': 'iOS & Android Sync', 'Data Speed': '4 Mbps', 'Warranty': '2 Years' }
    },
    {
      id: 'prod-7',
      name: 'Premium Full-Grain Leather Weekender Duffel Bag',
      category: 'Accessories',
      price: 219.00,
      originalPrice: 280.00,
      discount: '22% OFF',
      rating: 4.9,
      reviews: 670,
      seller: 'Heritage Leathercraft',
      verified: true,
      badge: 'Handmade',
      image: 'assets/bag.webp',
      description: 'Vegetable-tanned full-grain leather, antique brass YKK zippers, dedicated shoe compartment, and padded 16-inch laptop pocket.',
      specs: { 'Dimensions': '52 x 30 x 26 cm', 'Capacity': '42 Liters', 'Material': 'Full-Grain Tuscan Leather', 'Warranty': 'Lifetime' }
    },
    {
      id: 'prod-8',
      name: 'Mechanical RGB Hot-Swappable Custom Keyboard',
      category: 'Electronics',
      price: 139.99,
      originalPrice: 179.99,
      discount: '22% OFF',
      rating: 4.9,
      reviews: 950,
      seller: 'Stackly Sound & Tech',
      verified: true,
      badge: 'Featured',
      image: 'assets/keyboard.webp',
      description: 'Gasket-mounted aluminum frame with lubed linear switches, PBT double-shot keycaps, south-facing RGB, and triple connection mode.',
      specs: { 'Layout': '75% Compact', 'Battery': '4000 mAh', 'Switch Type': 'Gateron Oil King', 'Warranty': '2 Years' }
    }
  ],
  cart: [],
  wishlist: [],
  compareList: [],
  user: {
    name: 'Alexander Wright',
    email: 'alex.wright@stacklyprime.com',
    role: 'Premium User',
    ordersCount: 14,
    points: 2450
  }
};

// --- INITIALIZATION & ROUTING ---
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDrawersAndModals();
  initCartAndWishlist();
  initCompareSystem();
  initDealsCountdown();
  initSearchAutocomplete();
  initAOSandAnimations();
  initStatsCounters();
  initAllNewsletterForms();

  // Page Specific Inits
  const path = window.location.pathname.toLowerCase();
  
  if (path.includes('index') || path.endsWith('/') || path === '') {
    initHomePage();
  } else if (path.includes('about')) {
    initAboutPage();
  } else if (path.includes('services')) {
    initServicesPage();
  } else if (path.includes('blog')) {
    initBlogPage();
  } else if (path.includes('contact')) {
    initContactPage();
  } else if (path.includes('login')) {
    initLoginPage();
  } else if (path.includes('signup')) {
    initSignupPage();
  } else if (path.includes('user-dashboard')) {
    initUserDashboard();
  } else if (path.includes('client-dashboard')) {
    initClientDashboard();
  }
});

// --- SILENT ALERTS & NON-BLOCKING TOAST ENGINE ---
window.alert = function() {};

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.success}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, 3500);
}

// --- CENTRAL STRICT FORM VALIDATION ENGINE ---
function setFieldError(field, message) {
  if (!field) return;
  field.classList.add('is-invalid');
  field.classList.remove('is-valid');

  let parent = field.closest('.newsletter-input-group') || field.closest('.form-field');
  if (!parent) {
    parent = field.closest('.newsletter-form') || field.parentElement;
  }

  if (parent) {
    parent.classList.add('has-error');
    let errorEl = parent.querySelector(':scope > .field-error-msg') || parent.querySelector('.field-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'field-error-msg';
      parent.appendChild(errorEl);
    }
    errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${message}</span>`;
  }
}

function clearFieldError(field) {
  if (!field) return;
  field.classList.remove('is-invalid');
  let parent = field.closest('.newsletter-input-group') || field.closest('.form-field');
  if (!parent) {
    parent = field.closest('.newsletter-form') || field.parentElement;
  }
  if (parent) {
    parent.classList.remove('has-error');
    const errorEl = parent.querySelector('.field-error-msg');
    if (errorEl) errorEl.remove();
  }
}

function bindFieldLiveClearing(field) {
  if (!field) return;
  const handler = () => clearFieldError(field);
  field.addEventListener('input', handler);
  field.addEventListener('change', handler);
}

function setupStrictFormValidation(form, fieldRules, onSuccess) {
  if (!form) return;

  // Bind live error clearing on all specified fields
  fieldRules.forEach(rule => {
    const el = typeof rule.field === 'string' ? form.querySelector(rule.field) : rule.field;
    if (el) bindFieldLiveClearing(el);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    let firstInvalidField = null;

    fieldRules.forEach(rule => {
      const el = typeof rule.field === 'string' ? form.querySelector(rule.field) : rule.field;
      if (!el) return;

      const val = el.type === 'checkbox' ? el.checked : (el.value ? el.value.trim() : '');
      const errorMsg = rule.validate(val, el);

      if (errorMsg) {
        isValid = false;
        setFieldError(el, errorMsg);
        if (!firstInvalidField) {
          firstInvalidField = el;
        }
      } else {
        clearFieldError(el);
      }
    });

    if (!isValid) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    if (typeof onSuccess === 'function') {
      onSuccess(form);
    }
  });
}

function goBackHistory() {
  if (window.history.length > 1 && document.referrer) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

// --- GLOBAL SCROLL LOCK UTILITIES ---
let scrollLockPosition = 0;
let isBodyScrollLocked = false;

function lockBodyScroll() {
  if (isBodyScrollLocked) return;
  scrollLockPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
  document.documentElement.classList.add('no-scroll');
  document.body.classList.add('no-scroll');
  document.body.style.top = `-${scrollLockPosition}px`;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.left = '0';
  document.body.style.right = '0';
  isBodyScrollLocked = true;
}

function unlockBodyScroll() {
  if (!isBodyScrollLocked) return;
  
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
  const savedTop = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.left = '';
  document.body.style.right = '';
  
  const restoreY = savedTop ? Math.abs(parseInt(savedTop, 10)) : scrollLockPosition;
  window.scrollTo(0, restoreY);
  isBodyScrollLocked = false;
}

// --- NAVBAR & MOBILE DRAWER ---
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  const openMobileDrawer = (e) => {
    if (e) e.preventDefault();
    mobileDrawer?.classList.add('open');
    backdrop?.classList.add('active');
    lockBodyScroll();
  };

  const closeMobileDrawer = () => {
    mobileDrawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    unlockBodyScroll();
  };

  // Mobile Drawer Toggle - bind to all hamburger and close buttons
  const hamburgerBtns = document.querySelectorAll('.hamburger-btn');
  hamburgerBtns.forEach(btn => {
    btn.addEventListener('click', openMobileDrawer);
  });

  const closeDrawerBtns = document.querySelectorAll('.close-drawer-btn');
  closeDrawerBtns.forEach(btn => {
    btn.addEventListener('click', closeMobileDrawer);
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMobileDrawer);
    backdrop.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  // Prevent background scrolling on touch devices while drawer is open
  document.addEventListener('touchmove', (e) => {
    if (isBodyScrollLocked) {
      const isInsideScrollable = e.target.closest('.mobile-nav-drawer, .side-drawer, .quick-view-box');
      if (!isInsideScrollable) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeMobileDrawer();
    }
  });

  // Close when clicking any nav link inside mobile drawer
  if (mobileDrawer) {
    const drawerLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });
  }

  // Update badge counters
  updateBadgeCounters();
}

function updateBadgeCounters() {
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');

  const totalCartQty = MARKETPLACE_DATA.cart.reduce((acc, item) => acc + item.qty, 0);
  const totalWishlist = MARKETPLACE_DATA.wishlist.length;

  cartBadges.forEach(b => b.textContent = totalCartQty);
  wishlistBadges.forEach(b => b.textContent = totalWishlist);
}

// --- CART & WISHLIST DRAWERS ---
function initDrawersAndModals() {
  // Cart Drawer triggers
  const cartTriggers = document.querySelectorAll('[data-open-cart]');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart-drawer');

  // Wishlist Drawer triggers
  const wishlistTriggers = document.querySelectorAll('[data-open-wishlist]');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const closeWishlistBtn = document.getElementById('close-wishlist-drawer');

  // Global Backdrop
  let backdrop = document.querySelector('.drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  const closeAllDrawers = () => {
    cartDrawer?.classList.remove('open');
    wishlistDrawer?.classList.remove('open');
    document.querySelector('.mobile-nav-drawer')?.classList.remove('open');
    backdrop.classList.remove('active');
    unlockBodyScroll();
  };

  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  wishlistTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  closeCartBtn?.addEventListener('click', closeAllDrawers);
  closeWishlistBtn?.addEventListener('click', closeAllDrawers);
  backdrop.addEventListener('click', closeAllDrawers);

  // Quick View Modal Close handlers
  const quickModal = document.getElementById('quick-view-modal');
  const closeQuickModal = document.getElementById('close-quick-modal');
  if (quickModal && closeQuickModal) {
    closeQuickModal.addEventListener('click', () => {
      quickModal.classList.remove('active');
      unlockBodyScroll();
    });
    quickModal.addEventListener('click', (e) => {
      if (e.target === quickModal) {
        quickModal.classList.remove('active');
        unlockBodyScroll();
      }
    });
  }
}

// --- CART OPERATIONS ---
function initCartAndWishlist() {
  document.addEventListener('click', (e) => {
    // Add to cart click
    const addCartBtn = e.target.closest('[data-add-cart]');
    if (addCartBtn) {
      e.preventDefault();
      const prodId = addCartBtn.getAttribute('data-add-cart');
      addToCart(prodId);
    }

    // Toggle Wishlist click
    const wishBtn = e.target.closest('[data-toggle-wishlist]');
    if (wishBtn) {
      e.preventDefault();
      const prodId = wishBtn.getAttribute('data-toggle-wishlist');
      toggleWishlist(prodId, wishBtn);
    }

    // Quick View click
    const quickBtn = e.target.closest('[data-quick-view]');
    if (quickBtn) {
      e.preventDefault();
      const prodId = quickBtn.getAttribute('data-quick-view');
      openQuickView(prodId);
    }
  });
}

function addToCart(prodId) {
  const existing = MARKETPLACE_DATA.cart.find(item => item.id === prodId);
  const product = MARKETPLACE_DATA.products.find(p => p.id === prodId);
  if (!product) return;

  if (existing) {
    existing.qty += 1;
  } else {
    MARKETPLACE_DATA.cart.push({ id: prodId, qty: 1 });
  }

  updateBadgeCounters();
  renderCartItems();
}

function removeFromCart(prodId) {
  MARKETPLACE_DATA.cart = MARKETPLACE_DATA.cart.filter(item => item.id !== prodId);
  updateBadgeCounters();
  renderCartItems();
}

function updateCartQty(prodId, delta) {
  const item = MARKETPLACE_DATA.cart.find(i => i.id === prodId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(prodId);
  } else {
    updateBadgeCounters();
    renderCartItems();
  }
}

function renderCartItems() {
  const container = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  if (!container) return;

  if (MARKETPLACE_DATA.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fas fa-shopping-basket" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-light);"></i>
        <h4 style="font-size: 1.1rem; color: var(--primary-navy); margin-bottom: 0.5rem;">Your Cart is Empty</h4>
        <p style="font-size: 0.9rem;">Explore our marketplace and discover great products!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    return;
  }

  let subtotal = 0;
  container.innerHTML = MARKETPLACE_DATA.cart.map(cartItem => {
    const prod = MARKETPLACE_DATA.products.find(p => p.id === cartItem.id);
    if (!prod) return '';
    const itemTotal = prod.price * cartItem.qty;
    subtotal += itemTotal;

    return `
      <div class="drawer-item" data-id="${prod.id}">
        <img src="${prod.image}" alt="${prod.name}" class="drawer-item-img">
        <div class="drawer-item-info">
          <div class="drawer-item-title">${prod.name}</div>
          <div class="drawer-item-price">$${prod.price.toFixed(2)}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartQty('${prod.id}', -1)"><i class="fas fa-minus" style="font-size: 0.7rem;"></i></button>
            <span style="font-weight: 700; font-size: 0.9rem; padding: 0 0.4rem;">${cartItem.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${prod.id}', 1)"><i class="fas fa-plus" style="font-size: 0.7rem;"></i></button>
          </div>
        </div>
        <button class="btn-icon" style="width:30px; height:30px; align-self: flex-start;" onclick="removeFromCart('${prod.id}')">
          <i class="fas fa-times" style="font-size: 0.8rem;"></i>
        </button>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// --- WISHLIST OPERATIONS ---
function toggleWishlist(prodId, btnEl) {
  const index = MARKETPLACE_DATA.wishlist.indexOf(prodId);
  const prod = MARKETPLACE_DATA.products.find(p => p.id === prodId);

  if (index > -1) {
    MARKETPLACE_DATA.wishlist.splice(index, 1);
    btnEl?.classList.remove('active');
  } else {
    MARKETPLACE_DATA.wishlist.push(prodId);
    btnEl?.classList.add('active');
  }

  updateBadgeCounters();
  renderWishlistItems();
}

function renderWishlistItems() {
  const container = document.getElementById('wishlist-drawer-items');
  if (!container) return;

  if (MARKETPLACE_DATA.wishlist.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-light);"></i>
        <h4 style="font-size: 1.1rem; color: var(--primary-navy); margin-bottom: 0.5rem;">No Saved Favorites</h4>
        <p style="font-size: 0.9rem;">Click the heart icon on any product to save it here for later.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = MARKETPLACE_DATA.wishlist.map(id => {
    const prod = MARKETPLACE_DATA.products.find(p => p.id === id);
    if (!prod) return '';

    return `
      <div class="drawer-item" data-id="${prod.id}">
        <img src="${prod.image}" alt="${prod.name}" class="drawer-item-img">
        <div class="drawer-item-info">
          <div class="drawer-item-title">${prod.name}</div>
          <div class="drawer-item-price">$${prod.price.toFixed(2)}</div>
          <button class="btn btn-sm btn-primary" style="margin-top: 0.5rem; padding: 0.35rem 0.75rem;" onclick="addToCart('${prod.id}')">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
        </div>
        <button class="btn-icon" style="width:30px; height:30px; align-self: flex-start;" onclick="toggleWishlist('${prod.id}', null)">
          <i class="fas fa-trash-alt" style="font-size: 0.8rem; color: var(--accent-rose);"></i>
        </button>
      </div>
    `;
  }).join('');
}

// --- QUICK VIEW MODAL ---
function openQuickView(prodId) {
  const prod = MARKETPLACE_DATA.products.find(p => p.id === prodId);
  const modal = document.getElementById('quick-view-modal');
  const modalBody = document.getElementById('quick-view-content');
  if (!prod || !modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; padding: 2rem;">
      <div style="position: relative;">
        <img src="${prod.image}" alt="${prod.name}" style="width: 100%; border-radius: var(--radius-lg); object-fit: cover; max-height: 380px; box-shadow: var(--shadow-md);">
        <span class="badge-tag badge-discount" style="top: 15px; left: 15px;">${prod.discount}</span>
      </div>
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <span class="section-badge" style="margin-bottom: 0; padding: 0.25rem 0.75rem; font-size: 0.75rem;">${prod.category}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fas fa-store" style="color: var(--accent-blue);"></i> ${prod.seller}</span>
        </div>
        <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 0.75rem; line-height: 1.3;">${prod.name}</h2>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
          <div style="color: var(--accent-gold);"><i class="fas fa-star"></i> <strong>${prod.rating}</strong></div>
          <span style="color: var(--text-muted); font-size: 0.85rem;">(${prod.reviews} verified reviews)</span>
        </div>
        <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.25rem;">
          <span style="font-size: 1.75rem; font-weight: 800; color: var(--accent-blue);">$${prod.price.toFixed(2)}</span>
          <span style="font-size: 1.1rem; color: var(--text-light); text-decoration: line-through;">$${prod.originalPrice.toFixed(2)}</span>
        </div>
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${prod.description}</p>
        
        <div style="background: #f8fafc; border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-navy); margin-bottom: 0.5rem; font-weight: 700;">Key Specifications</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.85rem;">
            ${Object.entries(prod.specs).map(([key, val]) => `
              <div><strong style="color: var(--text-main);">${key}:</strong> <span style="color: var(--text-muted);">${val}</span></div>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="btn btn-primary" style="flex-grow: 1;" onclick="addToCart('${prod.id}'); document.getElementById('quick-view-modal').classList.remove('active');">
            <i class="fas fa-shopping-bag"></i> Add To Cart
          </button>
          <button class="btn-icon ${MARKETPLACE_DATA.wishlist.includes(prod.id) ? 'active' : ''}" onclick="toggleWishlist('${prod.id}', this)" title="Save to Wishlist">
            <i class="fas fa-heart"></i>
          </button>
          <button class="btn-icon" onclick="toggleCompare('${prod.id}')" title="Compare Product">
            <i class="fas fa-exchange-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// --- COMPARISON SYSTEM ---
function initCompareSystem() {
  document.addEventListener('click', (e) => {
    const compareBtn = e.target.closest('[data-compare-btn]');
    if (compareBtn) {
      e.preventDefault();
      const prodId = compareBtn.getAttribute('data-compare-btn');
      toggleCompare(prodId);
    }
  });

  renderCompareBar();
}

function toggleCompare(prodId) {
  const index = MARKETPLACE_DATA.compareList.indexOf(prodId);
  const prod = MARKETPLACE_DATA.products.find(p => p.id === prodId);

  if (index > -1) {
    MARKETPLACE_DATA.compareList.splice(index, 1);
  } else {
    if (MARKETPLACE_DATA.compareList.length >= 3) {
      return;
    }
    MARKETPLACE_DATA.compareList.push(prodId);
  }

  renderCompareBar();
}

function renderCompareBar() {
  let bar = document.getElementById('floating-compare-bar');

  if (MARKETPLACE_DATA.compareList.length === 0) {
    if (bar) {
      bar.classList.remove('active');
      bar.remove();
    }
    return;
  }

  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'floating-compare-bar';
    bar.className = 'compare-bar';
    document.body.appendChild(bar);
  }

  const itemsHtml = MARKETPLACE_DATA.compareList.map(id => {
    const prod = MARKETPLACE_DATA.products.find(p => p.id === id);
    return prod ? `<img src="${prod.image}" alt="${prod.name}" class="compare-thumb" title="${prod.name}">` : '';
  }).join('');

  bar.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <span style="font-weight: 700; font-size: 0.9rem;">Compare (${MARKETPLACE_DATA.compareList.length}/3):</span>
      <div class="compare-bar-items">${itemsHtml}</div>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <button class="btn btn-sm btn-accent" onclick="openCompareModal()">Compare Now</button>
      <button class="btn-icon" style="width:28px; height:28px; background: rgba(255,255,255,0.2); color:#fff;" onclick="clearCompare()"><i class="fas fa-times" style="font-size:0.75rem;"></i></button>
    </div>
  `;

  bar.classList.add('active');
}

function clearCompare() {
  MARKETPLACE_DATA.compareList = [];
  renderCompareBar();
}

function openCompareModal() {
  let modal = document.getElementById('compare-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'compare-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container" style="max-width: 950px;">
        <button class="modal-close-btn" onclick="document.getElementById('compare-modal').classList.remove('active')"><i class="fas fa-times"></i></button>
        <div id="compare-modal-content" style="padding: 2rem;"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const content = document.getElementById('compare-modal-content');
  const prods = MARKETPLACE_DATA.compareList.map(id => MARKETPLACE_DATA.products.find(p => p.id === id)).filter(Boolean);

  if (prods.length === 0) return;

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <span class="section-badge">Side-by-Side Analysis</span>
      <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--primary-navy);">Compare Products</h2>
    </div>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
        <thead>
          <tr style="border-bottom: 2px solid var(--card-border);">
            <th style="padding: 1rem; text-align: left; width: 180px; color: var(--text-muted); font-size: 0.9rem;">Feature</th>
            ${prods.map(p => `
              <th style="padding: 1rem; text-align: center;">
                <img src="${p.image}" alt="${p.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-md); margin: 0 auto 0.5rem;">
                <div style="font-size: 0.95rem; font-weight: 700; color: var(--primary-navy);">${p.name.substring(0, 30)}...</div>
                <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent-blue); margin: 0.25rem 0;">$${p.price.toFixed(2)}</div>
                <button class="btn btn-sm btn-primary" style="margin-top: 0.5rem;" onclick="addToCart('${p.id}')">Add to Cart</button>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--card-border);">
            <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-main);">Category</td>
            ${prods.map(p => `<td style="padding: 0.85rem 1rem; text-align: center; color: var(--text-muted);">${p.category}</td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--card-border);">
            <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-main);">Rating</td>
            ${prods.map(p => `<td style="padding: 0.85rem 1rem; text-align: center; color: var(--accent-gold); font-weight: 700;"><i class="fas fa-star"></i> ${p.rating} (${p.reviews})</td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--card-border);">
            <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-main);">Verified Seller</td>
            ${prods.map(p => `<td style="padding: 0.85rem 1rem; text-align: center; color: var(--text-muted);"><i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i> ${p.seller}</td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--card-border);">
            <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-main);">Specifications</td>
            ${prods.map(p => `
              <td style="padding: 0.85rem 1rem; text-align: left; font-size: 0.85rem; vertical-align: top;">
                ${Object.entries(p.specs).map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`).join('')}
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  modal.classList.add('active');
}

// --- DEALS COUNTDOWN TIMER ---
function initDealsCountdown() {
  const timerElements = document.querySelectorAll('.deals-countdown');
  if (timerElements.length === 0) return;

  // Set target 24 hours from now
  let countdownTime = 24 * 60 * 60; // 24 hours in seconds

  const updateTimer = () => {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    const pad = (n) => String(n).padStart(2, '0');

    timerElements.forEach(el => {
      const hEl = el.querySelector('.hours');
      const mEl = el.querySelector('.minutes');
      const sEl = el.querySelector('.seconds');
      if (hEl) hEl.textContent = pad(hours);
      if (mEl) mEl.textContent = pad(minutes);
      if (sEl) sEl.textContent = pad(seconds);
    });

    if (countdownTime > 0) {
      countdownTime--;
    } else {
      countdownTime = 24 * 60 * 60; // loop
    }
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- LIVE SEARCH & AUTOCOMPLETE ---
function initSearchAutocomplete() {
  const searchInputs = document.querySelectorAll('.marketplace-search-input');

  searchInputs.forEach(input => {
    const dropdown = input.parentElement.querySelector('.search-autocomplete-dropdown');
    
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!dropdown) return;

      if (query.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      const results = MARKETPLACE_DATA.products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.seller.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        dropdown.innerHTML = `
          <div style="padding: 1rem; color: var(--text-muted); font-size: 0.9rem; text-align: center;">
            No matching products found for "${query}"
          </div>
        `;
      } else {
        dropdown.innerHTML = results.slice(0, 4).map(p => `
          <div class="search-result-item" onclick="window.location.href='404.html';" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--card-border); cursor: pointer; transition: background 0.2s;">
            <img src="${p.image}" alt="${p.name}" style="width: 40px; height: 40px; border-radius: var(--radius-xs); object-fit: cover;">
            <div style="flex-grow: 1;">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--primary-navy);">${p.name.substring(0, 32)}...</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${p.category} &bull; <strong style="color: var(--accent-blue);">$${p.price.toFixed(2)}</strong></div>
            </div>
          </div>
        `).join('');
      }

      dropdown.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && (!dropdown || !dropdown.contains(e.target))) {
        if (dropdown) dropdown.style.display = 'none';
      }
    });
  });

  // Strict Search Form Validation
  const searchForms = document.querySelectorAll('.marketplace-search-form');
  searchForms.forEach(form => {
    const searchInput = form.querySelector('.marketplace-search-input');
    setupStrictFormValidation(form, [
      {
        field: searchInput,
        validate: (val) => {
          if (!val || val.length === 0) {
            return 'Please enter a keyword, brand, or category to search.';
          }
          return '';
        }
      }
    ], () => {
      window.location.href = '404.html';
    });
  });
}

// --- ANIMATED COUNTERS & GSAP/AOS HOOKS ---
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const counter = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = target.toLocaleString() + suffix;
            clearInterval(counter);
          } else {
            el.textContent = Math.floor(start).toLocaleString() + suffix;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

function initAOSandAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }
}

// --- PRODUCT CARD GENERATOR HELPER ---
function createProductCardHTML(prod) {
  const isWishlist = MARKETPLACE_DATA.wishlist.includes(prod.id);
  return `
    <div class="product-card" data-category="${prod.category}" data-id="${prod.id}">
      <div class="product-image-wrap">
        <span class="badge-tag badge-discount">${prod.discount}</span>
        <div class="card-action-overlay">
          <button class="quick-action-btn ${isWishlist ? 'active' : ''}" onclick="window.location.href='404.html';" title="Wishlist">
            <i class="fas fa-heart"></i>
          </button>
          <button class="quick-action-btn" onclick="window.location.href='404.html';" title="Quick View">
            <i class="fas fa-eye"></i>
          </button>
          <button class="quick-action-btn" onclick="window.location.href='404.html';" title="Compare">
            <i class="fas fa-exchange-alt"></i>
          </button>
        </div>
        <img src="${prod.image}" alt="${prod.name}" loading="lazy">
      </div>
      <div class="product-body">
        <div class="product-category-row">
          <span>${prod.category}</span>
          <span class="product-seller"><i class="fas fa-store"></i> ${prod.seller}</span>
        </div>
        <a href="404.html" class="product-title">${prod.name}</a>
        <div class="product-rating">
          <i class="fas fa-star"></i>
          <strong>${prod.rating}</strong>
          <span class="rating-count">(${prod.reviews})</span>
        </div>
        <div class="product-price-row">
          <span class="current-price">$${prod.price.toFixed(2)}</span>
          <span class="original-price">$${prod.originalPrice.toFixed(2)}</span>
        </div>
        <div class="product-footer">
          <button class="btn btn-primary" style="flex-grow: 1; padding: 0.65rem 1rem; font-size: 0.9rem;" onclick="window.location.href='404.html';">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// PAGE CONTROLLERS
// ==========================================================================

// --- UNIVERSAL NEWSLETTER CONTROLLER FOR ALL PAGES ---
function initAllNewsletterForms() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const newsletterForms = document.querySelectorAll('.newsletter-form, #home-newsletter-form, #blog-newsletter-form');

  newsletterForms.forEach(form => {
    if (form.dataset.validated === 'true') return;
    form.dataset.validated = 'true';

    const emailInput = form.querySelector('input[type="email"], .newsletter-input, input');
    if (!emailInput) return;

    setupStrictFormValidation(form, [
      {
        field: emailInput,
        validate: (val) => {
          if (!val || val.trim().length === 0) {
            return 'Email is required';
          }
          if (!emailRegex.test(val.trim())) {
            return 'Please enter a valid email address';
          }
          return '';
        }
      }
    ], (f) => {
      window.location.href = '404.html';
    });
  });
}

// --- 1. HOME PAGE ---
function initHomePage() {
  // Populate Featured Products Grid
  const featuredGrid = document.getElementById('featured-products-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = MARKETPLACE_DATA.products.map(p => createProductCardHTML(p)).join('');
  }

  // Populate Deals Grid
  const dealsGrid = document.getElementById('deals-products-grid');
  if (dealsGrid) {
    dealsGrid.innerHTML = MARKETPLACE_DATA.products.slice(0, 4).map(p => createProductCardHTML(p)).join('');
  }

  // Populate Trending Carousel
  const trendingGrid = document.getElementById('trending-products-grid');
  if (trendingGrid) {
    trendingGrid.innerHTML = MARKETPLACE_DATA.products.slice(2, 6).map(p => createProductCardHTML(p)).join('');
  }

  // Category Filter Tabs
  const filterTabs = document.querySelectorAll('.category-filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter');

      const cards = document.querySelectorAll('#featured-products-grid .product-card');
      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category').toLowerCase() === cat.toLowerCase()) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  initAllNewsletterForms();
}

// --- 2. ABOUT PAGE ---
function initAboutPage() {
  initAllNewsletterForms();
  // Ecosystem interactive cards
  const ecoCards = document.querySelectorAll('.ecosystem-card');
  ecoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      ecoCards.forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');
    });
  });
}

// --- 3. SERVICES PAGE ---
function initServicesPage() {
  initAllNewsletterForms();
  // Process step interactivity
  const steps = document.querySelectorAll('.process-step-card');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
}

// --- 4. BLOG PAGE ---
function initBlogPage() {
  // Blog category filters
  const blogTabs = document.querySelectorAll('.blog-filter-tab');
  blogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      blogTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      const posts = document.querySelectorAll('.blog-article-card');
      
      posts.forEach(post => {
        if (filter === 'all' || post.getAttribute('data-category') === filter) {
          post.style.display = 'flex';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });

  initAllNewsletterForms();
}

// --- 5. CONTACT PAGE ---
function initContactPage() {
  initAllNewsletterForms();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // General Contact Form Strict Validation
  const contactForm = document.getElementById('marketplace-contact-form');
  if (contactForm) {
    setupStrictFormValidation(contactForm, [
      {
        field: contactForm.querySelector('input[name="fullname"]'),
        validate: (val) => {
          if (!val || val.length < 2) return 'Full Name is required (minimum 2 characters)';
          return '';
        }
      },
      {
        field: contactForm.querySelector('input[name="email"]'),
        validate: (val) => {
          if (!val || val.length === 0) return 'Email is required';
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
          return '';
        }
      },
      {
        field: contactForm.querySelector('input[name="phone"]'),
        validate: (val) => {
          if (!val || val.length === 0) return 'Phone number is required';
          if (val.replace(/\D/g, '').length < 7) {
            return 'Please enter a valid phone number (at least 7 digits)';
          }
          return '';
        }
      },
      {
        field: contactForm.querySelector('select[name="usertype"]'),
        validate: (val) => {
          if (!val || val === '') return 'User role is required';
          return '';
        }
      },
      {
        field: contactForm.querySelector('input[name="subject"]'),
        validate: (val) => {
          if (!val || val.length < 3) return 'Subject is required';
          return '';
        }
      },
      {
        field: contactForm.querySelector('textarea[name="message"]'),
        validate: (val) => {
          if (!val || val.length < 10) return 'Message is required (minimum 10 characters)';
          return '';
        }
      }
    ], (form) => {
      window.location.href = '404.html';
    });
  }

  // Seller Support Priority Form Strict Validation
  const sellerForm = document.getElementById('seller-support-form');
  if (sellerForm) {
    const brandInput = sellerForm.querySelector('input[placeholder*="Brand"], input[placeholder*="e.g. Stackly"]');
    const categorySelect = sellerForm.querySelector('select');
    const emailInput = sellerForm.querySelector('input[type="email"]');
    const descTextarea = sellerForm.querySelector('textarea');

    setupStrictFormValidation(sellerForm, [
      {
        field: brandInput,
        validate: (val) => {
          if (!val || val.length < 2) return 'Store or brand name is required';
          return '';
        }
      },
      {
        field: categorySelect,
        validate: (val) => {
          if (!val || val === '') return 'Support category is required';
          return '';
        }
      },
      {
        field: emailInput,
        validate: (val) => {
          if (!val || val.length === 0) return 'Email is required';
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
          return '';
        }
      },
      {
        field: descTextarea,
        validate: (val) => {
          if (!val || val.length < 10) return 'Issue description is required (minimum 10 characters)';
          return '';
        }
      }
    ], (form) => {
      window.location.href = '404.html';
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(f => f.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });
}

// --- DYNAMIC USER & AUTH MANAGEMENT ENGINE ---
function deriveNameFromEmail(email) {
  if (!email || typeof email !== 'string') return 'User';
  const clean = email.trim();
  const prefix = clean.includes('@') ? clean.split('@')[0] : clean;
  const parts = prefix.split(/[._\-\+]+/).filter(Boolean);
  if (parts.length === 0) return 'User';
  const nameParts = parts.map(part => {
    const letters = part.replace(/[0-9]/g, '');
    const token = letters.length > 0 ? letters : part;
    return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
  }).filter(Boolean);
  return nameParts.join(' ') || 'User';
}

function getAuthUser(defaultRole = 'user') {
  const defaultEmail = defaultRole === 'client' ? 'procurement@stacklycorp.com' : 'alex.wright@stacklyprime.com';
  const defaultName = defaultRole === 'client' ? 'Stackly Global Ent.' : 'Alexander Wright';

  const storedEmail = localStorage.getItem('stackly_auth_email');
  const storedName = localStorage.getItem('stackly_auth_name');

  const email = storedEmail || defaultEmail;
  const name = storedName || (storedEmail ? deriveNameFromEmail(storedEmail) : defaultName);

  return { email, name };
}

function syncDashboardAuthDetails(role = 'user') {
  const auth = getAuthUser(role);

  // 1. Welcome section
  const welcomeHighlight = document.querySelector('.dash-welcome-title .highlight-name');
  if (welcomeHighlight) {
    welcomeHighlight.textContent = auth.name;
  }

  // 2. Profile Logo / Mini Profile Section in Topbar
  const topbarProfileName = document.querySelector('.topbar-profile .profile-name');
  if (topbarProfileName) {
    topbarProfileName.textContent = auth.name;
  }

  const topbarProfileBadge = document.querySelector('.topbar-profile .profile-badge');
  if (topbarProfileBadge) {
    const badgeIcon = role === 'client' ? 'fa-briefcase' : 'fa-shield-alt';
    topbarProfileBadge.innerHTML = `<i class="fas ${badgeIcon}"></i> <span class="profile-email-display">${auth.email}</span>`;
  }

  const topbarAvatarImg = document.getElementById('topbar-avatar-img');
  if (topbarAvatarImg) {
    topbarAvatarImg.alt = auth.name;
    topbarAvatarImg.title = `${auth.name} (${auth.email})`;
  }

  // 3. Profile Tab Identity Card (View 4: Profile / Organization)
  const profileCard = document.querySelector('#view-profile .dash-profile-grid .dash-card, #view-client-profile .dash-profile-grid .dash-card');
  if (profileCard) {
    const profileHeading = profileCard.querySelector('h3');
    if (profileHeading) profileHeading.textContent = auth.name;

    const profileEmail = profileCard.querySelector('p');
    if (profileEmail) profileEmail.textContent = auth.email;

    const profileAvatar = profileCard.querySelector('img');
    if (profileAvatar) profileAvatar.alt = auth.name;
  }

  // 4. Pre-fill Form Input fields
  const userFullnameInput = document.getElementById('user-fullname');
  if (userFullnameInput) userFullnameInput.value = auth.name;

  const userEmailInput = document.getElementById('user-email');
  if (userEmailInput) userEmailInput.value = auth.email;

  const clientCompanyInput = document.getElementById('client-company');
  if (clientCompanyInput) {
    clientCompanyInput.value = auth.name.includes('Corp') || auth.name.includes('Ent') ? auth.name : `${auth.name} Enterprise Corp`;
  }

  const clientOfficerInput = document.getElementById('client-officer');
  if (clientOfficerInput) {
    clientOfficerInput.value = `${auth.name} (CPO)`;
  }

  const clientEmailInput = document.getElementById('client-email');
  if (clientEmailInput) {
    clientEmailInput.value = auth.email;
  }
}

// --- 6. LOGIN PAGE ---
function initLoginPage() {
  initAllNewsletterForms();
  let selectedRole = 'user';
  const roleCards = document.querySelectorAll('.account-type-card');
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRole = card.getAttribute('data-role');
    });
  });

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const emailField = loginForm.querySelector('#login-email');
    const passField = loginForm.querySelector('#login-password');

    setupStrictFormValidation(loginForm, [
      {
        field: emailField,
        validate: (val) => {
          if (!val || val.length === 0) return 'Email or username is required';
          if (val.length < 3) return 'Please enter a valid email or username (min 3 characters)';
          return '';
        }
      },
      {
        field: passField,
        validate: (val) => {
          if (!val || val.length === 0) return 'Password is required';
          if (val.length < 6) return 'Password must be at least 6 characters';
          return '';
        }
      }
    ], () => {
      const emailVal = emailField ? emailField.value.trim() : '';
      const nameVal = deriveNameFromEmail(emailVal);
      if (emailVal) {
        localStorage.setItem('stackly_auth_email', emailVal);
        localStorage.setItem('stackly_auth_name', nameVal);
        localStorage.setItem('stackly_auth_role', selectedRole);
      }
      if (selectedRole === 'client') {
        window.location.href = 'client-dashboard.html';
      } else {
        window.location.href = 'user-dashboard.html';
      }
    });
  }
}

// --- 7. SIGNUP PAGE ---
function initSignupPage() {
  initAllNewsletterForms();
  let selectedRole = 'user';
  const roleCards = document.querySelectorAll('.signup-type-card');
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRole = card.getAttribute('data-role');
    });
  });

  // Interest Chips toggle
  const chips = document.querySelectorAll('.interest-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    const fullnameInput = signupForm.querySelector('#signup-fullname');
    const phoneInput = signupForm.querySelector('#signup-phone');
    const emailInput = signupForm.querySelector('#signup-email');
    const passInput = signupForm.querySelector('#signup-password');
    const confirmPassInput = signupForm.querySelector('#signup-confirm-password');
    const termsCheckbox = signupForm.querySelector('#signup-terms');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setupStrictFormValidation(signupForm, [
      {
        field: fullnameInput,
        validate: (val) => {
          if (!val || val.length < 2) return 'Full Name is required';
          return '';
        }
      },
      {
        field: phoneInput,
        validate: (val) => {
          if (!val || val.replace(/\D/g, '').length < 7) {
            return 'Phone number is required (at least 7 digits)';
          }
          return '';
        }
      },
      {
        field: emailInput,
        validate: (val) => {
          if (!val || val.length === 0) return 'Email is required';
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
          return '';
        }
      },
      {
        field: passInput,
        validate: (val) => {
          if (!val || val.length === 0) return 'Password is required';
          if (val.length < 8) return 'Password must be at least 8 characters long';
          if (!(/[a-zA-Z]/.test(val) && /[0-9]/.test(val))) {
            return 'Password must contain both letters and numbers';
          }
          return '';
        }
      },
      {
        field: confirmPassInput,
        validate: (val) => {
          const passVal = passInput ? passInput.value : '';
          if (!val) return 'Please confirm your password';
          if (val !== passVal) return 'Passwords do not match';
          return '';
        }
      },
      {
        field: termsCheckbox,
        validate: (val) => {
          if (!val) return 'You must agree to the Terms of Service to register';
          return '';
        }
      }
    ], () => {
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const fullnameVal = fullnameInput ? fullnameInput.value.trim() : '';
      const nameVal = fullnameVal || deriveNameFromEmail(emailVal);
      if (emailVal) {
        localStorage.setItem('stackly_auth_email', emailVal);
        localStorage.setItem('stackly_auth_name', nameVal);
        localStorage.setItem('stackly_auth_role', selectedRole);
      }
      showToast('Account created successfully! Redirecting to login...', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 700);
    });
  }
}

// --- 8. USER DASHBOARD ---
function initUserDashboard() {
  syncDashboardAuthDetails('user');

  // Sidebar Tab Navigation
  const sidebarLinks = document.querySelectorAll('.dashboard-nav-item');
  const sections = document.querySelectorAll('.dashboard-view-section');
  const mobileSidebarToggle = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const backdrop = document.querySelector('.drawer-backdrop');

  const openSidebar = () => {
    sidebar?.classList.add('open');
    backdrop?.classList.add('active');
    lockBodyScroll();
  };

  const closeSidebar = () => {
    sidebar?.classList.remove('open');
    backdrop?.classList.remove('active');
    unlockBodyScroll();
  };

  const closeBtn = sidebar?.querySelector('#sidebar-close-btn');
  closeBtn?.addEventListener('click', closeSidebar);

  if (mobileSidebarToggle && sidebar) {
    mobileSidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    backdrop?.addEventListener('click', closeSidebar);

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== mobileSidebarToggle) {
        closeSidebar();
      }
    });
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      if (!targetId) return; // for external links like logout
      e.preventDefault();

      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.add('active-view');
        } else {
          sec.classList.remove('active-view');
        }
      });

      closeSidebar();
    });
  });

  // Populate Dashboard Recommended Products
  const recGrid = document.getElementById('user-rec-grid');
  if (recGrid) {
    recGrid.innerHTML = MARKETPLACE_DATA.products.slice(0, 4).map(p => createProductCardHTML(p)).join('');
  }

  // Populate Dashboard Wishlist Tab
  const wishGrid = document.getElementById('user-wishlist-grid');
  if (wishGrid) {
    const wishProds = MARKETPLACE_DATA.wishlist.map(id => MARKETPLACE_DATA.products.find(p => p.id === id)).filter(Boolean);
    wishGrid.innerHTML = wishProds.map(p => createProductCardHTML(p)).join('');
  }

  // Order Status Filter Pills
  const orderPills = document.querySelectorAll('.order-filter-pill');
  orderPills.forEach(pill => {
    pill.addEventListener('click', () => {
      orderPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const status = pill.getAttribute('data-status');
      const rows = document.querySelectorAll('.orders-table tbody tr');

      rows.forEach(row => {
        if (status === 'all' || row.getAttribute('data-status') === status) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // User Profile Form Strict Validation
  const userProfileForm = document.getElementById('user-profile-form');
  if (userProfileForm) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setupStrictFormValidation(userProfileForm, [
      {
        field: '#user-fullname',
        validate: (val) => (!val || val.length < 2 ? 'Please enter your full name.' : '')
      },
      {
        field: '#user-email',
        validate: (val) => {
          if (!val || val.length === 0) return 'Email is required';
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
          return '';
        }
      },
      {
        field: '#user-phone',
        validate: (val) => (!val || val.replace(/\D/g, '').length < 7 ? 'Please enter a valid phone number.' : '')
      },
      {
        field: '#user-currency',
        validate: (val) => (!val ? 'Please select default currency.' : '')
      },
      {
        field: '#user-address',
        validate: (val) => (!val || val.length < 5 ? 'Please enter your shipping address.' : '')
      }
    ], () => {
      const updatedName = document.getElementById('user-fullname')?.value.trim();
      const updatedEmail = document.getElementById('user-email')?.value.trim();
      if (updatedEmail) localStorage.setItem('stackly_auth_email', updatedEmail);
      if (updatedName) localStorage.setItem('stackly_auth_name', updatedName);
      syncDashboardAuthDetails('user');
      showToast('Personal profile and delivery addresses saved successfully!', 'success');
    });
  }

  // User Support Form Strict Validation
  const userSupportForm = document.getElementById('user-support-form');
  if (userSupportForm) {
    setupStrictFormValidation(userSupportForm, [
      {
        field: '#user-ticket-topic',
        validate: (val) => (!val ? 'Please select an inquiry topic.' : '')
      },
      {
        field: '#user-ticket-msg',
        validate: (val) => (!val || val.length < 10 ? 'Please describe your request (minimum 10 characters).' : '')
      }
    ], (form) => {
      showToast('Concierge ticket #TK-8430 opened! Expected response within 8 minutes.', 'success');
      form.reset();
    });
  }
}

// --- 9. CLIENT DASHBOARD ---
function initClientDashboard() {
  syncDashboardAuthDetails('client');

  const sidebarLinks = document.querySelectorAll('.dashboard-nav-item');
  const sections = document.querySelectorAll('.dashboard-view-section');
  const mobileSidebarToggle = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.querySelector('.client-sidebar') || document.querySelector('.dashboard-sidebar');
  const backdrop = document.querySelector('.drawer-backdrop');

  const openSidebar = () => {
    sidebar?.classList.add('open');
    backdrop?.classList.add('active');
    lockBodyScroll();
  };

  const closeSidebar = () => {
    sidebar?.classList.remove('open');
    backdrop?.classList.remove('active');
    unlockBodyScroll();
  };

  const closeBtn = sidebar?.querySelector('#sidebar-close-btn');
  closeBtn?.addEventListener('click', closeSidebar);

  if (mobileSidebarToggle && sidebar) {
    mobileSidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    backdrop?.addEventListener('click', closeSidebar);

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== mobileSidebarToggle) {
        closeSidebar();
      }
    });
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;
      e.preventDefault();

      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.add('active-view');
        } else {
          sec.classList.remove('active-view');
        }
      });

      closeSidebar();
    });
  });

  // Client favorite products
  const clientFavGrid = document.getElementById('client-fav-grid');
  if (clientFavGrid) {
    clientFavGrid.innerHTML = MARKETPLACE_DATA.products.slice(0, 4).map(p => createProductCardHTML(p)).join('');
  }

  // Client Billing Form Strict Validation
  const clientBillingForm = document.getElementById('client-billing-form');
  if (clientBillingForm) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setupStrictFormValidation(clientBillingForm, [
      {
        field: '#client-company',
        validate: (val) => (!val || val.length < 2 ? 'Please enter company legal entity.' : '')
      },
      {
        field: '#client-officer',
        validate: (val) => (!val || val.length < 2 ? 'Please enter primary contact officer name.' : '')
      },
      {
        field: '#client-email',
        validate: (val) => {
          if (!val || val.length === 0) return 'Email is required';
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
          return '';
        }
      },
      {
        field: '#client-currency',
        validate: (val) => (!val ? 'Please select invoicing currency.' : '')
      },
      {
        field: '#client-address',
        validate: (val) => (!val || val.length < 5 ? 'Please enter registered headquarters address.' : '')
      }
    ], () => {
      const updatedOfficer = document.getElementById('client-officer')?.value.trim();
      const updatedEmail = document.getElementById('client-email')?.value.trim();
      const updatedCompany = document.getElementById('client-company')?.value.trim();
      if (updatedEmail) localStorage.setItem('stackly_auth_email', updatedEmail);
      if (updatedCompany) localStorage.setItem('stackly_auth_name', updatedCompany);
      syncDashboardAuthDetails('client');
      showToast('Corporate billing and procurement profile updated successfully!', 'success');
    });
  }

  // Client Support Form Strict Validation
  const clientSupportForm = document.getElementById('client-support-form');
  if (clientSupportForm) {
    setupStrictFormValidation(clientSupportForm, [
      {
        field: '#client-ticket-type',
        validate: (val) => (!val ? 'Please select corporate request type.' : '')
      },
      {
        field: '#client-ticket-msg',
        validate: (val) => (!val || val.length < 10 ? 'Please specify your requirements (minimum 10 characters).' : '')
      }
    ], (form) => {
      showToast('Priority corporate escalation dispatched to Marcus Vance (Senior Director).', 'success');
      form.reset();
    });
  }
}

// Order tracking modal trigger
function openTrackModal(orderId, status, carrier) {
  let modal = document.getElementById('track-order-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'track-order-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container" style="max-width: 600px;">
        <button class="modal-close-btn" onclick="document.getElementById('track-order-modal').classList.remove('active')"><i class="fas fa-times"></i></button>
        <div id="track-modal-content" style="padding: 2rem;"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const content = document.getElementById('track-modal-content');
  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <span class="section-badge emerald">Live Logistics Sync</span>
      <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--primary-navy); margin-top: 0.5rem;">Tracking ${orderId}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Carrier: <strong>${carrier || 'FedEx Priority Express'}</strong> &bull; Status: <span style="color: var(--accent-emerald); font-weight: 700;">${status}</span></p>
    </div>

    <div style="position: relative; padding-left: 2rem; border-left: 3px solid var(--accent-blue); margin: 0 1.5rem 1.5rem;">
      <div style="margin-bottom: 1.5rem; position: relative;">
        <div style="position: absolute; left: -2.65rem; top: 0; width: 18px; height: 18px; border-radius: 50%; background: var(--accent-emerald); border: 3px solid #fff;"></div>
        <div style="font-weight: 700; color: var(--primary-navy);">Order Placed & Verified</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Sept 28, 2026 - 10:14 AM</div>
      </div>
      <div style="margin-bottom: 1.5rem; position: relative;">
        <div style="position: absolute; left: -2.65rem; top: 0; width: 18px; height: 18px; border-radius: 50%; background: var(--accent-emerald); border: 3px solid #fff;"></div>
        <div style="font-weight: 700; color: var(--primary-navy);">Dispatched from Regional Fulfillment Hub</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Sept 28, 2026 - 04:30 PM</div>
      </div>
      <div style="margin-bottom: 1.5rem; position: relative;">
        <div style="position: absolute; left: -2.65rem; top: 0; width: 18px; height: 18px; border-radius: 50%; background: var(--accent-blue); border: 3px solid #fff; box-shadow: 0 0 10px rgba(37,99,235,0.5);"></div>
        <div style="font-weight: 700; color: var(--accent-blue);">In Transit - Out for Final Delivery</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Sept 29, 2026 - 08:45 AM (Expected today by 5:00 PM)</div>
      </div>
    </div>

    <div style="text-align: center;">
      <button class="btn btn-secondary btn-sm" onclick="document.getElementById('track-order-modal').classList.remove('active')">Close Tracker</button>
    </div>
  `;

  modal.classList.add('active');
}

// Global checkout modal trigger simulation
function openCheckoutModal() {
  if (MARKETPLACE_DATA.cart.length === 0) {
    return;
  }

  let modal = document.getElementById('checkout-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container" style="max-width: 550px;">
        <button class="modal-close-btn" onclick="document.getElementById('checkout-modal').classList.remove('active')"><i class="fas fa-times"></i></button>
        <div style="padding: 2.2rem;">
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="width: 55px; height: 55px; background: var(--accent-blue-subtle); color: var(--accent-blue); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem;">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--primary-navy);">Secure Escrow Checkout</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Your payment is safely protected until delivery is verified.</p>
          </div>
          
          <form id="checkout-form" onsubmit="event.preventDefault(); simulateOrderPlacement();">
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--text-main);">Delivery Address</label>
              <input type="text" value="742 Evergreen Terrace, San Francisco, CA" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--card-border); border-radius: var(--radius-sm); font-size: 0.9rem;">
            </div>
            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--text-main);">Payment Method</label>
              <select style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--card-border); border-radius: var(--radius-sm); font-size: 0.9rem;">
                <option>Credit Card (Mastercard •••• 4892)</option>
                <option>Apple Pay / Google Pay</option>
                <option>Escrow Wire Transfer</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              <i class="fas fa-lock"></i> Authorize & Place Order
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.classList.add('active');
}

function simulateOrderPlacement() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');
  const cartDrawer = document.getElementById('cart-drawer');
  if (cartDrawer) cartDrawer.classList.remove('open');
  document.querySelector('.drawer-backdrop')?.classList.remove('active');

  MARKETPLACE_DATA.cart = [];
  updateBadgeCounters();
  renderCartItems();

  window.location.href = '404.html';
}

// --- PASSWORD VISIBILITY TOGGLE ---
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
    btn.setAttribute('title', 'Hide password');
  } else {
    input.type = 'password';
    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
    btn.setAttribute('title', 'Show password');
  }
}

// --- UNIVERSAL 404 REDIRECTION FOR ALL BUTTONS, LINKS, ICONS & CARDS ---
document.addEventListener('click', (e) => {
  const currentPath = window.location.pathname.toLowerCase();

  // 1. Never intercept on 404 page itself (allows Go Back and Back to Homepage)
  if (currentPath.includes('404')) return;

  // 2. Allow form elements and submissions to execute without being intercepted
  if (e.target.closest('form, input, textarea, select')) return;

  // 3. Allow UI navigation controls:
  // - Hamburger & Mobile Drawer Toggles
  if (e.target.closest('.hamburger-btn, .close-drawer-btn, .drawer-backdrop, .mobile-nav-drawer')) return;

  // - FAQ Accordion toggles
  if (e.target.closest('.faq-question')) return;

  // - Password visibility toggles
  if (e.target.closest('.password-toggle-btn')) return;

  // - Account type selector cards & Back buttons on Auth pages
  if (e.target.closest('.account-type-card, .signup-type-card, .auth-back-btn, .signup-back-btn, .checkbox-label')) return;

  // - Allow all actual page navigation links (login.html, signup.html, index.html, about.html, services.html, blog.html, contact.html, user-dashboard.html, client-dashboard.html)
  const actualLink = e.target.closest('a');
  if (actualLink) {
    const href = actualLink.getAttribute('href');
    if (href && (href.endsWith('.html') || href.includes('.html')) && !href.includes('javascript') && !href.includes('404')) {
      return; // Allow standard page-to-page navigation
    }
  }

  // - Dashboard Sidebar Menu Navigation (allows switching dashboard tabs and logout)
  if (currentPath.includes('dashboard')) {
    if (e.target.closest('.dashboard-sidebar, .client-sidebar, #sidebar-toggle-btn')) {
      return;
    }
  }

  // 4. Identify if target or parent is an interactive button, non-page link, icon, or card
  const interactiveTarget = e.target.closest(`
    a, 
    button, 
    .btn,
    i,
    [class*="icon"],
    [class*="card"],
    [class*="pill"],
    [class*="chip"],
    [class*="badge"],
    .product-card,
    .feature-card,
    .category-card,
    .promo-card,
    .guide-card,
    .story-card,
    .trust-card,
    .ecosystem-card,
    .mission-card,
    .contact-card-box,
    .workflow-node,
    .stat-card,
    .dash-stat-card,
    .spending-stat-card,
    .footer-links a,
    .footer-social-btn,
    .footer-map-btn
  `);

  if (interactiveTarget) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '404.html';
  }
}, true);




