import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as api from "../common/AuctionAPIs";
import axios from "axios";
import '../../../css/PostEditPage.css'



const PostEditPage = () => {

    const {postId} = useParams();
    const [board, setBoard] = useState({});
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        postId: postId,
        categoryCode: '',
        startDay: new Date(),
        title: '',
        content: '',
        startCash: 0,
        postStatus: ''
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const fileInputRef = useRef(null);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [newImageURLs, setNewImageURLs] = useState([])


    // 게시글 정보 가져오기
    const getBoard = async () => {
        try {
            const response = await api.postDetail(postId)
            const data = response.data;
            console.log("edit board", data);
            setBoard(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getBoard();
    }, []);


    // 불러온 게시물 정보를 인풋값에 입력
    useEffect(() => {
        if (board) {
            setFormData({
                postId: board.postId,
                categoryCode: board.categoryCode,
                startDay: board.startDay,
                title: board.title,
                content: board.content,
                startCash: board.startCash,
                postStatus: board.postStatus
            })
        }
    }, [board])

    // 이미지 가져오기
    const getImg = async () => {

        try {
            const response = await api.getBoardImg(postId);
            const data = response.data;
            console.log(data);

            const imageUrls = data.map(item => item.imageUrl);
            setImageURLs(imageUrls);
        } catch (error) {
            console.error("게시글 이미지를 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    useEffect(() => {
        getImg();
    }, []);


    // 수정 사항 새로 저장
    const minSelectableDate = new Date();
    minSelectableDate.setDate(minSelectableDate.getDate() + 7);

    const filterTime = (time) => {
        const hour = time.getHours();
        return hour >= 12;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            startDay: date
        }));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setNewImageFiles(Array.from(files));
        const fileURLs = Array.from(files).map(file => URL.createObjectURL(file));
        setNewImageURLs(fileURLs);
    };


    // 수정된 값으로 요청 날리기
    const onSubmit = async () => {
        const formattedData = {
            ...formData,
            startDay: formData.startDay instanceof Date ? formData.startDay.toISOString() : formData.startDay
        };

        console.log("전송 데이터:", JSON.stringify(formattedData));

        try {
            const response = await api.updatePost(formattedData);
            console.log(response.data);

            if (response.status === 200 || response.status === 201) {
                await handleImageUpload(postId);
                alert('수정 완료');
                navigate(`/auction/${postId}`);
            } else {
                throw new Error('서버 응답이 올바르지 않습니다.');
            }
        } catch (e) {
            console.log("업데이트 오류:", e);
        }
    };

    const handleImageUpload = async (postId) => {
        const formData = new FormData();
        for (const element of newImageFiles) {
            formData.append('images', element);
        }

        try {
            const response = await axios.post('http://localhost:8080/images/upload', formData, {
                params: {postId}
            });

            if (response.status === 200 || response.status === 201) {
                console.log('이미지 업로드 성공');
            } else {
                throw new Error('이미지 업로드 실패');
            }
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };


    // 저장 이미지 개별 삭제
    const handleImageDelete = async (index, url) => {
        try {

            const response = await axios.delete('http://localhost:8080/images/delete', {
                params: {imageUrl: url, postId}
            });

            if (response.status === 200) {
                // 로컬 상태에서 이미지 제거
                setImageURLs(prevURLs => prevURLs.filter((_, i) => i !== index));
                alert('이미지가 삭제되었습니다.');
            } else {
                throw new Error('이미지 삭제 실패');
            }
        } catch (error) {
            console.error('이미지 삭제 오류:', error);
            alert('이미지 삭제 중 오류가 발생했습니다.');
        }
    };

    // 첨부 이미지 개별 삭제
    const handleRemoveImages = (index) => {
        setNewImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
        setNewImageURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // input[type="file"] 값 초기화
        }
    };


    // 게시글 삭제
    const onDelete = async () => {

        const response = await api.notUseThisPost(postId);
        console.log("postDelete", response.data);
        alert('삭제 완료')

        navigate('/auction')
    }


    // 취소버튼
    const movePrevPage = ()=>{
        navigate(-1)
    }


    return (
        <div className='edit-container'>
            <h1 className='edit-title'>게시글 수정</h1>
            <hr/>

            <div className="form-group">
                <label htmlFor="categoryCode">분류</label>
                <select id="categoryCode" name="categoryCode" value={formData.categoryCode} onChange={handleChange}
                        required>
                    <option value="" disabled hidden>카테고리 선택</option>
                    <option value="a">골동품</option>
                    <option value="l">한정판</option>
                    <option value="d">단종품</option>
                    <option value="ap">예술품</option>
                    <option value="v">귀중품</option>
                </select>
            </div>

            <div className="form-group">
                <label>날짜</label>
                <DatePicker
                    selected={formData.startDay}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd HH:mm"
                    minDate={minSelectableDate}
                    showTimeSelect
                    timeIntervals={30}
                    timeFormat="HH:mm"
                    filterTime={filterTime}
                    placeholderText="날짜 변경 시 선택"
                />
            </div>

            <div className="form-group">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label>내용</label>
                <textarea id="content" name="content" cols="100" rows="20"
                          value={formData.content} onChange={handleChange}
                          placeholder="경매품의 정보를 상세히 입력해 주시기 바랍니다."
                />
            </div>

            <div className="form-group">
                <label htmlFor="currentCash">현재 가격</label>
                <input
                    type="number"
                    id="startCash"
                    name="startCash"
                    value={formData.startCash}
                    onChange={handleChange}
                    placeholder="숫자만 입력하세요"
                />
            </div>

            {/* 기존 이미지 보여주기 */}
            <div className="form-group">
                <label>이미지</label>
                {imageURLs.length > 0 && (
                    <div className="image-preview">
                        {imageURLs.map((url, index) => (
                            <div key={index} style={{position: 'relative', display: 'inline-block'}}>
                                <img
                                    src={url}
                                    alt={`미리보기 ${index + 1}`}
                                    style={{maxWidth: '200px', maxHeight: '200px', marginRight: '10px'}}
                                />
                                <button className="img-delete-button"
                                        onClick={() => handleImageDelete(index, url)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 이미지 파일 업로드 */}
            <div className="form-group">
                <label htmlFor="image">새로운 이미지 첨부</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                />
            </div>

            {/* 업로드 할 이미지 미리보기 */}
            <div className="form-group">
            {imageURLs.length > 0 && (
                <div className="image-preview">
                    {newImageURLs.map((url, index) => (
                        <div key={index} style={{display: 'inline-block', position: 'relative', marginRight: '10px'}}>
                            <img
                                src={url}
                                alt={`미리보기 ${index + 1}`}
                                style={{maxWidth: '200px', maxHeight: '200px'}}
                            />
                            <button className="img-delete-button"
                                    onClick={() => handleRemoveImages(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
            </div>

            <div className="btn-box">
                <Link to="/auction" className='edit-btn_list'>목록</Link>
                <div className="edit-btn">
                    <button className='edit-btn_item' onClick={onDelete}>삭제</button>
                    <button className='edit-btn_item' onClick={onSubmit}>수정</button>
                    <button className='edit-btn_item' onClick={movePrevPage}>취소</button>
                </div>
            </div>
        </div>
    )
}
export default PostEditPage;