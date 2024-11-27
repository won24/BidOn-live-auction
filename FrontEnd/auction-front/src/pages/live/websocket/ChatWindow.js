import { useEffect, useState } from "react";

const ChatWindow = () => 
{
    const userId = sessionStorage.getItem("nickname");
    const [message, setMessage] = useState(() => 
    {
        const savedMessages = localStorage.getItem("chatMessages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [messageInput, setMessageInput] = useState("");
    const [webSocket, setWebSocket] = useState(null);

    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    useEffect(() => 
    {
        if (!isLoggedIn) return; 

        const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
        const wsUrl = `${wsProtocol}192.168.0.53:8080/chat`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => 
        {
            setMessage((prev) => [...prev, { type: "info", message: "채팅 서버에 연결되었습니다. 바른말 고운말을 사용해주세요." }]);
            ws.send(JSON.stringify({ type: "join", userId }));
        };

        ws.onmessage = (event) => 
        {
            const receivedMessage = event.data;
            const newMessage = { type: "received", message: receivedMessage };
            setMessage((prev) => 
            {
                const updatedMessages = [...prev, newMessage];
                localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        };

        ws.onclose = () => 
        {
            setMessage((prev) => [...prev, { type: "info", message: "현재 채팅이 불가능한 상태입니다." }]);
        };

        ws.onerror = (error) => 
        {
            console.error("WebSocket Error:", error);
        };

        setWebSocket(ws);

        return () => 
        {
            if (ws) 
            {
                ws.send(JSON.stringify({ type: "leave", userId }));
                ws.close();
            }
        };
    }, [isLoggedIn]);

    const sendMessage = () => 
    {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) 
        {
            const trimmedMessage = messageInput.trim();
            if (trimmedMessage !== "") 
            {
                const sentMessage = { type: "sent", message: trimmedMessage };
                webSocket.send(JSON.stringify({ type: "message", userId, message: trimmedMessage }));
                setMessage((prev) => 
                {
                    const updatedMessages = [...prev, sentMessage];
                    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
                setMessageInput("");
            }
        }
    };

    const handleKeyPass = (event) => 
    {
        if (event.key === "Enter" && isLoggedIn) 
        {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div
                id="chatwindow"
                className="chat-window"
                style={{
                    border: '1px solid #ccc',
                    height: '400px',
                    backgroundColor: '#fff',
                    overflowY: 'scroll',
                }}
            >
                {message.map((msg, index) => (
                    <div
                        key={index}
                        className={`sendedmessage ${msg.type}`}
                        style={{
                            textAlign: msg.type === 'sent' ? 'right' : 'left',
                            marginTop: '5px',
                            color: msg.type === 'sent' ? 'blue' : '#f32f00',
                        }}
                    >
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    id="chatMessage"
                    placeholder={isLoggedIn ? "메시지 입력" : "로그인 후 메시지를 입력하세요"}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPass}
                    disabled={!isLoggedIn}
                />
                <button id="sendBtn" onClick={sendMessage} disabled={!isLoggedIn}>전송</button>
            </div>
        </div>
    );
};

export default ChatWindow;
