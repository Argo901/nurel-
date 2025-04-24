document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById('submit');
    const inputForm = document.querySelector('.input-form');
    const receipt = document.querySelector('.receipt');
    const actions = document.querySelector('.actions'); // Блок .actions

    // Функция для получения текущей даты и времени в формате "день.месяц.год, часы:минуты"
    function getCurrentDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    }

    submitButton.addEventListener('click', function() {
        const nameInput = document.getElementById('name').value.trim();
        const numberInput = document.getElementById('number').value.trim();
        const priceInput = document.getElementById('price').value.trim();

        // Проверка на пустые поля
        if (!nameInput || !numberInput || !priceInput) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        // Проверка на корректность номера телефона
        if (!/^\d+$/.test(numberInput)) {
            alert('Номер телефона должен содержать только цифры!');
            return;
        }

        // Проверка на корректность суммы
        if (isNaN(priceInput) || Number(priceInput) <= 0) {
            alert('Введите корректную сумму!');
            return;
        }

        const fullPhone = '996' + numberInput;
        const recipientNameElement = document.getElementById('recipient-name');
        if (recipientNameElement) {
            recipientNameElement.innerHTML = `<strong>Имя получателя:</strong> ${nameInput}`;
        }

        const transferInfoElement = document.querySelector('.transfer-info');
        if (transferInfoElement) {
            const formattedPrice = Number(priceInput).toFixed(2);
            transferInfoElement.innerHTML = `Перевод по номеру телефона qr. ${fullPhone}/${nameInput}/ / Сумма ${formattedPrice}KGS`;
        }

        const amountElement = document.querySelector('.amount');
        if (amountElement) {
            const formattedPrice = Number(priceInput).toFixed(2).replace('.', ',');
            amountElement.textContent = `-${formattedPrice} с̱`;
        }

        // Обновляем дату операции
        const transactionDateElement = document.getElementById('transaction-date');
        if (transactionDateElement) {
            transactionDateElement.innerHTML = `<strong>Дата операции:</strong> ${getCurrentDateTime()}`;
        }

        // Показываем чек с анимацией
        inputForm.style.display = 'none';
        receipt.classList.add('show'); // Добавляем класс для анимации

        // Показываем блок .actions
        actions.classList.add('show'); // Добавляем класс для отображения
    });
});