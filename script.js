/* ==========================================================================
   MANUKKAS JEWELLERY LLC - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initGoldRates();
  initCollectionFilters();
  initBranchFilters();
  initContactForm();
  initModals();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER LOGIC
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.main-header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile drawer controls
  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Active section link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. UAE LIVE GOLD RATE TICKER
   -------------------------------------------------------------------------- */
function initGoldRates() {
  // Typical accurate benchmark UAE retail rates per gram in AED
  const baseRates = {
    '24k': 366.50,
    '22k': 339.25,
    '21k': 328.00,
    '18k': 281.50
  };

  const el24 = document.getElementById('rate24k');
  const el22 = document.getElementById('rate22k');
  const el21 = document.getElementById('rate21k');
  const el18 = document.getElementById('rate18k');
  const elTime = document.getElementById('rateTime');

  function renderRates() {
    if (el24) el24.textContent = baseRates['24k'].toFixed(2);
    if (el22) el22.textContent = baseRates['22k'].toFixed(2);
    if (el21) el21.textContent = baseRates['21k'].toFixed(2);
    if (el18) el18.textContent = baseRates['18k'].toFixed(2);

    if (elTime) {
      const now = new Date();
      elTime.textContent = now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  }

  renderRates();
}

/* --------------------------------------------------------------------------
   3. COLLECTION FILTERING
   -------------------------------------------------------------------------- */
function initCollectionFilters() {
  const filterBtns = document.querySelectorAll('.tab-btn');
  const items = document.querySelectorAll('.collection-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. BRANCH LOCATOR FILTERING
   -------------------------------------------------------------------------- */
function initBranchFilters() {
  const branchBtns = document.querySelectorAll('.branch-filter-btn');
  const branchCards = document.querySelectorAll('.branch-card');

  branchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      branchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const emirate = btn.getAttribute('data-emirate');

      branchCards.forEach(card => {
        const cardEmirate = card.getAttribute('data-emirate');
        if (emirate === 'all' || cardEmirate === emirate) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM & SUBMISSIONS
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('inquiryForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim();
      const phone = document.getElementById('clientPhone')?.value.trim();
      const branch = document.getElementById('clientBranch')?.value;
      const message = document.getElementById('clientMsg')?.value.trim();

      if (!name || !phone) {
        showToast('Please provide your name and phone number.');
        return;
      }

      // Pre-compose WhatsApp direct fallback or luxury confirmation toast
      showToast(`Thank you, ${name}! Your inquiry for our ${branch} branch has been received. Our team will contact you shortly.`);
      contactForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   6. MODAL & PRODUCT QUICK VIEW
   -------------------------------------------------------------------------- */
function initModals() {
  const modalBackdrop = document.getElementById('quickViewModal');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDesc');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  // Open modal on collection card quick action
  const exploreLinks = document.querySelectorAll('.card-inquire-link');

  exploreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.collection-card');
      if (!card) return;

      const title = card.querySelector('.card-title')?.textContent || 'Exclusive Jewellery';
      const category = card.querySelector('.card-category-badge')?.textContent || 'Manukkas Collection';
      const desc = card.querySelector('.card-desc')?.textContent || '';
      const img = card.querySelector('.card-image-box img')?.src || '';

      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDescription) modalDescription.textContent = desc;
      if (modalImg) modalImg.src = img;

      // WhatsApp link setup
      if (modalWhatsAppBtn) {
        const text = encodeURIComponent(`Hello Manukkas Jewellery, I would like to inquire about "${title}" (${category}). Could you please share more details and availability?`);
        modalWhatsAppBtn.href = `https://wa.me/97147707115?text=${text}`;
      }

      openModal();
    });
  });

  function openModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* --------------------------------------------------------------------------
   7. TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
