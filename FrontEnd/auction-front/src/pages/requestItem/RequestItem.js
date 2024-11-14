import {useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

const RequestItem = () => {
    const [loginInfo, setLoginInfo] = useState({
        UserCode: 7,
        Id: 'user7',
        Password: 'password7',
        Name: '나야,오류',
        email: 'user7@example.com',
        phone: '010-7777-7777',
        birthDate: '1996-07-07',
        address: '울산시 남구',
        cash: 7000,
        gender: '남',
        isAdult: 'y',
        isAdmin: 'n',
        nickName: 'nickname7',
        isSuspended: 'n'
    });

    const minSelectableDate = new Date();
    minSelectableDate.setDate(minSelectableDate.getDate() + 7);
    const filterTime = (time) => {
        const hour = time.getHours();
        return hour >= 12; // 12시 이후 시간만 활성화
    };

    const [formData, setFormData] = useState({
        categoryCode: '',
        date: new Date(),
        title: '',
        content: '',
        userCode: loginInfo.UserCode, // 로그인 정보를 formData에 포함
        imageURL: null, // 이미지 파일을 저장할 state
        currentCash: 0
    });

    // 입력값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 날짜 변경 시 상태 업데이트
    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            date: date
        }));
    };

    // 이미지 파일 선택 시 처리
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data.imageUrl)
                // 서버로부터 받은 이미지 URL을 상태에 저장
                setFormData(prevState => ({
                    ...prevState,
                    imageURL: response.data.imageUrl
                }));
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                // 에러 처리 로직 (예: 사용자에게 알림)
            }
        }
    };

    // 폼 제출 시 실행할 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지
        const submissionData = {
            ...formData,
            userCode: loginInfo.UserCode // 최신 로그인 정보를 사용
        };

        try {
            const response = await axios.post('/request-item', submissionData, {
                headers: {
                    'Content-Type': 'application/json',
                    // 필요한 경우 인증 토큰 추가
                    // 'Authorization': `Bearer ${yourAuthToken}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('경매품 신청 성공:', response.data);
                // 성공 메시지 표시 또는 다른 페이지로 리다이렉트
                alert('경매품 신청이 완료되었습니다.');
                // 예: history.push('/success-page');
            } else {
                throw new Error('서버 응답이 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('경매품 신청 실패:', error);
            alert('경매품 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };
    return (
        <div className="requestitem-container">
            <h1>경매품 신청하기</h1>
            <div className="notice">
                ※ 본문 입력란에 정확히 기재해 주세요. 상세 정보 및 고객의 상품을 정확히 확인합니다.
            </div>

            <form onSubmit={handleSubmit}>
                {/* 기존 폼 필드들 */}
                <div className="form-group">
                    <label htmlFor="categoryCode">분류</label>
                    <select id="categoryCode" name="categoryCode" value={formData.categoryCode} onChange={handleChange}
                            required>
                        <option value="" disabled hidden>카테고리 선택</option>
                        <option value="AT1">골동품</option>
                        <option value="LT1">한정판</option>
                        <option value="ED1">단종품</option>
                        <option value="AR1">예술품</option>
                        <option value="VA1">귀중품</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>날짜</label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd HH:mm"
                        minDate={minSelectableDate}
                        showTimeSelect
                        timeIntervals={30}
                        timeFormat="HH:mm"
                        filterTime={filterTime}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>내용</label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange}
                              placeholder="경매품의 정보를 상세히 입력해 주시기 바랍니다."/>
                </div>
                <div className="form-group">
                    <label htmlFor="currentCash">현재 가격</label>
                    <input
                        type="number"
                        id="currentCash"
                        name="currentCash"
                        value={formData.currentCash}
                        onChange={handleChange}
                        placeholder="숫자만 입력하세요"
                    />
                </div>

                {/* 이미지 파일 업로드 필드 추가 */}
                <div className="form-group">
                    <label htmlFor="image">이미지 첨부</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*"/>
                </div>

                {formData.imageURL && (
                    <div className="image-preview">
                        <img src={formData.imageURL} alt="미리보기" style={{maxWidth: '200px', maxHeight: '200px'}}/>
                    </div>
                )}

                <button type="submit">제출하기</button>
            </form>
        </div>
    );
}

export default RequestItem;