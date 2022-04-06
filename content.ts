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


//-------------------------------------------------------//


let data = document.body.innerText; //To get Body's Text Data, Will not support PDF files tho, Need a better solution for this

// let bufferCount = -1;
// let bufferChunkSize = 185;
// let bufferArray = [];

// let tSRepeat, pSRepeat;
// const msg = new SpeechSynthesisUtterance();

chrome.runtime.onMessage.addListener((message) => {
    
    if(message.press === 'play' && message.selected === undefined){
    
        clearAllIntervals();

        BreakLessSpeech(data)

        // // Loop Over Each Block of String....
        
        // let totalSpeaking = bufferGenerator(data)
        // let tSCount = 0;
        // tSRepeat = setInterval(() => {
            
        //     if(!speechSynthesis.speaking && totalSpeaking[tSCount]){
                
        //         msg.text = totalSpeaking[tSCount];
        //         window.speechSynthesis.cancel();
        //         window.speechSynthesis.speak(msg);
        //         tSCount++;
                
        //     }
        //     else{
        //         console.log('waiting, Speech Synth Speaking? => ' + speechSynthesis.speaking)
        //         console.log('Total Interval ID => ' + tSRepeat);
        //         if(speechSynthesis.speaking === false){
        //             clearInterval(tSRepeat);
        //             console.log("Cleared the Interval " + tSRepeat);
        //         }
        //     }
            
        // }, 10);


        
    }
    
    else if(message.press === 'play' && message.selected == true){
        
        clearAllIntervals();

        BreakLessSpeech(virtualInp.value)

        // let portionSpeaking = bufferGenerator(virtualInp.value)
        // let pSCount = 0;

        // console.log(portionSpeaking);
        
        // pSRepeat = setInterval(() => {
            
        //     if(!speechSynthesis.speaking && portionSpeaking[pSCount]){
                
        //         msg.text = portionSpeaking[pSCount];
        //         window.speechSynthesis.cancel();
        //         window.speechSynthesis.speak(msg);
        //         pSCount++;
                
        //     }
        //     else{
        //         console.log('waiting, Speech Synth Speaking? => ' + speechSynthesis.speaking)
        //         console.log('Portion Interval ID => ' + pSRepeat);
        //         if(speechSynthesis.speaking === false){
        //             clearInterval(pSRepeat);
        //             console.log("Cleared the Interval " + pSRepeat);
                    
        //         }
        //     }
            
        // }, 10);
        
    }
    
    else if(message === 'pause'){
        
        window.speechSynthesis.cancel();
        clearAllIntervals();
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
    
    var utt = new SpeechSynthesisUtterance(toSpeak);
    utt.onend =  function() { clearTimeout(myTimeout); }
    window.speechSynthesis.speak(utt);

}
