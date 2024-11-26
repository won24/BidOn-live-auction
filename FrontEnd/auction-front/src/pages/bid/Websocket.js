import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;
let isConnected = false;

export const connectWebSocket = () => {
    return new Promise((resolve, reject) => {
        if (isConnected) {
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
    if (stompClient && stompClient.connected) {
        stompClient.subscribe(`/topic/bids/${postId}`, (message) => {
            const bidMessage = JSON.parse(message.body);
            if (bidMessage.postId === postId) { // 추가 필터링
                onMessageReceived(bidMessage);
            }
        });
    } else {
        console.error('WebSocket is not connected');
    }
};

export const sendBid = (bidData) => {
    return new Promise((resolve, reject) => {
        console.log("WebSocket Connected:", stompClient?.connected);
        if (stompClient && stompClient.connected) {
            try {
                console.log("WebSocket Connected:", stompClient?.connected);
                console.log(bidData);
                stompClient.send("/app/bid", {}, JSON.stringify(bidData));
                resolve('Bid sent successfully');
            } catch (error) {
                reject(new Error(`Failed to send bid: ${error}`));
            }
        } else {
            reject(new Error('WebSocket is not connected'));
        }
    });
};