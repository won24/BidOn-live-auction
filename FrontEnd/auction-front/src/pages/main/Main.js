import '../../css/Main.css'
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

const Main = () =>{

    const slideRef = useRef(null);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            if (slideRef.current) {
                const firstSlide = slideRef.current.firstElementChild;
                slideRef.current.style.transition = "transform 0.5s ease-in-out";
                slideRef.current.style.transform = `translateX(-100%)`;

                slideRef.current.addEventListener(
                    "transitionend",
                    () => {
                        slideRef.current.style.transition = "none";
                        slideRef.current.style.transform = "translateX(0)";
                        slideRef.current.appendChild(firstSlide); // 첫 번째 슬라이드를 맨 뒤로 이동
                    },
                    { once: true }
                );
            }
        }, 3800);

        return () => clearInterval(slideInterval);
    }, []);

    const slides = [
        { id: 1, src: require("../../assets/슬라이드1.png"), alt: "슬라이드 1", link: "/auction/5"},
        { id: 2, src: require("../../assets/슬라이드2.png"), alt: "슬라이드 2", link: "/auction/3" },
        { id: 3, src: require("../../assets/슬라이드3.png"), alt: "슬라이드 3", link: "/auction/55" },
    ];


    return(
        <>
            <div className="mainPageContainer">
                <div className="centerContainer">
                    {/* 메인 페이지 중앙 왼쪽 슬라이드 리스트 */}
                    <div className="slideList">
                        <Link to={"/auction/5"} className="list">
                            <img className="listImg" src={require('../../assets/롤렉스.png')} alt="롤렉스"/>
                        </Link>
                        <Link to={"/auction/3"} className="list">
                            <img className="listImg" src={require('../../assets/아이팟.png')} alt="아이팟"/>
                        </Link>
                        <Link to={"/auction/55"} className="list">
                            <img className="listImg" src={require('../../assets/아디다스.png')} alt="아디다스"/>
                        </Link>
                    </div>

                    {/* 메인 페이지 중앙 슬라이드 */}
                    <div className="slider-container">
                        <div className="sliders" ref={slideRef}>
                            {slides.map((slide) => (
                                <div key={slide.id} className="slider">
                                    <Link to={slide.link}>
                                        <img src={slide.src} alt={slide.alt}/>
                                        <button className="slide-btn">보러가기</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mainCategoryContainer">
                    {/*메인 페이지 하단 카테고리 */}
                    <div className="textContainer">
                        <p>CATEGORY</p>
                        <hr/>
                        <p>주요 카테고리</p>
                    </div>
                    <div className="antiqueContainer">
                        <a href="/auction/antique"/>
                        <p className="antiqueText">골동품</p>
                    </div>
                    <div className="limitedContainer">
                        <a href="/auction/limited"/>
                        <p className="limitedText">한정판</p>
                    </div>
                    <div className="discontinuationContainer">
                        <a href="/auction/discontinuation"/>
                        <p className="discontinuationText">단종품</p>
                    </div>
                    <div className="artproductContainer">
                        <a href="/auction/artproduct"/>
                        <p className="artproductText">예술품</p>
                    </div>
                    <div className="valuablesContainer">
                        <a href="/auction/valuables"/>
                        <p className="valaublesText">귀중품</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Main;