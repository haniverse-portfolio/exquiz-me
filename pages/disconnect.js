import SockJS from "sockjs-client";
import Stomp from "stompjs";

var stompClient = null;

export function disConnect() {
  if (stompClient !== null) {
    const headers = {
      // disconnect에 쓰이는 headers
    };
    stompClient.disconnect(function () {
      // disconnect 후 실행하는 곳
    }, headers);
  }
}
