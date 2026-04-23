// HW流量分析知识库 - 主逻辑

document.addEventListener('DOMContentLoaded', function() {
  // 初始化Lucide图标
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 初始化代码高亮
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }

  // 主题初始化（放在最前面）
  initTheme();

  // 复制按钮功能
  initCopyButtons();

  // 手风琴功能
  initAccordions();

  // 滚动动画
  initScrollAnimations();

  // TOC导航高亮
  initTOCHighlight();

  // 移动端菜单
  initMobileMenu();
});

// 主题切换功能
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // 从localStorage读取保存的主题
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // 点击切换主题
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

function setTheme(theme) {
  const themeIcon = document.getElementById('theme-icon');

  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', 'sun');
    }
  } else {
    document.documentElement.classList.remove('light-theme');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', 'moon');
    }
  }

  // 重新初始化Lucide图标以更新图标
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 复制按钮功能
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async function() {
      const codeElement = this.closest('.code-block')?.querySelector('code');
      const commandElement = this.closest('.command-item')?.querySelector('code');

      const textToCopy = codeElement?.textContent || commandElement?.textContent;

      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy.trim());
          this.classList.add('copied');
          const originalHTML = this.innerHTML;
          this.innerHTML = '<span class="text-xs">已复制!</span>';

          setTimeout(() => {
            this.classList.remove('copied');
            this.innerHTML = originalHTML;
          }, 1500);
        } catch (err) {
          console.error('复制失败:', err);
        }
      }
    });
  });
}

// 手风琴功能
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // 关闭同级其他手风琴
      const parent = this.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-content').forEach(c => {
          c.classList.remove('open');
        });
        parent.querySelectorAll('.accordion-header .chevron').forEach(ch => {
          ch.style.transform = 'rotate(0deg)';
        });
      }

      // 切换当前手风琴
      content.classList.toggle('open');
      const chevron = this.querySelector('.chevron');
      if (chevron) {
        chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  });
}

// 滚动动画
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in');
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => observer.observe(el));
}

// TOC导航高亮
function initTOCHighlight() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('[data-toc-id]');

  if (tocLinks.length === 0 || sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-toc-id');
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// 移动端菜单
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });

    // 点击链接后关闭菜单
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
