let playbtn = document.querySelector('#play');
let playSelbtn = document.querySelector('#playSel');
let pausebtn = document.querySelector('#pause');

// Extension's Dom Manipulation..
let body = document.querySelector('body');
let darkMode = document.querySelector('#darkMode');

//Sliders..
let pitch = document.querySelector('#pitch');
let rate = document.querySelector('#speed');
let volume = document.querySelector('#volume');

let message = {}

chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, (tabs) => {

    playbtn.addEventListener('click', () => {
        
        message.press = 'play'
        message.selected = undefined;

        chrome.tabs.sendMessage(tabs[0].id, message)
        playbtn.style.backgroundColor = 'rgb(38, 154, 255);';
        playbtn.style.boxShadow = '0px 0px 0px';
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        pausebtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })

    playSelbtn.addEventListener('click', () => {
        
        message.press = 'play'
        message.selected = true;

        chrome.tabs.sendMessage(tabs[0].id, message)
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255);';
        playSelbtn.style.boxShadow = '0px 0px 0px';
        playbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        pausebtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })
    
    pausebtn.addEventListener('click', () => {
        
        chrome.tabs.sendMessage(tabs[0].id ,'pause')
        pausebtn.style.backgroundColor = 'rgb(38, 154, 255);';
        pausebtn.style.boxShadow = '0px 0px 0px';
        playbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })

    //Dark Mode...
    darkMode.addEventListener("click",() => {

        
        if(darkMode.checked) {
            body.style.backgroundColor = "black";
            body.style.color = 'white';
            message.dark = true;
            chrome.tabs.sendMessage(tabs[0].id, message);
            body.style.transition = '0.2s';
        }
        else { 
            body.style.backgroundColor = "white";
            message.dark = false;
            chrome.tabs.sendMessage(tabs[0].id, message);
            body.style.color = 'black';
            body.style.transition = '0.2s';
        }
        
    })


    //Sliders Listeners...
    pitch.addEventListener('change', () => {
        message.pitch = pitch.value
        chrome.tabs.sendMessage(tabs[0].id, message)
    })

    rate.addEventListener('change', () => {
        message.rate = rate.value
        chrome.tabs.sendMessage(tabs[0].id, message)
    })

    volume.addEventListener('change', () => {
        message.volume = volume.value
        chrome.tabs.sendMessage(tabs[0].id, message)
    })


});


