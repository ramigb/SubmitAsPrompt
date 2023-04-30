export async function callGPTAPI(API_KEY, API_URL, prompt) {
    if (!API_KEY || !API_URL) {
        throw new Error('API_KEY or API_URL not found in local storage');
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": prompt }],
            "temperature": 0.7
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling GPT API:', error);
        throw error;
    }
}

export async function getObjectFromLocalStorage(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(key, function(value) {
                if (typeof key === 'string') {
                    resolve(value[key]);
                }
                resolve(value)
            });
        } catch (ex) {
            reject(ex);
        }
    });
};

export function saveTextAsFile(textToSave, fileNameToSaveAs) {
    // Create a new Blob object with the text data
    const blob = new Blob([textToSave], { type: "text/plain" });

    // Create a new URL object with the blob data
    const url = URL.createObjectURL(blob);

    // Create a new anchor element to download the file
    const a = document.createElement("a");
    a.href = url;
    a.download = fileNameToSaveAs;

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Click the anchor element to download the file
    a.click();

    // Remove the anchor element from the body
    document.body.removeChild(a);

    // Revoke the URL object to free up memory
    URL.revokeObjectURL(url);
}