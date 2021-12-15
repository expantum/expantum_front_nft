// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

//import Accordion from './components/accordion';

import initSwiper from './components/slider';

const resizeHandler = () => {
    const htmlWidth = document.documentElement.clientWidth;

    if (htmlWidth < 1024 && htmlWidth >= 320) {
        document.documentElement.style.fontSize = 10 / (768 / htmlWidth) + 'px';
    }
    if (htmlWidth >= 1024) {
        document.documentElement.style.fontSize = 10 / (1440 / htmlWidth) + 'px';
    }
    AOS.refresh();
};

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
    });
    initSwiper();
    resizeHandler();

    var rellax = new Rellax('.rellax', {
        breakpoints: [320, 768, 1024],
    });

    window.addEventListener('resize', resizeHandler);
});
