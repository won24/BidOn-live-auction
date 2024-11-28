package com.gromit.auction_back.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ChatWebSocketHandler extends TextWebSocketHandler
{

    private static final Logger logger = LoggerFactory.getLogger(ChatWebSocketHandler.class);
    private static final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());
    private static final Set<String> bannedUsers = Collections.synchronizedSet(new HashSet<>());
    private static final ObjectMapper mapper = new ObjectMapper(); // JSON mapper

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception
    {
        String userId = extractUserId(session);
        if (userId == null || bannedUsers.contains(userId))
        {
            logger.warn("Unauthorized or banned user tried to connect: {}", session.getId());
            session.close(CloseStatus.NOT_ACCEPTABLE);
            return;
        }

        addSession(session);
        logger.info("User connected: {} (Session ID: {})", userId, session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        String payload = message.getPayload();
        logger.info("Received message: {}", payload);

        Message msg = mapper.readValue(payload, Message.class);

        String userId = extractUserId(session);
        if (bannedUsers.contains(userId))
        {
            logger.warn("Banned user attempted to send a message: {}", userId);
            session.sendMessage(new TextMessage("You are banned from this chat."));
            return;
        }

        switch (msg.getType())
        {
            case "join":
                broadcastMessage("User " + userId + " has joined the chat.", session);
                break;
            case "leave":
                broadcastMessage("User " + userId + " has left the chat.", session);
                break;
            case "message":
                broadcastMessage(userId + ": " + msg.getMessage(), session);
                break;
            case "ban":
                handleBanCommand(msg.getMessage(), session);
                break;
            default:
                logger.warn("Unknown message type: {}", msg.getType());
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception
    {
        logger.error("Transport error for session: {}", session.getId(), exception);
        removeSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception
    {
        removeSession(session);
        logger.info("User disconnected: {}", session.getId());
    }

    private void addSession(WebSocketSession session)
    {
        sessions.add(session);
    }

    private void removeSession(WebSocketSession session)
    {
        sessions.remove(session);
    }

    private void broadcastMessage(String message, WebSocketSession excludeSession) throws Exception
    {
        synchronized (sessions)
        {
            for (WebSocketSession s : sessions)
            {
                if (!s.equals(excludeSession))
                {
                    s.sendMessage(new TextMessage(message));
                }
            }
        }
    }

    private void handleBanCommand(String targetUserId, WebSocketSession session) throws Exception
    {
        if (targetUserId == null || targetUserId.isEmpty())
        {
            session.sendMessage(new TextMessage("Invalid ban command. Usage: /ban <userId>"));
            return;
        }

        bannedUsers.add(targetUserId);
        logger.info("User banned: {}", targetUserId);
        broadcastMessage("User " + targetUserId + " has been banned.", null);
    }

    private String extractUserId(WebSocketSession session)
    {
        // Example logic to extract userId from session attributes
        return (String) session.getAttributes().get("userId");
    }
}
