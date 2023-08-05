

export const modalControl = (btnOpenForm, overlay) => {
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

export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        // Передаем данные из формы:
        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);
        addContactPage(newContact, list);
        addContactData(newContact);
        // Очищаем форму для следующего заполненияЖ
        form.reset();
        closeModal();
    })
};