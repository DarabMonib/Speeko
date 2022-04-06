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
        playbtn.style.backgroundColor = 'gray';
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        pausebtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })

    playSelbtn.addEventListener('click', () => {
        
        message.press = 'play'
        message.selected = true;

        chrome.tabs.sendMessage(tabs[0].id, message)
        playSelbtn.style.backgroundColor = 'gray';
        playbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        pausebtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })
    
    pausebtn.addEventListener('click', () => {
        
        chrome.tabs.sendMessage(tabs[0].id ,'pause')
        pausebtn.style.backgroundColor = 'gray';
        playbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })

});
