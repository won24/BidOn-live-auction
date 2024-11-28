import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/AdminInquire.css";

const AdminInquire = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [answer, setAnswer] = useState('');

    // 문의 내역을 가져오는 함수
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

    // 문의 클릭 시 해당 문의를 선택
    const handleInquiryClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        setAnswer('');  // 새 문의를 선택할 때 이전 답변 내용 초기화
    };

    // 답변 내용 변경 처리
    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    // 답변 제출 처리
    const handleSubmitAnswer = async () => {
        if (!selectedInquiry || !answer.trim()) return;

        try {
            await axios.get(`/admin/answer`, {
                params: {
                    userCode: selectedInquiry.userCode,
                    answer: answer
                }
            });
            fetchInquiries();  // 문의 목록 새로 고침
            setSelectedInquiry(null);  // 답변 후 선택된 문의 초기화
            setAnswer('');  // 답변 내용 초기화
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <div className="inquire-container">
            <h2>1:1 문의 관리</h2>
            <div className="inquiry-content">
                <div className="inquiry-list">
                    <h3>문의 내역</h3>
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
                                className={selectedInquiry && selectedInquiry.id === inquiry.id ? 'selected' : ''}
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
