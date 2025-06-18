document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Проверяем, что это форма заказа (ищем в ней поле 'article')
        const articleInput = form.querySelector('[name="article"], [name="artikul"]');
        if (!articleInput) {
            return; // Пропускаем формы, которые не являются формами заказа
        }

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Отменяем стандартную отправку

            const formData = new FormData(form);
            let statusDiv = form.querySelector('.form-status');

            // Если блок для статуса не найден, создаем и добавляем его в конец формы
            if (!statusDiv) {
                statusDiv = document.createElement('div');
                statusDiv.className = 'form-status';
                form.appendChild(statusDiv);
            }
            
            statusDiv.innerHTML = 'Отправка...';

            fetch('/mail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text().then(text => ({ status: response.status, text })))
            .then(({ status, text }) => {
                if (status === 200) {
                    statusDiv.innerHTML = `<p style="color: green;">${text}</p>`;
                    form.reset();
                } else {
                    statusDiv.innerHTML = `<p style="color: red;">${text}</p>`;
                }
                // Очищаем сообщение через 5 секунд
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                statusDiv.innerHTML = `<p style="color: red;">Произошла ошибка при отправке.</p>`;
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            });
        });
    });
}); 