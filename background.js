import { getObjectFromLocalStorage, callGPTAPI } from './utils.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title === 'highlightedText') {
        (async function() {
            const highLightedText = message.data;

            if (!highLightedText.length) {
                sendResponse('No text highlighted');
                return true;
            };
            const {
                API_KEY,
                API_URL,
                API_MODEL,
                PROMPT_TEMPLATE,
                RESPONSE_FORMAT,
            } = await getObjectFromLocalStorage(['API_KEY', 'API_URL', 'API_MODEL', 'PROMPT_TEMPLATE', 'RESPONSE_FORMAT']);
            const prompt = PROMPT_TEMPLATE.replace(/\$\{([^}]+)\}/g, (match, varName) => highLightedText) + " " + RESPONSE_FORMAT;
            callGPTAPI(API_KEY, API_URL, API_MODEL, prompt).then((response) => {
                console.log('ChatGPT response', response);
                sendResponse(response);
            });
        })();
        return true
    }
});