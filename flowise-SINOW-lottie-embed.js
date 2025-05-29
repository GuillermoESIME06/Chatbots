// flowise-lottie-embed.js

(function() {
  function getScriptAttributes() {
    const scriptTag = document.currentScript;
    if (!scriptTag) return {};
    const attributes = {};
    for (let i = 0; i < scriptTag.attributes.length; i++) {
      const attr = scriptTag.attributes[i];
      if (attr.name.startsWith('data-')) {
        const camelCaseName = attr.name.substring(5).replace(/-./g, x => x[1].toUpperCase());
        attributes[camelCaseName] = attr.value;
      }
    }
    return attributes;
  }

  const config = getScriptAttributes();

  // --- Lottie Settings ---
  // Define lottieSettings primero para que sus valores puedan ser usados en flowiseConfig.
  const lottieSettings = {
    src: config.lottieSrc || "https://mediastrapi.koppi.mx/uploads/Chatbot_Off_v2_01b544fff6.json",
    background: config.lottieBackground || "transparent",
    speed: config.lottieSpeed || "1",
    loop: config.lottieLoop !== "false",
    autoplay: config.lottieAutoplay !== "false",
    width: config.lottieWidth || "100px",     // String para el estilo CSS directo del Lottie
    height: config.lottieHeight || "100px",   // String para el estilo CSS directo del Lottie
    // Para la configuración de Flowise theme.button, 'right' y 'bottom' son números.
    // 'size' de Flowise theme.button también es un número.
    right: parseInt(config.lottieRight) || 10,      // Convertir a número
    bottom: parseInt(config.lottieBottom) || 10,    // Convertir a número
    // Para 'size' de Flowise theme.button, usamos el ancho del Lottie (convertido a número).
    sizeForFlowise: parseInt(config.lottieWidth) || 100 // Convertir a número
  };

  // --- Default Flowise Configuration ---
  const flowiseConfig = {
    chatflowid: config.chatflowid || "c982cf4f-a8ae-4d71-a763-669867146924",
    apiHost: config.apiHost || "https://cloud.flowiseai.com",
    chatflowConfig: {
        /* Chatflow Config - keep empty if not used in original */
    },
    observersConfig: {
        /* Observers Config - keep empty if not used in original */
    },
    theme: {
      button: { // Configuración para el botón (oculto) de Flowise
        backgroundColor: '', // Irrelevante, estará oculto
        right: lottieSettings.right,        // Usa el valor numérico de lottieSettings.right
        bottom: lottieSettings.bottom,      // Usa el valor numérico de lottieSettings.bottom
        size: lottieSettings.sizeForFlowise,// Usa el valor numérico de lottieSettings.sizeForFlowise
        dragAndDrop: true,
        iconColor: 'white',
        customIconSrc: '',
        autoWindowOpen: {
          autoOpen: false,
          openDelay: 2,
          autoOpenOnMobile: false
        }
      },
      customCSS: `.flowise-chatbot-button { display: none !important; }`, // Oculta el botón de Flowise
      chatWindow: { // Configuración de la VENTANA DE CHAT (independiente de data-lottie-*)
        showTitle: true,
        showAgentMessages: true,
        title: config.chatWindowTitle || 'Si Now Misión Punta Norte',
        welcomeMessage: config.chatWelcomeMessage || '¡Hola! Soy tu asistente virtual de Grupo SI NOW. Estoy aquí para brindarte información sobre nuestros lotes habitacionales en La Paz, Baja California Sur, con un enfoque en nuestro desarrollo Misión Punta Norte.',
        errorMessage: 'Por favor vuelve a intentarlo más tarde.',
        backgroundColor: '#ffffff',
        backgroundImage: 'enter image path or link',
        height: 700, // Tamaño fijo para la ventana de chat
        width: 400,  // Tamaño fijo para la ventana de chat
        fontSize: 16,
        clearChatOnReload: false,
        sourceDocsTitle: 'Sources:',
        renderHTML: true,
        botMessage: {
          backgroundColor: '#f7f8ff',
          textColor: '#303235',
        },
        userMessage: {
          backgroundColor: '#3B81F6',
          textColor: '#ffffff',
          showAvatar: true,
          avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
        },
        textInput: {
          placeholder: config.textInputPlaceholder || 'Ask me anything...', // Permitimos configurar el placeholder
          backgroundColor: '#ffffff',
          textColor: '#303235',
          sendButtonColor: '#3B81F6',
          maxChars: 10000,
          maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 10000 characters.',
          autoFocus: true,
          sendMessageSound: true,
          sendSoundLocation: 'send_message.mp3',
          receiveMessageSound: true,
          receiveSoundLocation: 'receive_message.mp3'
        },
        feedback: {
          color: '#303235'
        },
        dateTimeToggle: {
          date: true,
          time: true
        },
        footer: {
          textColor: '#303235',
          text: 'Powered by',
          company: config.footerCompany || 'koppi',
          companyLink: config.footerCompanyLink || 'https://koppi.mx'
        }
      }
    }
  };

  // 1) Load Flowise dynamically
  const flowiseScript = document.createElement('script');
  flowiseScript.type = 'module';
  flowiseScript.innerHTML = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
    Chatbot.init(${JSON.stringify(flowiseConfig)});
  `;
  document.head.appendChild(flowiseScript);

  // 2) Función para tamaño responsivo (opcional, no usada por defecto para el Lottie aquí)
  // function setResponsiveSize(el, wStyle, hStyle, bStyle, rStyle) { /* ... */ }

  // 3) Inject Lottie Player script and create the Lottie button
  function initLottieButton() {
    if (typeof LottiePlayer === 'undefined') {
        const lottiePlayerScript = document.createElement("script");
        lottiePlayerScript.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
        lottiePlayerScript.onload = createLottieElement;
        document.head.appendChild(lottiePlayerScript);
    } else {
        createLottieElement();
    }
  }

  function createLottieElement() {
    let container = document.getElementById("custom-chat-button-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "custom-chat-button-container";
      document.body.appendChild(container);
    }

    const lottieBtn = document.createElement("lottie-player");
    lottieBtn.setAttribute("src", lottieSettings.src);
    lottieBtn.setAttribute("background", lottieSettings.background);
    lottieBtn.setAttribute("speed", lottieSettings.speed);
    if (lottieSettings.loop) lottieBtn.setAttribute("loop", "");
    if (lottieSettings.autoplay) lottieBtn.setAttribute("autoplay", "");

    // Aplicar estilos al botón Lottie
    Object.assign(lottieBtn.style, {
      width: lottieSettings.width,    // Ej: "130px"
      height: lottieSettings.height,  // Ej: "130px"
      position: "fixed",
      bottom: lottieSettings.bottom + "px", // Ej: 50 + "px" -> "50px"
      right: lottieSettings.right + "px",   // Ej: 50 + "px" -> "50px"
      cursor: "pointer",
      zIndex: "10000"
    });
    container.appendChild(lottieBtn);

    lottieBtn.addEventListener("click", () => {
      const nativeBtn = document.querySelector(".flowise-chatbot-button");
      if (nativeBtn) {
        nativeBtn.click();
      } else {
        console.warn("Flowise native button not found. Chat may not open.");
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLottieButton);
  } else {
    initLottieButton();
  }

})();
