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

  // --- Lottie Settings (controlado por data-lottie-*) ---
  const lottieSettings = {
    src: config.lottieSrc || "https://mediastrapi.koppi.mx/uploads/Chatbot_Off_v2_01b544fff6.json",
    background: config.lottieBackground || "transparent",
    speed: config.lottieSpeed || "1",
    loop: config.lottieLoop !== "false",
    autoplay: config.lottieAutoplay !== "false",
    // Permiten unidades CSS completas como '100px', '8vw', etc.
    width: config.lottieWidth || "100px",
    height: config.lottieHeight || "100px",
    bottom: config.lottieBottom || "10px",
    right: config.lottieRight || "10px",
  };

  // --- Default Flowise Configuration ---
  const flowiseConfig = {
    chatflowid: config.chatflowid || "c982cf4f-a8ae-4d71-a763-669867146924",
    apiHost: config.apiHost || "https://cloud.flowiseai.com",
    chatflowConfig: {},
    observersConfig: {},
    theme: {
      // --- Flowise Button Settings (controlado por data-button-*) ---
      button: {
        backgroundColor: '', // Sigue oculto, así que el color no es visible
        // Flowise espera números para right, bottom, size (probablemente interpretados como píxeles)
        right: parseInt(config.buttonRight) || 20, // Nuevo: data-button-right, default 20
        bottom: parseInt(config.buttonBottom) || 20, // Nuevo: data-button-bottom, default 20
        size: parseInt(config.buttonSize) || 80,     // Nuevo: data-button-size, default 80
        // Flowise espera booleanos para dragAndDrop y las opciones de autoWindowOpen
        dragAndDrop: (config.buttonDragAndDrop === 'true') || false, // Nuevo: data-button-drag-and-drop, default false
        iconColor: config.buttonIconColor || 'white', // Nuevo: data-button-icon-color, default 'white'
        customIconSrc: config.buttonCustomIconSrc || '', // Nuevo: data-button-custom-icon-src, default ''
        autoWindowOpen: {
          autoOpen: (config.buttonAutoOpen === 'true') || false, // Nuevo: data-button-auto-open
          openDelay: parseInt(config.buttonAutoOpenDelay) || 2,  // Nuevo: data-button-auto-open-delay
          autoOpenOnMobile: (config.buttonAutoOpenOnMobile === 'true') || false // Nuevo: data-button-auto-open-on-mobile
        }
      },
      customCSS: `.flowise-chatbot-button { display: none !important; }`, // Mantiene el botón de Flowise oculto
      chatWindow: { // La configuración de la VENTANA DE CHAT sigue siendo independiente
        showTitle: true,
        showAgentMessages: true,
        title: config.chatWindowTitle || 'Si Now Misión Punta Norte',
        welcomeMessage: config.chatWelcomeMessage || '¡Hola! Soy tu asistente virtual...',
        errorMessage: 'Por favor vuelve a intentarlo más tarde.',
        backgroundColor: '#ffffff',
        backgroundImage: 'enter image path or link',
        height: parseInt(config.chatWindowHeight) || 700, // Mantenemos la opción de configurar esto
        width: parseInt(config.chatWindowWidth) || 400,   // Mantenemos la opción de configurar esto
        fontSize: 16,
        clearChatOnReload: false,
        // ... (resto de la configuración de chatWindow como estaba) ...
        textInput: {
            placeholder: config.textInputPlaceholder || 'Ask me anything...',
            // ... (resto de textInput)
        },
        footer: {
            company: config.footerCompany || 'koppi',
            companyLink: config.footerCompanyLink || 'https://koppi.mx'
            // ... (resto de footer)
        }
      }
      // ... (resto de tu theme config)
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLottieButton);
  } else {
    initLottieButton();
  }

})();
