// Contenido para flowise-lottie3.2-embed.js
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
        if (type === 'number') {
            const num = Number(value);
            return isNaN(num) ? defaultValue : num;
        }
        return value;
    }

    let currentScript = document.currentScript;
    if (!currentScript) {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src && scripts[i].src.includes('flowise-lottie')) { // Ajusta si el nombre del archivo cambia
                currentScript = scripts[i];
                break;
            }
        }
    }

    if (!currentScript) {
        console.error("Flowise Lottie Embed: No se pudo encontrar la etiqueta del script. src debe ser correcto.");
        return;
    }

    const config = {
        chatflowid: getConfig(currentScript, 'chatflowid', null),
        lottieAnimationPath: getConfig(currentScript, 'lottieAnimationPath', null),
        apiHost: getConfig(currentScript, 'apiHost', 'https://cloud.flowiseai.com'),
        lottieButtonId: 'flowise-lottie-trigger-button-' + Date.now(), // ID único para evitar colisiones
        lottieButtonBottom: getConfig(currentScript, 'lottieButtonBottom', '20px'),
        lottieButtonRight: getConfig(currentScript, 'lottieButtonRight', '20px'),
        lottieButtonWidth: getConfig(currentScript, 'lottieButtonWidth', '70px'),
        lottieButtonHeight: getConfig(currentScript, 'lottieButtonHeight', '70px'),
        lottieButtonZIndex: getConfig(currentScript, 'lottieButtonZIndex', '10000'),
        chatWindowTitle: getConfig(currentScript, 'chatWindowTitle', 'Chatbot'),
        chatWelcomeMessage: getConfig(currentScript, 'chatWelcomeMessage', '¡Hola! ¿En qué puedo ayudarte?'),
        chatWindowWidth: getConfig(currentScript, 'chatWindowWidth', 400, 'number'),
        chatWindowHeight: getConfig(currentScript, 'chatWindowHeight', 600, 'number'),
        chatWindowBackgroundColor: getConfig(currentScript, 'chatWindowBackgroundColor', '#ffffff'),
        buttonAutoOpen: getConfig(currentScript, 'buttonAutoOpen', false, 'boolean'),
        buttonAutoOpenDelay: getConfig(currentScript, 'buttonAutoOpenDelay', 2, 'number'),
        botMessageBackgroundColor: getConfig(currentScript, 'botMessageBackgroundColor', '#f0f0f0'),
        botMessageTextColor: getConfig(currentScript, 'botMessageTextColor', '#000000'),
        userMessageBackgroundColor: getConfig(currentScript, 'userMessageBackgroundColor', '#007bff'),
        userMessageTextColor: getConfig(currentScript, 'userMessageTextColor', '#ffffff'),
        textInputPlaceholder: getConfig(currentScript, 'textInputPlaceholder', 'Escribe tu mensaje...'),
        textInputSendButtonColor: getConfig(currentScript, 'textInputSendButtonColor', '#007bff'),
    };

    if (!config.chatflowid) {
        console.error("Flowise Lottie Embed: El atributo 'data-chatflowid' es requerido.");
        return;
    }
    if (!config.lottieAnimationPath) {
        console.error("Flowise Lottie Embed: El atributo 'data-lottie-animation-path' es requerido.");
        return;
    }
    console.log("Flowise Lottie Embed: Configuración cargada:", config);

    function mainInit() {
        console.log("Flowise Lottie Embed: mainInit() llamado.");
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
        console.log("Flowise Lottie Embed: Contenedor del botón Lottie creado y añadido al DOM:", lottieButtonElement.id);

        if (typeof lottie === 'undefined') {
            console.log("Flowise Lottie Embed: Librería Lottie no encontrada. Cargando desde CDN...");
            const lottieCdnScript = document.createElement('script');
            lottieCdnScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
            lottieCdnScript.onload = () => {
                console.log("Flowise Lottie Embed: Librería Lottie cargada desde CDN.");
                setupLottieAnimation(lottieButtonElement);
            };
            lottieCdnScript.onerror = () => console.error("Flowise Lottie Embed: Falló la carga de la librería Lottie desde CDN.");
            document.head.appendChild(lottieCdnScript);
        } else {
            console.log("Flowise Lottie Embed: Librería Lottie ya presente. Configurando animación...");
            setupLottieAnimation(lottieButtonElement);
        }

        console.log("Flowise Lottie Embed: Importando Flowise embed script...");
        import('https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js')
            .then(module => {
                console.log("Flowise Lottie Embed: Flowise embed script importado exitosamente.");
                const Chatbot = module.default;
                console.log("Flowise Lottie Embed: Inicializando Chatbot.init()...");
                Chatbot.init({
                    chatflowid: config.chatflowid,
                    apiHost: config.apiHost,
                    theme: {
                        button: {
                            autoWindowOpen: {
                                autoOpen: config.buttonAutoOpen,
                                openDelay: config.buttonAutoOpenDelay,
                            }
                        },
                        tooltip: { showTooltip: false },
                        customCSS: '', 
                        chatWindow: {
                            title: config.chatWindowTitle,
                            welcomeMessage: config.chatWelcomeMessage,
                            width: config.chatWindowWidth,
                            height: config.chatWindowHeight,
                            backgroundColor: config.chatWindowBackgroundColor,
                            botMessage: {
                                backgroundColor: config.botMessageBackgroundColor,
                                textColor: config.botMessageTextColor,
                            },
                            userMessage: {
                                backgroundColor: config.userMessageBackgroundColor,
                                textColor: config.userMessageTextColor,
                            },
                            textInput: {
                                placeholder: config.textInputPlaceholder,
                                sendButtonColor: config.textInputSendButtonColor,
                            }
                        }
                    }
                });
                console.log("Flowise Lottie Embed: Chatbot.init() llamado.");
                setTimeout(() => tryHidingFlowiseButton(0), 300); // Aumentado ligeramente el retraso inicial
            })
            .catch(err => console.error("Flowise Lottie Embed: Falló la carga del script de Flowise (importación dinámica).", err));
    }

    function setupLottieAnimation(lottieButtonElement) {
        if (!lottieButtonElement || typeof lottie === 'undefined') {
            console.error("Flowise Lottie Embed: Contenedor Lottie o librería no disponible para setupLottieAnimation.");
            return;
        }
        console.log("Flowise Lottie Embed: Configurando animación Lottie en el contenedor:", lottieButtonElement.id);
        lottie.loadAnimation({
            container: lottieButtonElement,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: config.lottieAnimationPath
        });

        lottieButtonElement.addEventListener('click', () => {
            console.log("Flowise Lottie Embed: Botón Lottie clickeado. Intentando abrir chat...");
            const flowiseElement = document.querySelector('flowise-chatbot');
            if (!flowiseElement) {
                console.warn('Flowise Lottie Embed: Elemento <flowise-chatbot> NO ENCONTRADO al hacer clic en Lottie.');
                return;
            }
            if (!flowiseElement.shadowRoot) {
                console.warn('Flowise Lottie Embed: ShadowRoot de <flowise-chatbot> NO ENCONTRADO al hacer clic en Lottie.');
                return;
            }
            const internalButton = flowiseElement.shadowRoot.querySelector('[part="button"]');
            if (internalButton) {
                console.log('Flowise Lottie Embed: Botón interno de Flowise encontrado. Ejecutando click().');
                internalButton.click();
            } else {
                console.warn('Flowise Lottie Embed: Botón interno de Flowise (part="button") NO ENCONTRADO en shadowRoot al hacer clic en Lottie.');
            }
        });
    }

    function tryHidingFlowiseButton(attemptCount) {
        const maxAttempts = 20; 
        if (attemptCount >= maxAttempts) {
            console.error(`Flowise Lottie Embed (Intento Ocultar ${attemptCount + 1}): Máximos intentos alcanzados. El botón original de Flowise podría seguir visible.`);
            return;
        }

        const flowiseElement = document.querySelector('flowise-chatbot');
        if (!flowiseElement) {
            console.log(`Flowise Lottie Embed (Intento Ocultar ${attemptCount + 1}): Elemento <flowise-chatbot> NO ENCONTRADO. Reintentando...`);
            setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500);
            return;
        }
        
        if (!flowiseElement.shadowRoot) {
            console.log(`Flowise Lottie Embed (Intento Ocultar ${attemptCount + 1}): ShadowRoot de <flowise-chatbot> NO ENCONTRADO o no listo. Reintentando...`);
            setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500);
            return;
        }

        const internalButton = flowiseElement.shadowRoot.querySelector('[part="button"]');
        if (internalButton) {
            internalButton.style.display = 'none';
            internalButton.style.visibility = 'hidden';
            internalButton.style.width = '0px';
            internalButton.style.height = '0px';
            internalButton.style.opacity = '0';
            internalButton.style.padding = '0';
            internalButton.style.margin = '0';
            internalButton.style.border = 'none';
            internalButton.style.pointerEvents = 'none';
            console.log(`Flowise Lottie Embed (Intento Ocultar ${attemptCount + 1}): Botón original de Flowise OCULTADO vía JavaScript.`);
        } else {
            console.log(`Flowise Lottie Embed (Intento Ocultar ${attemptCount + 1}): Botón interno [part="button"] NO ENCONTRADO en shadowRoot. Reintentando...`);
            setTimeout(() => tryHidingFlowiseButton(attemptCount + 1), 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mainInit);
    } else {
        mainInit();
    }

})();