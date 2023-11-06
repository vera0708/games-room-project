const validateBooking = (bookingForm) => {

    // console.log('bookingForm: ', bookingForm);
    const inputTel = document.querySelector('.person-info__tel');
    const telMask = new Inputmask('+7 (999)-999-99-99');
    telMask.mask(inputTel);

    flatpickr(".person-info__time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        maxTime: "22:30",
        time_24hr: true
    });

    const justValidate = new JustValidate(bookingForm, {
        errorLabelStyle: {
            color: '#f00',
        },
        errorFieldCssClass: 'invalid',
        errorsContainer: document.querySelector('.booking__error'),
        // tooltip: {
        //     position: 'bottom',
        // },
    });

    justValidate
        .addRequiredGroup('.field-halls', 'Выберите зал')
        .addField('.person-info__date', [{
            rule: 'required',
            errorMessage: 'Укажите дату',
        },
        {
            plugin: JustValidatePluginDate(() => ({
                format: 'yyyy-MM-dd',
            })),
            errorMessage:
                'Укажите дату в формате dd MM yyyy',
        },
        ])

        .addField('.person-info__time', [{
            rule: 'required',
            errorMessage: 'Укажите время',
        }])
        .addField('.person-info__people', [{
            rule: 'number',
            errorMessage: 'Укажите количество посетителей',
        },
        {
            rule: 'minNumber',
            value: 1,
        },
        {
            rule: 'maxNumber',
            value: 15,
        },])
        .addField('.person-info__name', [
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
        .addField('.person-info__surname', [{
            rule: 'required',
            errorMessage: 'Укажите вашу фамилию',
        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Не короче 2-х символов',
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Не длинее 30-и символов',
        },])
        .addField('.person-info__email', [
            {
                rule: 'required',
                errorMessage: 'Укажите ваш email ',
            },
            {
                rule: 'email',
                errorMessage: 'email не корректный!',
            },
        ])
        .addField('.person-info__tel', [
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
                firstName: target.firstName.value,
                lastName: target.lastName.value,
                phone: inputTel.inputmask.unmaskedvalue(),
                email: target.email.value,

            })
                .then(response => {
                    console.log('response: ', response);
                    target.reset();
                    // modalOrderFielfset.disabled = true;
                    // modalOrderTitle.textContent = `Спасибо, ваша заявка принята. Номер заявки ${response.data.id}`
                })
                .catch(err => {
                    console.error(err);
                    // modalOrderFielfset.disabled = false;
                    // modalOrderTitle.textContent = `Что-то пошло не так, попробуйте позже`
                });
        });
    return justValidate;
};

const bookingControler = () => {
    const bookingForm = document.querySelector('.booking__form');
    const validate = validateBooking(bookingForm);

    bookingForm.addEventListener('submit', e => {
        e.preventDefault();

        if (validate.isValid) {
            console.log('Отправка формы')
        }
    })
};

bookingControler();

