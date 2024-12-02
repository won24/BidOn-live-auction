import "../../css/FAQ.css";
import React, { useEffect, useState } from 'react';
const baseURL =process.env.REACT_APP_API_URL;
const FAQ = () => {
    const [faqData, setFaqData] = useState([]);
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
                const response = await fetch(`http://112.221.66.174:8081/customer/faq`, { signal });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFaqData(data);
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
        setOpenItems(Array(faqData.length).fill(false));
    }, [faqData]);

    return (
        <div className="faq-container">
            <h2>자주하는 질문</h2>
            <table className="faq-table">
                <tbody>
                {faqData.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr className="faq-item" onClick={() => toggleContent(index)}>
                            <td className="faq-title" colSpan="2">{item.title}</td>
                        </tr>
                        {openItems[index] && (
                            <tr className="faq-item">
                                <td className="faq-content" colSpan="2">{item.content}</td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default FAQ;