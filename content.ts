let data = document.body.innerText; //To get Body's Text Data, Will not support PDF files tho, Need a better solution for this
let utt = new SpeechSynthesisUtterance();

let page = document.body;

let textData = '';
let selectedData = '';
let virtualInp;

    function gText(e) {
    
        textData = (document.all) ? document.selection.createRange().text : document.getSelection();
                
        virtualInp = document.createElement('input')
        virtualInp.value = textData;

        console.log(virtualInp.value);
        console.log('This Portion Right Here!');
    }

    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);

chrome.runtime.onMessage.addListener((message) => {
    
    if(message.press === 'play' && message.selected === false){
        clearAllIntervals();
        Speak(data)
    }
    
    else if(message.press === 'play' && message.selected == true){
        clearAllIntervals();
        Speak(virtualInp.value)
    }
    
    if(message.isPaused){
        window.speechSynthesis.resume();
    }

    else if(message.isPaused === false){
        window.speechSynthesis.pause();
    }

    if(message === 'stop'){
        window.speechSynthesis.cancel();
        clearAllIntervals();
    }

    if(message.pitch){
        utt.pitch = message.pitch * 0.099 + 0.02;
        console.log(utt.pitch);
    }

    if(message.rate){
        utt.rate = message.rate * 0.099 + 0.02;
        console.log(utt.rate);
    }

    if(message.volume){
        utt.volume = message.volume * 0.050;
        console.log(utt.volume);
    }

    if(message.dark === true){
        chrome.storage.sync.set( { 'dark': true } )
        page.style.transition = '0.5';
        page.style.backgroundColor = 'black';
        page.style.color = 'white';
    }

    else {
        chrome.storage.sync.set( { 'dark': false } )
        page.style.transition = '0.5';
        page.style.backgroundColor = 'white';
        page.style.color = 'black';
    }
    
})

// Get The Data inside the text field!

// Points to be noted about (Speech Synthesis)
    // => Jab Jhatke se band hogi to speech synthesis ke true-false bug karenge!.....

function clearAllIntervals() {

    let highestInterval = setInterval(() => {}, 0)
    bufferArray = [];
    for(let range = 0; range <= highestInterval; range++){
        clearInterval(range);
    }
    console.log('Cleared all intervals!!! Starting new speakings!!!')

}

// Use Buffer Generator, New Logic's Length is ~3990 Chars....

function bufferGenerator(toBuffer) {

    let bufferChunkSize = 3900;
    let bufferCount = -1;
    let bufferArray = [];

    for(let i = 0; i < toBuffer.length; i+=bufferChunkSize){    
        bufferCount++;
        bufferArray[bufferCount] = toBuffer.slice(i, i+bufferChunkSize);
    }
    bufferCount = -1;
    return bufferArray;
}
function Speak(toSpeak){

    if(toSpeak[3991]){

        let buffArr = bufferGenerator(toSpeak);

        console.log(buffArr);

        let index = -1; 

        const Timer = setInterval(() => {

            if(!speechSynthesis.speaking){

                index++;

                let myTimeoutLg;
                function myTimerLg() {
                    
                    window.speechSynthesis.pause();
                    window.speechSynthesis.resume();
                    myTimeoutLg = setTimeout(myTimerLg, 10000);
                    
                }
                window.speechSynthesis.cancel();
                myTimeoutLg = setTimeout(myTimerLg, 10000);
                
                utt.text = buffArr[index];
                utt.onend =  function() { clearTimeout(myTimeoutLg); }
                window.speechSynthesis.speak(utt);
                
            }
            
        }, 0)

    }
    else{

        let myTimeoutSm;
        function myTimerSm() {
    
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
            myTimeoutSm = setTimeout(myTimerSm, 10000);
    
        }
        window.speechSynthesis.cancel();
        myTimeoutSm = setTimeout(myTimerSm, 10000);
        
        utt.text = toSpeak;
        utt.onend =  function() { clearTimeout(myTimeoutSm); }
        window.speechSynthesis.speak(utt);
    
    }

}


// 1. Get the Selected Text.
// 2. Highlight the word that we are on (Search For Synth current or something....)
// 3. Encapsulate the current word using Js in a div with id "#Current".
// 4. Give "#Current" a property of backgroundColor = 'yellow', and color = black/red.


// ... Disable Text Selection... Done
// ... When Play, PlaySel is Clicked, Disable
        // -> Playing,
        // -> PlaySel
        // message...
// ... When Pause is Clicked, Disable
        // -> Pause

// ... Change The Icon of Pause => Stop, and call it stop in code.
// ... use speechSynthesis.pause(); for pause btn..
// ... and speechSynthesis.cancel(); for stop btn..