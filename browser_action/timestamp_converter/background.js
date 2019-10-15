'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({language_env: 'en'}, function () {
        console.log('Language is english.');
    });
});
