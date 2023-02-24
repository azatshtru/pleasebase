const connectButton = document.getElementById('connect');
const getChannelButton = document.getElementById('channel');

const textList = document.getElementById('textList');
const textInput = document.getElementById('inputText');
const sendButton = document.getElementById('sendButton');

const messageList = [];

import { connectClient, sendData, readData } from "./client";

export function updateList(text){
    messageList.push(text);
    let li = document.createElement("li");
    li.innerText = text;
    textList.appendChild(li);
}

function send() {
    updateList(textInput.value);
    sendData(textInput.value);
    textInput.value = '';
}

connectButton.onclick = async () => { connectClient(); };
sendButton.onclick = () => { send(); };
getChannelButton.onclick = () => { readData(updateList) };