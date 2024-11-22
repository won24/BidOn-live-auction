import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    const socket = new SockJS('/ws'); // 서버의 웹소켓 엔드포인트
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('WebSocket Connected');
        stompClient.subscribe('/topic/bids', (message) => {
            const bidMessage = JSON.parse(message.body);
            onMessageReceived(bidMessage);
        });
    }, (error) => {
        console.error('WebSocket connection error:', error);
    });
};

export const sendBid = (bidData) => {
    if (stompClient && stompClient.connected) {
        stompClient.send("/app/bid", {}, JSON.stringify(bidData));
    } else {
        console.error('WebSocket is not connected');
    }
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.disconnect();
    }
};