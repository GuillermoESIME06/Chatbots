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
  // Estos controlan la apariencia del Lottie y también el right, bottom y size del theme.button de Flowise
  const lottieSettings = {
    src: config.lottieSrc || "https://mediastrapi.koppi.mx/uploads/Chatbot_Off_v2_01b544fff6.json",
    background: config.lottieBackground || "transparent",
    speed: config.lottieSpeed || "1",
    loop: config.lottieLoop !== "false",
    autoplay: config.lottieAutoplay !== "false",
    width: config.lottieWidth || "100px",     // Para estilo Lottie y base para sizeForFlowise
    height: config.lottieHeight || "100px",   // Para estilo Lottie
    right: parseInt(config.lottieRight) || 10,      // Para config Flowise button y estilo Lottie
    bottom: parseInt(config.lottieBottom) || 10,    // Para config Flowise button y estilo Lottie
    sizeForFlowise: parseInt(config.lottieWidth) || 100 // Para config Flowise button.size
  };

  // --- Default Flowise Configuration ---
  const flowiseConfig = {
    chatflowid: config.chatflowid || "c982cf4f-a8ae-4d71-a763-669867146924",
    apiHost: config.apiHost || "https://cloud.flowiseai.com",
    chatflowConfig: {}, // Puedes exponer sub-propiedades si es necesario
    observersConfig: {}, // Puedes exponer sub-propiedades si es necesario
    theme: {
      button: {
        backgroundColor: '', // Oculto
        // Estos se mantienen vinculados a lottieSettings como en tu script
        right: lottieSettings.right,
        bottom: lottieSettings.bottom,
        size: lottieSettings.sizeForFlowise,
        // --- Demás parámetros de theme.button ahora configurables ---
        dragAndDrop: (config.buttonDragAndDrop === 'true') || true, // default true como en tu script original
        iconColor: config.buttonIconColor || 'white', // default 'white'
        customIconSrc: config.buttonCustomIconSrc || '', // default ''
        autoWindowOpen: {
          autoOpen: (config.buttonAutoOpen === 'true') || false, // default false
          openDelay: parseInt(config.buttonAutoOpenDelay) || 2, // default 2
          autoOpenOnMobile: (config.buttonAutoOpenOnMobile === 'true') || false // default false
        }
      },
      customCSS: `.flowise-chatbot-button { display: none !important; }`,
      chatWindow: {
        showTitle: (config.chatWindowShowTitle === 'false') ? false : true, // default true
        showAgentMessages: (config.chatWindowShowAgentMessages === 'false') ? false : true, // default true
        title: config.chatWindowTitle || 'Si Now Misión Punta Norte',
        welcomeMessage: config.chatWelcomeMessage || '¡Hola! Soy tu asistente virtual de Grupo SI NOW...',
        errorMessage: config.chatWindowErrorMessage || 'Por favor vuelve a intentarlo más tarde.',
        backgroundColor: config.chatWindowBackgroundColor || '#ffffff',
        backgroundImage: config.chatWindowBackgroundImage || '', // default 'enter image path or link'
        height: parseInt(config.chatWindowHeight) || 700,
        width: parseInt(config.chatWindowWidth) || 400,
        fontSize: parseInt(config.chatWindowFontSize) || 16,
        clearChatOnReload: (config.chatWindowClearChatOnReload === 'true') || false, // default false
        sourceDocsTitle: config.chatWindowSourceDocsTitle || 'Sources:',
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
          placeholder: config.textInputPlaceholder || 'Ask me anything...',
          backgroundColor: config.textInputBackgroundColor || '#ffffff',
          textColor: config.textInputTextColor || '#303235',
          sendButtonColor: config.textInputSendButtonColor || '#3B81F6',
          maxChars: parseInt(config.textInputMaxChars) || 10000,
          maxCharsWarningMessage: config.textInputMaxCharsWarningMessage || 'You exceeded the characters limit...',
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
    // Para depurar la configuración que se envía:
    // console.log("Flowise Init Config:", JSON.parse(JSON.stringify(${JSON.stringify(flowiseConfig)})));
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

    Object.assign(lottieBtn.style, {
      width: lottieSettings.width,
      height: lottieSettings.height,
      position: "fixed",
      bottom: lottieSettings.bottom + "px", // lottieSettings.bottom es número, se añade "px"
      right: lottieSettings.right + "px",   // lottieSettings.right es número, se añade "px"
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
