

const Main = () =>{

    return(
        <>
            {/*메인 페이지 중앙 왼쪽 슬라이드 리스트 */}
            <div className="slideList">
                <div className="list1">
                    <img className="listImg1"/>
                    <p className="listText1"></p>
                </div>

                <div className="list2">
                    <img className="listImg2"/>
                    <p className="listText2"></p>
                </div>

                <div className="list3">
                    <img className="listImg3"/>
                    <p className="listText3"></p>
                </div>
            </div>

            {/* 메인 페이지 중앙 슬라이드 */}
            <div className="sliders">
                <a className="slider">
                    <img className="slide1" src={require('../../assets/슬라이드.png')}/>
                </a>
                <a className="slider">
                    <img className="slide2" />
                </a>
                <a className="slider">
                    <img className="slide3" />
                </a>
            </div>

            {/*메인 페이지 하단 카테고리 */}
            <div className="textContainer">
                <p>CATEGORY</p>
                <hr/>
                <p>주요 카테고리</p>
            </div>
            <div className="categoryContainer">
                <div className="antiqueContainer">
                    <img/>
                </div>
                <p className="antiqueText">골동품</p>
                <div className="limitedContainer">
                    <img/>
                </div>
                <p className="limitedText">한정판</p>
                <div className="discontinuationContainer">
                    <img/>
                </div>
                <p className="discontinuationText">단종품</p>
                <div className="artproductContainer">
                    <img/>
                </div>
                <p className="artproductText">예술품</p>
                <div className="valauablesContainer">
                    <img/>
                </div>
                <p className="valaublesText">귀중품</p>
            </div>

        </>
    )
}
export default Main;