let data = document.body.innerText; //To get Body's Text Data, Will not support PDF files tho, Need a better solution for this
let utt = new SpeechSynthesisUtterance();

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
    
    if(message.press === 'play' && message.selected === undefined){
        clearAllIntervals();
        BreakLessSpeech(data)
    }
    
    else if(message.press === 'play' && message.selected == true){
        clearAllIntervals();
        BreakLessSpeech(virtualInp.value)       
    }
    
    else if(message === 'pause'){
        window.speechSynthesis.cancel();
        clearAllIntervals();
    }

    if(message.pitch){
        clearAllIntervals();
        utt.pitch = message.pitch;
    }

    if(message.rate){
        clearAllIntervals();
        utt.rate = message.rate;
    }

    if(message.volume){
        clearAllIntervals();
        utt.volume = message.volume;
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
    
    for(let i = 0; i < toBuffer.length; i+=bufferChunkSize){    
        bufferCount++;
        bufferArray[bufferCount] = toBuffer.slice(i, i+bufferChunkSize);
    }
    bufferCount = -1;
    return bufferArray;
}
function BreakLessSpeech(toSpeak){

    var myTimeout;
    function myTimer() {

        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
        myTimeout = setTimeout(myTimer, 10000);

    }
    window.speechSynthesis.cancel();
    myTimeout = setTimeout(myTimer, 10000);
    
    utt.text = toSpeak;
    utt.onend =  function() { clearTimeout(myTimeout); }
    window.speechSynthesis.speak(utt);

}
