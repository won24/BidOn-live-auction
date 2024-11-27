import { useNavigate } from "react-router-dom";

const TestPage = () =>
{
    const nickname = sessionStorage.getItem("nickname");
    const navigate = useNavigate();

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        navigate(`/chattingwindow/${nickname}`);
    };

    return(
        <div>
            <button onClick={handleSubmit}>채팅창 열기</button>
        </div>
    )
}
export default TestPage;