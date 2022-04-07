// Extension's Dom Manipulation..
let playbtn = document.querySelector('#play');
let playSelbtn = document.querySelector('#playSel');
let pausebtn = document.querySelector('#pause');
let stopbtn = document.querySelector('#stop');

let pauseImg = document.querySelector('#pauseImg');

let count = 0;

let body = document.querySelector('body');
let darkMode = document.querySelector('#darkMode');

//Sliders..
let pitch = document.querySelector('#pitch');
let rate = document.querySelector('#speed');
let volume = document.querySelector('#volume');

//Notifiers...
let state = {}
let message = {}
let sliders = {}

chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, (tabs) => {

    //Init Checks...
    chrome.storage.sync.get('dark', (mode) => {
    
        if(mode.dark){
            body.style.backgroundColor = "black";
            body.style.color = 'white';
            body.style.transition = '0.2s';
            darkMode.checked = true;
            message.dark = true;
            chrome.tabs.sendMessage(tabs[0].id, message);
            chrome.storage.sync.set( { 'dark': true } )
        }
        else{
            body.style.backgroundColor = "white";
            body.style.color = 'black';
            body.style.transistion = '0.2s';
            darkMode.checked = true;
            message.dark = false;
            chrome.tabs.sendMessage(tabs[0].id, message);
            chrome.storage.sync.set( { 'dark': false } )
        }
    
    })

    //Btns Manipulation...
    playbtn.addEventListener('click', () => {
        
        message.press = 'play'
        message.selected = false;

        chrome.tabs.sendMessage(tabs[0].id, message)
        playbtn.style.backgroundColor = 'rgb(38, 154, 255);';
        playbtn.style.boxShadow = '0px 0px 0px';
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        stopbtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })

    playSelbtn.addEventListener('click', () => {
        
        message.press = 'play'
        message.selected = true;

        chrome.tabs.sendMessage(tabs[0].id, message)
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255);';
        playSelbtn.style.boxShadow = '0px 0px 0px';
        playbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        stopbtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })

    pausebtn.addEventListener('click', () => {
        
        count++;

        pauseImg.style.transistion = '0.2s'
            
        if(count % 2 === 0){
            state.isPaused = true;
            pauseImg.src = '/images/pauseX.png'
        }
        
        else{
            state.isPaused = false;
            pauseImg.src = '/images/playX.png'
        }

        chrome.tabs.sendMessage(tabs[0].id , state)
        pausebtn.style.backgroundColor = 'rgb(38, 154, 255);';
        pausebtn.style.boxShadow = '0px 0px 0px';
        playbtn.style.backgroundColor = 'rgb(38, 154, 255)';
        playSelbtn.style.backgroundColor = 'rgb(38, 154, 255)';

    })
    
    stopbtn.addEventListener('click', () => {
        
        chrome.tabs.sendMessage(tabs[0].id ,'stop')
        stopbtn.style.backgroundColor = 'rgb(38, 154, 255);';
        stopbtn.style.boxShadow = '0px 0px 0px';
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
        sliders.pitch = pitch.value
        chrome.tabs.sendMessage(tabs[0].id, sliders)
    })

    rate.addEventListener('change', () => {
        sliders.rate = rate.value
        chrome.tabs.sendMessage(tabs[0].id, sliders)
    })

    volume.addEventListener('change', () => {
        sliders.volume = volume.value
        chrome.tabs.sendMessage(tabs[0].id, sliders)
    })


});


