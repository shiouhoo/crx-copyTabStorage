function getCurrentDomain() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }).then((tab) => {
            if (!tab[0].url.startsWith('http')) {
                reject('空标签页无法操作')
            }
            resolve(tab[0].url.split('/')[2])
        })
    });
}

async function changeLocal(name, key, id) {
    const domain = await getCurrentDomain();
    chrome.storage.local.get(name, async (data) => {
        const target = data[key];
        chrome.storage.local.set({
            [name]: {
                ...(target || {}),
                [domain]: $(`#${id}`).val()
            }
        });
    })
}

async function initLocal(data, name, id) {
    try {
        const domain = await getCurrentDomain();
        if (data && data[domain]) {
            $(`#${id}`).val(data[domain])
        } else {
            chrome.storage.local.set({
                [name]: {
                    ...(data || {}),
                    [domain]: $(`#${id}`).val()
                }
            });
        }

    } catch (e) {
        console.log("init：空标签页无法操作, 请打开一个网页");
    }
}

// target
$('#address').on('change', async () => {
    changeLocal('target', 'target', 'address')
})
/**
 * target: {
 *    [链接] : string
 * }
 */
chrome.storage.local.get('target', async ({ target }) => {
    initLocal(target, 'target', 'address')
})
// cookieCheck
chrome.storage.local.get('cookieCheck', ({ cookieCheck }) => {
    $('#cookieCheck').prop('checked', cookieCheck || false);
})
$('#cookieCheck').on('change', () => {
    chrome.storage.local.set({ cookieCheck: $('#cookieCheck:checked').val() || false });
})
// localStorageCheck
chrome.storage.local.get('localStorageCheck', ({ localStorageCheck }) => {
    $('#localStorageCheck').prop('checked', localStorageCheck || false);
})
$('#localStorageCheck').on('change', () => {
    chrome.storage.local.set({ localStorageCheck: $('#localStorageCheck:checked').val() || false });
})
// localStorageTogetherCheck
chrome.storage.local.get('localStorageTogetherCheck', ({ localStorageTogetherCheck }) => {
    $('#localStorageTogetherCheck').prop('checked', localStorageTogetherCheck || false);
})
$('#localStorageTogetherCheck').on('change', () => {
    chrome.storage.local.set({ localStorageTogetherCheck: $('#localStorageTogetherCheck:checked').val() || false });
})
// textarea-format-localstorage
chrome.storage.local.get('textareaFormatLocalStorage', async ({ textareaFormatLocalStorage }) => {
    initLocal(textareaFormatLocalStorage, 'textareaFormatLocalStorage', 'textarea-format-localstorage')
})
$('#textarea-format-localstorage').on('change', async () => {
    changeLocal('textareaFormatLocalStorage', 'textareaFormatLocalStorage', 'textarea-format-localstorage')
})
// sessionStorageCheck
chrome.storage.local.get('sessionStorageCheck', ({ sessionStorageCheck }) => {
    $('#sessionStorageCheck').prop('checked', sessionStorageCheck || false);
})
$('#sessionStorageCheck').on('change', () => {
    chrome.storage.local.set({ sessionStorageCheck: $('#sessionStorageCheck:checked').val() || false });
})
// sessionStorageTogetherCheck
chrome.storage.local.get('sessionStorageTogetherCheck', ({ sessionStorageTogetherCheck }) => {
    $('#sessionStorageTogetherCheck').prop('checked', sessionStorageTogetherCheck || false);
})
$('#sessionStorageTogetherCheck').on('change', () => {
    chrome.storage.local.set({ sessionStorageTogetherCheck: $('#sessionStorageTogetherCheck:checked').val() || false });
})
// textarea-format-sessionstorage
chrome.storage.local.get('textareaFormatSessionStorage', async ({ textareaFormatSessionStorage }) => {
    initLocal(textareaFormatSessionStorage, 'textareaFormatSessionStorage', 'textarea-format-sessionstorage')
})
$('#textarea-format-sessionstorage').on('change', async () => {
    changeLocal('textareaFormatSessionStorage', 'textareaFormatSessionStorage', 'textarea-format-sessionstorage')
})