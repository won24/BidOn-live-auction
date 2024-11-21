import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as api from "../common/AuctionAPIs";


const PostEditPage = () =>{

    const { postId } = useParams();
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

    const getBoard = async () => {
        try {
            const response = await api.postDetail(postId)
            const data = response.data;
            console.log("edit board",data);
            setBoard(data);
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getBoard();
    }, []);


    useEffect( () => {
        if( board ) {
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


    const minSelectableDate = new Date();
    minSelectableDate.setDate(minSelectableDate.getDate() + 7);

    const filterTime = (time) => {
        const hour = time.getHours();
        return hour >= 12;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    // const handleImageChange = (e) => {
    //     const files = e.target.files;
    //     setImageFiles(files);
    //     const fileURLs = Array.from(files).map(file => URL.createObjectURL(file));
    //     setImageURLs(fileURLs);
    // };


    const onSubmit = async () => {
        const formattedData = {
            ...formData,
            startDay: formData.startDay instanceof Date ? formData.startDay.toISOString() : formData.startDay
        };

        console.log("전송 데이터:", JSON.stringify(formattedData));

        try {
            const response = await api.updatePost(formattedData);
            console.log(response.data);
            alert('수정 완료');
            navigate(`/auction/${postId}`);
        } catch (e) {
            console.log("업데이트 오류:", e);
        }
    };


    const onDelete = async () => {

        const response = await api.deletePost(postId);
        console.log("postDelete",response.data);
        alert('삭제 완료')

        navigate('/auction')
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
                />
            </div>

            <div className="form-group">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label>내용</label>
                <textarea id="content" name="content" cols="40" rows="5"
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

            {/*/!* 이미지 파일 업로드 필드 추가 *!/*/}
            {/*<div className="form-group">*/}
            {/*    <label htmlFor="image">이미지 첨부</label>*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        id="image"*/}
            {/*        name="image"*/}
            {/*        onChange={handleImageChange}*/}
            {/*        accept="image/*"*/}
            {/*        multiple // 여러 이미지 선택 가능*/}
            {/*    />*/}
            {/*</div>*/}

            {/*/!* 미리보기 영역 *!/*/}
            {/*{imageURLs.length > 0 && (*/}
            {/*    <div className="image-preview">*/}
            {/*        {imageURLs.map((url, index) => (*/}
            {/*            <img*/}
            {/*                key={index}*/}
            {/*                src={url}*/}
            {/*                alt={`미리보기 ${index + 1}`}*/}
            {/*                style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '10px' }}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}

            <div className="btn-box">
                <div className="item">
                    <Link to="/auction" className='btn'>목록</Link>
                </div>
                <div className="item">
                    <button className='btn' onClick={onDelete}>삭제</button>
                    <button className='btn' onClick={onSubmit}>수정</button>
                </div>
            </div>
        </div>
    )


}
export default PostEditPage;