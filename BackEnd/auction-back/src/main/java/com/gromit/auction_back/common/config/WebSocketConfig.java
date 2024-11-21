package com.gromit.auction_back.common.config;

import com.gromit.auction_back.websocket.ChatWebSocketHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer
{
    @Bean
    public ChatWebSocketHandler chatWebSocketHandler()
    {
        return new ChatWebSocketHandler();
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry)
    {
        registry.addHandler(chatWebSocketHandler(), "/chattingServer").setAllowedOrigins("*");
    }
}
