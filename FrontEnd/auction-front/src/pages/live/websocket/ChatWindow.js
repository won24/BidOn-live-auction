import { useNavigate, useParams } from "react-router-dom";
import "../../../css/ChatWindow.css";
import { useEffect, useState } from "react";

const ChatWindow = () => 
{
    const { userId } = useParams();
    const [message, setMessage] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [webSocket, setWebSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => 
    {
        const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
        const wsUrl = `${wsProtocol}localhost:8080/chattingServer`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => 
        {
            console.log("Connected to WebSocket server");
            const initialMessage = "Connected to WebSocket server";
            setMessage(prev => [...prev, {type: "info", message: initialMessage}]);
            ws.send(JSON.stringify({type: "join", userId}));
        };

        ws.onmessage = (event) => 
        {
            console.log(event.data);
            const message = event.data;
            setMessage((prev) => [...prev, { type: "received", message}]);
        };

        ws.onclose = () => 
        {
            console.log("WebSocket connection closed");
            const closingMessage = "WebSocket connection closed";
            setMessage(prev => [...prev, {type: "info", message: closingMessage}]);
        };

        ws.onerror = (error) =>
        {
            console.error(error);
        }

        setWebSocket(ws);

        // Cleanup WebSocket on unmount
        return () => 
        {
            if(ws)
            {
                ws.send(JSON.stringify({type: "leave", userId}));
                ws.close();
            }
        };
    }, []);

    const sendMessage = () => 
    {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) 
        {
            const trimmedMessage = messageInput.trim();
            if (trimmedMessage !== "") 
            {
                webSocket.send(JSON.stringify({ type: "message", userId, message: trimmedMessage }));
                setMessage((prev) => [...prev, { type: "sent", message: trimmedMessage }]);
                setMessageInput("");
            }
        } 
        else 
        {
            console.log("Disconnected.");
        }
    };

    const handleKeyPass = (event) => 
    {
        if (event.key === "Enter") 
        {
            sendMessage();
        }
    };

    const handleBackToMain = () => 
    {
        navigate("/");
    };

    return (
        <div className="chat-container">
            <h2>WebSocket Chatting</h2>
            <div
                id="chatwindow"
                className="chat-window"
                style={{
                    border: '1px solid #ccc',
                    width: '380px',
                    height: '400px',
                    overflowY: 'scroll',
                    padding: '10px',
                    backgroundColor: '#fff',
                }}>
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
                    placeholder="메시지 입력"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPass}
                />
                <button id="sendBtn" onClick={sendMessage}>전송</button>
                <button onClick={handleBackToMain}>메인으로 돌아가기</button>
            </div>
        </div>
    );
};

export default ChatWindow;
