document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    document.getElementById('saveOptionsBtn').addEventListener('click', saveOptions);
});

function saveOptions() {
    const status = document.getElementById('status');
    const API_KEY = document.getElementById('API_KEY').value;
    const API_URL = document.getElementById('API_URL').value;
    const PROMPT_TEMPLATE = document.getElementById('PROMPT_TEMPLATE').value;
    status.textContent = 'Options saved.';
    chrome.storage.local.set({ API_KEY, API_URL, PROMPT_TEMPLATE },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
        }
    );

}

const restoreOptions = () => {
    chrome.storage.local.get({ API_KEY: '', API_URL: 'https://api.openai.com/v1/chat/completions', PROMPT_TEMPLATE: '' },
        (items) => {
            document.getElementById('API_KEY').value = items.API_KEY;
            document.getElementById('API_URL').value = items.API_URL;
            document.getElementById('PROMPT_TEMPLATE').value = items.PROMPT_TEMPLATE;
        }
    );
};