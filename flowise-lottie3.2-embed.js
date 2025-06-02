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
    width: config.lottieWidth || "100px",
    height: config.lottieHeight || "100px",
    right: parseInt(config.lottieRight) || 20,
    bottom: parseInt(config.lottieBottom) || 20,
    sizeForFlowise: parseInt(config.lottieWidth) || 100
  };

  // --- Chat Window Position & Size Configuration ---
  const chatWindowDefaultWidth = 400;
  const chatWindowDefaultHeight = 600;
  const chatWindowHorizontalAlign = config.chatWindowAlignHorizontal || 'right'; // 'left', 'center', 'right'
  const chatWindowVerticalAlign = config.chatWindowAlignVertical || 'bottom';   // 'top', 'middle', 'bottom'
  const chatWindowMarginHorizontal = config.chatWindowMarginHorizontal || '20px';
  const chatWindowMarginVertical = config.chatWindowMarginVertical || '20px';

  // Calculate available space for the chat window based on margins
  // For width, subtract two horizontal margins (left and right)
  // For height, subtract two vertical margins (top and bottom)
  const availableWidth = window.innerWidth - (parseInt(chatWindowMarginHorizontal) * 2);
  const availableHeight = window.innerHeight - (parseInt(chatWindowMarginVertical) * 2);

  const initialChatWindowWidth = parseInt(config.chatWindowWidth) || chatWindowDefaultWidth;
  const initialChatWindowHeight = parseInt(config.chatWindowHeight) || chatWindowDefaultHeight;

  // Ensure chat window fits within available space
  const responsiveChatWindowWidth = Math.min(initialChatWindowWidth, availableWidth);
  const responsiveChatWindowHeight = Math.min(initialChatWindowHeight, availableHeight);

  // --- Generate Positioning CSS for Chat Window ---
  let positioningStyles = '';
  // Horizontal Alignment
  if (chatWindowHorizontalAlign === 'left') {
    positioningStyles += `left: ${chatWindowMarginHorizontal} !important; right: auto !important;`;
  } else if (chatWindowHorizontalAlign === 'center') {
    positioningStyles += `left: 50% !important; right: auto !important; transform: translateX(-50%);`;
  } else { // Default to 'right'
    positioningStyles += `right: ${chatWindowMarginHorizontal} !important; left: auto !important;`;
  }

  // Vertical Alignment
  if (chatWindowVerticalAlign === 'top') {
    positioningStyles += `top: ${chatWindowMarginVertical} !important; bottom: auto !important;`;
  } else if (chatWindowVerticalAlign === 'middle') {
    // If also centered horizontally, combine transforms
    if (chatWindowHorizontalAlign === 'center') {
      positioningStyles = positioningStyles.replace('translateX(-50%)', 'translate(-50%, -50%)');
    } else {
      positioningStyles += `transform: translateY(-50%);`; // Apply only vertical transform if not horizontally centered
    }
    positioningStyles += `top: 50% !important; bottom: auto !important;`;
  } else { // Default to 'bottom'
    positioningStyles += `bottom: ${chatWindowMarginVertical} !important; top: auto !important;`;
  }
  // Ensure transform is properly cleared or set if not centering
  if (chatWindowHorizontalAlign !== 'center' && chatWindowVerticalAlign !== 'middle') {
      positioningStyles += `transform: none !important;`;
  } else if (chatWindowHorizontalAlign !== 'center' && chatWindowVerticalAlign === 'middle') {
      // Only Y transform was applied, ensure X is none or handle correctly
      // This case is tricky, usually full centering or edge alignment is cleaner.
      // For simplicity, if only one is 'center'/'middle', the transform might need adjustment.
      // The current logic prioritizes horizontal centering's transform.
  }


  // --- Default Flowise Configuration ---
  const flowiseConfig = {
    chatflowid: config.chatflowid || "c982cf4f-a8ae-4d71-a763-669867146924",
    apiHost: config.apiHost || "https://cloud.flowiseai.com",
    chatflowConfig: {},
    observersConfig: {},
    theme: {
      button: {
        // ... (button settings remain the same) ...
        backgroundColor: '',
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
      customCSS: `
        .flowise-chatbot-button { display: none !important; }
        .flowise-chat-window {
          /* Max dimensions are safety, actual dimensions come from JS calculation */
          max-width: 100vw !important; 
          max-height: 100vh !important;
          ${positioningStyles}
        }
      `,
      chatWindow: {
        // ... (other chatWindow settings remain the same) ...
        height: responsiveChatWindowHeight,
        width: responsiveChatWindowWidth,
        showTitle: (config.chatWindowShowTitle === 'false') ? false : true,
        showAgentMessages: (config.chatWindowShowAgentMessages === 'false') ? false : true,
        title: config.chatWindowTitle || 'Si Now Misión Punta Norte',
        welcomeMessage: config.chatWelcomeMessage || '¡Hola! Soy tu asistente virtual de Grupo SI NOW...',
        errorMessage: config.chatWindowErrorMessage || 'Por favor vuelve a intentarlo más tarde.',
        backgroundColor: config.chatWindowBackgroundColor || '#ffffff',
        backgroundImage: config.chatWindowBackgroundImage || '',
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

  // 2) Inject Responsive CSS for Lottie Button (remains the same)
  function injectLottieResponsiveStyles() {
    const style = document.createElement('style');
    style.id = 'lottie-responsive-styles';
    style.innerHTML = `
      #custom-chat-button-container lottie-player {
        transition: width 0.2s ease-in-out, height 0.2s ease-in-out, right 0.2s ease-in-out, bottom 0.2s ease-in-out;
      }
      @media (max-width: 992px) { /* Tablets */
        #custom-chat-button-container lottie-player {
          width: ${config.lottieWidthTablet || '80px'} !important;
          height: ${config.lottieHeightTablet || '80px'} !important;
          right: ${config.lottieRightTablet || '15px'} !important;
          bottom: ${config.lottieBottomTablet || '15px'} !important;
        }
      }
      @media (max-width: 767px) { /* Mobiles */
        #custom-chat-button-container lottie-player {
          width: ${config.lottieWidthMobile || '60px'} !important;
          height: ${config.lottieHeightMobile || '60px'} !important;
          right: ${config.lottieRightMobile || '10px'} !important;
          bottom: ${config.lottieBottomMobile || '10px'} !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 3) Inject Lottie Player script and create the Lottie button (remains the same)
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
    lottieBtn.setAttribute("id", "the-lottie-chat-button");
    lottieBtn.setAttribute("src", lottieSettings.src);
    lottieBtn.setAttribute("background", lottieSettings.background);
    lottieBtn.setAttribute("speed", lottieSettings.speed);
    if (lottieSettings.loop) lottieBtn.setAttribute("loop", "");
    if (lottieSettings.autoplay) lottieBtn.setAttribute("autoplay", "");
    Object.assign(lottieBtn.style, {
      width: lottieSettings.width,
      height: lottieSettings.height,
      position: "fixed",
      bottom: lottieSettings.bottom + "px",
      right: lottieSettings.right + "px",
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
    document.addEventListener('DOMContentLoaded', () => {
      injectLottieResponsiveStyles();
      initLottieButton();
    });
  } else {
    injectLottieResponsiveStyles();
    initLottieButton();
  }

})();
