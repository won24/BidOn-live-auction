import React, {useEffect, useState} from "react";
import "../../css/Notice.css";

const Notice = () =>{
    const [noticeData, setNoticeData] = useState([]);
    const [openItems, setOpenItems] = useState([]);

    const toggleContent = (index) => {
        setOpenItems((prevOpenItems) =>
            prevOpenItems.map((isOpen, i) => (i === index ? !isOpen : isOpen))
        );
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/customer/notice', { signal });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNoticeData(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching FAQ data:', error);
                }
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, []);

    // Initialize openItems whenever faqData changes
    useEffect(() => {
        setOpenItems(Array(noticeData.length).fill(false));
    }, [noticeData]);

    return (
        <div className="notice-container">
            <h2>공지사항</h2>
            <table className="notice-table">
                <tbody>
                {noticeData.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr className="notice-item" onClick={() => toggleContent(index)}>
                            <td className="notice-title" colSpan="2">{item.title}</td>
                        </tr>
                        {openItems[index] && (
                            <tr className="notice-item">
                                <td className="notice-content" colSpan="2">{item.content}</td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default Notice;