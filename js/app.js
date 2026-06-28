// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPWA();
  initLucideIcons();
  initHeader();
  initHeroSimulation();
  renderServices();
  initGrowthCalculator();
  initProofOfSuccess();
  renderCaseStudies();
  renderFAQs();
  initWhatsAppModal();
});

function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Check local storage or system preference
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function updateIcon() {
    if (!themeToggleBtn) return;
    const isDark = document.documentElement.classList.contains('dark');
    themeToggleBtn.innerHTML = isDark 
      ? '<i data-lucide="sun" class="h-5 w-5"></i>' 
      : '<i data-lucide="moon" class="h-5 w-5"></i>';
    if (window.lucide) window.lucide.createIcons();
  }

  // Initial icon set
  updateIcon();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
      updateIcon();
    });
  }
}

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ---------------- HEADER & SCROLL ----------------
function initHeader() {
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('bg-zinc-950/80', 'border-b', 'border-zinc-900', 'backdrop-blur-md', 'py-3');
      header.classList.remove('bg-transparent', 'py-5');
    } else {
      header.classList.remove('bg-zinc-950/80', 'border-b', 'border-zinc-900', 'backdrop-blur-md', 'py-3');
      header.classList.add('bg-transparent', 'py-5');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Active Nav Link highlighting based on current URL
  const currentPath = window.location.pathname;
  let currentActive = 'home';
  if (currentPath.includes('services.html')) currentActive = 'services';
  else if (currentPath.includes('results.html')) currentActive = 'proof';
  else if (currentPath.includes('about.html')) currentActive = 'about';
  else if (currentPath.includes('contact.html')) currentActive = 'contact';

  navLinks.forEach(link => {
    const target = link.getAttribute('data-target');
    if (target === currentActive) {
      link.classList.add('text-white');
      link.classList.remove('text-zinc-400');
      const underline = link.querySelector('.nav-underline');
      if (underline) underline.classList.remove('hidden');
    } else {
      link.classList.remove('text-white');
      link.classList.add('text-zinc-400');
      const underline = link.querySelector('.nav-underline');
      if (underline) underline.classList.add('hidden');
    }
  });
}

// ---------------- HERO SIMULATION ----------------
function initHeroSimulation() {
  const folEl = document.getElementById('sim-followers');
  if (!folEl) return; // Exit if not on home page

  const viewEl = document.getElementById('sim-views');
  const likeEl = document.getElementById('sim-likes');
  const shareEl = document.getElementById('sim-shares');
  const progBar = document.getElementById('sim-progress');
  const progText = document.getElementById('sim-progress-text');
  const restartBtn = document.getElementById('sim-restart');
  const simIndicator = document.getElementById('sim-indicator');
  const simBtnText = document.getElementById('sim-btn-text');

  let followers = 142;
  let views = 820;
  let likes = 38;
  let shares = 12;
  let isSimulating = true;
  let interval;

  function updateDOM() {
    folEl.innerText = followers >= 1000 ? (followers/1000).toFixed(1)+'k' : followers;
    viewEl.innerText = views >= 1000 ? (views/1000).toFixed(1)+'k' : views;
    likeEl.innerText = likes >= 1000 ? (likes/1000).toFixed(1)+'k' : likes;
    shareEl.innerText = shares >= 1000 ? (shares/1000).toFixed(1)+'k' : shares;
    
    const pct = Math.floor(Math.min((followers / 15400) * 100, 100));
    progText.innerText = pct + '%';
    progBar.style.width = pct + '%';
  }

  function tick() {
    if (!isSimulating) return;
    
    if (followers >= 15400) {
      followers = 15400;
      isSimulating = false;
      simIndicator.classList.remove('bg-cyan-400', 'animate-ping');
      simIndicator.classList.add('bg-zinc-600');
      simBtnText.innerText = 'REPLAY SIMULATION ↺';
      clearInterval(interval);
    } else {
      followers = Math.min(followers + Math.floor(Math.random() * 25) + 15, 15400);
    }

    views = Math.min(views + Math.floor(Math.random() * 450) + 250, 254000);
    likes = Math.min(likes + Math.floor(Math.random() * 110) + 60, 58200);
    shares = Math.min(shares + Math.floor(Math.random() * 5) + 2, 1840);

    updateDOM();
  }

  function start() {
    followers = 142; views = 820; likes = 38; shares = 12;
    isSimulating = true;
    simIndicator.classList.add('bg-cyan-400', 'animate-ping');
    simIndicator.classList.remove('bg-zinc-600');
    simBtnText.innerText = 'SIMULATING BOOST...';
    updateDOM();
    if(interval) clearInterval(interval);
    interval = setInterval(tick, 150);
  }

  if (restartBtn) restartBtn.addEventListener('click', start);
  start();
}

// ---------------- SERVICES RENDERING ----------------
function renderServices() {
  const packagesBtn = document.getElementById('tab-packages-btn');
  const professionalBtn = document.getElementById('tab-professional-btn');
  const packagesContainer = document.getElementById('packages-container');
  const professionalContainer = document.getElementById('professional-container');

  if (!packagesContainer || !professionalContainer) return;

  function renderIcon(name) {
    if(name === 'UserCheck') return '<i data-lucide="user-check" class="h-6 w-6 text-cyan-400"></i>';
    if(name === 'TrendingUp') return '<i data-lucide="trending-up" class="h-6 w-6 text-cyan-400"></i>';
    if(name === 'Users') return '<i data-lucide="users" class="h-6 w-6 text-cyan-400"></i>';
    return '<i data-lucide="sparkles" class="h-6 w-6 text-cyan-400"></i>';
  }

  packagesContainer.innerHTML = GROWTH_PACKAGES.map(pkg => `
    <div class="relative rounded-3xl bg-zinc-950 border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${pkg.isPopular ? 'border-pink-500/75 shadow-xl shadow-pink-500/5 ring-1 ring-pink-500/30 -translate-y-2' : 'border-zinc-800 hover:border-zinc-700 hover:-translate-y-1'}">
      ${pkg.isPopular ? `
      <div class="absolute top-0 right-0">
        <span class="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-[10px] font-black tracking-wider uppercase px-4 py-1.5 rounded-bl-2xl rounded-tr-sm">
          <i data-lucide="sparkles" class="h-3 w-3 animate-spin"></i> Best Seller
        </span>
      </div>` : ''}
      <div class="p-6">
        <h3 class="text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors">${pkg.name}</h3>
        <div class="mt-4 flex items-baseline">
          <span class="text-zinc-400 text-xs font-bold mr-1">KSh</span>
          <span class="text-3xl sm:text-4xl font-black text-white tracking-tight">${pkg.priceKsh.toLocaleString()}</span>
          <span class="text-zinc-500 text-xs ml-2 font-medium">/ campaign</span>
        </div>
        <p class="text-zinc-500 text-[11px] mt-2 flex items-center gap-1">
          🚀 Estimated Delivery: <span class="text-zinc-300 font-semibold">${pkg.deliveryTime}</span>
        </p>
        <hr class="border-zinc-900 my-5" />
        <div class="grid grid-cols-2 gap-3 mb-6 bg-zinc-900/40 p-3 rounded-2xl border border-zinc-900/60">
          <!-- Metrics -->
          <div class="flex items-center gap-1.5"><i data-lucide="users" class="h-3.5 w-3.5 text-cyan-400 flex-shrink-0"></i><div class="text-left"><p class="text-[9px] text-zinc-500 font-bold uppercase leading-none">Followers</p><p class="text-xs font-black text-white mt-0.5">+${pkg.followers.toLocaleString()}</p></div></div>
          <div class="flex items-center gap-1.5"><i data-lucide="eye" class="h-3.5 w-3.5 text-pink-500 flex-shrink-0"></i><div class="text-left"><p class="text-[9px] text-zinc-500 font-bold uppercase leading-none">Views</p><p class="text-xs font-black text-white mt-0.5">+${pkg.views.toLocaleString()}</p></div></div>
          <div class="flex items-center gap-1.5"><i data-lucide="heart" class="h-3.5 w-3.5 text-red-500 flex-shrink-0"></i><div class="text-left"><p class="text-[9px] text-zinc-500 font-bold uppercase leading-none">Likes</p><p class="text-xs font-black text-white mt-0.5">+${pkg.likes.toLocaleString()}</p></div></div>
          <div class="flex items-center gap-1.5"><i data-lucide="message-square" class="h-3.5 w-3.5 text-emerald-400 flex-shrink-0"></i><div class="text-left"><p class="text-[9px] text-zinc-500 font-bold uppercase leading-none">Comments</p><p class="text-xs font-black text-white mt-0.5">+${pkg.comments.toLocaleString()}</p></div></div>
          <div class="flex items-center gap-1.5"><i data-lucide="share-2" class="h-3.5 w-3.5 text-indigo-400 flex-shrink-0"></i><div class="text-left"><p class="text-[9px] text-zinc-500 font-bold uppercase leading-none">Shares</p><p class="text-xs font-black text-white mt-0.5">+${pkg.shares.toLocaleString()}</p></div></div>
          <div class="flex items-center gap-1.5"><i data-lucide="users" class="h-3.5 w-3.5 text-violet-400 flex-shrink-0"></i><div class="text-left"><p class="text-[9px] text-zinc-500 font-bold uppercase leading-none">Profile Views</p><p class="text-xs font-black text-white mt-0.5">+${pkg.profileViews.toLocaleString()}</p></div></div>
        </div>
        <ul class="space-y-2.5">
          ${pkg.features.map(f => `<li class="flex items-start gap-2 text-xs text-zinc-400"><i data-lucide="check" class="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5"></i><span>${f}</span></li>`).join('')}
        </ul>
      </div>
      <div class="p-6 pt-0 mt-auto">
        <button onclick="window.openModalWithData('package', '${pkg.id}')" class="w-full py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${pkg.isPopular ? 'bg-gradient-to-r from-cyan-500 to-pink-500 hover:opacity-90 text-white shadow-md shadow-pink-500/10' : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white'}">
          Boost with ${pkg.name}
        </button>
      </div>
    </div>
  `).join('');

  professionalContainer.innerHTML = PROFESSIONAL_SERVICES.map(srv => `
    <div class="relative rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 p-8 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group">
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all">
            ${renderIcon(srv.icon)}
          </div>
          <div>
            <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">${srv.title}</h3>
            <span class="text-xs font-semibold text-pink-400">${srv.price}</span>
          </div>
        </div>
        <p class="text-zinc-400 text-sm leading-relaxed">${srv.description}</p>
        <hr class="border-zinc-900" />
        <div class="space-y-3">
          <p class="text-xs font-bold text-white uppercase tracking-wider">What you get:</p>
          <ul class="space-y-2.5">
            ${srv.bullets.map(b => `<li class="flex items-start gap-2 text-xs text-zinc-400"><i data-lucide="check" class="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5"></i><span class="leading-relaxed">${b}</span></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="pt-8 mt-auto">
        <button onclick="window.openModalWithData('service', '${srv.id}')" class="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer">
          Inquire About ${srv.title.split(' ').slice(-2).join(' ')}
        </button>
      </div>
    </div>
  `).join('');

  if(window.lucide) window.lucide.createIcons();

  packagesBtn.addEventListener('click', () => {
    packagesBtn.className = "flex-1 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-md";
    professionalBtn.className = "flex-1 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/40";
    packagesContainer.classList.remove('hidden');
    professionalContainer.classList.add('hidden');
  });

  professionalBtn.addEventListener('click', () => {
    professionalBtn.className = "flex-1 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-md";
    packagesBtn.className = "flex-1 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/40";
    professionalContainer.classList.remove('hidden');
    packagesContainer.classList.add('hidden');
  });
}

// ---------------- GROWTH CALCULATOR ----------------
function initGrowthCalculator() {
  const inputs = {
    followers: document.getElementById('calc-followers'),
    views: document.getElementById('calc-views'),
    likes: document.getElementById('calc-likes'),
    comments: document.getElementById('calc-comments'),
    shares: document.getElementById('calc-shares'),
    profileViews: document.getElementById('calc-profileViews')
  };

  if (!inputs.followers) return;

  const displays = {
    followers: document.querySelectorAll('.disp-followers'),
    views: document.querySelectorAll('.disp-views'),
    likes: document.querySelectorAll('.disp-likes'),
    comments: document.querySelectorAll('.disp-comments'),
    shares: document.querySelectorAll('.disp-shares'),
    profileViews: document.querySelectorAll('.disp-profileViews')
  };

  const priceEl = document.getElementById('calc-price');
  const daysEl = document.getElementById('calc-days');
  const ctaBtn = document.getElementById('calc-order-btn');

  function calculate() {
    const f = parseInt(inputs.followers.value);
    const v = parseInt(inputs.views.value);
    const l = parseInt(inputs.likes.value);
    const c = parseInt(inputs.comments.value);
    const s = parseInt(inputs.shares.value);
    const p = parseInt(inputs.profileViews.value);

    // Update displays
    displays.followers.forEach(el => el.innerText = f.toLocaleString());
    displays.views.forEach(el => el.innerText = v.toLocaleString());
    displays.likes.forEach(el => el.innerText = l.toLocaleString());
    displays.comments.forEach(el => el.innerText = c.toLocaleString());
    displays.shares.forEach(el => el.innerText = s.toLocaleString());
    displays.profileViews.forEach(el => el.innerText = p.toLocaleString());

    const rawPrice = (f * 1.1) + (v * 0.08) + (l * 0.45) + (c * 2.0) + (s * 0.8) + (p * 0.2);
    const totalVolume = f + v + l + c + s + p;
    let discountPercent = 0;
    if (totalVolume > 50000) discountPercent = 0.35;
    else if (totalVolume > 20000) discountPercent = 0.25;
    else if (totalVolume > 5000) discountPercent = 0.15;
    else if (totalVolume > 1000) discountPercent = 0.05;

    const finalPrice = Math.max(800, Math.round(rawPrice * (1 - discountPercent)));
    priceEl.innerText = finalPrice.toLocaleString();

    let days = 1;
    if (f > 10000 || v > 50000) days = 4;
    else if (f > 5000 || v > 20000) days = 3;
    else if (f > 2000 || v > 8000) days = 2;
    daysEl.innerText = days === 1 ? 'Within 24 Hours' : `${days} Days`;

    window.currentCustomPackage = { followers: f, views: v, likes: l, comments: c, shares: s, profileViews: p, price: finalPrice };
  }

  Object.values(inputs).forEach(input => {
    if(input) input.addEventListener('input', calculate);
  });

  if(ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      window.openModalWithData('custom', null);
    });
  }

  calculate();
}

// ---------------- PROOF OF SUCCESS ----------------
function initProofOfSuccess() {
  const slider = document.getElementById('proof-slider');
  const clipDiv = document.getElementById('proof-after-clip');
  const handle = document.getElementById('proof-slider-handle');

  if(slider) {
    slider.addEventListener('input', (e) => {
      const val = e.target.value;
      clipDiv.style.clipPath = `inset(0px ${100 - val}% 0px 0px)`;
      handle.style.left = `${val}%`;
    });
  }

  // Live Ticker
  const tickerContainer = document.getElementById('live-ticker');
  if(!tickerContainer) return;

  const handles = ['@sheila_beauty', '@quick_delivery_ke', '@kristine_vlogs', '@vocal_coach_nrb', '@diner_254', '@sneakerhead_ke', '@shoppe_nrb'];
  const actions = ['completed 1,000 followers boost', 'received 5,000 views package', 'unlocked 500 likes campaign', 'completed 150 shares boost'];
  
  setInterval(() => {
    const handle = handles[Math.floor(Math.random() * handles.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const newEl = document.createElement('div');
    newEl.className = "flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-900/80 animate-fade-in";
    newEl.innerHTML = `
      <div class="flex items-center gap-2.5">
        <div class="h-8 w-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-black text-[10px] text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-pink-500">T</div>
        <div><p class="text-xs font-bold text-white leading-none">${handle}</p><p class="text-[10px] text-zinc-500 mt-1 leading-none">${action}</p></div>
      </div>
      <span class="text-[9px] text-emerald-400 font-semibold flex items-center gap-1"><i data-lucide="clock" class="h-3 w-3 flex-shrink-0"></i>Just now</span>
    `;
    tickerContainer.prepend(newEl);
    if(tickerContainer.children.length > 5) {
      tickerContainer.removeChild(tickerContainer.lastChild);
    }
    if(window.lucide) window.lucide.createIcons();
  }, 4500);
}

// ---------------- CASE STUDIES ----------------
function renderCaseStudies() {
  const container = document.getElementById('case-studies-container');
  if(!container) return;
  container.innerHTML = CASE_STUDIES.map(study => `
    <div class="rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 p-6 transition-all duration-300 flex flex-col justify-between">
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-extrabold text-pink-400 uppercase tracking-wider bg-pink-500/5 px-2.5 py-1 rounded-full border border-pink-500/10">${study.niche}</span>
          <span class="text-[10px] text-zinc-500 font-medium">Campaign: ${study.duration}</span>
        </div>
        <div class="flex items-center gap-3">
          <img src="${study.avatarUrl}" alt="${study.username}" class="h-10 w-10 rounded-full border border-zinc-800 object-cover" />
          <div><h4 class="text-sm font-extrabold text-white">${study.username}</h4><p class="text-[10px] text-emerald-400 font-bold">Successful Optimization</p></div>
        </div>
        <hr class="border-zinc-900" />
        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div class="bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-900/60"><p class="text-[8px] text-zinc-500 font-bold uppercase">Metric</p><p class="text-[10px] text-zinc-400 font-semibold mt-1">Followers</p><p class="text-[10px] text-zinc-400 font-semibold">Views</p><p class="text-[10px] text-zinc-400 font-semibold">Likes</p><p class="text-[10px] text-zinc-400 font-semibold">Engage%</p></div>
          <div class="bg-zinc-900/20 p-2.5 rounded-xl border border-zinc-900/40"><p class="text-[8px] text-zinc-500 font-bold uppercase">Before</p><p class="text-[10px] text-zinc-400 mt-1">${study.before.followers.toLocaleString()}</p><p class="text-[10px] text-zinc-400">${study.before.views.toLocaleString()}</p><p class="text-[10px] text-zinc-400">${study.before.likes.toLocaleString()}</p><p class="text-[10px] text-zinc-400">${study.before.engagementRate}</p></div>
          <div class="bg-cyan-950/10 p-2.5 rounded-xl border border-cyan-900/30"><p class="text-[8px] text-cyan-400 font-bold uppercase">After</p><p class="text-[10px] text-white font-extrabold mt-1">${(study.after.followers/1000).toFixed(1)}k</p><p class="text-[10px] text-white font-extrabold">${(study.after.views/1000).toFixed(0)}k</p><p class="text-[10px] text-white font-extrabold">${(study.after.likes/1000).toFixed(1)}k</p><p class="text-[10px] text-cyan-400 font-extrabold">${study.after.engagementRate}</p></div>
        </div>
        <hr class="border-zinc-900" />
        <div class="space-y-1.5"><p class="text-[10px] text-white font-extrabold uppercase tracking-wider">Strategy Deployed:</p><p class="text-zinc-400 text-xs leading-relaxed">${study.strategy}</p></div>
      </div>
    </div>
  `).join('');
}

// ---------------- FAQS ----------------
function renderFAQs() {
  const container = document.getElementById('faqs-container');
  if(!container) return;
  container.innerHTML = FAQS.map((faq, idx) => `
    <div class="rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-all duration-200 bg-zinc-950 overflow-hidden faq-item">
      <button class="faq-btn w-full p-5 flex items-center justify-between text-left focus:outline-none" data-idx="${idx}">
        <span class="text-sm font-extrabold text-white leading-snug">${faq.question}</span>
        <i data-lucide="chevron-down" class="faq-icon h-4 w-4 text-zinc-500 flex-shrink-0 ml-3"></i>
      </button>
      <div class="faq-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
        <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed p-5 border-t border-zinc-900 bg-zinc-900/10">${faq.answer}</p>
      </div>
    </div>
  `).join('');
  
  if(window.lucide) window.lucide.createIcons();

  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const content = parent.querySelector('.faq-content');
      const icon = parent.querySelector('.faq-icon');
      
      const isOpen = content.classList.contains('max-h-56');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('border-cyan-500/50', 'shadow-md', 'shadow-cyan-500/5');
        item.classList.add('border-zinc-900');
        const c = item.querySelector('.faq-content');
        c.classList.remove('max-h-56', 'opacity-100');
        c.classList.add('max-h-0', 'opacity-0');
        const i = item.querySelector('.faq-icon');
        i.setAttribute('data-lucide', 'chevron-down');
        i.classList.remove('text-cyan-400');
        i.classList.add('text-zinc-500');
      });

      if(!isOpen) {
        parent.classList.add('border-cyan-500/50', 'shadow-md', 'shadow-cyan-500/5');
        parent.classList.remove('border-zinc-900');
        content.classList.remove('max-h-0', 'opacity-0');
        content.classList.add('max-h-56', 'opacity-100');
        icon.setAttribute('data-lucide', 'chevron-up');
        icon.classList.remove('text-zinc-500');
        icon.classList.add('text-cyan-400');
      }
      if(window.lucide) window.lucide.createIcons();
    });
  });
}

// ---------------- WHATSAPP MODAL & FORMS ----------------
let modalOrderTitle = 'TikTok Growth Services';
let modalOrderPrice = '';
let modalCustomData = null;
let currentStep = 1;
let mHasVideo = null;
let mAcceptPromo = null;

window.openModalWithData = (type, id) => {
  if(type === 'package') {
    const pkg = GROWTH_PACKAGES.find(p => p.id === id);
    modalOrderTitle = pkg.name;
    modalOrderPrice = 'KSh ' + pkg.priceKsh.toLocaleString();
    modalCustomData = null;
  } else if(type === 'service') {
    const srv = PROFESSIONAL_SERVICES.find(s => s.id === id);
    modalOrderTitle = srv.title;
    modalOrderPrice = srv.price;
    modalCustomData = null;
  } else if(type === 'custom') {
    modalOrderTitle = 'Custom Growth Package';
    modalOrderPrice = 'KSh ' + window.currentCustomPackage.price.toLocaleString();
    modalCustomData = window.currentCustomPackage;
  } else {
    // default
    const pkg = GROWTH_PACKAGES[1];
    modalOrderTitle = pkg.name;
    modalOrderPrice = 'KSh ' + pkg.priceKsh.toLocaleString();
    modalCustomData = null;
  }
  openModal();
};

function openModal() {
  document.getElementById('wa-modal').classList.remove('hidden');
  document.getElementById('wa-modal').classList.add('flex');
  document.body.style.overflow = 'hidden';
  resetModal();
  updateModalUI();
}

function closeModal() {
  document.getElementById('wa-modal').classList.add('hidden');
  document.getElementById('wa-modal').classList.remove('flex');
  document.body.style.overflow = 'auto';
}

function resetModal() {
  currentStep = 1;
  document.getElementById('modal-username').value = '';
  document.getElementById('modal-video').value = '';
  mHasVideo = null;
  mAcceptPromo = null;
  document.getElementById('err-username').classList.add('hidden');
  document.getElementById('err-reqs').classList.add('hidden');
}

function updateModalUI() {
  document.getElementById('modal-order-title').innerText = modalOrderTitle;
  document.getElementById('modal-order-price').innerText = modalOrderPrice;

  // Steps UI
  document.getElementById('step-1-content').classList.toggle('hidden', currentStep !== 1);
  document.getElementById('step-2-content').classList.toggle('hidden', currentStep !== 2);
  document.getElementById('step-3-content').classList.toggle('hidden', currentStep !== 3);
  
  const stepIndicators = [document.getElementById('ind-1'), document.getElementById('ind-2'), document.getElementById('ind-3')];
  stepIndicators.forEach((ind, i) => {
    const idx = i + 1;
    if(currentStep >= idx) {
      if(idx === 1) ind.className = "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold bg-cyan-500 text-black";
      if(idx === 2) ind.className = "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold bg-pink-500 text-white";
      if(idx === 3) ind.className = "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold bg-emerald-500 text-black";
      ind.nextElementSibling.classList.add('text-white');
      ind.nextElementSibling.classList.remove('text-zinc-500');
    } else {
      ind.className = "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-400";
      ind.nextElementSibling.classList.remove('text-white');
      ind.nextElementSibling.classList.add('text-zinc-500');
    }
  });

  const btnBack = document.getElementById('btn-modal-back');
  const btnNext = document.getElementById('btn-modal-next');
  const btnLaunch = document.getElementById('btn-modal-launch');

  if(currentStep > 1) {
    btnBack.innerText = "Back";
    btnBack.onclick = () => { currentStep--; updateModalUI(); };
  } else {
    btnBack.innerText = "Cancel";
    btnBack.onclick = closeModal;
  }

  if(currentStep < 3) {
    btnNext.classList.remove('hidden');
    btnLaunch.classList.add('hidden');
  } else {
    btnNext.classList.add('hidden');
    btnLaunch.classList.remove('hidden');
    
    // Fill preview
    const username = document.getElementById('modal-username').value;
    const video = document.getElementById('modal-video').value;
    document.getElementById('prev-title').innerText = modalOrderTitle;
    document.getElementById('prev-price').innerText = modalOrderPrice;
    document.getElementById('prev-user').innerText = username.startsWith('@') ? username : '@'+username;
    document.getElementById('prev-video').innerText = video || 'N/A';
  }

  // Req buttons
  const r1 = document.getElementById('req-1-btn');
  if(mHasVideo) { r1.classList.add('bg-emerald-500', 'border-emerald-500', 'text-black'); r1.classList.remove('border-zinc-700', 'text-transparent'); }
  else { r1.classList.remove('bg-emerald-500', 'border-emerald-500', 'text-black'); r1.classList.add('border-zinc-700', 'text-transparent'); }

  const r2 = document.getElementById('req-2-btn');
  if(mAcceptPromo) { r2.classList.add('bg-emerald-500', 'border-emerald-500', 'text-black'); r2.classList.remove('border-zinc-700', 'text-transparent'); }
  else { r2.classList.remove('bg-emerald-500', 'border-emerald-500', 'text-black'); r2.classList.add('border-zinc-700', 'text-transparent'); }
}

function initWhatsAppModal() {
  document.querySelectorAll('[data-open-modal]').forEach(el => {
    el.addEventListener('click', () => window.openModalWithData('default', null));
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);

  document.getElementById('btn-modal-next').addEventListener('click', () => {
    if(currentStep === 1) {
      const u = document.getElementById('modal-username').value;
      if(!u.trim()) {
        document.getElementById('err-username').classList.remove('hidden');
        return;
      }
      document.getElementById('err-username').classList.add('hidden');
      currentStep++;
    } else if (currentStep === 2) {
      if(!mHasVideo || !mAcceptPromo) {
        document.getElementById('err-reqs').classList.remove('hidden');
        return;
      }
      document.getElementById('err-reqs').classList.add('hidden');
      currentStep++;
    }
    updateModalUI();
  });

  document.getElementById('req-1-btn').addEventListener('click', () => { mHasVideo = true; updateModalUI(); });
  document.getElementById('req-2-btn').addEventListener('click', () => { mAcceptPromo = true; updateModalUI(); });

  document.getElementById('btn-modal-launch').addEventListener('click', () => {
    const username = document.getElementById('modal-username').value;
    const video = document.getElementById('modal-video').value;
    let msg = `Hello TokGrow, I would like to order: *${modalOrderTitle}* (${modalOrderPrice}).\n\n`;
    msg += `*My TikTok Username:* ${username.startsWith('@') ? username : '@'+username}\n`;
    if(video) msg += `*TikTok Video Link:* ${video}\n`;
    msg += `*Requirements Confirmed:*\n- Video posted: Yes\n- Promotional requests accepted: Yes\n\n`;
    msg += `Please guide me on the payment process via M-Pesa to initiate the campaign!`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
  });

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if(contactForm) {
    const srvSelect = document.getElementById('contact-service');
    GROWTH_PACKAGES.forEach(pkg => {
      const opt = document.createElement('option');
      opt.value = `${pkg.name} (KSh ${pkg.priceKsh})`;
      opt.innerText = `${pkg.name} (KSh ${pkg.priceKsh})`;
      srvSelect.appendChild(opt);
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = document.getElementById('contact-name').value;
      const u = document.getElementById('contact-user').value;
      const s = document.getElementById('contact-service').value;
      const v = document.getElementById('contact-video').value;
      const note = document.getElementById('contact-note').value;

      let msg = `Hello TokGrow, my name is *${n}*.\n\nI want to inquire about: *${s}*\n`;
      if(u) msg += `*My TikTok Username:* ${u}\n`;
      if(v) msg += `*TikTok Video Link:* ${v}\n`;
      if(note) msg += `*Additional Notes:* ${note}\n`;
      msg += `\nPlease guide me on the campaign activation and M-Pesa payment!`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
}
