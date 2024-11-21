package com.gromit.auction_back.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ChatWebSocketHandler extends TextWebSocketHandler
{
    private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());
    private static ObjectMapper mapper = new ObjectMapper(); // json으로 넘어오는 데이터를 매핑

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception
    {
        sessions.add(session);
        System.out.println("Connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        System.out.println("Received: " + message.getPayload());
        String payload = message.getPayload();
        Message msg = mapper.readValue(payload, Message.class);

        synchronized (session)
        {
            for(WebSocketSession session2 : sessions)
            {
                if(!session2.equals(session))
                {
                    if("join".equals(msg.getType()))
                    {
                        session2.sendMessage(new TextMessage("Joined: " + msg.getUserId()));
                    }
                    else if("leave".equals(msg.getType()))
                    {
                        session2.sendMessage(new TextMessage("Left: " + msg.getUserId()));
                    }
                    else if("message".equals(msg.getType()))
                    {
                        session2.sendMessage(new TextMessage(msg.getUserId() + ": " + msg.getMessage()));
                    }
                }
            }
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
