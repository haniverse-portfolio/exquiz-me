import SockJS from "sockjs-client";
import Stomp from "stompjs";

var stompClient = null;

export function connect() {
  const headers = {
    // connect, subscribe에 쓰이는 headers
  };

  var socket = new SockJS(`https://dist.exquiz.me/stomp`);
  stompClient = Stomp.over(socket);

  stompClient.connect(
    headers,
    (frame) => {
      stompClient.subscribe(
        "/topic/room",
        () => {
          // subscribe 후 실행하는 곳
        },
        headers
      );
    },
    () => {
      alert("disconnected");
    }
  );
}
