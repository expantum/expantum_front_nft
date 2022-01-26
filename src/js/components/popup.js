const showPopupBtns = document.querySelectorAll('.js-show-popup');
const popups = document.querySelectorAll('.js-popup');
const { body } = document;
const overlay = document.querySelector('.js-overlay');

const CLASS_ACTIVE = 'active';
const CLASS_OVERFLOW = 'overflow';
function popupsFunc() {
    if (!showPopupBtns.length || !popups.length) return;

    const showPopup = (event) => {
        const openBtn = event.target.closest('.js-show-popup');
        const activePopup = document.querySelector('.js-popup.active');
        const targetPopup = document.querySelector(`[data-popup=${openBtn.dataset.trigger}]`);

        if (activePopup) {
            activePopup.classList.remove(CLASS_ACTIVE);
        }

        openBtn.classList.add(CLASS_ACTIVE);
        targetPopup && targetPopup.classList.add(CLASS_ACTIVE);
        body.classList.add(CLASS_OVERFLOW);
        overlay.classList.add(CLASS_ACTIVE);
    };

    const hidePopup = (activePopup) => {
        const openBtn = document.querySelector('.js-show-popup.active');
        if (!activePopup) {
            return;
        }

        openBtn.classList.remove(CLASS_ACTIVE);
        body.classList.remove(CLASS_OVERFLOW);
        overlay.classList.remove(CLASS_ACTIVE);
        activePopup.classList.remove(CLASS_ACTIVE);
    };

    if (showPopupBtns.length) {
        showPopupBtns.forEach((opener) => {
            opener.addEventListener('click', (event) => {
                const target = event.target.closest('.js-show-popup');
                if (target.classList.contains(CLASS_ACTIVE)) {
                    hidePopup(document.querySelector('.js-popup.active'));
                } else {
                    showPopup(event);
                }
            });
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            hidePopup(document.querySelector('.js-popup.active'));
        });
    }
    if (popups.length) {
        popups.forEach((popup) => {
            popup.addEventListener('click', (event) => {
                const closeBtn = event.target.closest('.js-popup-close');
                if (!closeBtn) {
                    return;
                }
                hidePopup(popup);
            });
        });
    }
}

export default popupsFunc;
