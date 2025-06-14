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
        themeChatWindowBackgroundColor: getConfig(currentScript, 'themeChatWindowBackgroundColor', '#ffffff'),
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
                                autoOpen: false, // config.themeButtonAutoOpen, 
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