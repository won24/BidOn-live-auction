import React, { useState } from 'react';
import axios from 'axios';

const PersonalInquire = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        userCode: 7 // 임시로 하드코딩된 사용자 코드
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/customer/personalinquire', formData);
            console.log(formData);
            console.log('문의가 성공적으로 제출되었습니다:', response.data);
            // 여기에 성공 메시지를 표시하거나 다른 페이지로 리디렉션하는 로직을 추가할 수 있습니다.
        } catch (error) {
            console.error('문의 제출 중 오류 발생:', error);
            console.log(formData);
            // 여기에 오류 메시지를 표시하는 로직을 추가할 수 있습니다.
        }
    };

    return (
        <div className="Inquire-container">
            <h2>1:1 문의 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">제출</button>
            </form>
        </div>
    );
};

export default PersonalInquire;