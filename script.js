// ==========================================
// 1. ПЛАВНЫЕ АККОРДЕОНЫ (ВЫДВИЖНЫЕ СПИСКИ)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const content = item.querySelector('.accordion-content');
    if (!content) return;

    // При наведении (открытие)
    item.addEventListener('mouseenter', () => {
      // Получаем реальную высоту контента
      const scrollHeight = content.scrollHeight;
      content.style.height = scrollHeight + 'px';
      content.style.opacity = '1';
    });

    // При уходе (закрытие)
    item.addEventListener('mouseleave', () => {
      content.style.height = '0';
      content.style.opacity = '0';
    });
  });
});

// ==========================================
// 2. БОКОВОЕ МЕНЮ (АВТОМАТИЧЕСКАЯ НАВИГАЦИЯ)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const navList = document.getElementById('auto-nav');
  const articles = document.querySelectorAll('.article');

  if (navList) {
    articles.forEach(article => {
      const titleSpan = article.querySelector('.title-text');
      if (!titleSpan) return;

      let titleText = titleSpan.innerText.trim();
      const li = document.createElement('li');
      const a = document.createElement('a');
      
      a.href = '#' + article.id;
      
      const isPlaceholder = titleText.includes('[Введите') || titleText.includes('[Название');
      a.textContent = isPlaceholder ? 'Без названия' : titleText;

      a.addEventListener('click', (e) => {
        e.preventDefault();
        if(window.innerWidth <= 992) document.body.classList.remove('menu-open');
        const yOffset = -20; 
        const y = article.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      });

      li.appendChild(a);
      navList.appendChild(li);
    });
  }

  // Открытие/закрытие мобильного меню
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.overlay');

  if (mobileBtn && overlay) {
    mobileBtn.addEventListener('click', () => document.body.classList.toggle('menu-open'));
    overlay.addEventListener('click', () => document.body.classList.remove('menu-open'));
  }
});

// ==========================================
// 3. ПЛАВНЫЙ СКРОЛЛ ДЛЯ БОКОВОГО МЕНЮ (ТЕХНИКА)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      if(window.innerWidth <= 992) document.body.classList.remove('menu-open');
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const yOffset = -20; 
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });
});