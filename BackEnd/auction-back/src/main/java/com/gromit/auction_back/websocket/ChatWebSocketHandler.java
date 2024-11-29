package com.gromit.auction_back.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gromit.auction_back.User.UserController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ChatWebSocketHandler extends TextWebSocketHandler
{

    private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());
    private static ObjectMapper mapper = new ObjectMapper(); // For mapping JSON to Message object
    private UserController userController;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception
    {
        sessions.add(session);
        System.out.println("Connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        String payload = message.getPayload();
        System.out.println("Received: " + payload);

        // Deserialize the message
        Message msg = mapper.registerModule(new JavaTimeModule()).readValue(payload, Message.class);

        synchronized (session)
        {
            for (WebSocketSession session2 : sessions)
            {
                if (!session2.equals(session))
                {
                    if ("join".equals(msg.getType()))
                    {
                        session2.sendMessage(new TextMessage(msg.getNickname() + " has joined the chat."));
                    }
                    else if ("leave".equals(msg.getType()))
                    {
                        session2.sendMessage(new TextMessage(msg.getNickname() + " has left the chat."));
                    }
                    else if ("message".equals(msg.getType()))
                    {
                        session2.sendMessage(new TextMessage(msg.getNickname() + ": " + msg.getMessage()));
                    }
                    else if ("admin".equals(msg.getType()))
                    {
                        // Admin commands (e.g., ban user)
                        handleAdminCommand(session2, msg);
                    }
                }
            }
        }
    }

    private void handleAdminCommand(WebSocketSession session, Message msg) throws Exception
    {
        if ("ban".equals(msg.getAction()))
        {
            String targetUser = msg.getTarget();
            LocalDateTime suspensionEndTime = msg.getSuspensionEndTime();

            if (targetUser != null && suspensionEndTime != null)
            {
                // Call the UserController or a service to update the suspension status
                userController.banUser(targetUser, suspensionEndTime);

                session.sendMessage(new TextMessage("User " + targetUser + " has been banned until " + suspensionEndTime));
            }
            else
            {
                session.sendMessage(new TextMessage("Invalid ban command. Usage: /ban <nickname> <suspensionEndTime>"));
            }
        }
        else
        {
            session.sendMessage(new TextMessage("Unknown admin action: " + msg.getAction()));
        }
    }


    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception
    {
        System.out.println("Error: " + session.getId());
        exception.printStackTrace();
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception
    {
        sessions.remove(session);
        System.out.println("Disconnected: " + session.getId());
    }
}
