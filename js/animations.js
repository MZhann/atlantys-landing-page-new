// Добавление анимаций при прокрутке
function initScrollAnimations() {
    // Получаем все элементы, которые нужно анимировать
    const elements = document.querySelectorAll('.benefit-card, .feature-row, .pricing-card, .referral-card');
    
    // Функция для проверки, находится ли элемент в видимой области
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для добавления класса анимации
    function handleScrollAnimation() {
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animate-on-scroll')) {
                element.classList.add('animate-on-scroll');
                // Добавляем задержку для каждого следующего элемента
                if (element.dataset.delay) {
                    element.style.animationDelay = element.dataset.delay;
                }
            }
        });
    }
    
    // Добавляем атрибуты задержки для карточек
    elements.forEach((element, index) => {
        if (element.classList.contains('benefit-card') || element.classList.contains('pricing-card')) {
            element.dataset.delay = `${index * 0.1}s`;
        }
    });
    
    // Запускаем проверку при загрузке и прокрутке
    window.addEventListener('load', handleScrollAnimation);
    window.addEventListener('scroll', handleScrollAnimation);
}

// Функция для создания интерактивных тарифов
function initPricingInteraction() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => c.classList.remove('hovered'));
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

// Функция для создания счетчиков статистики
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 секунды
        const step = Math.ceil(target / (duration / 16)); // 16мс - примерно один кадр при 60fps
        
        function updateCounter() {
            const current = parseInt(counter.innerText);
            if (current < target) {
                counter.innerText = Math.min(current + step, target);
                setTimeout(updateCounter, 16);
            }
        }
        
        // Запускаем счетчик, когда элемент появляется в видимой области
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counter.innerText = '0';
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Уже существующие функции
    handleMobileMenu();
    handleHeaderScroll();
    handleSmoothScroll();
    
    // Новые функции
    initScrollAnimations();
    initPricingInteraction();
    initCounters();
    
    // Добавляем дополнительные стили для анимаций
    const style = document.createElement('style');
    style.textContent += `
        .pricing-card.hovered {
            transform: translateY(-15px) scale(1.03);
            box-shadow: var(--shadow-lg);
            z-index: 5;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .btn-primary:hover {
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(style);
});
