// Живой пример работы JavaScript
document.addEventListener("DOMContentLoaded", () => {
    console.log("Скрипт загружен и готов к работе!");
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            alert(`Вы кликнули на ссылку: ${link.textContent}`);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviewsContainer");

    // Загрузка отзывов из LocalStorage
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    if (savedReviews.length > 0) {
        savedReviews.forEach((review) => addReviewToDOM(review.name, review.text));
    } else {
        showNoReviewsMessage();
    }

    // Обработчик отправки формы
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Получаем данные из формы
        const name = document.getElementById("name").value.trim();
        const review = document.getElementById("review").value.trim();

        // Проверяем, что поля не пустые
        if (!name || !review) return;

        // Удаляем сообщение "Нет отзывов", если есть
        const noReviewsMessage = document.getElementById("noReviewsMessage");
        if (noReviewsMessage) noReviewsMessage.remove();

        // Добавляем отзыв в LocalStorage
        const newReview = { name, text: review };
        savedReviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(savedReviews));

        // Добавляем отзыв в DOM
        addReviewToDOM(name, review);

        // Очищаем форму
        reviewForm.reset();
    });

    // Функция добавления отзыва в DOM
    function addReviewToDOM(name, text) {
        const newReview = document.createElement("li");
        newReview.innerHTML = `<strong>${name}</strong>: ${text}`;
        reviewsContainer.appendChild(newReview);
    }

    // Функция отображения сообщения "Нет отзывов"
    function showNoReviewsMessage() {
        const noReviewsMessage = document.createElement("p");
        noReviewsMessage.id = "noReviewsMessage";
        noReviewsMessage.textContent = "Пока отзывов нет. Будьте первым!";
        reviewsContainer.appendChild(noReviewsMessage);
    }
});
