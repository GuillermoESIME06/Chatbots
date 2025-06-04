// flowise-lottie-custom-embed.js
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

  // --- Main Lottie Button Container (Lottie + Text) Settings ---
  const lottieContainerSettings = {
    right: config.lottieContainerRight || '20px',
    bottom: config.lottieContainerBottom || '20px',
    zIndex: config.lottieContainerZIndex || '10000',
  };

  // --- Lottie Animation Settings ---
  const lottieSettings = {
    src: config.lottieSrc || "https://assets10.lottiefiles.com/packages/lf20_7q9cs4is.json", // Default Lottie
    background: config.lottieBackground || "transparent",
    speed: config.lottieSpeed || "1",
    loop: config.lottieLoop !== "false",
    autoplay: config.lottieAutoplay !== "false",
    width: config.lottieWidth || "70px",
    widthTablet: config.lottieWidthTablet || "60px",
    widthMobile: config.lottieWidthMobile || "50px",
    // Height will typically be same as width for square Lotties, or configurable
    height: config.lottieHeight || config.lottieWidth || "70px",
    heightTablet: config.lottieHeightTablet || config.lottieWidthTablet || "60px",
    heightMobile: config.lottieHeightMobile || config.lottieWidthMobile || "50px",
  };

  // --- Text Span (next to Lottie) Settings ---
  const textSpanSettings = {
    enable: config.textSpanEnable === "true", // data-text-span-enable="true"
    content: config.textSpanContent || "¡Chatea aquí!",
    backgroundColor: config.textSpanBackgroundColor || "linear-gradient(90deg, rgba(62,5,100,0.8) 10%, rgba(233,49,83,0.8) 80%)",
    textColor: config.textSpanTextColor || "white",
    fontSize: config.textSpanFontSize || "10pt",
    padding: config.textSpanPadding || "10px 15px",
    borderRadius: config.textSpanBorderRadius || "20px 0 0 20px", // Assumes text is to the left
    textOffset: config.textSpanTextOffset || "-10px", // Offset from Lottie (e.g. -10px to move it left)
    maxWidth: config.textSpanMaxWidth || "200px", // Max width for the text span
  };

  // --- Flowise Chat Window Position & Size ---
  const chatWindowSettings = {
    width: parseInt(config.chatWindowWidth) || 370,
    height: parseInt(config.chatWindowHeight) || 600, // This is theme.chatWindow.height
    cssHeight: config.chatWindowCssHeight || "80vh", // For customCSS like ::part(bot)
    cssMaxHeight: config.chatWindowCssMaxHeight || "600px", // For customCSS
    alignHorizontal: config.chatWindowAlignHorizontal || 'right',
    alignVertical: config.chatWindowAlignVertical || 'bottom',
    marginHorizontal: config.chatWindowMarginHorizontal || '20px',
    marginVertical: config.chatWindowMarginVertical || '20px',
  };

  // --- Generate Positioning CSS for Chat Window ---
  let positioningStyles = '';
  // Horizontal
  if (chatWindowSettings.alignHorizontal === 'left') {
    positioningStyles += `left: ${chatWindowSettings.marginHorizontal} !important; right: auto !important;`;
  } else if (chatWindowSettings.alignHorizontal === 'center') {
    positioningStyles += `left: 50% !important; right: auto !important; transform: translateX(-50%) !important;`;
  } else { // Default right
    positioningStyles += `right: ${chatWindowSettings.marginHorizontal} !important; left: auto !important;`;
  }
  // Vertical
  if (chatWindowSettings.alignVertical === 'top') {
    positioningStyles += `top: ${chatWindowSettings.marginVertical} !important; bottom: auto !important;`;
  } else if (chatWindowSettings.alignVertical === 'middle') {
    let currentTransform = chatWindowSettings.alignHorizontal === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)';
    if(chatWindowSettings.alignHorizontal === 'center') {
        positioningStyles = positioningStyles.replace('translateX(-50%) !important;', `translate(-50%, -50%) !important;`);
    } else {
        positioningStyles += `transform: ${currentTransform} !important;`;
    }
    positioningStyles += `top: 50% !important; bottom: auto !important;`;
  } else { // Default bottom
    positioningStyles += `bottom: ${chatWindowSettings.marginVertical} !important; top: auto !important;`;
  }
  if (chatWindowSettings.alignHorizontal !== 'center' && chatWindowSettings.alignVertical !== 'middle') {
    positioningStyles += `transform: none !important;`;
  }
  // Add specific height/max-height from config
  positioningStyles += `height: ${chatWindowSettings.cssHeight} !important; max-height: ${chatWindowSettings.cssMaxHeight} !important;`;


  // --- Flowise Theme Configuration ---
  const flowiseConfig = {
    chatflowid: config.chatflowid,
    apiHost: config.apiHost || "https://cloud.flowiseai.com",
    theme: {
      button: { // Native button, will be hidden but its config can sometimes affect window
        backgroundColor: 'transparent', // Hidden anyway
        right: parseInt(lottieContainerSettings.right) + (parseInt(lottieSettings.width) / 2), // Approximate center
        bottom: parseInt(lottieContainerSettings.bottom) + (parseInt(lottieSettings.height) / 2),
        size: parseInt(lottieSettings.width) || 50,
        dragAndDrop: config.buttonDragAndDrop === 'true' || false,
        iconColor: 'white',
        // ... other button settings from your React theme if needed
      },
      chatWindow: {
        // These are initial preferred sizes, CSS will try to enforce further
        width: chatWindowSettings.width,
        height: chatWindowSettings.height,

        showTitle: config.chatWindowShowTitle !== 'false',
        title: config.chatWindowTitle || 'Chatbot',
        welcomeMessage: config.chatWelcomeMessage || 'Hola! ¿En qué puedo ayudarte?',
        errorMessage: config.chatWindowErrorMessage || 'Error, intenta de nuevo.',
        backgroundColor: config.chatWindowBackgroundColor || '#ffffff',
        fontSize: parseInt(config.chatWindowFontSize) || 16,
        // ... (map all other theme options like botMessage, userMessage, textInput, footer from your React example)
        botMessage: {
          backgroundColor: config.botMessageBackgroundColor || '#f7f8ff',
          textColor: config.botMessageTextColor || '#303235',
          showAvatar: config.botMessageShowAvatar !== 'false',
        },
        userMessage: {
          backgroundColor: config.userMessageBackgroundColor || '#3B81F6',
          textColor: config.userMessageTextColor || '#ffffff',
          showAvatar: config.userMessageShowAvatar !== 'false',
          avatarSrc: config.userMessageAvatarSrc || 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
        },
        textInput: {
          placeholder: config.textInputPlaceholder || 'Escribe tu mensaje...',
          backgroundColor: config.textInputBackgroundColor || '#ffffff',
          textColor: config.textInputTextColor || '#303235',
          sendButtonColor: config.textInputSendButtonColor || '#3B81F6',
        },
        footer: {
             textColor: config.footerTextColor || '#303235',
             text: config.footerText || 'Powered by',
             company: config.footerCompany || 'Flowise',
             companyLink: config.footerCompanyLink || 'https://flowiseai.com'
        }
      },
      customCSS: `
        .flowise-chatbot-button {
          opacity: 0 !important;
          pointer-events: none !important;
          width: 1px !important; /* Minimize footprint */
          height: 1px !important;
          position: fixed !important; /* Ensure it's fixed if Flowise relies on it */
          top: -10px !important; /* Move way off-screen */
          left: -10px !important;
        }
        .flowise-chat-window {
          /* Initial styles from config, will be reinforced by JS */
          ${positioningStyles}
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          border-radius: 8px;
        }
      `
    }
  };

  function applyStylesToElement(element, stylesString) {
    if (!element || !stylesString) return;
    const styleDeclarations = stylesString.split(';').filter(s => s.trim() !== '');
    styleDeclarations.forEach(declaration => {
      const parts = declaration.split(':');
      if (parts.length === 2) {
        const property = parts[0].trim();
        let value = parts[1].trim();
        let priority = '';
        if (value.endsWith('!important')) {
          value = value.replace('!important', '').trim();
          priority = 'important';
        }
        element.style.setProperty(property, value, priority);
      }
    });
  }
  
  function forceChatWindowPositionAndStyle() {
    const chatWindowElement = document.querySelector('.flowise-chat-window');
    if (chatWindowElement) {
      // console.log("Forcing chat window styles:", positioningStyles);
      applyStylesToElement(chatWindowElement, positioningStyles);
    } else {
      // console.warn(".flowise-chat-window not found to force styles.");
    }
  }

  function initFlowise() {
    const flowiseEmbedScript = document.createElement('script');
    flowiseEmbedScript.type = 'module';
    flowiseEmbedScript.innerHTML = `
      try {
        const Chatbot = await import("https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js");
        Chatbot.default.init(${JSON.stringify(flowiseConfig)});
        setTimeout(forceChatWindowPositionAndStyle, 500); // Force after init
        // Attempt to force again if window becomes visible (more robust)
        const observer = new MutationObserver((mutationsList, observerInstance) => {
            for(const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const chatWindow = document.querySelector('.flowise-chat-window');
                    if (chatWindow && chatWindow.style.display !== 'none' && chatWindow.style.opacity !== '0') {
                         // Check if our styles are still applied, Flowise might override them on open
                         // This check can be more sophisticated
                        forceChatWindowPositionAndStyle();
                    }
                }
            }
        });
        const chatWindowContainer = document.querySelector('flowise-chatbot'); // Assuming flowise-embed creates this
        if (chatWindowContainer) {
             // The actual window div might be inside the shadow DOM or a child
             // For simplicity, let's assume the wrapper or try to find the inner window.
             // This part is tricky as flowise-embed's internal structure isn't as exposed as ::part.
             // We will observe the main chatbot element for attribute changes (like style for open/close)
            const targetNode = document.querySelector('.flowise-chat-window') || document.body; // Fallback to body
            observer.observe(targetNode, { attributes: true, attributeFilter: ['style', 'class'] });
        }


      } catch (e) {
        console.error("Error loading or initializing Flowise Chatbot:", e);
      }
    `;
    document.head.appendChild(flowiseEmbedScript);
  }

  function createCustomButton() {
    const mainContainer = document.createElement("div");
    mainContainer.id = "flowise-custom-lottie-container";
    mainContainer.style.position = "fixed";
    mainContainer.style.right = lottieContainerSettings.right;
    mainContainer.style.bottom = lottieContainerSettings.bottom;
    mainContainer.style.zIndex = lottieContainerSettings.zIndex;
    mainContainer.style.display = "flex";
    mainContainer.style.alignItems = "center";
    mainContainer.style.cursor = "pointer";

    if (textSpanSettings.enable) {
      const textSpan = document.createElement("span");
      textSpan.id = "flowise-lottie-text-span";
      textSpan.textContent = textSpanSettings.content;
      textSpan.style.background = textSpanSettings.backgroundColor;
      textSpan.style.color = textSpanSettings.textColor;
      textSpan.style.fontSize = textSpanSettings.fontSize;
      textSpan.style.padding = textSpanSettings.padding;
      textSpan.style.borderRadius = textSpanSettings.borderRadius;
      textSpan.style.marginRight = textSpanSettings.textOffset; // Adjust based on text side
      textSpan.style.maxWidth = textSpanSettings.maxWidth;
      textSpan.style.whiteSpace = "nowrap";
      textSpan.style.overflow = "hidden";
      textSpan.style.textOverflow = "ellipsis";
      // Add responsive styles for text span if needed here or via injected CSS
      mainContainer.appendChild(textSpan);
    }

    const lottiePlayer = document.createElement("lottie-player");
    lottiePlayer.id = "flowise-custom-lottie-button";
    lottiePlayer.setAttribute("src", lottieSettings.src);
    lottiePlayer.setAttribute("background", lottieSettings.background);
    lottiePlayer.setAttribute("speed", lottieSettings.speed);
    if (lottieSettings.loop) lottiePlayer.setAttribute("loop", "");
    if (lottieSettings.autoplay) lottiePlayer.setAttribute("autoplay", "");
    
    lottiePlayer.style.width = lottieSettings.width;
    lottiePlayer.style.height = lottieSettings.height;
    // Responsive styles for Lottie will be handled by injected CSS below

    mainContainer.appendChild(lottiePlayer);
    document.body.appendChild(mainContainer);

    mainContainer.addEventListener("click", () => {
      const nativeButton = document.querySelector(".flowise-chatbot-button");
      if (nativeButton) {
        nativeButton.click();
        // After click, Flowise might take a moment to open and apply its own styles.
        // Re-apply our position styles for the window.
        setTimeout(forceChatWindowPositionAndStyle, 100); // Short delay
        setTimeout(forceChatWindowPositionAndStyle, 500); // Longer delay for insurance
      } else {
        console.warn("Flowise native button not found for custom Lottie button click.");
      }
    });

    injectResponsiveStylesForLottie();
  }
  
  function injectResponsiveStylesForLottie() {
    const styleId = 'flowise-lottie-responsive-styles';
    if (document.getElementById(styleId)) return; // Prevent duplicate styles

    const css = `
      @media (max-width: 992px) { /* Tablet */
        #flowise-custom-lottie-button {
          width: ${lottieSettings.widthTablet} !important;
          height: ${lottieSettings.heightTablet} !important;
        }
        /* Adjust text span for tablet if needed */
        #flowise-lottie-text-span {
            /* Example: font-size: calc(${textSpanSettings.fontSize} - 2pt); */
        }
      }
      @media (max-width: 767px) { /* Mobile */
        #flowise-custom-lottie-button {
          width: ${lottieSettings.widthMobile} !important;
          height: ${lottieSettings.heightMobile} !important;
        }
         /* Adjust text span for mobile if needed */
        #flowise-lottie-text-span {
            /* Example: display: none; or smaller font/padding */
        }
        /* Example: Adjust main container position on mobile */
        /* #flowise-custom-lottie-container { bottom: 10px !important; right: 10px !important; } */
      }
    `;
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(css));
    document.head.appendChild(styleElement);
  }


  function loadLottiePlayerAndInit() {
    if (typeof LottiePlayer === 'undefined') {
      const lottieScript = document.createElement('script');
      lottieScript.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      lottieScript.onload = () => {
        createCustomButton();
        initFlowise();
      };
      lottieScript.onerror = () => console.error("Failed to load Lottie Player script.");
      document.head.appendChild(lottieScript);
    } else {
      createCustomButton();
      initFlowise();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLottiePlayerAndInit);
  } else {
    loadLottiePlayerAndInit();
  }

})();