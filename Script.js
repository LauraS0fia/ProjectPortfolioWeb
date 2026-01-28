// Carrusel de Skills mejorado
const skillsContainer = document.querySelector('.skills-container');
const skillItems = document.querySelectorAll('.skill-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let itemsPerView = 5;

function updateItemsPerView() {
    const width = window.innerWidth;
    if (width < 480) {
        itemsPerView = 2;
    } else if (width < 768) {
        itemsPerView = 3;
    } else if (width < 1024) {
        itemsPerView = 4;
    } else {
        itemsPerView = 5;
    }
    updateCarousel();
    createDots();
}

function createDots() {
    dotsContainer.innerHTML = '';
    const totalSlides = Math.ceil(skillItems.length - itemsPerView + 1);
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateCarousel() {
    const itemWidth = 110;
    const gap = 30;
    const offset = -(currentIndex * (itemWidth + gap));
    skillsContainer.style.transform = `translateX(${offset}px)`;
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    const maxIndex = skillItems.length - itemsPerView;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

// Auto-play
let autoplayInterval = setInterval(() => {
    if (currentIndex >= skillItems.length - itemsPerView) {
        goToSlide(0);
    } else {
        goToSlide(currentIndex + 1);
    }
}, 3000);

const carousel = document.querySelector('.skills-carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        if (currentIndex >= skillItems.length - itemsPerView) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + 1);
        }
    }, 3000);
});

window.addEventListener('resize', updateItemsPerView);
updateItemsPerView();