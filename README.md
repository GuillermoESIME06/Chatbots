# Documentación: flowise-SINOW-lottie-embed.js

Este script facilita la incrustación de un chatbot de Flowise con un botón de inicio personalizado animado mediante Lottie en cualquier página web. Simplifica el proceso al encapsular la inicialización de Flowise, la carga de Lottie Player, y la configuración del botón y la ventana de chat en un solo archivo JavaScript.

**Autor:** GuillermoESIME06
**Versión:** 1.0.0 (Puedes actualizar esto según tus cambios)
**Repositorio:** [https://github.com/GuillermoESIME06/Chatbots/blob/main/flowise-SINOW-lottie-embed.js](https://github.com/GuillermoESIME06/Chatbots/blob/main/flowise-SINOW-lottie-embed.js)
**CDN Link (jsDelivr):** `https://cdn.jsdelivr.net/gh/GuillermoESIME06/Chatbots@main/flowise-SINOW-lottie-embed.js`

## Características

* **Integración Sencilla:** Añade el chatbot a tu web con una sola etiqueta `<script>`.
* **Botón Lottie Personalizado:** Utiliza una animación Lottie como botón para abrir el chat, en lugar del botón predeterminado de Flowise.
* **Configuración Predeterminada Completa:** Incluye una configuración de tema detallada para la ventana de chat (colores, mensajes de bienvenida, etc.), basada en el diseño original de "Si Now Misión Punta Norte".
* **Personalizable:** Permite anular configuraciones clave mediante atributos `data-*` en la etiqueta del script.
* **Carga Dinámica:** Carga Flowise y Lottie Player dinámicamente.

## Cómo Usar

Para añadir el chatbot a tu página HTML, simplemente incluye la siguiente etiqueta `<script>` antes del cierre de tu etiqueta `</body>`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Página con Chatbot</title>
</head>
<body>
  <h1>Bienvenido a Mi Sitio</h1>
  <p>Prueba nuestro asistente virtual.</p>

  <script src="[https://cdn.jsdelivr.net/gh/GuillermoESIME06/Chatbots@main/flowise-SINOW-lottie-embed.js](https://cdn.jsdelivr.net/gh/GuillermoESIME06/Chatbots@main/flowise-SINOW-lottie-embed.js)" defer></script>
</body>
</html>
