const socket = new WebSocket('ws://localhost:9386');

import { connect, respond, complete, getDataChannel } from "./protocol";

function clientSend(message) {
  socket.send(message);
};

export function connectClient(){
  connect(clientSend);
}

socket.onmessage = async ({data}) => {
  const text = JSON.parse(await data.text());
  console.log(text);
  if(text.type == 'offer'){
    respond(JSON.stringify(text), clientSend);
  }
  if(text.type == 'answer'){
    complete(JSON.stringify(text));
  }
};