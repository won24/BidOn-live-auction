import axios from 'axios';
import React, { useState } from 'react';
import { useLogin } from '../../pages/login/LoginContext'; // LoginContext import 추가

const PersonalInquire = () => {
    const { user } = useLogin(); // LoginContext에서 user 정보 가져오기
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        userCode: user ? user.userCode : null // 세션에서 가져온 userCode 사용
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
        if (!user) {
            console.error('로그인 정보가 없습니다.');
            return;
        }

        try {
            const response = await axios.post('/customer/personalinquire', {
                ...formData,
                userCode: user.userCode // 세션에서 가져온 userCode 사용
            });
            console.log('문의가 성공적으로 제출되었습니다:', response.data);
            // 여기에 성공 메시지를 표시하거나 다른 페이지로 리디렉션하는 로직을 추가할 수 있습니다.
        } catch (error) {
            console.error('문의 제출 중 오류 발생:', error);
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