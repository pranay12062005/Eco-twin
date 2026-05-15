/* ============================================
   ECO-TWIN WIREFRAME — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTutorialCarousel();
  initCategoryTabs();
  initToggleSwitches();
});

// ── Tab Switching ──
function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// ── Tutorial Carousel ──
function initTutorialCarousel() {
  const slides = document.querySelectorAll('.tutorial-slide');
  const dots = document.querySelectorAll('#tutorial-dots .onboarding-dot');
  const prevBtn = document.getElementById('tut-prev');
  const nextBtn = document.getElementById('tut-next');
  let current = 0;

  if (!slides.length) return;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    current = i;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    showSlide(current > 0 ? current - 1 : slides.length - 1);
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    showSlide(current < slides.length - 1 ? current + 1 : 0);
  });
}

// ── Category Tabs (Closet) ──
function initCategoryTabs() {
  document.querySelectorAll('.cat-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.cat-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

// ── Toggle Switches ──
function initToggleSwitches() {
  document.querySelectorAll('.toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('on');
    });
  });
}

// ── Time Selector ──
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    const group = e.target.closest('.time-selector');
    group.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// ── Color Chip Selection ──
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('color-chip')) {
    const group = e.target.closest('.color-chips');
    group.querySelectorAll('.color-chip').forEach(c => c.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});
