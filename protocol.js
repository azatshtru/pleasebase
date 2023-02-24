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

//functions

function setupChannel(channel){
    const dataChannel = pc.createDataChannel('guys');
    channel(dataChannel);

    dataChannel.onopen = async (event) => {

    }

    dataChannel.onmessage = async (event) => {
        const message = event.data;
    }

}

async function retrieveChannel(channel){
    pc.ondatachannel = async (event) => {
        const dataChannel = event.channel;
        channel(dataChannel);

        dataChannel.onopen = async (event) => {

        }
    
        dataChannel.onmessage = async (event) => {
            const message = event.data;
        }
    }
    
}

export async function connect(callback, channel){
    setupChannel(channel);

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

export async function respond (offer, callback, channel){

    pc.onicecandidate = async (event) => {
        console.log(pc.iceGatheringState);
        console.log(pc.localDescription);
        if(pc.iceGatheringState == "complete"){
            retrieveChannel(channel);
            callback(JSON.stringify(answer));
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


pc.onconnectionstatechange = async (event) => {
    console.log(pc.connectionState);
}