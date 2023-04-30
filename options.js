document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    document.getElementById('saveOptionsBtn').addEventListener('click', saveOptions);
});

function saveOptions() {
    const status = document.getElementById('status');
    const API_KEY = document.getElementById('API_KEY').value;
    const API_URL = document.getElementById('API_URL').value;
    const API_MODEL = document.getElementById('API_MODEL').value;
    const PROMPT_TEMPLATE = document.getElementById('PROMPT_TEMPLATE').value;
    const RESPONSE_FORMAT = document.getElementById('RESPONSE_FORMAT').value;
    status.textContent = 'Options saved.';
    chrome.storage.local.set({
            API_KEY,
            API_URL,
            API_MODEL,
            PROMPT_TEMPLATE,
            RESPONSE_FORMAT
        },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
        }
    );

}

const restoreOptions = () => {
    chrome.storage.local.get({
            API_KEY: '',
            API_URL: 'https://api.openai.com/v1/chat/completions',
            API_MODEL: 'gpt-3.5-turbo',
            PROMPT_TEMPLATE: '',
            RESPONSE_FORMAT: ''
        },
        (items) => {
            document.getElementById('API_KEY').value = items.API_KEY;
            document.getElementById('API_URL').value = items.API_URL;
            document.getElementById('API_MODEL').value = items.API_MODEL;
            document.getElementById('PROMPT_TEMPLATE').value = items.PROMPT_TEMPLATE;
            document.getElementById('RESPONSE_FORMAT').value = items.RESPONSE_FORMAT;
        }
    );
};