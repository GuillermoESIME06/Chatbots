// Contenido para flowise-lottie3.2-embed.js
(function() {
    'use strict';

    function getConfig(scriptTag, dataKey, defaultValue, type = 'string') {
        const value = scriptTag.dataset[dataKey];
        if (value === undefined || value === null || value === "" || (type === 'number' && isNaN(Number(value)))) {
            if (type === 'number' && isNaN(Number(value)) && value !== undefined && value !== null && value !== "") {
                 console.warn(`Flowise Lottie Embed: Valor no numérico para ${dataKey}: "${value}". Usando default: ${defaultValue}`);
            }
            return defaultValue;
        }
        if (type === 'boolean') {
            return value.toLowerCase() === 'true';
        }
        if (type === 'number') {
            return Number(value);
        }
        if (type === 'json') {
            try {
                return JSON.parse(value);
            } catch (e) {
                console.error(`Flowise Lottie Embed: Error al parsear JSON para ${dataKey}. Usando default. Valor:`, value, e);
                return defaultValue;
            }
        }
        return value;
    }

    let currentScript = document.currentScript;
    if (!currentScript) {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src && scripts[i].src.includes('flowise-lottie')) { // Identificador del script
                currentScript = scripts[i];
                break;
            }
        }
    }

    if (!currentScript) {
        console.error("Flowise Lottie Embed: No se pudo encontrar la etiqueta del script.");
        return;
    }

    // --- CONFIGURACIONES DETALLADAS ---
    const config = {
        // Core Flowise
        chatflowid: getConfig(currentScript, 'chatflowid', null),
        apiHost: getConfig(currentScript, 'apiHost', 'https://cloud.flowiseai.com'),
        chatflowConfigJson: getConfig(currentScript, 'chatflowConfigJson', '{}', 'json'), // data-chatflow-config-json
        observersConfigJson: getConfig(currentScript, 'observersConfigJson', '{}', 'json'), // data-observers-config-json

        // Lottie
        lottieAnimationPath: getConfig(currentScript, 'lottieAnimationPath', null),
        lottieButtonId: 'flowise-lottie-trigger-' + Date.now(),
        lottieButtonBottom: getConfig(currentScript, 'lottieButtonBottom', '20px'),
        lottieButtonRight: getConfig(currentScript, 'lottieButtonRight', '20px'),
        lottieButtonWidth: getConfig(currentScript, 'lottieButtonWidth', '70px'),
        lottieButtonHeight: getConfig(currentScript, 'lottieButtonHeight', '70px'),
        lottieButtonZIndex: getConfig(currentScript, 'lottieButtonZIndex', '10000'),

        // Tooltip del Botón Lottie
        lottieTooltipEnabled: getConfig(currentScript, 'lottieTooltipEnabled', false, 'boolean'),
        lottieTooltipText: getConfig(currentScript, 'lottieTooltipText', '¿Necesitas ayuda?'),
        lottieTooltipPosition: getConfig(currentScript, 'lottieTooltipPosition', 'top'),
        lottieTooltipBackgroundColor: getConfig(currentScript, 'lottieTooltipBackgroundColor', 'black'),
        lottieTooltipTextColor: getConfig(currentScript, 'lottieTooltipTextColor', 'white'),
        lottieTooltipFontSize: getConfig(currentScript, 'lottieTooltipFontSize', '13px'),
        lottieTooltipPadding: getConfig(currentScript, 'lottieTooltipPadding', '6px 10px'),
        lottieTooltipBorderRadius: getConfig(currentScript, 'lottieTooltipBorderRadius', '4px'),

        // Mensajes Rotativos
        rotatingMessagesEnabled: getConfig(currentScript, 'rotatingMessagesEnabled', false, 'boolean'),
        rotatingMessagesJson: getConfig(currentScript, 'rotatingMessagesJson', '[]', 'json'), // data-rotating-messages-json
        rotatingMessagesInterval: getConfig(currentScript, 'rotatingMessagesInterval', 3500, 'number'),
        rotatingMessagePosition: getConfig(currentScript, 'rotatingMessagePosition', 'left'),
        rotatingMessageBackgroundColor: getConfig(currentScript, 'rotatingMessageBackgroundColor', 'rgba(0,0,0,0.75)'),
        rotatingMessageTextColor: getConfig(currentScript, 'rotatingMessageTextColor', 'white'),
        rotatingMessageFontSize: getConfig(currentScript, 'rotatingMessageFontSize', '13px'),
        rotatingMessagePadding: getConfig(currentScript, 'rotatingMessagePadding', '6px 10px'),
        rotatingMessageBorderRadius: getConfig(currentScript, 'rotatingMessageBorderRadius', '4px'),
        
        // Theme -> Button (original Flowise button, para referencia y algunas propiedades de autoOpen)
        themeButtonBackgroundColor: getConfig(currentScript, 'themeButtonBackgroundColor', '#3B81F6'),
        themeButtonRight: getConfig(currentScript, 'themeButtonRight', 20, 'number'), // Pixels
        themeButtonBottom: getConfig(currentScript, 'themeButtonBottom', 20, 'number'), // Pixels
        themeButtonSize: getConfig(currentScript, 'themeButtonSize', 48, 'number'),
        themeButtonDragAndDrop: getConfig(currentScript, 'themeButtonDragAndDrop', true, 'boolean'),
        themeButtonIconColor: getConfig(currentScript, 'themeButtonIconColor', 'white'),
        themeButtonCustomIconSrc: getConfig(currentScript, 'themeButtonCustomIconSrc', ''),
        // themeButtonAutoOpen es forzado a false si se usa el botón Lottie.
        // Los siguientes son para la configuración de autoWindowOpen si se usara el botón original.
        themeButtonOpenDelay: getConfig(currentScript, 'themeButtonOpenDelay', 2, 'number'),
        themeButtonAutoOpenOnMobile: getConfig(currentScript, 'themeButtonAutoOpenOnMobile', false, 'boolean'),
        
        // Theme -> ChatWindow
        themeChatWindowShowTitle: getConfig(currentScript, 'themeChatWindowShowTitle', true, 'boolean'),
        themeChatWindowShowAgentMessages: getConfig(currentScript, 'themeChatWindowShowAgentMessages', true, 'boolean'),
        themeChatWindowTitle: getConfig(currentScript, 'themeChatWindowTitle', 'Flowise Bot'),
        themeChatWindowTitleAvatarSrc: getConfig(currentScript, 'themeChatWindowTitleAvatarSrc', ''),
        themeChatWindowWelcomeMessage: getConfig(currentScript, 'themeChatWindowWelcomeMessage', 'Hello! This is custom welcome message'),
        themeChatWindowErrorMessage: getConfig(currentScript, 'themeChatWindowErrorMessage', 'This is a custom error message'),
        themeChatWindowBackgroundColor: getConfig(currentScript, 'themeChatWindowBackgroundColor', '#ffffff'),
        themeChatWindowBackgroundImage: getConfig(currentScript, 'themeChatWindowBackgroundImage', ''),
        themeChatWindowHeight: getConfig(currentScript, 'themeChatWindowHeight', 700, 'number'),
        themeChatWindowWidth: getConfig(currentScript, 'themeChatWindowWidth', 400, 'number'),
        themeChatWindowFontSize: getConfig(currentScript, 'themeChatWindowFontSize', 16, 'number'),
        themeChatWindowStarterPrompts: getConfig(currentScript, 'themeChatWindowStarterPromptsJson', [], 'json'), // data-chat-window-starter-prompts-json
        themeChatWindowStarterPromptFontSize: getConfig(currentScript, 'themeChatWindowStarterPromptFontSize', 15, 'number'),
        themeChatWindowClearChatOnReload: getConfig(currentScript, 'themeChatWindowClearChatOnReload', false, 'boolean'),
        themeChatWindowSourceDocsTitle: getConfig(currentScript, 'themeChatWindowSourceDocsTitle', 'Sources:'),
        themeChatWindowRenderHtml: getConfig(currentScript, 'themeChatWindowRenderHtml', true, 'boolean'),
        
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
        themeTextInputPlaceholder: getConfig(currentScript, 'themeTextInputPlaceholder', 'Type your question'),
        themeTextInputBackgroundColor: getConfig(currentScript, 'themeTextInputBackgroundColor', '#ffffff'),
        themeTextInputTextColor: getConfig(currentScript, 'themeTextInputTextColor', '#303235'),
        themeTextInputSendButtonColor: getConfig(currentScript, 'themeTextInputSendButtonColor', '#3B81F6'),
        themeTextInputMaxChars: getConfig(currentScript, 'themeTextInputMaxChars', 1000, 'number'), // Ajustado default
        themeTextInputMaxCharsWarningMessage: getConfig(currentScript, 'themeTextInputMaxCharsWarningMessage', 'You exceeded the characters limit.'), // Ajustado default
        themeTextInputAutoFocus: getConfig(currentScript, 'themeTextInputAutoFocus', true, 'boolean'),
        themeTextInputSendMessageSound: getConfig(currentScript, 'themeTextInputSendMessageSound', false, 'boolean'), // Default false
        themeTextInputSendSoundLocation: getConfig(currentScript, 'themeTextInputSendSoundLocation', 'send_message.mp3'),
        themeTextInputReceiveMessageSound: getConfig(currentScript, 'themeTextInputReceiveMessageSound', false, 'boolean'), // Default false
        themeTextInputReceiveSoundLocation: getConfig(currentScript, 'themeTextInputReceiveSoundLocation', 'receive_message.mp3'),
        
        // Theme -> ChatWindow -> Feedback
        themeFeedbackColor: getConfig(currentScript, 'themeFeedbackColor', '#303235'),
        
        // Theme -> ChatWindow -> DateTimeToggle
        themeDateTimeToggleDate: getConfig(currentScript, 'themeDateTimeToggleDate', true, 'boolean'),
        themeDateTimeToggleTime: getConfig(currentScript, 'themeDateTimeToggleTime', true, 'boolean'),
        
        // Theme -> ChatWindow -> Footer
        themeFooterTextColor: getConfig(currentScript, 'themeFooterTextColor', '#303235'),
        themeFooterText: getConfig(currentScript, 'themeFooterText', 'Powered by'),
        themeFooterCompany: getConfig(currentScript, 'themeFooterCompany', 'Flowise'), // Ajustado
        themeFooterCompanyLink: getConfig(currentScript, 'themeFooterCompanyLink', 'https://flowiseai.com'),
    };

    if (!config.chatflowid || !config.lottieAnimationPath) {
        console.error("Flowise Lottie Embed: 'data-chatflowid' y 'data-lottie-animation-path' son requeridos.");
        return;
    }

    // --- Variables Globales del Módulo y Funciones de Ayuda (Tooltip, Mensajes Rotativos, etc.) ---
    let lottieButtonElement; // Definida globalmente en el scope del IIFE
    // ... (Aquí irían las definiciones de tooltipElement, rotatingMessageElement y las funciones positionHelper, setupLottieTooltip, setupRotatingMessages que te pasé en la respuesta anterior)
    // Por brevedad, las omito aquí, pero deben estar presentes. Me enfocaré en la estructura de mainInit y Chatbot.init

    function positionHelper(element, targetRect, positionSetting, offset = 10) {
        if (!element || !targetRect) return;
        element.style.opacity = '0';
        element.style.transform = 'scale(0.95)';
        element.style.top = 'auto'; element.style.bottom = 'auto'; element.style.left = 'auto'; element.style.right = 'auto';
        
        // Forzar recálculo de dimensiones si es necesario (puede ser complejo y variar)
        // A veces es necesario que el elemento esté brevemente visible pero fuera de pantalla
        // document.body.appendChild(element); // Asegurarse que está en el DOM para offsetWidth/Height
        const elemWidth = element.offsetWidth;
        const elemHeight = element.offsetHeight;

        switch (positionSetting) {
            case 'top':
                element.style.bottom = (window.innerHeight - targetRect.top + offset) + 'px';
                element.style.left = (targetRect.left + (targetRect.width / 2) - (elemWidth / 2)) + 'px';
                break;
            case 'bottom':
                element.style.top = (targetRect.bottom + offset) + 'px';
                element.style.left = (targetRect.left + (targetRect.width / 2) - (elemWidth / 2)) + 'px';
                break;
            case 'left':
                element.style.top = (targetRect.top + (targetRect.height / 2) - (elemHeight / 2)) + 'px';
                element.style.right = (window.innerWidth - targetRect.left + offset) + 'px';
                break;
            case 'right':
                element.style.top = (targetRect.top + (targetRect.height / 2) - (elemHeight / 2)) + 'px';
                element.style.left = (targetRect.right + offset) + 'px';
                break;
            default: // fallback a top
                element.style.bottom = (window.innerHeight - targetRect.top + offset) + 'px';
                element.style.left = (targetRect.left + (targetRect.width / 2) - (elemWidth / 2)) + 'px';
        }
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
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
            tooltipElement.style.visibility = 'hidden'; tooltipElement.style.opacity = '0'; // Para cálculo de dimensiones
            positionHelper(tooltipElement, btnRect, config.lottieTooltipPosition);
            tooltipElement.style.visibility = 'visible';
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
            positionHelper(rotatingMessageElement, btnRect, config.rotatingMessagePosition);
        }
        function cycleMessages() {
            rotatingMessageElement.style.opacity = '0';
            setTimeout(showNextMessage, FADE_DURATION);
        }
        setTimeout(() => {
            showNextMessage();
            if (messages.length > 1) {
                setInterval(cycleMessages, config.rotatingMessagesInterval + FADE_DURATION);
            }
        }, 1000);
    }

    function mainInit() {
        lottieButtonElement = document.createElement('div');
        lottieButtonElement.id = config.lottieButtonId;
        Object.assign(lottieButtonElement.style, {
            position: 'fixed', bottom: config.lottieButtonBottom, right: config.lottieButtonRight,
            width: config.lottieButtonWidth, height: config.lottieButtonHeight,
            cursor: 'pointer', zIndex: config.lottieButtonZIndex
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
                Chatbot.init({
                    chatflowid: config.chatflowid,
                    apiHost: config.apiHost,
                    chatflowConfig: config.chatflowConfigJson, // Ya es un objeto
                    observersConfig: config.observersConfigJson, // Ya es un objeto
                    theme: {
                        button: {
                            backgroundColor: config.themeButtonBackgroundColor,
                            right: config.themeButtonRight,
                            bottom: config.themeButtonBottom,
                            size: config.themeButtonSize,
                            dragAndDrop: config.themeButtonDragAndDrop,
                            iconColor: config.themeButtonIconColor,
                            customIconSrc: config.themeButtonCustomIconSrc,
                            autoWindowOpen: {
                                autoOpen: false, // Forzado a false, Lottie lo controla
                                openDelay: config.themeButtonOpenDelay,
                                autoOpenOnMobile: config.themeButtonAutoOpenOnMobile
                            }
                        },
                        tooltip: { showTooltip: false }, // El tooltip del botón original no es necesario
                        customCSS: '', // Usamos JS para ocultar el botón
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
                            starterPrompts: config.themeChatWindowStarterPrompts, // Ya es un array
                            starterPromptFontSize: config.themeChatWindowStarterPromptFontSize,
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

    function setupLottieAnimationAndClick(lottieBtnElm) {
        if (!lottieBtnElm || typeof lottie === 'undefined') return;
        lottie.loadAnimation({
            container: lottieBtnElm,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: config.lottieAnimationPath
        });
        lottieBtnElm.addEventListener('click', () => {
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
            } else { setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500); }
        } else { setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mainInit);
    } else {
        mainInit();
    }
})();