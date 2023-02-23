//global variables
const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  
const pc = new RTCPeerConnection(servers);
let dataChannel;

//functions

function setupChannel(){
    dataChannel = pc.createDataChannel('guys');

    dataChannel.onopen = async (event) => {

    }

    dataChannel.onmessage = async (event) => {
        const message = event.data;
    }

}

function retrieveChannel(){
    pc.ondatachannel = async (event) => {
        dataChannel = event.channel;

        dataChannel.onopen = async (event) => {

        }
    
        dataChannel.onmessage = async (event) => {
            const message = event.data;
        }
    }
    
}

export async function connect(callback){
    setupChannel();

    pc.onicecandidate = async (event) => {
        console.log(pc.iceGatheringState);
        console.log(pc.localDescription);
        if(pc.iceGatheringState == "complete"){
            callback(JSON.stringify(pc.localDescription));
        }
    };

    const offerDescription = await(pc.createOffer());
    await pc.setLocalDescription(offerDescription);
}

export async function respond (offer, callback){

    pc.onicecandidate = async (event) => {
        console.log(pc.iceGatheringState);
        console.log(pc.localDescription);
        if(pc.iceGatheringState == "complete"){
            callback(JSON.stringify(answer));
            retrieveChannel();
        }
    };

    pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
}
  
export async function complete (answer){
    const response = new RTCSessionDescription(JSON.parse(answer));
    await pc.setRemoteDescription(response);
}

export function getDataChannel () {
    return dataChannel;
}

pc.onconnectionstatechange = async (event) => {
    console.log(pc.connectionState);
}