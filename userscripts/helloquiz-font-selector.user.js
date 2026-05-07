// ==UserScript==
// @name         helloquiz font selector
// @namespace    https://github.com/MX-Futhark/geoguessr-docs
// @version      0.1.0
// @description  Adds a basic font selector with a curated font list on helloquiz.app’s language quizzes
// @author       MX-Futhark
// @match        https://helloquiz.app/*
// @grant        none
// @updateURL    https://github.com/MX-Futhark/geoguessr-docs/raw/master/userscripts/helloquiz-font-selector.user.js
// @downloadURL  https://github.com/MX-Futhark/geoguessr-docs/raw/master/userscripts/helloquiz-font-selector.user.js
// ==/UserScript==

(function() {
    'use strict';

    const supportedScripts = {
        Cyrillic: ['Cormorant Garamond'],
        Thai: ['Noto Sans Thai', 'Charm'],
        Khmer: ['Moul'],
        Lao: ['Noto Serif Lao', 'Noto Sans Lao'],
        Arabic: ['Noto Sans Arabic', 'Noto Kufi Arabic', 'Noto Nastaliq Urdu'],
        Hebrew: ['Noto Serif Hebrew'],
        Devanagari: ['Teko'],
        Telugu: ['Dhurjati'],
        Sinhala: ['Gemunu Libre'],
    };
    const STYLE_ID = 'helloquiz-font-swap-style';
    const SELECT_ID = 'helloquiz-font-swap-select';
    const STYLE_TARGET = '[class$="__content"] > h2 > span';

    const injectedFonts = new Set();
    let scriptInjected = false;

    const parseHTML = (html) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        return wrapper.firstElementChild;
    };

    const enableScript = (script) => {
        const fonts = supportedScripts[script];
        if (!injectedFonts.has(script)) {
            const queryParams = fonts.map((font) =>
                `family=${font.replace(/\+/g, '')}${script === 'Cyrillic' ? ':ital@0;1' : ''}`
            ).join('&');
            document.head.appendChild(
                parseHTML(`<link href="https://fonts.googleapis.com/css2?${queryParams}" rel="stylesheet">`),
            );
            injectedFonts.add(script);
        }

        const select = parseHTML(`<select id="${SELECT_ID}" style="position: absolute; right: 0; z-index: 1">
            <option value="" selected>Default</option>
            ${fonts
                .map((value) => {
                    const displayName = value.replace(/\+/g, ' ');
                    if (script !== 'Cyrillic') return `<option value="${value}">${displayName}</option>`;
                    return ['ru', 'bg', 'sr'].map((lang) => {
                        return ['normal', 'italic'].map((style) =>
                            `<option value="${value}|${
                                JSON.stringify({ lang, style }).replace(/"/g, '&quot;')
                            }">${displayName} (${lang} - ${style})</option>`)
                    }).flat().join('\n');
                })
                .join("")}
        </select>`);
        select.addEventListener("change", (e) => {
            const [fontName, fontPropertiesStr] = e.target.value.split('|');
            const fontProperties = JSON.parse(fontPropertiesStr ?? '{}');
            document.getElementById(STYLE_ID)?.remove();
            if (fontName) {
                document.head.appendChild(
                    parseHTML(`<style id="${STYLE_ID}">
                        ${STYLE_TARGET} {
                            font-family: '${fontName.replace(/\+/g, ' ')}';
                            font-style: ${fontProperties.style}
                        }
                    </style>`),
                );
            }
            document.querySelector(STYLE_TARGET).setAttribute('lang', fontProperties.lang ?? '');
        });
        document.body.prepend(select);
    };

    const init = () => {
        if (scriptInjected) return;
        const charTest = document.querySelector(STYLE_TARGET).innerText;
        for (const script of Object.keys(supportedScripts)) {
            if (new RegExp(`\\p{Script=${script}}`, 'u').test(charTest)) {
                enableScript(script);
                scriptInjected = true;
                break;
            }
        }
    };

    const cleanup = () => {
        if (!scriptInjected) return;
        document.getElementById(STYLE_ID)?.remove();
        document.getElementById(SELECT_ID)?.remove();
        scriptInjected = false;
    }

    new MutationObserver((_, observer) => {
        const quizzRoot = document.querySelector('[class$="__otherQuiz"]');
        if (quizzRoot) init();
        else cleanup();
    }).observe(document.body, { childList: true, subtree: true });
})();
