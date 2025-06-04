// Contenido para flowise-lottie3.2-embed.js (versión con mejoras responsivas)
(function() {
    'use strict';

    function getConfig(scriptTag, dataKey, defaultValue, type = 'string') {
        const value = scriptTag.dataset[dataKey];
        if (value === undefined || value === null || value === "") {
            return defaultValue;
        }
        if (type === 'boolean') {
            return value.toLowerCase() === 'true';
        }
        if (type === 'number') { // Usado si Flowise espera un número puro (ej. para delays)
            const num = Number(value);
            return isNaN(num) ? defaultValue : num;
        }
        if (type === 'json') {
            try {
                return JSON.parse(value);
            } catch (e) {
                console.error(`Flowise Lottie Embed: Error parseando JSON para ${dataKey}. Usando default. Valor:`, value, e);
                return defaultValue;
            }
        }
        // Para estilos, retornamos la cadena tal cual, el usuario puede incluir unidades
        return value;
    }

    let currentScript = document.currentScript;
    if (!currentScript) {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src && scripts[i].src.includes('flowise-lottie')) {
                currentScript = scripts[i];
                break;
            }
        }
    }

    if (!currentScript) {
        console.error("Flowise Lottie Embed: No se pudo encontrar la etiqueta del script.");
        return;
    }

    const config = {
        // Core Flowise
        chatflowid: getConfig(currentScript, 'chatflowid', null),
        apiHost: getConfig(currentScript, 'apiHost', 'https://cloud.flowiseai.com'),
        chatflowConfigJson: getConfig(currentScript, 'chatflowConfigJson', '{}', 'json'),
        observersConfigJson: getConfig(currentScript, 'observersConfigJson', '{}', 'json'),

        // Lottie (defaults ahora son strings con 'px' para ser consistentes con valores responsivos)
        lottieAnimationPath: getConfig(currentScript, 'lottieAnimationPath', null),
        lottieButtonId: 'flowise-lottie-trigger-' + Date.now(),
        lottieButtonBottom: getConfig(currentScript, 'lottieButtonBottom', '20px'),
        lottieButtonRight: getConfig(currentScript, 'lottieButtonRight', '20px'),
        lottieButtonWidth: getConfig(currentScript, 'lottieButtonWidth', '70px'),
        lottieButtonHeight: getConfig(currentScript, 'lottieButtonHeight', '70px'),
        lottieButtonZIndex: getConfig(currentScript, 'lottieButtonZIndex', '10000'), // Sigue siendo número para z-index

        // Tooltip
        lottieTooltipEnabled: getConfig(currentScript, 'lottieTooltipEnabled', false, 'boolean'),
        lottieTooltipText: getConfig(currentScript, 'lottieTooltipText', '¿Necesitas ayuda?'),
        lottieTooltipPosition: getConfig(currentScript, 'lottieTooltipPosition', 'top'),
        lottieTooltipBackgroundColor: getConfig(currentScript, 'lottieTooltipBackgroundColor', 'black'),
        lottieTooltipTextColor: getConfig(currentScript, 'lottieTooltipTextColor', 'white'),
        lottieTooltipFontSize: getConfig(currentScript, 'lottieTooltipFontSize', '13px'), // Puede ser '1.2em', '2vmin'
        lottieTooltipPadding: getConfig(currentScript, 'lottieTooltipPadding', '6px 10px'),
        lottieTooltipBorderRadius: getConfig(currentScript, 'lottieTooltipBorderRadius', '4px'),
        lottieTooltipOffset: getConfig(currentScript, 'lottieTooltipOffset', '10px'), // NUEVO, ej: "1vh", "5px"

        // Mensajes Rotativos
        rotatingMessagesEnabled: getConfig(currentScript, 'rotatingMessagesEnabled', false, 'boolean'),
        rotatingMessagesJson: getConfig(currentScript, 'rotatingMessagesJson', '[]', 'json'),
        rotatingMessagesInterval: getConfig(currentScript, 'rotatingMessagesInterval', 3500, 'number'),
        rotatingMessagePosition: getConfig(currentScript, 'rotatingMessagePosition', 'left'),
        rotatingMessageBackgroundColor: getConfig(currentScript, 'rotatingMessageBackgroundColor', 'rgba(0,0,0,0.75)'),
        rotatingMessageTextColor: getConfig(currentScript, 'rotatingMessageTextColor', 'white'),
        rotatingMessageFontSize: getConfig(currentScript, 'rotatingMessageFontSize', '13px'),
        rotatingMessagePadding: getConfig(currentScript, 'rotatingMessagePadding', '6px 10px'),
        rotatingMessageBorderRadius: getConfig(currentScript, 'rotatingMessageBorderRadius', '4px'),
        rotatingMessageOffset: getConfig(currentScript, 'rotatingMessageOffset', '10px'), // NUEVO

        // Theme -> Button (original Flowise button)
        themeButtonBackgroundColor: getConfig(currentScript, 'themeButtonBackgroundColor', '#3B81F6'),
        themeButtonRight: getConfig(currentScript, 'themeButtonRight', '20px'), // Ahora string con unidad
        themeButtonBottom: getConfig(currentScript, 'themeButtonBottom', '20px'),// Ahora string con unidad
        themeButtonSize: getConfig(currentScript, 'themeButtonSize', '48px'),    // Ahora string con unidad
        themeButtonDragAndDrop: getConfig(currentScript, 'themeButtonDragAndDrop', true, 'boolean'),
        themeButtonIconColor: getConfig(currentScript, 'themeButtonIconColor', 'white'),
        themeButtonCustomIconSrc: getConfig(currentScript, 'themeButtonCustomIconSrc', ''),
        themeButtonOpenDelay: getConfig(currentScript, 'themeButtonOpenDelay', 2, 'number'),
        themeButtonAutoOpenOnMobile: getConfig(currentScript, 'themeButtonAutoOpenOnMobile', false, 'boolean'),
        
        // Theme -> ChatWindow (permitiendo strings con unidades para width/height)
        themeChatWindowShowTitle: getConfig(currentScript, 'themeChatWindowShowTitle', true, 'boolean'),
        themeChatWindowShowAgentMessages: getConfig(currentScript, 'themeChatWindowShowAgentMessages', true, 'boolean'),
        themeChatWindowTitle: getConfig(currentScript, 'themeChatWindowTitle', 'Flowise Bot'),
        themeChatWindowTitleAvatarSrc: getConfig(currentScript, 'themeChatWindowTitleAvatarSrc', ''),
        themeChatWindowWelcomeMessage: getConfig(currentScript, 'themeChatWindowWelcomeMessage', 'Hello! This is custom welcome message'),
        themeChatWindowErrorMessage: getConfig(currentScript, 'themeChatWindowErrorMessage', 'This is a custom error message'),
        themeChatWindowBackgroundColor: getConfig(currentScript, 'themeChatWindowBackgroundColor', '#ffffff'),
        themeChatWindowBackgroundImage: getConfig(currentScript, 'themeChatWindowBackgroundImage', ''),
        themeChatWindowHeight: getConfig(currentScript, 'themeChatWindowHeight', '700px'), // Puede ser "80vh", "100%"
        themeChatWindowWidth: getConfig(currentScript, 'themeChatWindowWidth', '400px'),   // Puede ser "90vw", "100%"
        themeChatWindowFontSize: getConfig(currentScript, 'themeChatWindowFontSize', '16px'), // Puede ser "1.5em", "2vw"
        themeChatWindowStarterPrompts: getConfig(currentScript, 'themeChatWindowStarterPromptsJson', [], 'json'),
        themeChatWindowStarterPromptFontSize: getConfig(currentScript, 'themeChatWindowStarterPromptFontSize', '15px'),
        themeChatWindowClearChatOnReload: getConfig(currentScript, 'themeChatWindowClearChatOnReload', false, 'boolean'),
        themeChatWindowSourceDocsTitle: getConfig(currentScript, 'themeChatWindowSourceDocsTitle', 'Sources:'),
        themeChatWindowRenderHtml: getConfig(currentScript, 'themeChatWindowRenderHtml', true, 'boolean'),
        
        themeBotMessageBackgroundColor: getConfig(currentScript, 'themeBotMessageBackgroundColor', '#f7f8ff'),
        themeBotMessageTextColor: getConfig(currentScript, 'themeBotMessageTextColor', '#303235'),
        themeBotMessageShowAvatar: getConfig(currentScript, 'themeBotMessageShowAvatar', true, 'boolean'),
        themeBotMessageAvatarSrc: getConfig(currentScript, 'themeBotMessageAvatarSrc', ''),
        
        themeUserMessageBackgroundColor: getConfig(currentScript, 'themeUserMessageBackgroundColor', '#3B81F6'),
        themeUserMessageTextColor: getConfig(currentScript, 'themeUserMessageTextColor', '#ffffff'),
        themeUserMessageShowAvatar: getConfig(currentScript, 'themeUserMessageShowAvatar', true, 'boolean'),
        themeUserMessageAvatarSrc: getConfig(currentScript, 'themeUserMessageAvatarSrc', ''),
        
        themeTextInputPlaceholder: getConfig(currentScript, 'themeTextInputPlaceholder', 'Type your question'),
        themeTextInputBackgroundColor: getConfig(currentScript, 'themeTextInputBackgroundColor', '#ffffff'),
        themeTextInputTextColor: getConfig(currentScript, 'themeTextInputTextColor', '#303235'),
        themeTextInputSendButtonColor: getConfig(currentScript, 'themeTextInputSendButtonColor', '#3B81F6'),
        themeTextInputMaxChars: getConfig(currentScript, 'themeTextInputMaxChars', 1000, 'number'),
        themeTextInputMaxCharsWarningMessage: getConfig(currentScript, 'themeTextInputMaxCharsWarningMessage', 'You exceeded the characters limit.'),
        themeTextInputAutoFocus: getConfig(currentScript, 'themeTextInputAutoFocus', true, 'boolean'),
        themeTextInputSendMessageSound: getConfig(currentScript, 'themeTextInputSendMessageSound', false, 'boolean'),
        themeTextInputSendSoundLocation: getConfig(currentScript, 'themeTextInputSendSoundLocation', 'send_message.mp3'),
        themeTextInputReceiveMessageSound: getConfig(currentScript, 'themeTextInputReceiveMessageSound', false, 'boolean'),
        themeTextInputReceiveSoundLocation: getConfig(currentScript, 'themeTextInputReceiveSoundLocation', 'receive_message.mp3'),
        
        themeFeedbackColor: getConfig(currentScript, 'themeFeedbackColor', '#303235'),
        
        themeDateTimeToggleDate: getConfig(currentScript, 'themeDateTimeToggleDate', true, 'boolean'),
        themeDateTimeToggleTime: getConfig(currentScript, 'themeDateTimeToggleTime', true, 'boolean'),
        
        themeFooterTextColor: getConfig(currentScript, 'themeFooterTextColor', '#303235'),
        themeFooterText: getConfig(currentScript, 'themeFooterText', 'Powered by'),
        themeFooterCompany: getConfig(currentScript, 'themeFooterCompany', 'Flowise'),
        themeFooterCompanyLink: getConfig(currentScript, 'themeFooterCompanyLink', 'https://flowiseai.com'),
    };

    if (!config.chatflowid || !config.lottieAnimationPath) {
        console.error("Flowise Lottie Embed: 'data-chatflowid' y 'data-lottie-animation-path' son requeridos.");
        return;
    }

    let lottieButtonElement;

    function positionHelper(element, targetRect, positionSetting, offsetString = '10px') {
        if (!element || !targetRect) return;
    
        element.style.opacity = '0';
        element.style.transform = 'scale(0.95)';
        // Asegurar que el elemento está en el DOM para calcular dimensiones si es necesario
        // document.body.appendChild(element); // Ya debería estar en el DOM
        const elemWidth = element.offsetWidth;
        const elemHeight = element.offsetHeight;
    
        // Resetear posiciones para recálculo limpio
        element.style.top = 'auto';
        element.style.bottom = 'auto';
        element.style.left = 'auto';
        element.style.right = 'auto';
    
        switch (positionSetting) {
            case 'top':
                element.style.bottom = `calc(${window.innerHeight - targetRect.top}px - ${elemHeight}px - ${offsetString})`;
                element.style.left = `calc(${targetRect.left + (targetRect.width / 2)}px - ${elemWidth / 2}px)`;
                break;
            case 'bottom':
                element.style.top = `calc(${targetRect.bottom}px + ${offsetString})`;
                element.style.left = `calc(${targetRect.left + (targetRect.width / 2)}px - ${elemWidth / 2}px)`;
                break;
            case 'left':
                element.style.top = `calc(${targetRect.top + (targetRect.height / 2)}px - ${elemHeight / 2}px)`;
                element.style.right = `calc(${window.innerWidth - targetRect.left}px + ${offsetString})`;
                break;
            case 'right':
                element.style.top = `calc(${targetRect.top + (targetRect.height / 2)}px - ${elemHeight / 2}px)`;
                element.style.left = `calc(${targetRect.right}px + ${offsetString})`;
                break;
            default: // fallback a top
                element.style.bottom = `calc(${window.innerHeight - targetRect.top}px - ${elemHeight}px - ${offsetString})`;
                element.style.left = `calc(${targetRect.left + (targetRect.width / 2)}px - ${elemWidth / 2}px)`;
        }
        // Forzar que el navegador aplique la nueva posición antes de la animación
        requestAnimationFrame(() => {
             requestAnimationFrame(() => { // Doble requestAnimationFrame para mayor fiabilidad en algunos navegadores
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            });
        });
    }
    

    function setupLottieTooltip() {
        if (!config.lottieTooltipEnabled || !config.lottieTooltipText || !lottieButtonElement) return;
        const tooltipElement = document.createElement('div');
        tooltipElement.id = config.lottieButtonId + '-tooltip';
        tooltipElement.textContent = config.lottieTooltipText;
        Object.assign(tooltipElement.style, {
            position: 'fixed', padding: config.lottieTooltipPadding, backgroundColor: config.lottieTooltipBackgroundColor,
            color: config.lottieTooltipTextColor, borderRadius: config.lottieTooltipBorderRadius, fontSize: config.lottieTooltipFontSize,
            opacity: '0', transition: 'opacity 0.2s ease-out, transform 0.2s ease-out', pointerEvents: 'none',
            zIndex: String(Number(config.lottieButtonZIndex) + 1), whiteSpace: 'nowrap', transform: 'scale(0.95)'
        });
        document.body.appendChild(tooltipElement);

        lottieButtonElement.addEventListener('mouseenter', () => {
            const btnRect = lottieButtonElement.getBoundingClientRect();
            tooltipElement.style.visibility = 'hidden'; // Ocultar para medir
            tooltipElement.style.opacity = '0'; 
            // Forzar que el contenido se establezca para que offsetWidth/Height sean correctos
            tooltipElement.textContent = config.lottieTooltipText; // Reasegurar texto para cálculo de dimensiones
            positionHelper(tooltipElement, btnRect, config.lottieTooltipPosition, config.lottieTooltipOffset);
            tooltipElement.style.visibility = 'visible'; // Hacer visible para la animación
        });
        lottieButtonElement.addEventListener('mouseleave', () => {
            tooltipElement.style.opacity = '0'; tooltipElement.style.transform = 'scale(0.95)';
        });
    }

    function setupRotatingMessages() {
        if (!config.rotatingMessagesEnabled || !Array.isArray(config.rotatingMessagesJson) || config.rotatingMessagesJson.length === 0 || !lottieButtonElement) return;
        const messages = config.rotatingMessagesJson;
        let currentMessageIndex = -1;
        const rotatingMessageElement = document.createElement('div');
        rotatingMessageElement.id = config.lottieButtonId + '-rotating-message';
        Object.assign(rotatingMessageElement.style, {
            position: 'fixed', padding: config.rotatingMessagePadding, backgroundColor: config.rotatingMessageBackgroundColor,
            color: config.rotatingMessageTextColor, borderRadius: config.rotatingMessageBorderRadius, fontSize: config.rotatingMessageFontSize,
            opacity: '0', transition: 'opacity 0.4s ease-in-out', pointerEvents: 'none',
            zIndex: config.lottieButtonZIndex, whiteSpace: 'nowrap'
        });
        document.body.appendChild(rotatingMessageElement);
        
        const FADE_DURATION = 400;

        function showNextMessage() {
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
            rotatingMessageElement.textContent = messages[currentMessageIndex];
            const btnRect = lottieButtonElement.getBoundingClientRect();
            rotatingMessageElement.style.visibility = 'hidden'; // Ocultar para medir
            rotatingMessageElement.style.opacity = '0';
            positionHelper(rotatingMessageElement, btnRect, config.rotatingMessagePosition, config.rotatingMessageOffset);
            rotatingMessageElement.style.visibility = 'visible'; // Hacer visible para animación
        }
        function cycleMessages() {
            rotatingMessageElement.style.opacity = '0';
            setTimeout(showNextMessage, FADE_DURATION);
        }
        setTimeout(() => { // Delay inicial
            if (messages.length > 0) {
                showNextMessage(); // Muestra el primer mensaje
                if (messages.length > 1) {
                    setInterval(cycleMessages, config.rotatingMessagesInterval + FADE_DURATION);
                }
            }
        }, 1000);
    }

    function mainInit() {
        lottieButtonElement = document.createElement('div');
        lottieButtonElement.id = config.lottieButtonId;
        Object.assign(lottieButtonElement.style, {
            position: 'fixed', bottom: config.lottieButtonBottom, right: config.lottieButtonRight,
            width: config.lottieButtonWidth, height: config.lottieButtonHeight,
            cursor: 'pointer', zIndex: config.lottieButtonZIndex.toString() // zIndex debe ser string
        });
        document.body.appendChild(lottieButtonElement);

        if (config.lottieTooltipEnabled) setupLottieTooltip();
        if (config.rotatingMessagesEnabled) setupRotatingMessages();

        if (typeof lottie === 'undefined') {
            const lottieCdnScript = document.createElement('script');
            lottieCdnScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
            lottieCdnScript.onload = () => setupLottieAnimationAndClick(lottieButtonElement);
            lottieCdnScript.onerror = () => console.error("Flowise Lottie Embed: Falló carga de Lottie CDN.");
            document.head.appendChild(lottieCdnScript);
        } else {
            setupLottieAnimationAndClick(lottieButtonElement);
        }

        import('https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js')
            .then(module => {
                const Chatbot = module.default;
                const flowiseTheme = { // Construir el objeto theme para Flowise
                    button: {
                        backgroundColor: config.themeButtonBackgroundColor,
                        right: parseInt(config.themeButtonRight, 10), // Flowise podría esperar números para right/bottom/size
                        bottom: parseInt(config.themeButtonBottom, 10),
                        size: parseInt(config.themeButtonSize, 10),
                        dragAndDrop: config.themeButtonDragAndDrop,
                        iconColor: config.themeButtonIconColor,
                        customIconSrc: config.themeButtonCustomIconSrc,
                        autoWindowOpen: {
                            autoOpen: false, // Forzado, Lottie lo controla
                            openDelay: config.themeButtonOpenDelay,
                            autoOpenOnMobile: config.themeButtonAutoOpenOnMobile
                        }
                    },
                    tooltip: { showTooltip: false },
                    customCSS: '',
                    chatWindow: {
                        showTitle: config.themeChatWindowShowTitle,
                        showAgentMessages: config.themeChatWindowShowAgentMessages,
                        title: config.themeChatWindowTitle,
                        titleAvatarSrc: config.themeChatWindowTitleAvatarSrc,
                        welcomeMessage: config.themeChatWindowWelcomeMessage,
                        errorMessage: config.themeChatWindowErrorMessage,
                        backgroundColor: config.themeChatWindowBackgroundColor,
                        backgroundImage: config.themeChatWindowBackgroundImage,
                        height: config.themeChatWindowHeight, // Se pasa como string, ej "80vh" o "600px"
                        width: config.themeChatWindowWidth,   // Se pasa como string
                        fontSize: config.themeChatWindowFontSize, // Se pasa como string, ej "16px" o "1.2em"
                        starterPrompts: config.themeChatWindowStarterPrompts,
                        starterPromptFontSize: config.themeChatWindowStarterPromptFontSize, // String
                        clearChatOnReload: config.themeChatWindowClearChatOnReload,
                        sourceDocsTitle: config.themeChatWindowSourceDocsTitle,
                        renderHTML: config.themeChatWindowRenderHtml,
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
                            maxChars: config.themeTextInputMaxChars, // number
                            maxCharsWarningMessage: config.themeTextInputMaxCharsWarningMessage,
                            autoFocus: config.themeTextInputAutoFocus,
                            sendMessageSound: config.themeTextInputSendMessageSound,
                            sendSoundLocation: config.themeTextInputSendSoundLocation,
                            receiveMessageSound: config.themeTextInputReceiveMessageSound,
                            receiveSoundLocation: config.themeTextInputReceiveSoundLocation
                        },
                        feedback: { color: config.themeFeedbackColor },
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
                };

                Chatbot.init({
                    chatflowid: config.chatflowid,
                    apiHost: config.apiHost,
                    chatflowConfig: config.chatflowConfigJson,
                    observersConfig: config.observersConfigJson,
                    theme: flowiseTheme
                });
                setTimeout(() => tryHidingFlowiseButton(0), 300);
            })
            .catch(err => console.error("Flowise Lottie Embed: Falló la carga del script de Flowise.", err));
    }

    function setupLottieAnimationAndClick(lottieBtnElm) {
        // ... (sin cambios, igual que antes)
        if (!lottieBtnElm || typeof lottie === 'undefined') return;
        lottie.loadAnimation({
            container: lottieBtnElm, renderer: 'svg', loop: true, autoplay: true, path: config.lottieAnimationPath
        });
        lottieBtnElm.addEventListener('click', () => {
            const flowiseElement = document.querySelector('flowise-chatbot');
            if (flowiseElement && flowiseElement.shadowRoot) {
                const internalButton = flowiseElement.shadowRoot.querySelector('[part="button"]');
                if (internalButton) internalButton.click();
                else console.warn('Flowise Lottie Embed: Botón interno (part="button") no encontrado.');
            } else {
                console.warn('Flowise Lottie Embed: <flowise-chatbot> o shadowRoot no encontrado.');
            }
        });
    }

    function tryHidingFlowiseButton(attemptCount) {
        // ... (sin cambios, igual que antes)
        const maxAttempts = 20;
        if (attemptCount >= maxAttempts) { console.error("Flowise Lottie Embed: Máximos intentos para ocultar botón original."); return; }
        const flowiseElement = document.querySelector('flowise-chatbot');
        if (flowiseElement && flowiseElement.shadowRoot) {
            const internalButton = flowiseElement.shadowRoot.querySelector('[part="button"]');
            if (internalButton) {
                Object.assign(internalButton.style, {
                    display: 'none', visibility: 'hidden', width: '0px', height: '0px',
                    opacity: '0', padding: '0', margin: '0', border: 'none', pointerEvents: 'none'
                });
            } else { setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500); }
        } else { setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mainInit);
    } else {
        mainInit();
    }
})();