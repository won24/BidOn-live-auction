import { useEffect, useState } from "react";

const ChatWindow = () => 
{
    const userId = sessionStorage.getItem("nickname");
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    const now = new Date();
    const suspensionTime = sessionStorage.getItem("isSuspended");
    const isSuspended = suspensionTime ? new Date(suspensionTime) > now : false;

    const [message, setMessage] = useState(() => 
    {
        const savedMessages = localStorage.getItem("chatMessages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [messageInput, setMessageInput] = useState("");
    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => 
    {
        if (!isLoggedIn) return;

        const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
        const wsUrl = `${wsProtocol}localhost:8080/chat`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => 
        {
            setMessage((prev) => [
                ...prev,
                {
                    type: "info",
                    message: "채팅 서버에 연결되었습니다. 바른말 고운말을 사용해주세요.",
                },
            ]);
            ws.send(JSON.stringify({ type: "join", userId }));

            if (isSuspended) 
            {
                setMessage((prev) => [
                    ...prev,
                    {
                        type: "info",
                        message: `현재 고객님의 계정은 ${suspensionTime}까지 채팅이 정지된 상태입니다.`,
                    },
                ]);
            }
        };

        ws.onmessage = (event) => 
        {
            const receivedMessage = JSON.parse(event.data);
            setMessage((prev) => 
            {
                const updatedMessages = [...prev, receivedMessage];
                localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        };

        ws.onclose = () => 
        {
            setMessage((prev) => [
                ...prev,
                { type: "info", message: "현재 채팅이 불가능한 상태입니다." },
            ]);
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
    }, [isLoggedIn, isSuspended, userId]);

    const sendMessage = () => 
    {
        if (webSocket && webSocket.readyState === WebSocket.OPEN && !isSuspended) 
        {
            const trimmedMessage = messageInput.trim();
            if (trimmedMessage !== "") 
            {
                if (isAdmin && trimmedMessage.startsWith("/")) 
                {
                    handleAdminCommand(trimmedMessage);
                } 
                else 
                {
                    const sentMessage = { type: "sent", message: trimmedMessage };
                    webSocket.send(
                        JSON.stringify({ type: "message", userId, message: trimmedMessage })
                    );
                    setMessage((prev) => 
                    {
                        const updatedMessages = [...prev, sentMessage];
                        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                        return updatedMessages;
                    });
                }
                setMessageInput("");
            }
        }
    };

    const handleAdminCommand = (command) => 
    {
        const [cmd, ...args] = command.split(" ");
        if (cmd === "/ban") 
        {
            const targetUser = args[0];
            if (targetUser) 
            {
                webSocket.send(
                    JSON.stringify({ type: "admin", action: "ban", target: targetUser, userId })
                );
                setMessage((prev) => [
                    ...prev,
                    {
                        type: "admin-feedback",
                        message: `User ${targetUser} has been banned.`,
                    },
                ]);
            } 
            else 
            {
                setMessage((prev) => [
                    ...prev,
                    {
                        type: "admin-feedback",
                        message: "Usage: /ban <username>",
                    },
                ]);
            }
        } 
        else 
        {
            setMessage((prev) => [
                ...prev,
                {
                    type: "admin-feedback",
                    message: `Unknown command: ${cmd}`,
                },
            ]);
        }
    };

    const handleKeyPass = (event) => 
    {
        if (event.key === "Enter" && isLoggedIn && !isSuspended) 
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
                    border: "1px solid #ccc",
                    height: "400px",
                    backgroundColor: "#fff",
                    overflowY: "scroll",
                }}
            >
                {message.map((msg, index) => 
                {
                    if (msg.type === "admin-feedback" && !isAdmin) return null;

                    return (
                        <div
                            key={index}
                            className={`sendedmessage ${msg.type}`}
                            style={{
                                textAlign:
                                    msg.type === "sent"
                                        ? "right"
                                        : msg.type === "admin-feedback"
                                        ? "right"
                                        : "left",
                                marginTop: "5px",
                                color:
                                    msg.type === "sent"
                                        ? "blue"
                                        : msg.type === "info"
                                        ? "gray"
                                        : msg.type === "admin-feedback"
                                        ? "purple"
                                        : "#f32f00",
                            }}
                        >
                            {msg.message}
                        </div>
                    );
                })}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    id="chatMessage"
                    placeholder={
                        isSuspended
                            ? "채팅이 정지된 계정은 채팅 확인만 가능합니다."
                            : isLoggedIn
                            ? "메시지 입력"
                            : "로그인 후 메시지를 입력하세요"
                    }
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPass}
                    disabled={!isLoggedIn || isSuspended}
                />
                <button id="sendBtn" onClick={sendMessage} disabled={!isLoggedIn || isSuspended}>
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
