# Habr-Reader-Extension
Простое расширение-читалка для `Chrome/Opera`, позволяющее воспроизводить текстовое содержимое статьи на [Habr](https://habr.com/).

Для воспроизведения используется встроенный TextToSpeech, управляемый через popup-интерфейс с помощью кнопок `▶`,`⏸` и `⏹`.

Можно выбирать язык воспроизведения (между английским `en-US` и русским `ru-RU`), а также регулировать скорость (по умолчанию, от 0.5 до 2). 

Я опишу упаковку и установку для Opera и Chrome. В других браузерах процесс, скорее всего, будет аналогичным, поскольку основные действия выполняются через стандартный раздел браузера "Расширения". 

## Упаковка расширения

Для того, чтобы упаковать расширение, нужно проделать следующее:
- **Opera**  → Меню  → Расширения → Расширения → **включить Режим Разработчика** → Упаковка расширения
- **Google Chrome** → Дополнительные инструменты → Расширения → **включить Режим Разработчика** → Упаковка расширения

## Установка расширения
Расширение можно установить через раздел "Расширения" двумя путями:

- если модификация не требуется - достаточно скачать и перетащить [подготовленный](https://github.com/EnjiRouz/Habr-Reader-Extension/releases) `crx-файл` в окно с открытым разделом расширений и нажать на "Установить";

- если была сделана модификация кода и требуется тестирование перед упаковкой, то в окне с разделом расширений требуется нажать на "Загрузить распакованное расширение" и выбрать в диалоговом окне папку с проектом.
