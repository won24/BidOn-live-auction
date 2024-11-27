import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;
let isConnected = false;

export const connectWebSocket = () => {
    return new Promise((resolve, reject) => {
        if (stompClient && stompClient.connected) {
            console.log('Already connected');
            resolve();
            return;
        }

        const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log('WebSocket Connected');
            isConnected = true;
            resolve();
        }, (error) => {
            console.error('WebSocket connection error:', error);
            reject(error);
        });
    });
};

export const subscribeToAuction = (postId, onMessageReceived) => {
    if (!stompClient || !stompClient.connected) {
        console.error('WebSocket is not connected');
        return;
    }

    stompClient.subscribe(`/topic/bids/${postId}`, (message) => {
        const bidMessage = JSON.parse(message.body);
        if (bidMessage.postId === postId) { // 추가 필터링
            onMessageReceived(bidMessage);
        }
    });
};

export const sendBid = (bidData) => {
    return new Promise((resolve, reject) => {
        if (stompClient && stompClient.connected) {
            try {
                console.log("Sending bid:", bidData);
                stompClient.send("/app/bid", {}, JSON.stringify(bidData));
                resolve('Bid sent successfully');
            } catch (error) {
                reject(new Error(`Failed to send bid: ${error.message}`));
            }
        } else {
            reject(new Error('WebSocket is not connected'));
        }
    });
};
