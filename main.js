const connectButton = document.getElementById('connect');
const completeButton = document.getElementById('complete');
const respondButton = document.getElementById('respond');
const hostField = document.getElementById('hostQuery');
const slaveField = document.getElementById('slaveQuery');
const hostValue = document.getElementById('hostInfo');
const slaveValue = document.getElementById('slaveInfo');

const textList = document.getElementById('textList');
const textInput = document.getElementById('inputText');
const sendButton = document.getElementById('sendButton');

const messageList = [];

import { connectClient } from "./client";

let dc;

function updateList(text){
    messageList.push(text);
    let li = document.createElement("li");
    li.innerText = text;
    textList.appendChild(li);
}

function getChannel () {
    dc = getDataChannel(); 
    dc.onmessage = async (event) => {
        updateList(event.data);
    }
}

function send() {
    
    updateList(textInput.value);
    dc.send(textInput.value);
    textInput.value = '';
}

async function handleConnect (data) {
    hostValue.innerHTML = data;
    clientSend(data);
}
  
async function handleResponse (data) {
    slaveValue.innerHTML = data;
}
  
connectButton.onclick = async () => { connectClient(); };
//respondButton.onclick = async () => { respond(slaveField.value, handleResponse); };
//completeButton.onclick = () => { complete(hostField.value); };

//sendButton.onclick = () => { dc == undefined ? getChannel() : send() };