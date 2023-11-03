const inputTel = document.querySelector('.person-info__tel');

const telMask = new Inputmask('+7 (999)-999-99-99');
telMask.mask(inputTel);

const justValidate = new JustValidate('.booking__form');

justValidate
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
    .addField('.person-info__email', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваш email',
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