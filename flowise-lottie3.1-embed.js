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
  const lottieSettings = {
    src: config.lottieSrc || "https://mediastrapi.koppi.mx/uploads/Chatbot_Off_v2_01b544fff6.json",
    background: config.lottieBackground || "transparent",
    speed: config.lottieSpeed || "1",
    loop: config.lottieLoop !== "false",
    autoplay: config.lottieAutoplay !== "false",
    // Default values for larger screens
    width: config.lottieWidth || "100px",
    height: config.lottieHeight || "100px",
    right: parseInt(config.lottieRight) || 20, // Default right position
    bottom: parseInt(config.lottieBottom) || 20, // Default bottom position
    sizeForFlowise: parseInt(config.lottieWidth) || 100
  };

  // --- Responsive Adjustments for Chat Window ---
  const screenPadding = 20; // px, space from screen edges
  const maxChatWindowWidth = window.innerWidth - screenPadding;
  const maxChatWindowHeight = window.innerHeight - screenPadding;

  const initialChatWindowWidth = parseInt(config.chatWindowWidth) || 400;
  const initialChatWindowHeight = parseInt(config.chatWindowHeight) || 700;

  const responsiveChatWindowWidth = Math.min(initialChatWindowWidth, maxChatWindowWidth);
  const responsiveChatWindowHeight = Math.min(initialChatWindowHeight, maxChatWindowHeight);


  // --- Default Flowise Configuration ---
  const flowiseConfig = {
    chatflowid: config.chatflowid || "c982cf4f-a8ae-4d71-a763-669867146924",
    apiHost: config.apiHost || "https://cloud.flowiseai.com",
    chatflowConfig: {},
    observersConfig: {},
    theme: {
      button: {
        backgroundColor: '', // Oculto
        right: lottieSettings.right,
        bottom: lottieSettings.bottom,
        size: lottieSettings.sizeForFlowise,
        dragAndDrop: (config.buttonDragAndDrop === 'true') || true,
        iconColor: config.buttonIconColor || 'white',
        customIconSrc: config.buttonCustomIconSrc || '',
        autoWindowOpen: {
          autoOpen: (config.buttonAutoOpen === 'true') || false,
          openDelay: parseInt(config.buttonAutoOpenDelay) || 2,
          autoOpenOnMobile: (config.buttonAutoOpenOnMobile === 'true') || false
        }
      },
      // Enhanced customCSS for responsiveness
      customCSS: `
        .flowise-chatbot-button { display: none !important; }
        .flowise-chat-window {
          /* Ensure the chat window itself doesn't exceed viewport, respecting user's preferred size up to a limit */
          max-width: calc(100vw - 10px) !important; /* 5px margin on each side */
          max-height: calc(100vh - 10px) !important; /* 5px margin top/bottom */
          /* If Flowise positions it bottom-right, these ensure it's visible */
          right: 5px !important;
          bottom: 5px !important;
          left: auto !important; /* Ensure it doesn't get stuck to left */
          top: auto !important; /* Ensure it doesn't get stuck to top */
        }
      `,
      chatWindow: {
        showTitle: (config.chatWindowShowTitle === 'false') ? false : true,
        showAgentMessages: (config.chatWindowShowAgentMessages === 'false') ? false : true,
        title: config.chatWindowTitle || 'Si Now Misión Punta Norte',
        welcomeMessage: config.chatWelcomeMessage || '¡Hola! Soy tu asistente virtual de Grupo SI NOW...',
        errorMessage: config.chatWindowErrorMessage || 'Por favor vuelve a intentarlo más tarde.',
        backgroundColor: config.chatWindowBackgroundColor || '#ffffff',
        backgroundImage: config.chatWindowBackgroundImage || '',
        // Use responsive dimensions
        height: responsiveChatWindowHeight,
        width: responsiveChatWindowWidth,
        fontSize: parseInt(config.chatWindowFontSize) || 16,
        clearChatOnReload: (config.chatWindowClearChatOnReload === 'true') || false,
        sourceDocsTitle: config.chatWindowSourceDocsTitle || 'Sources:',
        renderHTML: (config.chatWindowRenderHtml === 'false') ? false : true,
        botMessage: {
          backgroundColor: config.botMessageBackgroundColor || '#f7f8ff',
          textColor: config.botMessageTextColor || '#303235',
        },
        userMessage: {
          backgroundColor: config.userMessageBackgroundColor || '#3B81F6',
          textColor: config.userMessageTextColor || '#ffffff',
          showAvatar: (config.userMessageShowAvatar === 'false') ? false : true,
          avatarSrc: config.userMessageAvatarSrc || 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
        },
        textInput: {
          placeholder: config.textInputPlaceholder || 'Ask me anything...',
          backgroundColor: config.textInputBackgroundColor || '#ffffff',
          textColor: config.textInputTextColor || '#303235',
          sendButtonColor: config.textInputSendButtonColor || '#3B81F6',
          maxChars: parseInt(config.textInputMaxChars) || 10000,
          maxCharsWarningMessage: config.textInputMaxCharsWarningMessage || 'You exceeded the characters limit...',
          autoFocus: (config.textInputAutoFocus === 'false') ? false : true,
          sendMessageSound: (config.textInputSendMessageSound === 'false') ? false : true,
          sendSoundLocation: config.textInputSendSoundLocation || 'send_message.mp3',
          receiveMessageSound: (config.textInputReceiveMessageSound === 'false') ? false : true,
          receiveSoundLocation: config.textInputReceiveSoundLocation || 'receive_message.mp3'
        },
        feedback: {
          color: config.feedbackColor || '#303235'
        },
        dateTimeToggle: {
          date: (config.dateTimeToggleDate === 'false') ? false : true,
          time: (config.dateTimeToggleTime === 'false') ? false : true
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
    // console.log("Flowise Init Config:", JSON.parse(JSON.stringify(${JSON.stringify(flowiseConfig)})));
    Chatbot.init(${JSON.stringify(flowiseConfig)});
  `;
  document.head.appendChild(flowiseScript);

  // 2) Inject Responsive CSS for Lottie Button
  function injectLottieResponsiveStyles() {
    const style = document.createElement('style');
    style.id = 'lottie-responsive-styles';
    style.innerHTML = `
      #custom-chat-button-container lottie-player {
        /* Default styles from lottieSettings will be applied inline,
           these media queries will override them for specific screen sizes. */
        transition: width 0.2s ease-in-out, height 0.2s ease-in-out, right 0.2s ease-in-out, bottom 0.2s ease-in-out;
      }

      /* Example: For tablets and smaller desktops */
      @media (max-width: 992px) {
        #custom-chat-button-container lottie-player {
          width: ${config.lottieWidthTablet || '80px'} !important;
          height: ${config.lottieHeightTablet || '80px'} !important;
          right: ${config.lottieRightTablet || '15px'} !important;
          bottom: ${config.lottieBottomTablet || '15px'} !important;
        }
      }

      /* Example: For mobile phones */
      @media (max-width: 767px) {
        #custom-chat-button-container lottie-player {
          width: ${config.lottieWidthMobile || '60px'} !important;   /* Smaller on mobile */
          height: ${config.lottieHeightMobile || '60px'} !important;  /* Smaller on mobile */
          right: ${config.lottieRightMobile || '10px'} !important;    /* Closer to edge */
          bottom: ${config.lottieBottomMobile || '10px'} !important;   /* Closer to edge */
        }
      }
    `;
    document.head.appendChild(style);

    // Optionally allow data-attributes for responsive Lottie sizes
    // Example: data-lottie-width-mobile="50px"
    // This is now integrated directly into the style.innerHTML template literals
  }


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
    lottieBtn.setAttribute("id", "the-lottie-chat-button"); // Give it an ID for easier targeting if needed
    lottieBtn.setAttribute("src", lottieSettings.src);
    lottieBtn.setAttribute("background", lottieSettings.background);
    lottieBtn.setAttribute("speed", lottieSettings.speed);
    if (lottieSettings.loop) lottieBtn.setAttribute("loop", "");
    if (lottieSettings.autoplay) lottieBtn.setAttribute("autoplay", "");

    // Apply default styles (will be overridden by media queries where applicable)
    Object.assign(lottieBtn.style, {
      width: lottieSettings.width,
      height: lottieSettings.height,
      position: "fixed",
      bottom: lottieSettings.bottom + "px",
      right: lottieSettings.right + "px",
      cursor: "pointer",
      zIndex: "10000" // Ensure it's above other content but below Flowise window when open
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
    document.addEventListener('DOMContentLoaded', () => {
      injectLottieResponsiveStyles();
      initLottieButton();
    });
  } else {
    injectLottieResponsiveStyles();
    initLottieButton();
  }

})();
