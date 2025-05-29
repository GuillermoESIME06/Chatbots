// flowise-lottie-embed.js version 3

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

  // --- Lottie Settings (controlado por data-lottie-*) ---
  const lottieSettings = {
    src: config.lottieSrc || "https://mediastrapi.koppi.mx/uploads/Chatbot_Off_v2_01b544fff6.json",
    background: config.lottieBackground || "transparent",
    speed: config.lottieSpeed || "1",
    loop: config.lottieLoop !== "false", // Default true, se anula si data-lottie-loop="false"
    autoplay: config.lottieAutoplay !== "false", // Default true, se anula si data-lottie-autoplay="false"
    // Permiten unidades CSS completas como '100px', '8vw', etc.
    width: config.lottieWidth || "100px",
    height: config.lottieHeight || "100px",
    bottom: config.lottieBottom || "10px",
    right: config.lottieRight || "10px",
  };

  // --- Default Flowise Configuration ---
  const flowiseConfig = {
    chatflowid: config.chatflowid || "c982cf4f-a8ae-4d71-a763-669867146924", // Overridable
    apiHost: config.apiHost || "https://cloud.flowiseai.com", // Overridable
    chatflowConfig: {
        /* Chatflow Config - keep empty if not used in original */
    },
    observersConfig: {
        /* Observers Config - keep empty if not used in original */
    },
    theme: {
      // --- Flowise Button Settings (controlado por data-button-*) ---
      button: {
        backgroundColor: '', // Sigue oculto, así que el color no es visible
        // Flowise espera números para right, bottom, size (probablemente interpretados como píxeles)
        right: parseInt(config.buttonRight) || 20,           // Usa data-button-right, default 20
        bottom: parseInt(config.buttonBottom) || 20,         // Usa data-button-bottom, default 20
        size: parseInt(config.buttonSize) || 80,             // Usa data-button-size, default 80
        // Flowise espera booleanos para dragAndDrop y las opciones de autoWindowOpen
        dragAndDrop: (config.buttonDragAndDrop === 'true') || false, // Usa data-button-drag-and-drop, default false
        iconColor: config.buttonIconColor || 'white',       // Usa data-button-icon-color, default 'white'
        customIconSrc: config.buttonCustomIconSrc || '',   // Usa data-button-custom-icon-src, default ''
        autoWindowOpen: {
          autoOpen: (config.buttonAutoOpen === 'true') || false, // Usa data-button-auto-open
          openDelay: parseInt(config.buttonAutoOpenDelay) || 2,  // Usa data-button-auto-open-delay
          autoOpenOnMobile: (config.buttonAutoOpenOnMobile === 'true') || false // Usa data-button-auto-open-on-mobile
        }
      },
      customCSS: `.flowise-chatbot-button { display: none !important; }`, // Mantiene el botón de Flowise oculto
      chatWindow: { // Configuración de la VENTANA DE CHAT
        showTitle: true,
        showAgentMessages: true,
        title: config.chatWindowTitle || 'Si Now Misión Punta Norte', // Overridable
        welcomeMessage: config.chatWelcomeMessage || '¡Hola! Soy tu asistente virtual de Grupo SI NOW. Estoy aquí para brindarte información sobre nuestros lotes habitacionales en La Paz, Baja California Sur, con un enfoque en nuestro desarrollo Misión Punta Norte.', // Overridable
        errorMessage: 'Por favor vuelve a intentarlo más tarde.',
        backgroundColor: '#ffffff',
        backgroundImage: config.chatWindowBackgroundImage || '', // Overridable, default empty
        height: parseInt(config.chatWindowHeight) || 700, // Usa data-chat-window-height, default 700
        width: parseInt(config.chatWindowWidth) || 400,   // Usa data-chat-window-width, default 400
        fontSize: parseInt(config.chatWindowFontSize) || 16, // Overridable, default 16
        clearChatOnReload: (config.chatWindowClearChatOnReload === 'true') || false, // default false
        sourceDocsTitle: config.chatWindowSourceDocsTitle || 'Sources:', // Overridable
        renderHTML: (config.chatWindowRenderHtml === 'false') ? false : true, // default true
        botMessage: {
          backgroundColor: config.botMessageBackgroundColor || '#f7f8ff',
          textColor: config.botMessageTextColor || '#303235',
        },
        userMessage: {
          backgroundColor: config.userMessageBackgroundColor || '#3B81F6',
          textColor: config.userMessageTextColor || '#ffffff',
          showAvatar: (config.userMessageShowAvatar === 'false') ? false : true, // default true
          avatarSrc: config.userMessageAvatarSrc || 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
        },
        textInput: {
          placeholder: config.textInputPlaceholder || 'Ask me anything...', // Overridable
          backgroundColor: config.textInputBackgroundColor || '#ffffff',
          textColor: config.textInputTextColor || '#303235',
          sendButtonColor: config.textInputSendButtonColor || '#3B81F6',
          maxChars: parseInt(config.textInputMaxChars) || 10000,
          maxCharsWarningMessage: config.textInputMaxCharsWarningMessage || 'You exceeded the characters limit. Please input less than 10000 characters.',
          autoFocus: (config.textInputAutoFocus === 'false') ? false : true, // default true
          sendMessageSound: (config.textInputSendMessageSound === 'false') ? false : true, // default true
          sendSoundLocation: config.textInputSendSoundLocation || 'send_message.mp3',
          receiveMessageSound: (config.textInputReceiveMessageSound === 'false') ? false : true, // default true
          receiveSoundLocation: config.textInputReceiveSoundLocation || 'receive_message.mp3'
        },
        feedback: {
          color: config.feedbackColor || '#303235'
        },
        dateTimeToggle: {
          date: (config.dateTimeToggleDate === 'false') ? false : true, // default true
          time: (config.dateTimeToggleTime === 'false') ? false : true  // default true
        },
        footer: {
          textColor: config.footerTextColor || '#303235',
          text: config.footerText || 'Powered by',
          company: config.footerCompany || 'koppi', // Overridable
          companyLink: config.footerCompanyLink || 'https://koppi.mx' // Overridable
        }
      }
    }
  };

  // 1) Load Flowise dynamically
  const flowiseScript = document.createElement('script');
  flowiseScript.type = 'module';
  flowiseScript.innerHTML = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
    // console.log("Initializing Flowise with config:", ${JSON.stringify(JSON.stringify(flowiseConfig))}); // For deep debugging
    Chatbot.init(${JSON.stringify(flowiseConfig)});
  `;
  document.head.appendChild(flowiseScript);

  // 2) Function for responsive size (opcional)
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

    // Aplicar estilos al botón Lottie usando lottieSettings
    Object.assign(lottieBtn.style, {
      width: lottieSettings.width,    // Ej: "8vw" o "100px"
      height: lottieSettings.height,  // Ej: "15vw" o "100px"
      position: "fixed",
      bottom: lottieSettings.bottom,  // Ej: "300px" o "5vh"
      right: lottieSettings.right,    // Ej: "10px" o "2vw"
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

  // Ensure DOM is ready for Lottie button creation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLottieButton);
  } else {
    initLottieButton();
  }

})();
