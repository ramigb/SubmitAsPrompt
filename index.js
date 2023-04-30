import snarkdown from './snarkdown.js';
import { getObjectFromLocalStorage, saveTextAsFile } from './utils.js';

document.addEventListener('DOMContentLoaded', async() => {
    console.log(snarkdown)
    document.getElementById('submitBtn').addEventListener('click', submitSelected);
    const { PROMPT_TEMPLATE, RESPONSE_FORMAT } = await getObjectFromLocalStorage(['PROMPT_TEMPLATE', 'RESPONSE_FORMAT']);
    document.getElementById('gptResponse').innerHTML = 'Prompt template: ' + PROMPT_TEMPLATE + " " + RESPONSE_FORMAT;
});

async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function submitSelected(e) {
    e.preventDefault();
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').innerHTML = 'Loading...';
    document.getElementById('gptResponse').innerHTML = 'Waiting for response... this might take a while .. get some popcorn!';
    const tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        injectImmediately: true,
        func: copyHighlightedText,
    }, (injectionResults) => {
        chrome.runtime.sendMessage({
            title: 'highlightedText',
            data: injectionResults[0].result,
        }, (response) => {
            document.getElementById('gptResponse').innerHTML = snarkdown(response);
            saveTextAsFile(response, 'gptResult.txt');
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'Submit';
        });
    });
}

// Function to copy the highlighted text
async function copyHighlightedText() {
    const selection = window.getSelection();
    return selection.toString();
}