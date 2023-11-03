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

const modalTitle = document.querySelector('.modal__title');

const inputTel = document.querySelector('.form__input-tel');

const telMask = new Inputmask('+7 (999)-999-99-99');
telMask.mask(inputTel);

const justValidate = new JustValidate('."modal__form');

justValidate
    .addField('.form__input-name', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваше имя',
        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Не короче 2-х символов',
        },
        {
            rule: 'maxLength',
            value: 18,
            errorMessage: 'Не длинее 18-и символов',
        },
    ])
    .addField('.form__input-tel', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваш телефон',
        },
        {
            validator(value) {
                const phone = inputTel.inputmask.unmaskedvalue();
                return !!(Number(phone) && phone.length === 10);
            },
            errorMessage: 'Телефон не корректный!'
        },
    ])
    .onSuccess(eve => {
        const target = eve.target;
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            modalName: target.modalName.value,
            modalPhone: inputTel.inputmask.unmaskedvalue(),
        })
            .then(response => {
                console.log('response: ', response);
                target.reset();
                // modalOrderFielfset.disabled = true;
                modalTitle.textContent = `Спасибо, ваша заявка принята. Номер заявки ${response.data.id}`
            })
            .catch(err => {
                console.error(err);
                // modalOrderFielfset.disabled = false;
                modalTitle.textContent = `Что-то пошло не так, попробуйте позже`
            });
    });