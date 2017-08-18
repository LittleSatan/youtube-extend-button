// ==UserScript==
// @name         youtube Extend Button
// @version      0.1
// @description  Adds a Button to YouTube
// @author       MarissaChan
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// @grant        MIT
// ==/UserScript==

// This funcion will (try to) add the sync button to the menu
function addExtendButton(){
    // Test if the menu exists. And if the menu exists, then test if the menu has a extend button. If there is no sync button but there is a menu, return true
    if (document.getElementById("watch8-secondary-actions") !== null && document.getElementById("watch8-secondary-actions").querySelector("#extendButton") === null){
        // create an element called extendButton
        var extendButton = document.createElement("button");
        // set id and classes for the new button
        extendButton.setAttribute("id", "extendButton");
        extendButton.classList.add("yt-uix-button", "yt-uix-button-size-default", "yt-uix-button-opacity", "yt-uix-tooltip");
        // create an element (span) for the content.
        var content = document.createElement("span");
        // set classes and text of the span
        content.classList.add("yt-uix-button-content");
        content.innerHTML = "Extend";
        // add the content to the button
        extendButton.appendChild(content);
        // let's insert the button to the menu. the new exnt button should be third button in the menu.
        document.getElementById("watch8-secondary-actions").insertBefore(extendButton, document.getElementById("watch8-secondary-actions").children[2]);
        // get site url
        var url = window.location.href;
        // use regex to get video id
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        // add onclick event listener to the extend buttom
        extendButton.addEventListener('click', function() {
            // get the current time pos of the video (in seconds)
            var startTime = Math.floor(movie_player.getCurrentTime());
            // open embeded youtube player
            document.location.href = "https://www.youtube.com/embed/" + videoid[1] + "?start=" + startTime + "&autoplay=1";
        }, false);
	}
}

// call the function addExtendButton every second
setInterval(addExtendButton, 1000);