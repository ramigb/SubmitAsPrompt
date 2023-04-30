import { getObjectFromLocalStorage, callGPTAPI } from './utils.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title === 'highlightedText') {
        (async function() {
            const highLightedText = message.data;

            if (!highLightedText.length) {
                sendResponse('No text highlighted');
                return true;
            };
            const { API_KEY, API_URL, PROMPT_TEMPLATE } = await getObjectFromLocalStorage(['API_KEY', 'API_URL', 'PROMPT_TEMPLATE']);
            const prompt = PROMPT_TEMPLATE.replace(/\$\{([^}]+)\}/g, (match, varName) => highLightedText);
            callGPTAPI(API_KEY, API_URL, prompt).then((response) => {
                console.log('ChatGPT response', response);
                sendResponse(response);
            });
        })();
        return true
    }
});