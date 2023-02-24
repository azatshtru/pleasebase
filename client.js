const socket = new WebSocket('ws://localhost:9386');

import { connect, respond, complete } from "./protocol";

let dc;

async function clientSend(message) {
  socket.send(message);
};

async function setChannel (channel){
  dc = channel;
}

export async function readData (callback){
  while (!dc){
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  dc.onmessage = async (event) => {
    callback(event.data);
  };
}

export function connectClient(){
  connect(clientSend, setChannel);
}

export async function sendData (message) {
  console.log(dc.id);
  dc.send(message);
}

//make data read callback event something.

socket.onmessage = async ({data}) => {
  const text = JSON.parse(await data.text());
  console.log(text);
  if(text.type == 'offer'){
    respond(JSON.stringify(text), clientSend, setChannel);
  }
  if(text.type == 'answer'){
    complete(JSON.stringify(text));
  }
};