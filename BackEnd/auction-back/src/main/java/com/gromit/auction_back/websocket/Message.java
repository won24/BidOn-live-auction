package com.gromit.auction_back.websocket;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Message
{
    private String type;
    private String userId;
    private String message;

    public Message() {
    }

    public Message(String type, String userId, String message) {
        this.type = type;
        this.userId = userId;
        this.message = message;
    }

    @Override
    public String toString() {
        return "Message{" +
                "type='" + type + '\'' +
                ", userId='" + userId + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
