import SockJS from "sockjs-client";
import Stomp from "stompjs";

var stompClient = null;

export function send(data) {
  const headers = {
    // connect, subscribe에 쓰이는 headers
  };

  var socket = new SockJS(`https://dist.exquiz.me/stomp`);
  stompClient = Stomp.over(socket);

  stompClient.send("/pub/test", {}, JSON.stringify(data));
}
