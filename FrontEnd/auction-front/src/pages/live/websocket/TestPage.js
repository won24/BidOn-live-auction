import { useNavigate } from "react-router-dom";

const TestPage = () =>
{
    const nickname = sessionStorage.getItem("userNickname");
    const navigate = useNavigate();

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        navigate(`/chattingwindow/${nickname}`);
    };

    return(
        <div>
            <h1>WebSocket Chatting</h1>
            <button onClick={handleSubmit}>채팅방 입장</button>
        </div>
    )
}
export default TestPage;