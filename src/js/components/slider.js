import Swiper from 'swiper/bundle';

function initSwiper() {
    const swiper = new Swiper('.js-swiper-container', {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 1,
        loop: true,
        speed: 600,
        slideToClickedSlide: true,

        autoplay: {
            delay: 3000,
        },

        coverflowEffect: {
            rotate: 10,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: true,
        },

        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            560: {
                slidesPerView: 3,
            },
            990: {
                slidesPerView: 4.5,
            },
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

export default initSwiper;
