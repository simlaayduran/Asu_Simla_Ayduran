"use strict";

//  Initilazing global variables
let minimumFrequency = 220;
let maximumFrequency = 440;
let semitones = 0;
let oscillatorType = "sine";

let urlParameters = (new URL(document.location)).searchParams;
if (urlParameters.has("minimum")){
    minimumFrequency = parseInt(urlParameters.get("minimum"));
}
if (urlParameters.has("maximum")){
    maximumFrequency = parseInt(urlParameters.get("maximum"));
}   

if (urlParameters.has("semitone")){
    semitones = parseInt(urlParameters.get("semitone"));
}

if (urlParameters.has("oscillator")){
    oscillatorType = urlParameters.get("oscillator");
}

// Turn theremin on 
function thereminOn(oscillator1, oscillator2) {
    oscillator1.play();
    oscillator2.play();
}

// Control the theremin
function thereminControl(e, oscillator1, oscillator2, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let freqRange = maximumFrequency - minimumFrequency;
    let thereminFreq = minimumFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    console.log("Frequency: ", thereminFreq);
    oscillator1.frequency = thereminFreq;
    if (semitones == 0){
        oscillator2.frequency = thereminFreq;
    }
    else{
        oscillator2.frequency = interval(thereminFreq, semitones);
    }
    document.getElementById("freq1").innerHTML = "First Frequency: " + thereminFreq;
    document.getElementById("freq2").innerHTML = "Next Frequency: " + oscillator2.frequency;
    document.getElementById("note1").innerHTML = "First Note: " + noteFromFrequency(thereminFreq, true);
    document.getElementById("note2").innerHTML = "Next Note: " + noteFromFrequency(oscillator2.frequency, true);
    console.log("Volume: ", thereminVolume);
    oscillator1.volume = thereminVolume;
    oscillator2.volume = thereminVolume;
}

// Turn theremin off
function thereminOff(oscillator1, oscillator2) {
    oscillator1.stop();
    oscillator2.stop();
}

function runAfterLoadingPage() {
    const oscillator1 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });
    const oscillator2 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });

    const theremin = document.getElementById("thereminZone");

    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator1, oscillator2);
    });

    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator1, oscillator2, theremin);
    });

    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator1, oscillator2);
    });
}

window.onload = runAfterLoadingPage;