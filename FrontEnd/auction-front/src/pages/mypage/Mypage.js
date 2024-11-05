// 각 섹션(내 정보, 내 글, 즐겨찾기, 참여한 경매) 을 컴포넌트로 분리

const Mypage = () =>{

    return(
        <div className="my-page">
            <h2>MyPage</h2>
            <div className="sections">
                <MyProfile /> {/* 내 정보 */}
                <MyNotice />  {/* 내 글 */}
                <MyFar />     {/* 즐겨찾기 */}
                <MyAuction /> {/* 참여한 경매 */}
            </div>
        </div>
    )
}
export default Mypage;