// ==UserScript==
// @name         ChatGPT Text Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Filter ChatGPT Prompts
// @author       glaucio.c.goncalves@gmail.com
// @match        https://chat.openai.com/c/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createInputField() {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Filter Prompts (Regex)';
        setInputFieldStyles(inputField);

        return inputField;
    }

    function setInputFieldStyles(input) {
        input.style.marginBottom = '10px';
        input.style.backgroundColor = 'black';
        input.style.color = 'white';
        input.style.setProperty('::placeholder', 'color: white');
    }

    function insertInputFieldAboveNewChatButton(inputField) {
        const newChatButton = getNewChatButton();
        newChatButton.parentNode.insertBefore(inputField, newChatButton);
    }

    function getNewChatButton() {
        return Array.from(document.querySelectorAll('a')).find(el => el.textContent.includes('New Chat'));
    }

    function filterPrompts(regex) {
        const prompts = document.querySelectorAll('div.flex-1.text-ellipsis');
        prompts.forEach(prompt => {
            togglePromptVisibility(prompt, regex);
        });
    }

    function togglePromptVisibility(prompt, regex) {
        if (regex.test(prompt.textContent)) {
            prompt.parentNode.style.display = ''; // Show the item
        } else {
            prompt.parentNode.style.display = 'none'; // Hide the item
        }
    }

    function main() {
        const inputField = createInputField();
        insertInputFieldAboveNewChatButton(inputField);

        inputField.addEventListener('input', function() {
            let regex;
            try {
                regex = new RegExp(inputField.value, 'i');
            } catch (e) {
                console.error('Invalid Regex:', e);
                return;
            }

            filterPrompts(regex);
        });
    }

    main();

})();
