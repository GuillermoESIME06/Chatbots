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
    loop: config.lottieLoop !== "false", // Default true, overridable if 'false'
    autoplay: config.lottieAutoplay !== "false", // Default true, overridable if 'false'
    width: config.lottieWidth || "100px",     // Mantenemos como string con "px" para el estilo directo del Lottie
    height: config.lottieHeight || "100px",   // Mantenemos como string con "px"
    // Para la configuración de Flowise, 'right' y 'bottom' son números.
    // 'size' de Flowise también es un número.
    right: parseInt(config.lottieRight) || 10,      // Convertir a número para Flowise config
    bottom: parseInt(config.lottieBottom) || 10,    // Convertir a número para Flowise config
    // Para 'size' de Flowise, usamos el ancho del Lottie (sin "px").
    sizeForFlowise: parseInt(config.lottieWidth) || 100 // Convertir a número
  };

  // --- Default Flowise Configuration (merged with script attributes) ---
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
      button: {
        backgroundColor: '', // Irrelevante, estará oculto
        // ***** CORRECCIÓN APLICADA AQUÍ *****
        right: lottieSettings.right,        // Usa el valor numérico de lottieSettings
        bottom: lottieSettings.bottom,      // Usa el valor numérico de lottieSettings
        size: lottieSettings.sizeForFlowise,// Usa el valor numérico (basado en el ancho del lottie)
        // ***** FIN DE LA CORRECCIÓN *****
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
      chatWindow: {
        showTitle: true,
        showAgentMessages: true,
        title: config.chatWindowTitle || 'Si Now Misión Punta Norte', // Overridable
        welcomeMessage: config.chatWelcomeMessage || '¡Hola! Soy tu asistente virtual de Grupo SI NOW. Estoy aquí para brindarte información sobre nuestros lotes habitacionales en La Paz, Baja California Sur, con un enfoque en nuestro desarrollo Misión Punta Norte.', // Overridable
        errorMessage: 'Por favor vuelve a intentarlo más tarde.',
        backgroundColor: '#ffffff',
        backgroundImage: 'enter image path or link', // Can be overridden if needed, or kept as is
        height: 700,
        width: 400,
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
          placeholder: 'Aks me anything...', // Corregido "Aks" a "Ask" si es un error tipográfico
          backgroundColor: '#ffffff',
          textColor: '#303235',
          sendButtonColor: '#3B81F6',
          maxChars: 10000,
          maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 10000 characters.',
          autoFocus: true,
          sendMessageSound: true,
          sendSoundLocation: 'send_message.mp3', // Ensure this path is accessible or use full URL
          receiveMessageSound: true,
          receiveSoundLocation: 'receive_message.mp3' // Ensure this path is accessible or use full URL
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
    Chatbot.init(${JSON.stringify(flowiseConfig)});
  `;
  document.head.appendChild(flowiseScript);

  // 2) Function for responsive size (opcional, si la necesitas para el Lottie)
  // function setResponsiveSize(el, wStyle, hStyle, bStyle, rStyle) {
  //   el.style.width  = wStyle;
  //   el.style.height = hStyle;
  //   el.style.bottom = bStyle;
  //   el.style.right  = rStyle;
  // }

  // 3) Inject Lottie Player script and create the Lottie button
  function initLottieButton() {
    if (typeof LottiePlayer === 'undefined') { // Check if Lottie Player is already loaded
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

    Object.assign(lottieBtn.style, {
      width: lottieSettings.width,    // Ya es string con "px" o el valor de data-lottie-width
      height: lottieSettings.height,  // Ya es string con "px" o el valor de data-lottie-height
      position: "fixed",
      bottom: lottieSettings.bottom + "px", // lottieSettings.bottom es número, se añade "px"
      right: lottieSettings.right + "px",   // lottieSettings.right es número, se añade "px"
      cursor: "pointer",
      zIndex: "10000"
    });
    container.appendChild(lottieBtn);

    // Si quieres usar la lógica de tamaño responsivo para el Lottie:
    // const update = () => setResponsiveSize(lottieBtn, (window.innerWidth * 15 / 100) + "px", "auto", (window.innerHeight * 5 / 100) + "px", (window.innerWidth * 5 / 100) + "px");
    // window.addEventListener("load", update);
    // window.addEventListener("resize", update);
    // update(); // Initial call

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
