<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $article = strip_tags(trim($_POST["article"]));
    $message = trim($_POST["message"]);
    $to_email = "fdu8808@gmail.com";

    // Проверка данных
    if (empty($name) OR empty($phone) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Пожалуйста, заполните все поля и введите корректный email.";
        exit;
    }

    // Содержание письма
    $email_content = "Имя: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Телефон: $phone\n";
    $email_content .= "Артикул: $article\n\n";
    $email_content .= "Сообщение:\n$message\n";

    // Заголовки письма
    $email_headers = "From: $name <$email>";

    // Отправка письма
    if (mail($to_email, "Новый заказ с сайта", $email_content, $email_headers)) {
        http_response_code(200);
        echo "Спасибо! Ваше сообщение отправлено.";
    } else {
        http_response_code(500);
        echo "Что-то пошло не так, и мы не смогли отправить ваше сообщение.";
    }

} else {
    http_response_code(403);
    echo "Возникла проблема с вашим запросом, пожалуйста, попробуйте снова.";
}
?> 