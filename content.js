let t = '';
let selectedData = '';
let virtualInp;

    function gText(e) {
    
        t = (document.all) ? document.selection.createRange().text : document.getSelection();
                
        virtualInp = document.createElement('input')
        virtualInp.value = t;

        console.log(virtualInp.value);
        console.log('This Portion Right Here!');
    }

    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);


//-------------------------------------------------------//


let data = document.body.innerText; //To get Body's Text Data, Will not support PDF files tho, Need a better solution for this
let buff = -1;
let buffChunkSize = 165;
let recurr = 500;

let buffs = [];

function bufferGenerator(dataType) {
    
    buffs = []
    for(let i = 0; i < dataType.length; i+=buffChunkSize){
        // if(dataType[i+buffChunkSize]){
            buff++;
            buffs[buff] = dataType.slice(i, i+buffChunkSize);
        // }
    }
    buff = -1;
    return [buffs, buff];
}

// Jab Jhatke se band hogi to speech synthesis ke true-false bug karenge!.....

const msg = new SpeechSynthesisUtterance();

chrome.runtime.onMessage.addListener((message) => {

    if(message.press === 'play' && message.selected === undefined){

        // Loop Over Each Block of String....

        bufferGenerator(data)
        recurr = setInterval(() => {
            
            if(!speechSynthesis.speaking && buffs[buff+1]){
             
                msg.text = buffs[buff+1];
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(msg);
                buff++;

            }
            
        }, 1000);
        
    }

    else if(message.press === 'play' && message.selected == true){
        
        console.log('I am inside the PLAY SELECTED AREA if statement!')

        bufferGenerator(virtualInp.value)
        console.log(buffs);
        recurr = setInterval(() => {
            
            if(!speechSynthesis.speaking && buffs[buff+1]){
             
                msg.text = buffs[buff+1];
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(msg);
                buff++;

            }
            
        }, 1000);

    }

    else if(message === 'pause'){
    
        window.speechSynthesis.cancel();
        clearInterval(recurr);

    }

})

// Get The Data inside the text field!