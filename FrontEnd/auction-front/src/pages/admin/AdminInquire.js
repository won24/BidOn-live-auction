import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/AdminInquire.css";


const AdminInquire = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get('/admin/inquire');
            console.log('Fetched inquiries:', response.data);
            setInquiries(response.data);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    const handleInquiryClick = (inquiry) => {
        console.log('Clicked inquiry:', inquiry);
        setSelectedInquiry(inquiry);
        setAnswer('');
    };

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmitAnswer = async () => {
        if (!selectedInquiry || !answer.trim()) return;

        try {
            await axios.get(`/admin/answer`, {
                params: {
                    userCode: selectedInquiry.userCode,
                    answer: answer
                }
            });
            fetchInquiries();
            setSelectedInquiry(null);
            setAnswer('');
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <div className="inquire-container">
            <h2>1:1 문의 관리</h2>
            <div className="inquiry-content">
                <div className="inquiry-list">
                    <table>
                        <thead>
                        <tr>
                            <th>제목</th>
                            <th>사용자</th>
                            <th>작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inquiries.map((inquiry) => (
                            <tr
                                key={inquiry.id}
                                onClick={() => handleInquiryClick(inquiry)}
                                className={selectedInquiry && selectedInquiry.userCode === inquiry.userCode ? 'selected' : ''}
                            >
                                <td>{inquiry.title}</td>
                                <td>{inquiry.nickName}</td>
                                <td>{new Date(inquiry.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="inquiry-detail">
                    {selectedInquiry ? (
                        <>
                            <h3>문의 내용</h3>
                            <p>{selectedInquiry.content || '내용이 없습니다.'}</p>
                            <h4>답변</h4>
                            <textarea
                                value={answer}
                                onChange={handleAnswerChange}
                                placeholder="답변을 입력하세요"
                                rows="4"
                                className="inquiry-textarea"
                            />
                            <button onClick={handleSubmitAnswer} className="inquiry-submit">답변 제출</button>
                        </>
                    ) : (
                        <p>문의를 선택해주세요.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminInquire;