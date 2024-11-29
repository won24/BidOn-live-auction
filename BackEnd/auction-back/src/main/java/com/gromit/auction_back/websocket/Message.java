package com.gromit.auction_back.websocket;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class Message {
    private String type; // e.g., "join", "leave", "message", "admin"
    private String nickname; // The user sending the message
    private String message; // The message content (used for chat messages)
    private String action; // Optional: e.g., "ban" for admin actions
    private String target; // Optional: The target user for admin commands

    @Column(name = "isSuspended")
    private LocalDateTime isSuspended; // Optional: Ban end time in ISO8601 format

    public Message() {
    }

    public Message(String type, String nickname, String message) {
        this.type = type;
        this.nickname = nickname;
        this.message = message;
    }

    public Message(String type, String nickname, String message, String action, String target, LocalDateTime isSuspended) {
        this.type = type;
        this.nickname = nickname;
        this.message = message;
        this.action = action;
        this.target = target;
        this.isSuspended = isSuspended;
    }

    @Override
    public String toString() {
        return "Message{" +
                "type='" + type + '\'' +
                ", nickname='" + nickname + '\'' +
                ", message='" + message + '\'' +
                ", action='" + action + '\'' +
                ", target='" + target + '\'' +
                ", isSuspended='" + isSuspended + '\'' +
                '}';
    }
}
