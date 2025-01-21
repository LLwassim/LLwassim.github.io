<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Recipient email address
    $to = "wassimlacorchy@gmail.com"; 

    // Subject and email body
    $subject = "Contact Form Submission from $name";
    $message_body = "Name: $name\n";
    $message_body .= "Email: $email\n";
    $message_body .= "Message:\n$message";

    // Headers
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $message_body, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
}
?>
