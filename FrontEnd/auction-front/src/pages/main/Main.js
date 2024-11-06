import './Main.css'

const Main = () =>{

    return(
        <div className="mainPageContainer">
            <div className="centerContainer">
                {/*메인 페이지 중앙 왼쪽 슬라이드 리스트 */}
                <div className="slideList">
                    <div className="list1">
                        <img className="listImg1"/>
                        <p className="listText1">슬라이드 1</p>
                    </div>

                    <div className="list2">
                        <img className="listImg2"/>
                        <p className="listText2">슬라이드 2</p>
                    </div>

                    <div className="list3">
                        <img className="listImg3"/>
                        <p className="listText3">슬라이드 3</p>
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
            </div>

            <div className="mainCategoryContainer">
                {/*메인 페이지 하단 카테고리 */}
                <div className="textContainer">
                    <p>CATEGORY</p>
                    <hr/>
                    <p>주요 카테고리</p>
                </div>
                {/*<div className="categoryContainer">*/}
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
                <div className="valauablesContainer">
                    <a href="/auction/valuables"/>
                    <p className="valaublesText">귀중품</p>
                </div>
            </div>
            {/*</div>*/}
        </div>
    )
}
export default Main;