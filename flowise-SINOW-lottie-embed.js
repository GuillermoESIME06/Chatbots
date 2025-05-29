// flowise-lottie-embed.js

(function() {
  // Helper function to get attributes from the script tag that's running this code
  function getScriptAttributes() {
    const scriptTag = document.currentScript;
    if (!scriptTag) return {};

    const attributes = {};
    for (let i = 0; i < scriptTag.attributes.length; i++) {
      const attr = scriptTag.attributes[i];
      if (attr.name.startsWith('data-')) {
        // Convert kebab-case to camelCase (e.g., data-chatflow-id -> chatflowId)
        const camelCaseName = attr.name.substring(5).replace(/-./g, x => x[1].toUpperCase());
        attributes[camelCaseName] = attr.value;
      }
    }
    return attributes;
  }

  const config = getScriptAttributes();

  // --- Default Configuration (merged with script attributes) ---
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
      button: {
        backgroundColor: '', // Will be hidden anyway
        right: 20,
        bottom: 20,
        size: 80,
        dragAndDrop: true,
        iconColor: 'white',
        customIconSrc: '',
        autoWindowOpen: {
          autoOpen: false,
          openDelay: 2,
          autoOpenOnMobile: false
        }
      },
      customCSS: `.flowise-chatbot-button { display: none !important; }`, // Hide default button
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
          placeholder: 'Aks me anything...',
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

  const lottieSettings = {
    src: config.lottieSrc || "https://mediastrapi.koppi.mx/uploads/Chatbot_Off_v2_01b544fff6.json", // Overridable
    background: config.lottieBackground || "transparent",
    speed: config.lottieSpeed || "1",
    loop: config.lottieLoop !== "false", // Default true, overridable if 'false'
    autoplay: config.lottieAutoplay !== "false", // Default true, overridable if 'false'
    width: config.lottieWidth || "100px", // Overridable
    height: config.lottieHeight || "100px", // Overridable
    bottom: config.lottieBottom || "10px", // Overridable
    right: config.lottieRight || "10px" // Overridable
  };


  // 1) Load Flowise dynamically
  const flowiseScript = document.createElement('script');
  flowiseScript.type = 'module';
  flowiseScript.innerHTML = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
    Chatbot.init(${JSON.stringify(flowiseConfig)});
  `;
  document.head.appendChild(flowiseScript);


  // 2) Function for responsive size (if needed, though fixed sizes are used here)
  //    Kept your structure for setResponsiveSize if you want to reintegrate % based sizing
  function setResponsiveSize(el, wStyle, hStyle, bStyle, rStyle) {
    el.style.width  = wStyle;
    el.style.height = hStyle;
    el.style.bottom = bStyle;
    el.style.right  = rStyle;
  }

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
      width: lottieSettings.width,
      height: lottieSettings.height,
      position: "fixed",
      bottom: lottieSettings.bottom,
      right: lottieSettings.right,
      cursor: "pointer",
      zIndex: "10000"
    });
    container.appendChild(lottieBtn);

    // If you want to use the percentage based responsive logic:
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