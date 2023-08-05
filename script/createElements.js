export const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    const modal = document.createElement('div');
    overlay.classList.add('modal');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
        <button class="close" type="button"></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class="form-groupe">
            <label class="form-label" for ="name">Имя:</label>
            <input class="form-input" name="name" id="name" type="text" required> 
        </div>
        <div class="form-groupe">
            <label class="form-label" for ="surname">Фамилия:</label>
            <input class="form-input" name="surname" id="surname" type="text" required> 
        </div>
        <div class="form-groupe">
            <label class="form-label" for ="phone">Телефон:</label>
            <input class="form-input" name="phone" id="phone" type="number" required> 
        </div>        
        `);
    const btnClose = document.createElement('button');
    btnClose.classList.add('modal__close');
    btnClose.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round" />
                    <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round" />
                </svg>`;

    form.append();
    modal.append(btnClose, form);
    overlay.append(modal);

    return {
        overlay,
        form,
    }
};