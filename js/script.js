// Основные функции JavaScript для лендинг-страницы Atlantys

// Функция для обработки мобильного меню
function handleMobileMenu() {
    const burger = document.querySelector('.mobile-menu-toggle');
    const menu   = document.querySelector('.menu');
    const cta    = document.querySelector('.cta-buttons');
  
    if (!burger || !menu || !cta) return;
  
    burger.addEventListener('click', () => {
      // toggle burger icon animation
      burger.classList.toggle('active');
  
      // slide nav links and CTAs in/out
      menu.classList.toggle('open');
      cta.classList.toggle('open');
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    handleMobileMenu();
    handleHeaderScroll();
    handleSmoothScroll();
  });
  

// Функция для анимации шапки при прокрутке
function handleHeaderScroll() {
    const header = document.querySelector('#header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Функция для плавной прокрутки к разделам
function handleSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Если это не просто "#"
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Получаем высоту шапки для корректной прокрутки
                    const headerHeight = document.querySelector('#header').offsetHeight;
                    
                    // Прокручиваем к элементу с учетом высоты шапки
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню, если оно открыто
                    const mobileMenu = document.querySelector('.mobile-menu');
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    handleMobileMenu();
    handleHeaderScroll();
    handleSmoothScroll();
    
    // Дополнительные стили для мобильного меню
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--white);
            box-shadow: var(--shadow-md);
            padding: 20px;
            flex-direction: column;
            gap: 20px;
        }
        
        .mobile-menu.active {
            display: flex;
        }
        
        .mobile-menu .menu {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .mobile-menu .cta-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        #header.scrolled {
            padding: 10px 0;
            box-shadow: var(--shadow-md);
        }
    `;
    document.head.appendChild(style);
});


