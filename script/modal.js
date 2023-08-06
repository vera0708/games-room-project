const modalControl = () => {
    const btnOpenForm = document.querySelector('.header__button');
    const overlay = document.querySelector('.modal-overlay');

    const openModal = () => {
        overlay.classList.add('is-visible');
    }

    const closeModal = () => {
        overlay.classList.remove('is-visible');
    }

    btnOpenForm.addEventListener('click', () => {
        openModal();
    });

    overlay.addEventListener('click', (e) => {
        const target = e.target;
        if (target === overlay ||
            target.closest('.modal__close')) {
            closeModal();
        };
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal();
        };
    });
    return {
        closeModal,
    }
};
const { closeModal } = modalControl();

const formControl = (closeModal) => {
    const form = document.querySelector('.modal__form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCall = Object.fromEntries(formData);
        console.log(newCall);
        form.reset();
        closeModal();
    })
};
formControl(closeModal);
