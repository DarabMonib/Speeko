let playbtn = document.querySelector('#play');
let playSelbtn = document.querySelector('#playSel');
let pausebtn = document.querySelector('#pause');

let message = {}

chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, (tabs) => {

    playbtn.addEventListener('click', () => {
        
        message.press = 'play'
        message.selected = undefined;

        chrome.tabs.sendMessage(tabs[0].id, message)
        playbtn.style.backgroundColor = 'red';

    })

    playSelbtn.addEventListener('click', () => {
        
        message.press = 'play'
        message.selected = true;

        chrome.tabs.sendMessage(tabs[0].id, message)
        playSelbtn.style.backgroundColor = 'red';

    })
    
    pausebtn.addEventListener('click', () => {
        
        chrome.tabs.sendMessage(tabs[0].id ,'pause')
        playbtn.style.backgroundColor = 'black';
        playSelbtn.style.backgroundColor = 'black';

    })

});
