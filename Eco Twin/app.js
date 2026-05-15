/* ============================================
   ECO-TWIN v6 — Full-Featured App
   ============================================ */

// ── Storage Service ──
const StorageService = {
  KEY: 'eco-twin-data',
  save() {
    const data = { user: state.user, closet: state.closet, activeCategory: state.activeCategory, sortBy: state.sortBy, badges: state.badges, stats: state.stats, savedAlternatives: state.savedAlternatives };
    try { localStorage.setItem(this.KEY, JSON.stringify(data)); } catch (e) { console.warn('Storage full', e); }
  },
  load() { try { const r = localStorage.getItem(this.KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } },
  clear() { localStorage.removeItem(this.KEY); }
};

// ── Default State ──
const DEFAULT_STATE = {
  user: { name: "Alex Green", title: "Sustainability Enthusiast", avatar: "", score: 85, settings: { notifications: true, accent: 'green' } },
  closet: [
    { id: 1, name: "Linen Shirt", material: "100% Organic Cotton", brand: "EcoWear Co.", origin: "Portugal 🇵🇹", footprint: 2.1, score: 87, verdict: "go", category: "Tops", icon: "shirt", date: "2d ago", price: 45, wears: 12, color: "#D4B896", tags: ["🌿 Organic", "👕 Casual", "♻️ Recyclable", "🏷️ Linen"] },
    { id: 2, name: "Denim Jacket", material: "80% Recycled Cotton", brand: "ReJeans", origin: "USA 🇺🇸", footprint: 4.5, score: 78, verdict: "go", category: "Outerwear", icon: "shirt", date: "1w ago", price: 89, wears: 8, color: "#4A6FA5", tags: ["♻️ Recycled", "🧥 Outerwear", "👖 Denim", "🌱 Sustainable"] },
    { id: 3, name: "Fast-Fashion Tee", material: "100% Polyester", brand: "TrendyNow", origin: "China 🇨🇳", footprint: 14.7, score: 23, verdict: "stop", category: "Tops", icon: "shirt", date: "3d ago", price: 12, wears: 3, color: "#2D2D2D", tags: ["⚠️ Microplastics", "⚠️ High Impact", "🛢️ Synthetic", "👕 Casual"] },
    { id: 4, name: "Wool Sweater", material: "100% Merino Wool", brand: "KnitGoods", origin: "New Zealand 🇳🇿", footprint: 6.2, score: 82, verdict: "go", category: "Tops", icon: "shirt", date: "5d ago", price: 110, wears: 15, color: "#8B6F4E", tags: ["🐑 Natural Fibers", "🤝 Fair Trade", "🧶 Winter Wear"] },
    { id: 5, name: "Canvas Sneakers", material: "Organic Canvas", brand: "StepGreen", origin: "Spain 🇪🇸", footprint: 3.8, score: 92, verdict: "go", category: "Shoes", icon: "footprints", date: "1w ago", price: 75, wears: 20, color: "#F5F5DC", tags: ["🌱 Vegan", "♻️ Recycled Sole", "👟 Comfort"] },
    { id: 6, name: "Hemp Shorts", material: "100% Hemp", brand: "EarthWear", origin: "Canada 🇨🇦", footprint: 1.5, score: 88, verdict: "go", category: "Bottoms", icon: "shirt", date: "2w ago", price: 55, wears: 10, color: "#A8B68F", tags: ["🌿 Hemp", "🩳 Summer", "💧 Low Water"] }
  ],
  badges: [
    { id: 'eco-starter', name: 'Eco Starter', icon: 'sprout', desc: 'Added first item', unlocked: true },
    { id: 'scanner-pro', name: 'Scanner Pro', icon: 'scan-line', desc: 'Scanned 5 items', unlocked: false },
    { id: 'minimalist', name: 'Minimalist', icon: 'minus-circle', desc: 'Removed 3 items', unlocked: false },
    { id: 'green-pioneer', name: 'Green Pioneer', icon: 'leaf', desc: 'Eco score above 80', unlocked: true },
    { id: 'no-buy-7', name: '7-Day No-Buy', icon: 'shield-check', desc: '7 days without buying', unlocked: false },
    { id: 'wardrobe-master', name: 'Wardrobe Master', icon: 'crown', desc: '10+ items in closet', unlocked: false }
  ],
  stats: { savedMoney: 234, co2Saved: 18.5, duplicatesPrevented: 7, scanCount: 0 },
  savedAlternatives: [],
  activeCategory: 'All', sortBy: 'date', activeItem: null, history: ['splash']
};

function buildInitialState() {
  const saved = StorageService.load();
  if (saved) {
    return {
      user: { ...DEFAULT_STATE.user, ...saved.user },
      closet: saved.closet || DEFAULT_STATE.closet,
      badges: saved.badges || DEFAULT_STATE.badges,
      stats: { ...DEFAULT_STATE.stats, ...saved.stats },
      savedAlternatives: saved.savedAlternatives || [],
      activeCategory: saved.activeCategory || 'All',
      sortBy: saved.sortBy || 'date',
      activeItem: null, history: ['splash']
    };
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

const state = buildInitialState();
function persist() { StorageService.save(); }

// ── Init ──
let authToken = localStorage.getItem('eco-twin-token');

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  initTheme(); initTabs(); initSearch(); initProfileToggles(); initEditProfile(); initSort();

  if (authToken) {
    await fetchUserCloset();
  }

  renderCloset(); renderProfile(); renderDashboard();
});

// ── Navigation ──
let currentScreen = 'splash';
const order = ['splash', 'auth', 'closet', 'scan', 'tagging', 'verdict-go', 'verdict-stop', 'dashboard', 'profile', 'saved-alternatives', 'settings'];

function navigateTo(screenId) {
  if (screenId === currentScreen) return;
  if (screenId === 'back') { screenId = state.history.pop() || 'closet'; }
  else { if (state.history[state.history.length - 1] !== currentScreen) state.history.push(currentScreen); }

  const screens = document.querySelectorAll('.screen');
  const target = document.getElementById('screen-' + screenId);
  if (!target) return;

  if (currentScreen === 'scan' && screenId !== 'scan') stopCamera();

  const fwd = order.indexOf(screenId) >= order.indexOf(currentScreen);
  screens.forEach(s => { if (s.classList.contains('active')) { s.style.transform = fwd ? 'translateX(-20px)' : 'translateX(20px)'; s.style.opacity = '0'; s.style.pointerEvents = 'none'; setTimeout(() => { s.classList.remove('active'); s.style.transform = ''; }, 300); } });
  target.style.transform = fwd ? 'translateX(20px)' : 'translateX(-20px)'; target.style.opacity = '0'; target.style.pointerEvents = '';
  requestAnimationFrame(() => { target.classList.add('active'); requestAnimationFrame(() => { target.style.transform = 'translateX(0)'; target.style.opacity = '1'; target.style.pointerEvents = ''; }); });
  currentScreen = screenId;

  target.querySelectorAll('.animate-in').forEach(el => { el.style.animation = 'none'; el.offsetHeight; el.style.animation = ''; });
  if (screenId.startsWith('verdict')) { setTimeout(() => { target.querySelectorAll('.score-bar .fill').forEach(bar => { const w = bar.dataset.tw || bar.style.width; bar.style.width = '0%'; bar.dataset.tw = w; setTimeout(() => { bar.style.width = w; }, 80); }); }, 350); }

  if (screenId === 'scan') startCamera();
  if (screenId === 'closet') renderCloset();
  if (screenId === 'profile') renderProfile();
  if (screenId === 'dashboard') renderDashboard();
  if (screenId === 'settings') renderSettings();
  if (screenId === 'saved-alternatives') renderSavedAlternatives();
  setTimeout(() => lucide.createIcons(), 50);
}

// ── Helpers ──
function getAvatarUrl() { return state.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=random&color=fff&size=128`; }
function getBadge(score) { return score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 50 ? 'B' : score >= 30 ? 'C' : 'D'; }

// ── Closet Rendering ──
function renderCloset() {
  const grid = document.getElementById('closet-grid');
  const stats = document.getElementById('closet-stats');
  if (!grid || !stats) return;

  const query = (document.getElementById('closet-search')?.value || '').toLowerCase();
  let filtered = state.closet.filter(item => {
    const matchesCat = state.activeCategory === 'All' || item.category === state.activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(query) || item.brand.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  // Sort
  filtered.sort((a, b) => {
    if (state.sortBy === 'score') return b.score - a.score;
    if (state.sortBy === 'name') return a.name.localeCompare(b.name);
    if (state.sortBy === 'wears') return b.wears - a.wears;
    return b.id - a.id; // date (newest first)
  });

  const sustainableCount = state.closet.filter(i => i.score >= 50).length;
  stats.innerHTML = `<strong>${state.closet.length}</strong> items · <strong>${sustainableCount}</strong> sustainable`;

  grid.innerHTML = filtered.map((item, i) => `
    <div class="closet-card animate-in" style="animation-delay:${i * 60}ms">
      <div class="card-img" onclick="viewItem(${item.id})">
        ${item.imageUrl ? `<img src="${item.imageUrl}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;border-radius:18px;" />` : ''}
        <span class="${item.score < 50 ? 'eco-badge danger' : 'eco-badge'}" style="z-index: 2;">${getBadge(item.score)}</span>
        <i data-lucide="${item.icon}" style="z-index: 1;"></i>
        ${!item.imageUrl ? `<div class="card-color-dot" style="background:${item.color || '#ccc'}"></div>` : ''}
      </div>
      <div class="card-info" onclick="viewItem(${item.id})">
        <h4>${item.name}</h4>
        <p>${item.category} · ${item.wears || 0} wears</p>
      </div>
      <button class="card-delete-btn" onclick="event.stopPropagation(); deleteItem(${item.id})" title="Delete item">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
  `).join('');

  lucide.createIcons();
  checkEmptyState(filtered.length);
}

// ── Sort ──
function initSort() {
  const sel = document.getElementById('sort-select');
  if (sel) { sel.value = state.sortBy; sel.addEventListener('change', () => { state.sortBy = sel.value; persist(); renderCloset(); }); }
}

// ── Delete Item ──
function deleteItem(id) {
  const item = state.closet.find(i => i.id === id);
  if (!item) return;
  state.closet = state.closet.filter(i => i.id !== id);
  persist(); renderCloset();
  showToast(`"${item.name}" removed`, 'info');
  checkBadge('minimalist', state.closet.length <= 3);
}

// ── View / Tagging ──
function viewItem(id) {
  const item = state.closet.find(i => i.id === id);
  if (!item) return;
  state.activeItem = item;
  document.getElementById('tag-name').textContent = item.name;
  document.getElementById('tag-material').textContent = item.material;
  document.getElementById('tag-brand').textContent = item.brand;
  document.getElementById('tag-origin').textContent = item.origin;
  document.getElementById('tag-carbon').textContent = item.footprint + ' kg CO₂';
  document.getElementById('tag-chips').innerHTML = item.tags.map((t, i) => `<span class="tag ${i % 2 === 0 ? 'tag-filled' : 'tag-outline'}">${t}</span>`).join('');
  navigateTo('tagging');
}

function getVerdict() {
  const item = state.activeItem; if (!item) return;
  const isGo = item.verdict === 'go'; const p = isGo ? 'go' : 'stop';
  document.getElementById(`score-${p}-val`).textContent = `${item.score} / 100`;
  document.getElementById(`score-${p}-bar`).style.width = `${item.score}%`;
  const cp = Math.min(100, (item.footprint / 20) * 100);
  document.getElementById(`carbon-${p}-val`).textContent = `${isGo ? 'Low' : 'High'} — ${item.footprint} kg CO₂`;
  document.getElementById(`carbon-${p}-bar`).style.width = `${cp}%`;
  navigateTo(isGo ? 'verdict-go' : 'verdict-stop');
}

// ══════════════════════════════════════════
//  DASHBOARD & ANALYTICS
// ══════════════════════════════════════════
function renderDashboard() {
  const el = (id) => document.getElementById(id);

  // Stats
  const total = state.closet.length;
  const sustainable = state.closet.filter(i => i.score >= 50).length;
  const totalValue = state.closet.reduce((s, i) => s + (i.price || 0), 0);
  const totalWears = state.closet.reduce((s, i) => s + (i.wears || 0), 0);
  const avgScore = total > 0 ? Math.round(state.closet.reduce((s, i) => s + i.score, 0) / total) : 0;

  if (el('dash-total')) el('dash-total').textContent = total;
  if (el('dash-sustainable')) el('dash-sustainable').textContent = sustainable;
  if (el('dash-value')) el('dash-value').textContent = `$${totalValue}`;
  if (el('dash-wears')) el('dash-wears').textContent = totalWears;
  if (el('dash-avg-score')) el('dash-avg-score').textContent = avgScore;

  // Savings
  if (el('dash-saved-money')) el('dash-saved-money').textContent = `$${state.stats.savedMoney}`;
  if (el('dash-co2')) el('dash-co2').textContent = `${state.stats.co2Saved} kg`;
  if (el('dash-dupes')) el('dash-dupes').textContent = state.stats.duplicatesPrevented;

  // Category pie chart (CSS conic-gradient)
  const cats = {};
  state.closet.forEach(i => { cats[i.category] = (cats[i.category] || 0) + 1; });
  const colors = { Tops: '#22A671', Bottoms: '#4A6FA5', Outerwear: '#E8A838', Shoes: '#9B59B6', Accessories: '#E74545' };
  let angle = 0;
  const segments = [];
  const legendHTML = [];
  Object.entries(cats).forEach(([cat, count]) => {
    const pct = (count / total) * 100;
    const c = colors[cat] || '#888';
    segments.push(`${c} ${angle}deg ${angle + (pct * 3.6)}deg`);
    angle += pct * 3.6;
    legendHTML.push(`<div class="legend-item"><span class="legend-dot" style="background:${c}"></span>${cat} <small>(${count})</small></div>`);
  });
  const pie = el('dash-pie');
  if (pie) pie.style.background = `conic-gradient(${segments.join(', ')})`;
  const legend = el('dash-legend');
  if (legend) legend.innerHTML = legendHTML.join('');

  // Most / Least worn
  const sorted = [...state.closet].sort((a, b) => (b.wears || 0) - (a.wears || 0));
  const most = sorted[0];
  const least = sorted[sorted.length - 1];
  if (el('dash-most-worn') && most) el('dash-most-worn').textContent = `${most.name} (${most.wears}x)`;
  if (el('dash-least-worn') && least) el('dash-least-worn').textContent = `${least.name} (${least.wears}x)`;

  // Badges
  const badgesContainer = el('dash-badges');
  if (badgesContainer) {
    badgesContainer.innerHTML = state.badges.map(b => `
      <div class="badge-item ${b.unlocked ? 'unlocked' : 'locked'}">
        <div class="badge-icon"><i data-lucide="${b.icon}"></i></div>
        <span>${b.name}</span>
      </div>
    `).join('');
    lucide.createIcons();
  }
}

// ── Gamification ──
function checkBadge(id, condition) {
  const badge = state.badges.find(b => b.id === id);
  if (badge && !badge.unlocked && condition) {
    badge.unlocked = true;
    persist();
    showToast(`🏆 Badge Unlocked: ${badge.name}!`, 'success');
  }
}

// ── Profile ──
function renderProfile() {
  document.getElementById('profile-name').textContent = state.user.name;
  document.getElementById('profile-title').textContent = state.user.title;
  document.getElementById('profile-score-val').textContent = Math.round(state.user.score);
  const avatarImg = document.getElementById('profile-avatar-img');
  if (avatarImg) avatarImg.src = getAvatarUrl();
  const notifToggle = document.getElementById('toggle-notif');
  if (notifToggle) { if (state.user.settings.notifications) notifToggle.classList.add('on'); else notifToggle.classList.remove('on'); }
  const tl = document.querySelector('.theme-val');
  if (tl) tl.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? 'Dark' : 'Light';
}

// ── Edit Profile Modal ──
function openEditProfile() {
  const modal = document.getElementById('edit-profile-modal'); if (!modal) return;
  document.getElementById('edit-name').value = state.user.name;
  document.getElementById('edit-title').value = state.user.title;
  const p = document.getElementById('edit-avatar-preview'); if (p) p.src = getAvatarUrl();
  modal.classList.add('visible');
  setTimeout(() => lucide.createIcons(), 50);
}
function closeEditProfile() { const m = document.getElementById('edit-profile-modal'); if (m) m.classList.remove('visible'); }
function saveEditProfile() {
  const n = document.getElementById('edit-name').value.trim();
  if (!n) { showToast('Name cannot be empty', 'error'); return; }
  state.user.name = n; state.user.title = document.getElementById('edit-title').value.trim() || 'Eco Enthusiast';
  persist(); renderProfile(); closeEditProfile(); showToast('Profile updated!', 'success');
}
function initEditProfile() {
  const f = document.getElementById('edit-avatar-file');
  if (f) f.addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Select an image', 'error'); return; }
    if (file.size > 2 * 1024 * 1024) { showToast('Max 2MB', 'error'); return; }
    const r = new FileReader(); r.onload = (ev) => { state.user.avatar = ev.target.result; const p = document.getElementById('edit-avatar-preview'); if (p) p.src = state.user.avatar; persist(); }; r.readAsDataURL(file);
  });
  const modal = document.getElementById('edit-profile-modal');
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeEditProfile(); });
}

// ── Auth & Data ──
let authMode = 'login';
function toggleAuthMode() {
  authMode = authMode === 'login' ? 'register' : 'login';
  const header = document.querySelector('.auth-header h2');
  const desc = document.querySelector('.auth-header p');
  const btn = document.querySelector('.auth-form button[type="submit"]');
  const foot = document.querySelector('.auth-footer a');
  const footP = document.querySelector('.auth-footer p');

  if (authMode === 'register') {
    header.textContent = 'Create Account';
    desc.textContent = 'Join Eco-Twin and build your sustainable closet.';
    btn.innerHTML = '<i data-lucide="user-plus"></i> Sign Up';
    footP.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthMode()">Sign in</a>';
  } else {
    header.textContent = 'Welcome Back';
    desc.textContent = 'Sign in to sync your sustainable closet securely.';
    btn.innerHTML = '<i data-lucide="log-in"></i> Sign In';
    footP.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleAuthMode()">Sign up</a>';
  }
  lucide.createIcons();
}

async function fetchUserCloset() {
  if (!authToken) return;
  try {
    const res = await fetch('https://pranaysoyam126-eco-twin-api.hf.space/items', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (!res.ok) throw new Error('Failed to fetch closet');
    const items = await res.json();

    // Convert API format to App format
    state.closet = items.map(apiItem => ({
      id: apiItem.id,
      name: apiItem.name,
      material: apiItem.material || 'Unknown Material',
      brand: apiItem.brand || 'Unknown',
      origin: apiItem.origin || 'Unknown',
      footprint: apiItem.carbonFootprint || 5.0,
      score: apiItem.ecoScore || 50,
      verdict: apiItem.verdict || 'caution',
      category: apiItem.category || 'Tops',
      icon: 'shirt',
      date: new Date(apiItem.createdAt).toLocaleDateString(),
      price: 0,
      wears: apiItem.wears || 0,
      color: '#888888',
      tags: [],
      imageUrl: apiItem.imageUrl || ''
    }));

    // Sort logic requires ID sorting for 'newest'
    state.closet.sort((a, b) => b.id - a.id);
    persist();
  } catch (err) {
    console.error("Closet sync failed:", err);
  }
}

async function handleLogin() {
  const emailInput = document.querySelector('.auth-form input[type="email"]');
  const passInput = document.querySelector('.auth-form input[type="password"]');
  const btn = document.querySelector('.auth-form button[type="submit"]');
  const o = btn.innerHTML;

  const email = emailInput ? emailInput.value : 'demo@eco-twin.com';
  const password = passInput ? passInput.value : 'password123';

  btn.innerHTML = '<i data-lucide="loader-2" style="animation:spin 1s linear infinite"></i> Signing In…';
  btn.disabled = true;
  lucide.createIcons();

  try {
    const res = await fetch('https://pranaysoyam126-eco-twin-api.hf.space/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    authToken = data.token;
    localStorage.setItem('eco-twin-token', authToken);
    state.user.name = data.user.name || "Eco Explorer";

    await fetchUserCloset();

    showToast(`Welcome back, ${state.user.name}!`, 'success');
    navigateTo('closet');
  } catch (e) {
    showToast(e.message, 'error');
  } finally {
    btn.innerHTML = o;
    btn.disabled = false;
    lucide.createIcons();
  }
}

function handleLogout() {
  authToken = null;
  localStorage.removeItem('eco-twin-token');
  state.history = ['splash'];
  showToast('Logged out', 'info');
  navigateTo('splash');
}
function resetAllData() { StorageService.clear(); Object.assign(state, JSON.parse(JSON.stringify(DEFAULT_STATE))); renderProfile(); renderCloset(); renderDashboard(); showToast('All data reset', 'info'); navigateTo('splash'); }

// ── Theme & Accent ──
function initTheme() {
  const s = localStorage.getItem('eco-theme');
  if (s) document.documentElement.setAttribute('data-theme', s);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.setAttribute('data-accent', state.user.settings.accent || 'green');
  updateThemeIcons();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => { if (!localStorage.getItem('eco-theme')) { document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light'); updateThemeIcons(); } });
}
function toggleTheme() {
  const n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n); localStorage.setItem('eco-theme', n); updateThemeIcons(); persist();
  const tm = document.getElementById('toggle-dark-mode'); if (tm) tm.classList.toggle('on', n === 'dark');
}
function updateThemeIcons() {
  const d = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('#theme-toggle i, [aria-label="Toggle theme"] i').forEach(i => i.setAttribute('data-lucide', d ? 'moon' : 'sun'));
  lucide.createIcons();
  const tm = document.getElementById('toggle-dark-mode'); if (tm) tm.classList.toggle('on', d);
}

function setAccentColor(color) {
  state.user.settings.accent = color;
  document.documentElement.setAttribute('data-accent', color);
  document.querySelectorAll('.color-swatch').forEach(el => el.classList.toggle('active', el.dataset.color === color));
  persist();
}

// ── Settings Screen ──
function renderSettings() {
  const d = document.documentElement.getAttribute('data-theme') === 'dark';
  const tm = document.getElementById('toggle-dark-mode'); if (tm) tm.classList.toggle('on', d);

  const accent = state.user.settings.accent || 'green';
  document.querySelectorAll('.color-swatch').forEach(el => el.classList.toggle('active', el.dataset.color === accent));

  const tn = document.getElementById('toggle-settings-notif');
  if (tn) {
    tn.classList.toggle('on', state.user.settings.notifications);
    tn.onclick = () => {
      state.user.settings.notifications = !state.user.settings.notifications;
      tn.classList.toggle('on', state.user.settings.notifications);
      persist(); showToast(state.user.settings.notifications ? "Notifications on" : "Notifications off", "info");
    };
  }

  const su = document.getElementById('storage-used');
  if (su) {
    let size = 0; try { size = Math.round((localStorage.getItem('eco-twin-data') || '').length / 1024); } catch (e) { }
    su.textContent = `${size} KB`;
  }
}

function exportData() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'eco-twin-backup.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Data exported successfully!', 'success');
}

// ── Toggles ──
function initProfileToggles() { const t = document.getElementById('toggle-notif'); if (t) t.addEventListener('click', (e) => { e.stopPropagation(); state.user.settings.notifications = !state.user.settings.notifications; t.classList.toggle('on', state.user.settings.notifications); persist(); showToast(state.user.settings.notifications ? "Notifications on" : "Notifications off", "info"); }); }

// ── Tabs ──
function initTabs() { document.querySelectorAll('.cat-tab').forEach(tab => { tab.addEventListener('click', () => { tab.parentElement.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active'); const text = tab.textContent; state.activeCategory = text.includes(' ') ? text.split(' ')[1] : text; persist(); renderCloset(); }); }); }

// ── Search ──
function initSearch() { const i = document.getElementById('closet-search'); if (i) i.addEventListener('input', () => renderCloset()); }
function checkEmptyState(n) { const e = document.getElementById('closet-empty'); if (!e) return; const q = document.getElementById('closet-search')?.value || ''; if (n === 0) { e.style.display = 'block'; if (q) { e.querySelector('h3').textContent = 'No results'; e.querySelector('p').textContent = `Nothing matching "${q}"`; e.querySelector('button').style.display = 'none'; } else { e.querySelector('h3').textContent = 'Closet is empty'; e.querySelector('p').textContent = 'Scan something to get started'; e.querySelector('button').style.display = 'inline-flex'; } } else e.style.display = 'none'; }

// ── Camera Stream ──
let localMediaStream = null;

async function startCamera() {
  const video = document.getElementById('camera-stream');
  const icon = document.querySelector('.camera-preview .camera-icon');
  if (!video) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    localMediaStream = stream;
    video.srcObject = stream;
    video.style.display = 'block';
    if (icon) icon.style.display = 'none';
  } catch (err) {
    console.warn("Camera access denied or unavailable", err);
    showToast("Camera access unavailable, please strictly use upload", "error");
  }
}

function stopCamera() {
  if (localMediaStream) {
    localMediaStream.getTracks().forEach(track => track.stop());
    localMediaStream = null;
  }
}

// ── Scan ──
async function processScanPayload(base64Image) {
  const btn = document.querySelector('#screen-scan .btn-primary');
  const o = btn.innerHTML;
  btn.innerHTML = '<i data-lucide="loader-2" style="animation:spin 1s linear infinite"></i> Analyzing…';
  btn.disabled = true;
  lucide.createIcons();

  try {
    const res = await fetch('https://pranaysoyam126-eco-twin-api.hf.space/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: base64Image })
    });

    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();

    const aiItem = data.item || data;

    const newItem = {
      id: Date.now(),
      date: "Just now",
      name: aiItem.name || "Unknown Item",
      material: aiItem.material || "Unknown Material",
      brand: aiItem.brand || "Unknown Brand",
      origin: aiItem.origin || "Unknown Origin",
      footprint: aiItem.carbonFootprint || aiItem.footprint || 5.0,
      score: aiItem.ecoScore || 50,
      verdict: aiItem.verdict || "caution",
      category: aiItem.category || "Tops",
      icon: "shirt",
      color: "#888888",
      price: Math.floor(Math.random() * 50) + 10,
      wears: 0,
      tags: aiItem.tags || ["AI Scanned"],
      imageUrl: base64Image
    };

    const prevImage = document.getElementById('tagging-preview-img');
    const prevIcon = document.getElementById('tagging-fallback-icon');
    if (prevImage) {
      prevImage.src = base64Image;
      prevImage.style.display = 'block';
      if (prevIcon) prevIcon.style.display = 'none';
    }

    state.closet.unshift(newItem);
    state.stats.scanCount++;
    checkBadge('scanner-pro', state.stats.scanCount >= 5);
    checkBadge('wardrobe-master', state.closet.length >= 10);
    persist();
    showToast('AI Analysis Complete!', 'success');
    viewItem(newItem.id);
  } catch (e) {
    console.error(e);
    showToast('AI Analysis Failed. Try again.', 'error');
  } finally {
    btn.innerHTML = o;
    btn.disabled = false;
    lucide.createIcons();
  }
}

function handleScan() {
  const video = document.getElementById('camera-stream');
  if (!video || !localMediaStream) {
    showToast('Camera not active. Try uploading an image.', 'error');
    return;
  }

  const canvas = document.getElementById('camera-canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const base64Image = canvas.toDataURL('image/jpeg', 0.8);
  processScanPayload(base64Image);
}

function handleGalleryUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    processScanPayload(e.target.result);
  };
  reader.readAsDataURL(file);
}

function saveToCloset() {
  showToast('Saved to closet!', 'success');
  state.user.score = Math.round(state.closet.reduce((s, i) => s + i.score, 0) / state.closet.length);
  persist(); navigateTo('closet');
}

function saveAsAlternative() {
  const item = state.activeItem; if (!item) return;
  const alreadySaved = state.savedAlternatives.some(i => i.id === item.id);
  if (alreadySaved) { showToast('Already saved as an alternative!', 'info'); return; }
  const altItem = { ...item, savedAt: new Date().toLocaleDateString() };
  state.savedAlternatives.unshift(altItem);
  persist();
  showToast('Saved as Alternative! View in Profile → Saved Alternatives', 'success');
  navigateTo('closet');
}

function removeAlternative(id) {
  state.savedAlternatives = state.savedAlternatives.filter(i => i.id !== id);
  persist(); renderSavedAlternatives();
  showToast('Removed from alternatives', 'info');
}

function renderSavedAlternatives() {
  const grid = document.getElementById('saved-alt-grid');
  const empty = document.getElementById('saved-alt-empty');
  const label = document.getElementById('saved-alt-count-label');
  if (!grid) return;

  const alts = state.savedAlternatives;
  if (label) label.textContent = `${alts.length} Saved Item${alts.length !== 1 ? 's' : ''}`;

  if (alts.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  grid.innerHTML = alts.map((item, i) => `
    <div class="saved-alt-card animate-in" style="animation-delay:${i * 60}ms">
      <div class="saved-alt-card-img">
        ${item.imageUrl ? `<img src="${item.imageUrl}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;border-radius:18px;" />` : ''}
        <i data-lucide="${item.icon || 'shirt'}" style="z-index:1;"></i>
        <span class="eco-badge danger" style="z-index:2;">${getBadge(item.score)}</span>
        ${!item.imageUrl ? `<div class="card-color-dot" style="background:${item.color || '#ccc'}"></div>` : ''}
      </div>
      <div class="saved-alt-card-body">
        <div class="saved-alt-card-info">
          <h4>${item.name}</h4>
          <p>${item.brand} · ${item.material}</p>
          <div class="saved-alt-meta">
            <span class="saved-alt-score" style="color:var(--danger);"><i data-lucide="alert-triangle" style="width:12px;height:12px;"></i> Score: ${item.score}/100</span>
            <span class="saved-alt-date">${item.savedAt || ''}</span>
          </div>
        </div>
        <div class="saved-alt-card-actions">
          <button class="btn btn-primary btn-sm" onclick="window.open('https://goodonyou.eco/brands/', '_blank')"><i data-lucide="search"></i> Eco Alt</button>
          <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); removeAlternative(${item.id})"><i data-lucide="trash-2"></i></button>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// ── Toast ──
function showToast(msg, type = 'info') { const c = document.getElementById('toast-container'); if (!c) return; const t = document.createElement('div'); t.className = `toast toast-${type}`; const ic = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'; t.innerHTML = `<i data-lucide="${ic}"></i> ${msg}`; c.appendChild(t); lucide.createIcons(); setTimeout(() => t.remove(), 3000); }

// ── Ripple ──
document.addEventListener('mousedown', function (e) { const b = e.target.closest('.btn'); if (!b) return; const r = document.createElement('span'); const rc = b.getBoundingClientRect(); const sz = Math.max(rc.width, rc.height); r.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${e.clientX - rc.left - sz / 2}px;top:${e.clientY - rc.top - sz / 2}px;border-radius:50%;background:rgba(255,255,255,.25);transform:scale(0);animation:ripple-effect .5s ease-out;pointer-events:none;`; b.appendChild(r); setTimeout(() => r.remove(), 500); });
if (!document.getElementById('ripple-style')) { const s = document.createElement('style'); s.id = 'ripple-style'; s.textContent = '@keyframes ripple-effect{to{transform:scale(4);opacity:0}}'; document.head.appendChild(s); }
