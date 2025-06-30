// Contenido para flowise-lottie3.2-embed.js
(function() {
    'use strict';

    function getConfig(scriptTag, dataKey, defaultValue, type = 'string') {
        const value = scriptTag.dataset[dataKey]; // dataKey es camelCase: ej. chatFlowId
        if (value === undefined || value === null || value === "") {
            return defaultValue;
        }
        if (type === 'boolean') {
            return value.toLowerCase() === 'true';
        }
        if (type === 'number') {
            const num = Number(value);
            return isNaN(num) ? defaultValue : num;
        }
        if (type === 'json') {
            try {
                return JSON.parse(value);
            } catch (e) {
                console.error(`Flowise Lottie Embed: Error al parsear JSON para ${dataKey}. Usando default. Valor recibido:`, value, e);
                return defaultValue;
            }
        }
        return value;
    }

    let currentScript = document.currentScript;
    if (!currentScript) {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src && (scripts[i].src.includes('flowise-lottie') || scripts[i].id === 'flowise-lottie-embed-script')) { // Added ID check for robustness
                currentScript = scripts[i];
                break;
            }
        }
    }

    if (!currentScript) {
        console.error("Flowise Lottie Embed: No se pudo encontrar la etiqueta del script. Asegúrate de que tenga un ID 'flowise-lottie-embed-script' o que su 'src' incluya 'flowise-lottie'.");
        return;
    }

    const config = {
        // Core Flowise
        chatflowid: getConfig(currentScript, 'chatflowid', null),
        apiHost: getConfig(currentScript, 'apiHost', 'https://srv870858.hstgr.cloud'),
        chatflowConfig: getConfig(currentScript, 'chatflowConfigJson', {}, 'json'), // data-chatflow-config-json
        observersConfig: getConfig(currentScript, 'observersConfigJson', {}, 'json'), // data-observers-config-json

        // Lottie
        lottieAnimationPath: getConfig(currentScript, 'lottieAnimationPath', null),
        lottieButtonId: 'flowise-lottie-trigger-' + Date.now(),
        lottieButtonBottom: getConfig(currentScript, 'lottieButtonBottom', '20px'),
        lottieButtonRight: getConfig(currentScript, 'lottieButtonRight', '20px'),
        lottieButtonWidth: getConfig(currentScript, 'lottieButtonWidth', '70px'),
        lottieButtonHeight: getConfig(currentScript, 'lottieButtonHeight', '70px'),
        lottieButtonZIndex: getConfig(currentScript, 'lottieButtonZIndex', '10000'),

        // Lottie Tooltip (NUEVO)
        lottieTooltipEnabled: getConfig(currentScript, 'lottieTooltipEnabled', true, 'boolean'),            // data-lottie-tooltip-enabled
        lottieTooltipText: getConfig(currentScript, 'lottieTooltipText', 'Abrir Chat'),                    // data-lottie-tooltip-text
        lottieTooltipBackgroundColor: getConfig(currentScript, 'lottieTooltipBackgroundColor', '#333333'),  // data-lottie-tooltip-background-color
        lottieTooltipTextColor: getConfig(currentScript, 'lottieTooltipTextColor', 'rgba(255, 255, 255, 0.05)'),              // data-lottie-tooltip-text-color
        lottieTooltipFontSize: getConfig(currentScript, 'lottieTooltipFontSize', '12px'),                  // data-lottie-tooltip-font-size
        lottieTooltipPadding: getConfig(currentScript, 'lottieTooltipPadding', '5px 10px'),                // data-lottie-tooltip-padding
        lottieTooltipBorderRadius: getConfig(currentScript, 'lottieTooltipBorderRadius', '4px'),           // data-lottie-tooltip-border-radius
        lottieTooltipZIndexOffset: getConfig(currentScript, 'lottieTooltipZIndexOffset', 1, 'number'),     // data-lottie-tooltip-z-index-offset (offset from lottie button z-index)
        lottieTooltipPositionOffset: getConfig(currentScript, 'lottieTooltipPositionOffset', 8, 'number'), // data-lottie-tooltip-position-offset (px above button)


        // Theme -> Button (original Flowise button)
        themeButtonBackgroundColor: getConfig(currentScript, 'themeButtonBackgroundColor', '#3B81F6'),
        themeButtonRight: getConfig(currentScript, 'themeButtonRight', 20, 'number'),
        themeButtonBottom: getConfig(currentScript, 'themeButtonBottom', 20, 'number'),
        themeButtonSize: getConfig(currentScript, 'themeButtonSize', 48, 'number'),
        themeButtonDragAndDrop: getConfig(currentScript, 'themeButtonDragAndDrop', true, 'boolean'),
        themeButtonIconColor: getConfig(currentScript, 'themeButtonIconColor', 'white'),
        themeButtonCustomIconSrc: getConfig(currentScript, 'themeButtonCustomIconSrc', ''),
        themeButtonAutoOpen: getConfig(currentScript, 'themeButtonAutoOpen', false, 'boolean'), // Forzado a false si usamos Lottie
        themeButtonOpenDelay: getConfig(currentScript, 'themeButtonOpenDelay', 2, 'number'),
        themeButtonAutoOpenOnMobile: getConfig(currentScript, 'themeButtonAutoOpenOnMobile', false, 'boolean'),
        
        // Theme -> ChatWindow
        themeChatWindowShowTitle: getConfig(currentScript, 'themeChatWindowShowTitle', true, 'boolean'),
        themeChatWindowShowAgentMessages: getConfig(currentScript, 'themeChatWindowShowAgentMessages', true, 'boolean'),
        themeChatWindowTitle: getConfig(currentScript, 'themeChatWindowTitle', 'Chatbot'),
        themeChatWindowTitleAvatarSrc: getConfig(currentScript, 'themeChatWindowTitleAvatarSrc', ''),
        themeChatWindowWelcomeMessage: getConfig(currentScript, 'themeChatWindowWelcomeMessage', '¡Hola!'),
        themeChatWindowErrorMessage: getConfig(currentScript, 'themeChatWindowErrorMessage', 'Ocurrió un error.'),
        themeChatWindowBackgroundColor: getConfig(currentScript, 'themeChatWindowBackgroundColor', '#rgba(255, 255, 255, 0.05)'),
        themeChatWindowBackgroundImage: getConfig(currentScript, 'themeChatWindowBackgroundImage', ''),
        themeChatWindowHeight: getConfig(currentScript, 'themeChatWindowHeight', 600, 'number'),
        themeChatWindowWidth: getConfig(currentScript, 'themeChatWindowWidth', 400, 'number'),
        themeChatWindowFontSize: getConfig(currentScript, 'themeChatWindowFontSize', 16, 'number'),
        themeChatWindowStarterPrompts: getConfig(currentScript, 'themeChatWindowStarterPromptsJson', [], 'json'), // data-chat-window-starter-prompts-json
        themeChatWindowStarterPromptFontSize: getConfig(currentScript, 'themeChatWindowStarterPromptFontSize', 15, 'number'),
        themeChatWindowClearChatOnReload: getConfig(currentScript, 'themeChatWindowClearChatOnReload', false, 'boolean'),
        themeChatWindowSourceDocsTitle: getConfig(currentScript, 'themeChatWindowSourceDocsTitle', 'Fuentes:'),
        themeChatWindowRenderHTML: getConfig(currentScript, 'themeChatWindowRenderHtml', true, 'boolean'),
        
        // Theme -> ChatWindow -> BotMessage
        themeBotMessageBackgroundColor: getConfig(currentScript, 'themeBotMessageBackgroundColor', '#f7f8ff'),
        themeBotMessageTextColor: getConfig(currentScript, 'themeBotMessageTextColor', '#303235'),
        themeBotMessageShowAvatar: getConfig(currentScript, 'themeBotMessageShowAvatar', true, 'boolean'),
        themeBotMessageAvatarSrc: getConfig(currentScript, 'themeBotMessageAvatarSrc', ''),
        
        // Theme -> ChatWindow -> UserMessage
        themeUserMessageBackgroundColor: getConfig(currentScript, 'themeUserMessageBackgroundColor', '#3B81F6'),
        themeUserMessageTextColor: getConfig(currentScript, 'themeUserMessageTextColor', '#ffffff'),
        themeUserMessageShowAvatar: getConfig(currentScript, 'themeUserMessageShowAvatar', true, 'boolean'),
        themeUserMessageAvatarSrc: getConfig(currentScript, 'themeUserMessageAvatarSrc', ''),
        
        // Theme -> ChatWindow -> TextInput
        themeTextInputPlaceholder: getConfig(currentScript, 'themeTextInputPlaceholder', 'Escribe tu pregunta'),
        themeTextInputBackgroundColor: getConfig(currentScript, 'themeTextInputBackgroundColor', '#ffffff'),
        themeTextInputTextColor: getConfig(currentScript, 'themeTextInputTextColor', '#303235'),
        themeTextInputSendButtonColor: getConfig(currentScript, 'themeTextInputSendButtonColor', '#3B81F6'),
        themeTextInputMaxChars: getConfig(currentScript, 'themeTextInputMaxChars', 1000, 'number'),
        themeTextInputMaxCharsWarningMessage: getConfig(currentScript, 'themeTextInputMaxCharsWarningMessage', 'Límite de caracteres excedido.'),
        themeTextInputAutoFocus: getConfig(currentScript, 'themeTextInputAutoFocus', true, 'boolean'),
        themeTextInputSendMessageSound: getConfig(currentScript, 'themeTextInputSendMessageSound', false, 'boolean'),
        themeTextInputSendSoundLocation: getConfig(currentScript, 'themeTextInputSendSoundLocation', ''),
        themeTextInputReceiveMessageSound: getConfig(currentScript, 'themeTextInputReceiveMessageSound', false, 'boolean'),
        themeTextInputReceiveSoundLocation: getConfig(currentScript, 'themeTextInputReceiveSoundLocation', ''),
        
        // Theme -> ChatWindow -> Feedback
        themeFeedbackColor: getConfig(currentScript, 'themeFeedbackColor', '#303235'),
        
        // Theme -> ChatWindow -> DateTimeToggle
        themeDateTimeToggleDate: getConfig(currentScript, 'themeDateTimeToggleDate', true, 'boolean'),
        themeDateTimeToggleTime: getConfig(currentScript, 'themeDateTimeToggleTime', true, 'boolean'),
        
        // Theme -> ChatWindow -> Footer
        themeFooterTextColor: getConfig(currentScript, 'themeFooterTextColor', '#303235'),
        themeFooterText: getConfig(currentScript, 'themeFooterText', 'Powered by'),
        themeFooterCompany: getConfig(currentScript, 'themeFooterCompany', 'Flowise'),
        themeFooterCompanyLink: getConfig(currentScript, 'themeFooterCompanyLink', 'https://flowiseai.com'),
    };

    if (!config.chatflowid) {
        console.error("Flowise Lottie Embed: 'data-chatflowid' es requerido.");
        return;
    }
    if (!config.lottieAnimationPath) {
        console.error("Flowise Lottie Embed: 'data-lottie-animation-path' es requerido.");
        return;
    }

    let lottieTooltipElement = null; // Variable para el tooltip

    function createLottieTooltip() {
        if (!config.lottieTooltipEnabled || !config.lottieTooltipText) return null;

        const el = document.createElement('div');
        el.id = 'flowise-lottie-tooltip-' + Date.now();
        el.textContent = config.lottieTooltipText;
        Object.assign(el.style, {
            position: 'fixed',
            visibility: 'hidden',
            opacity: '0',
            backgroundColor: config.lottieTooltipBackgroundColor,
            color: config.lottieTooltipTextColor,
            fontSize: config.lottieTooltipFontSize,
            padding: config.lottieTooltipPadding,
            borderRadius: config.lottieTooltipBorderRadius,
            zIndex: (parseInt(config.lottieButtonZIndex) + config.lottieTooltipZIndexOffset).toString(),
            transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
            whiteSpace: 'nowrap',
            pointerEvents: 'none' // El tooltip no debe interferir con los eventos del ratón
        });
        document.body.appendChild(el);
        return el;
    }


    function mainInit() {
        const lottieButtonElement = document.createElement('div');
        lottieButtonElement.id = config.lottieButtonId;
        lottieButtonElement.style.position = 'fixed';
        lottieButtonElement.style.bottom = config.lottieButtonBottom;
        lottieButtonElement.style.right = config.lottieButtonRight;
        lottieButtonElement.style.width = config.lottieButtonWidth;
        lottieButtonElement.style.height = config.lottieButtonHeight;
        lottieButtonElement.style.cursor = 'pointer';
        lottieButtonElement.style.zIndex = config.lottieButtonZIndex;
        document.body.appendChild(lottieButtonElement);

        // Crear el tooltip si está habilitado
        if (config.lottieTooltipEnabled) {
            lottieTooltipElement = createLottieTooltip();
            if (lottieTooltipElement) {
                lottieButtonElement.addEventListener('mouseenter', () => {
                    const lottieRect = lottieButtonElement.getBoundingClientRect();
                    // Para que getBoundingClientRect() del tooltip devuelva dimensiones correctas,
                    // lo hacemos visible temporalmente pero fuera de la pantalla o transparente.
                    // O simplemente confiamos en que el texto ya está y las dimensiones son calculables.
                    lottieTooltipElement.style.visibility = 'hidden'; // Aseguramos que esté oculto para recalcular
                    lottieTooltipElement.style.opacity = '0';

                    const tooltipRect = lottieTooltipElement.getBoundingClientRect();

                    // Posicionar arriba del botón, centrado horizontalmente
                    let top = lottieRect.top - tooltipRect.height - config.lottieTooltipPositionOffset;
                    if (top < 5) { // Si se sale por arriba, lo ponemos abajo
                        top = lottieRect.bottom + config.lottieTooltipPositionOffset;
                    }

                    let left = lottieRect.left + (lottieRect.width / 2) - (tooltipRect.width / 2);
                    if (left < 5) left = 5; // Evitar que se salga por la izquierda
                    if (left + tooltipRect.width > window.innerWidth - 5) { // Evitar que se salga por la derecha
                        left = window.innerWidth - tooltipRect.width - 5;
                    }
                    
                    lottieTooltipElement.style.top = `${top}px`;
                    lottieTooltipElement.style.left = `${left}px`;
                    
                    lottieTooltipElement.style.visibility = 'visible';
                    lottieTooltipElement.style.opacity = '1';
                });

                lottieButtonElement.addEventListener('mouseleave', () => {
                    lottieTooltipElement.style.visibility = 'hidden';
                    lottieTooltipElement.style.opacity = '0';
                });
            }
        }


        if (typeof lottie === 'undefined') {
            const lottieCdnScript = document.createElement('script');
            lottieCdnScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
            lottieCdnScript.onload = () => setupLottieAnimation(lottieButtonElement);
            lottieCdnScript.onerror = () => console.error("Flowise Lottie Embed: Falló la carga de Lottie desde CDN.");
            document.head.appendChild(lottieCdnScript);
        } else {
            setupLottieAnimation(lottieButtonElement);
        }

        import('https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js')
            .then(module => {
                const Chatbot = module.default;
                Chatbot.init({
                    chatflowid: config.chatflowid,
                    apiHost: config.apiHost,
                    chatflowConfig: config.chatflowConfig, // Ya parseado como objeto
                    observersConfig: config.observersConfig, // Ya parseado como objeto
                    theme: {
                        button: {
                            backgroundColor: config.themeButtonBackgroundColor,
                            right: config.themeButtonRight,
                            bottom: config.themeButtonBottom,
                            size: config.themeButtonSize,
                            dragAndDrop: config.themeButtonDragAndDrop,
                            iconColor: config.themeButtonIconColor,
                            customIconSrc: config.themeButtonCustomIconSrc,
                            autoWindowOpen: { // Forzado a false porque usamos Lottie
                                autoOpen: false, 
                                openDelay: config.themeButtonOpenDelay,
                                autoOpenOnMobile: config.themeButtonAutoOpenOnMobile
                            }
                        },
                        tooltip: { showTooltip: false }, // Deshabilitar el tooltip original de Flowise si lo tuviera
                        customCSS: `/* Ocultar completamente el botón original de Flowise */
                [part="button"] {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    width: 0 !important;
                    height: 0 !important;
                }

                /* Contenedor específico del input */
                .chatbot-container .w-full.px-5.pt-2.pb-1 {
                    border-top: 2px solid rgba(255, 255, 255, 0.25) !important;
                    padding-right: 20px !important;
                    padding-left: 10px !important;
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.12) 0%, 
                        rgba(255, 255, 255, 0.08) 100%) !important;
                    backdrop-filter: blur(25px) saturate(200%) !important;
                    -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
                }

                /* Campo de entrada - Liquid Glass */
                .chatbot-input {
                    border-radius: 28px !important;
                    margin: 12px !important;
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.18) 0%, 
                        rgba(255, 255, 255, 0.10) 25%, 
                        rgba(255, 255, 255, 0.15) 50%,
                        rgba(255, 255, 255, 0.08) 75%,
                        rgba(255, 255, 255, 0.14) 100%) !important;
                    backdrop-filter: blur(30px) saturate(250%) brightness(1.15) !important;
                    -webkit-backdrop-filter: blur(30px) saturate(250%) brightness(1.15) !important;
                    border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
                    box-shadow: 
                        0 12px 40px rgba(0, 0, 0, 0.15),
                        0 6px 20px rgba(0, 0, 0, 0.1),
                        inset 0 2px 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.2),
                        0 0 0 1px rgba(255, 255, 255, 0.15) !important;
                    padding: 2px !important;
                    color: white !important;
                    overflow: hidden !important;
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                    position: relative !important;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }

                .chatbot-input:focus,
                .chatbot-input:focus-within {
                    transform: translateY(-1px) !important;
                    box-shadow: 
                        0 16px 50px rgba(0, 0, 0, 0.2),
                        0 8px 25px rgba(0, 0, 0, 0.15),
                        inset 0 3px 0 rgba(255, 255, 255, 0.5),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.25),
                        0 0 0 2px rgba(255, 255, 255, 0.4) !important;
                    border: 2px solid rgba(255, 255, 255, 0.5) !important;
                }

                /* Efecto de brillo dinámico */
                .chatbot-input::before {
                    content: '' !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: -100% !important;
                    width: 100% !important;
                    height: 100% !important;
                    background: linear-gradient(90deg, 
                        transparent, 
                        rgba(255, 255, 255, 0.2), 
                        transparent) !important;
                    transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                    z-index: 1 !important;
                }

                .chatbot-input:hover::before {
                    left: 100% !important;
                }

                /* Ocultar scrollbar en WebKit browsers */
                .chatbot-input::-webkit-scrollbar {
                    display: none !important;
                }

                /* Ocultar scrollbar en textarea dentro del input */
                .chatbot-input textarea {
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                    background: transparent !important;
                    position: relative !important;
                    z-index: 2 !important;
                }

                .chatbot-input textarea::-webkit-scrollbar {
                    display: none !important;
                }

              

                /* Efecto de ondas para las burbujas */
                .chatbot-host-bubble::before,
                .chatbot-guest-bubble::before {
                    content: '' !important;
                    position: absolute !important;
                    top: -50% !important;
                    left: -50% !important;
                    width: 200% !important;
                    height: 200% !important;
                    background: radial-gradient(circle, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        transparent 70%) !important;
                    opacity: 0 !important;
                    transition: opacity 0.3s ease !important;
                    pointer-events: none !important;
                    z-index: -1 !important;
                }

                .chatbot-host-bubble:hover::before,
                .chatbot-guest-bubble:hover::before {
                    opacity: 1 !important;
                }

                /* Contenedor del chat - Liquid Glass Principal */
                .chatbot-container {
                    border-radius: 28px !important;
                    overflow: hidden !important;
                    background: linear-gradient(145deg, 
                        rgba(255, 255, 255, 0.18) 0%, 
                        rgba(255, 255, 255, 0.08) 15%,
                        rgba(255, 255, 255, 0.14) 30%,
                        rgba(255, 255, 255, 0.06) 45%,
                        rgba(255, 255, 255, 0.12) 60%,
                        rgba(255, 255, 255, 0.09) 75%,
                        rgba(255, 255, 255, 0.16) 90%,
                        rgba(255, 255, 255, 0.10) 100%) !important;
                    backdrop-filter: blur(60px) saturate(400%) brightness(1.3) contrast(1.15) hue-rotate(10deg) !important;
                    -webkit-backdrop-filter: blur(60px) saturate(400%) brightness(1.3) contrast(1.15) hue-rotate(10deg) !important;
                    box-shadow: 
                        0 40px 120px rgba(0, 0, 0, 0.25),
                        0 20px 60px rgba(0, 0, 0, 0.18),
                        0 8px 30px rgba(0, 0, 0, 0.12),
                        inset 0 3px 0 rgba(255, 255, 255, 0.5),
                        inset 0 -3px 0 rgba(255, 255, 255, 0.2),
                        inset 3px 0 0 rgba(255, 255, 255, 0.15),
                        inset -3px 0 0 rgba(255, 255, 255, 0.15),
                        0 0 0 1.5px rgba(255, 255, 255, 0.35) !important;
                    border: 2.5px solid rgba(255, 255, 255, 0.4) !important;
                    position: relative !important;
                    transform: translateZ(0) !important;
                    animation: liquidGlow 4s ease-in-out infinite alternate !important;
                }

                /* Efectos de distorsión y reflexión múltiple */
                .chatbot-container::before {
                    content: '' !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background: 
                        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 60%),
                        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.3) 0%, transparent 60%),
                        radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                        linear-gradient(45deg, 
                            rgba(255, 255, 255, 0.15) 0%, 
                            transparent 25%,
                            rgba(255, 255, 255, 0.08) 50%,
                            transparent 75%,
                            rgba(255, 255, 255, 0.12) 100%) !important;
                    pointer-events: none !important;
                    z-index: 1 !important;
                    border-radius: 28px !important;
                    animation: liquidShimmer 6s ease-in-out infinite alternate !important;
                }

                  /* Burbujas de mensaje del bot - Liquid Glass */
                .chatbot-host-bubble {
                    border-radius: 28px !important;
                    padding: 14px 18px !important;
                    max-width: 85% !important;
                    margin-bottom: 10px !important;
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.14) 0%, 
                        rgba(255, 255, 255, 0.08) 25%, 
                        rgba(255, 255, 255, 0.12) 50%,
                        rgba(255, 255, 255, 0.06) 75%,
                        rgba(255, 255, 255, 0.10) 100%) !important;
                    backdrop-filter: blur(25px) saturate(200%) brightness(1.1) !important;
                    -webkit-backdrop-filter: blur(25px) saturate(200%) brightness(1.1) !important;
                    box-shadow: 
                        0 12px 40px rgba(0, 0, 0, 0.15),
                        0 6px 20px rgba(0, 0, 0, 0.1),
                        inset 0 2px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                        0 0 0 1px rgba(255, 255, 255, 0.2) !important;
                    color: white !important;
                    border: 1.5px solid rgba(255, 255, 255, 0.2) !important;
                    position: relative !important;
                    overflow: hidden !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }

                .chatbot-host-bubble:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 
                        0 16px 50px rgba(0, 0, 0, 0.2),
                        0 8px 25px rgba(0, 0, 0, 0.15),
                        inset 0 3px 0 rgba(255, 255, 255, 0.4),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.15),
                        0 0 0 1.5px rgba(255, 255, 255, 0.3) !important;
                }

                /* Burbujas de mensaje del usuario - Liquid Glass */
                .chatbot-guest-bubble {
                    border-radius: 28px !important;
                    padding: 14px 18px !important;
                    max-width: 85% !important;
                    margin-bottom: 10px !important;
                    background: linear-gradient(135deg, 
                        rgba(121, 127, 99, 0.95) 0%, 
                        rgba(121, 127, 99, 0.75) 25%, 
                        rgba(121, 127, 99, 0.85) 50%,
                        rgba(121, 127, 99, 0.70) 75%,
                        rgba(121, 127, 99, 0.90) 100%) !important;
                    backdrop-filter: blur(25px) saturate(200%) !important;
                    -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
                    color: white !important;
                    box-shadow: 
                        0 12px 40px rgba(121, 127, 99, 0.4),
                        0 6px 20px rgba(121, 127, 99, 0.3),
                        inset 0 2px 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.15),
                        0 0 0 1px rgba(255, 255, 255, 0.25) !important;
                    border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
                    position: relative !important;
                    overflow: hidden !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }

                .chatbot-guest-bubble:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 
                        0 16px 50px rgba(121, 127, 99, 0.5),
                        0 8px 25px rgba(121, 127, 99, 0.4),
                        inset 0 3px 0 rgba(255, 255, 255, 0.5),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.2),
                        0 0 0 1.5px rgba(255, 255, 255, 0.35) !important;
                }
                @keyframes liquidRotate {
                    0% { transform: rotate(0deg) scale(1); }
                    33% { transform: rotate(120deg) scale(1.05); }
                    66% { transform: rotate(240deg) scale(0.95); }
                    100% { transform: rotate(360deg) scale(1); }
                }

                @keyframes liquidGlow {
                    0% { 
                        box-shadow: 
                            0 40px 120px rgba(0, 0, 0, 0.25),
                            0 20px 60px rgba(0, 0, 0, 0.18),
                            0 8px 30px rgba(0, 0, 0, 0.12),
                            inset 0 3px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -3px 0 rgba(255, 255, 255, 0.2),
                            inset 3px 0 0 rgba(255, 255, 255, 0.15),
                            inset -3px 0 0 rgba(255, 255, 255, 0.15),
                            0 0 0 1.5px rgba(255, 255, 255, 0.35);
                    }
                    100% { 
                        box-shadow: 
                            0 45px 130px rgba(0, 0, 0, 0.3),
                            0 25px 70px rgba(0, 0, 0, 0.22),
                            0 12px 40px rgba(0, 0, 0, 0.15),
                            inset 0 4px 0 rgba(255, 255, 255, 0.6),
                            inset 0 -4px 0 rgba(255, 255, 255, 0.25),
                            inset 4px 0 0 rgba(255, 255, 255, 0.2),
                            inset -4px 0 0 rgba(255, 255, 255, 0.2),
                            0 0 0 2px rgba(255, 255, 255, 0.45);
                    }
                }

                @keyframes liquidShimmer {
                    0% { opacity: 0.8; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }

                /* Header con efecto cristal líquido */
                .chatbot-header {
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.25) 0%, 
                        rgba(255, 255, 255, 0.15) 50%,
                        rgba(255, 255, 255, 0.20) 100%) !important;
                    backdrop-filter: blur(35px) saturate(250%) brightness(1.1) !important;
                    -webkit-backdrop-filter: blur(35px) saturate(250%) brightness(1.1) !important;
                    border-bottom: 1.5px solid rgba(255, 255, 255, 0.2) !important;
                    position: relative !important;
                    z-index: 2 !important;
                    box-shadow: 
                        0 4px 15px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
                }

                /* Contenedor específico del input con mejor integración */
                .chatbot-container .w-full.px-5.pt-2.pb-1 {
                    border-top: 2px solid rgba(255, 255, 255, 0.25) !important;
                    padding-right: 20px !important;
                    padding-left: 10px !important;
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.12) 0%, 
                        rgba(255, 255, 255, 0.08) 100%) !important;
                    backdrop-filter: blur(25px) saturate(200%) !important;
                    -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
                }

                /* Efectos de partículas flotantes */
                .chatbot-container .chat-messages-container::before {
                    content: '' !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background-image: 
                        radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.06) 1px, transparent 1px) !important;
                    background-size: 50px 50px, 80px 80px, 120px 120px !important;
                    animation: floatingParticles 15s linear infinite !important;
                    pointer-events: none !important;
                    z-index: 1 !important;
                }

                @keyframes floatingParticles {
                    0% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-10px) translateX(5px); }
                    66% { transform: translateY(5px) translateX(-3px); }
                    100% { transform: translateY(0px) translateX(0px); }
                }

                /* Scroll suave con efectos */
                .chat-messages-container {
                    scroll-behavior: smooth !important;
                    background-color: transparent !important;
                    position: relative !important;
                    z-index: 2 !important;
                }

                /* Animaciones suaves mejoradas */
                .chatbot-container * {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }

                /* Efectos adicionales para texto */
                .chatbot-host-bubble p,
                .chatbot-guest-bubble p {
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
                    line-height: 1.5 !important;
                }

                /* Botón de envío mejorado */
                .chatbot-input button {
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.3) 0%, 
                        rgba(255, 255, 255, 0.2) 100%) !important;
                    backdrop-filter: blur(20px) !important;
                    border-radius: 28px !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    transition: all 0.3s ease !important;
                }

                .chatbot-input button:hover {
                    transform: scale(1.05) !important;
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.4) 0%, 
                        rgba(255, 255, 255, 0.3) 100%) !important;
                }
            `,
                        chatWindow: {
                            showTitle: config.themeChatWindowShowTitle,
                            showAgentMessages: config.themeChatWindowShowAgentMessages,
                            title: config.themeChatWindowTitle,
                            titleAvatarSrc: config.themeChatWindowTitleAvatarSrc,
                            welcomeMessage: config.themeChatWindowWelcomeMessage,
                            errorMessage: config.themeChatWindowErrorMessage,
                            backgroundColor: config.themeChatWindowBackgroundColor,
                            backgroundImage: config.themeChatWindowBackgroundImage,
                            height: config.themeChatWindowHeight,
                            width: config.themeChatWindowWidth,
                            fontSize: config.themeChatWindowFontSize,
                            starterPrompts: config.themeChatWindowStarterPrompts, 
                            starterPromptFontSize: config.themeChatWindowStarterPromptFontSize,
                            clearChatOnReload: config.themeChatWindowClearChatOnReload,
                            sourceDocsTitle: config.themeChatWindowSourceDocsTitle,
                            renderHTML: config.themeChatWindowRenderHTML,
                            botMessage: {
                                backgroundColor: config.themeBotMessageBackgroundColor,
                                textColor: config.themeBotMessageTextColor,
                                showAvatar: config.themeBotMessageShowAvatar,
                                avatarSrc: config.themeBotMessageAvatarSrc
                            },
                            userMessage: {
                                backgroundColor: config.themeUserMessageBackgroundColor,
                                textColor: config.themeUserMessageTextColor,
                                showAvatar: config.themeUserMessageShowAvatar,
                                avatarSrc: config.themeUserMessageAvatarSrc
                            },
                            textInput: {
                                placeholder: config.themeTextInputPlaceholder,
                                backgroundColor: config.themeTextInputBackgroundColor,
                                textColor: config.themeTextInputTextColor,
                                sendButtonColor: config.themeTextInputSendButtonColor,
                                maxChars: config.themeTextInputMaxChars,
                                maxCharsWarningMessage: config.themeTextInputMaxCharsWarningMessage,
                                autoFocus: config.themeTextInputAutoFocus,
                                sendMessageSound: config.themeTextInputSendMessageSound,
                                sendSoundLocation: config.themeTextInputSendSoundLocation,
                                receiveMessageSound: config.themeTextInputReceiveMessageSound,
                                receiveSoundLocation: config.themeTextInputReceiveSoundLocation
                            },
                            feedback: {
                                color: config.themeFeedbackColor
                            },
                            dateTimeToggle: {
                                date: config.themeDateTimeToggleDate,
                                time: config.themeDateTimeToggleTime
                            },
                            footer: {
                                textColor: config.themeFooterTextColor,
                                text: config.themeFooterText,
                                company: config.themeFooterCompany,
                                companyLink: config.themeFooterCompanyLink
                            }
                        }
                    }
                });
                setTimeout(() => tryHidingFlowiseButton(0), 300);
            })
            .catch(err => console.error("Flowise Lottie Embed: Falló la carga del script de Flowise.", err));
    }

    function setupLottieAnimation(lottieButtonElement) {
        if (!lottieButtonElement || typeof lottie === 'undefined') return;
        lottie.loadAnimation({
            container: lottieButtonElement,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: config.lottieAnimationPath
        });
        lottieButtonElement.addEventListener('click', () => {
            const flowiseElement = document.querySelector('flowise-chatbot');
            if (flowiseElement && flowiseElement.shadowRoot) {
                const internalButton = flowiseElement.shadowRoot.querySelector('[part="button"]');
                if (internalButton) internalButton.click();
                else console.warn('Flowise Lottie Embed: Botón interno (part="button") no encontrado para clic.');
            } else {
                console.warn('Flowise Lottie Embed: <flowise-chatbot> o shadowRoot no encontrado para clic.');
            }
        });
    }

    function tryHidingFlowiseButton(attemptCount) {
        const maxAttempts = 20;
        if (attemptCount >= maxAttempts) {
            console.error("Flowise Lottie Embed: Máximos intentos para ocultar botón original.");
            return;
        }
        const flowiseElement = document.querySelector('flowise-chatbot');
        if (flowiseElement && flowiseElement.shadowRoot) {
            const internalButton = flowiseElement.shadowRoot.querySelector('[part="button"]');
            if (internalButton) {
                Object.assign(internalButton.style, {
                    display: 'none', visibility: 'hidden', width: '0px', height: '0px',
                    opacity: '0', padding: '0', margin: '0', border: 'none', pointerEvents: 'none'
                });
                console.log("Flowise Lottie Embed: Botón original ocultado vía JS.");
            } else { setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500); }
        } else { setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mainInit);
    } else {
        mainInit();
    }
})();