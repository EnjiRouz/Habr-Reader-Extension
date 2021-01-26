// определение кнопок
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");

// определение полей ввода
const speed = document.getElementById("speed");

// назначение действий на соответствующие кнопки/поля
// используется явное указание события для кнопки (связано с политикой безопасности), т.е. без анонимных функций
if(playButton)
    playButton.addEventListener("click", play);

if(pauseButton)
    pauseButton.addEventListener("click", pause);

if(stopButton)
    stopButton.addEventListener("click", stop);

if(speed)
    speed.addEventListener("input", changeSpeed);

// применение настроек на странице происходит при помощи их передачи в сообщении,
// предназначенном для background скрипта

function play(){
    let language = document.querySelector('input[name="speech-language"]:checked').value;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "play", newSpeed: speed.value, lang: language});
    });
}

function pause(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "pause"});
    });
}

function stop(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "stop"});
    });
}

function changeSpeed(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "changeSpeed", newSpeed: speed.value});
    });
}