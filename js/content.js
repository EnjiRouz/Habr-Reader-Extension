// создание средства синтеза речи и получение списка голосов
const synthesis = window.speechSynthesis;
const voices = synthesis.getVoices();
const utterance = new SpeechSynthesisUtterance();

// текущий символ, который синтезируется в данный момент времени
let currentCharacter;

// назначение события на момент, когда речь перестанет проигрываться
utterance.addEventListener("end", () => {
    currentCharacter = null;
});

// получение символа, который синтезируется в данный момент
utterance.addEventListener("boundary", event => {
    currentCharacter = event.charIndex;
});

// переменные: язык речи, скорость проигрывания аудио, воспроизводимый текст
let speechLanguage = "ru-RU";
let playerSpeed = 1;
let textToPlay = "Открой статью, а потом уже нажимай сюда";

/**
 * Рекурсивно прибавляет текстовое содержимое дочерних элементов для формирования текста поста
 * @param elementForSearchingIn - родительский элемент, в котором будет осуществляться поиск текстовых нодов
 */
function joinTextNodes(elementForSearchingIn) {
    if (elementForSearchingIn.hasChildNodes()) {
        elementForSearchingIn.childNodes.forEach(function (node) {
            joinTextNodes(node)
        });
    } else if (elementForSearchingIn.nodeType === Text.TEXT_NODE) {
        textToPlay += " " + elementForSearchingIn.textContent;
    }
}

/**
 * Поиск голоса для заданного языка речи
 * @param lang - заданный язык речи
 * @returns {null|SpeechSynthesisVoice}
 */
function findVoice(lang) {
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang === lang)
            return voices[i];
    }
    return null;
}

/**
 * Проигрывание синтезированного высказывания
 */
function playTextToSpeech() {

    // если проигрывание речи было поставлено на паузу - происходит продолжение проигрывания
    if (synthesis.paused && synthesis.speaking)
        return synthesis.resume();

    if (synthesis.speaking) return;

    // определение параметров синтезируемой речи
    utterance.text = textToPlay;
    utterance.rate = playerSpeed || 1;
    utterance.lang = speechLanguage;
    utterance.voice = findVoice(utterance.lang);

    // проигрывание речи
    synthesis.speak(utterance);
}

/**
 * Установка проигрывания синтезированной речи на паузу
 */
function pauseTextToSpeech() {
    if (synthesis.speaking)
        synthesis.pause();
}

/**
 * Остановка (прекращение) проигрывания синтезированной речи
 */
function stopTextToSpeech() {
    synthesis.resume();
    synthesis.cancel();
}

/**
 * Изменение скорости речи в режиме реального времени
 */
function changeSpeed() {
    if (synthesis.paused && synthesis.speaking) return;
    if (currentCharacter === null) return;

    stopTextToSpeech();
    playTextToSpeech(utterance.text.substring(currentCharacter));
}

/**
 * Осуществление взаимодействия pop-up формы с background скриптом при помощи отправки-получения сообщений
 * в активной вкладке с передачей в них необходимых для работы параметров.
 * Переданные параметры перезаписывают предыдущие настройки
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.todo) {
        case "play":
            playerSpeed = request.newSpeed;
            speechLanguage = request.lang;
            playTextToSpeech();
            break;
        case "changeSpeed":
            playerSpeed = request.newSpeed;
            changeSpeed();
            break;
        case "pause":
            pauseTextToSpeech();
            break;
        case "stop":
            stopTextToSpeech();
            break;
    }
    sendResponse({
        response: "Message received"
    });
});

window.onload = function () {
    let contentBody = document.getElementById("post-content-body");
    if (contentBody) {
        textToPlay = "";
        joinTextNodes(contentBody);
        alert("Текст поста готов к чтению")
    }
};