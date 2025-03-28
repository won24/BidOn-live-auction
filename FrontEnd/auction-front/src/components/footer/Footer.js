import "../../css/Footer.css";

const Footer = () =>{

    return(
            <footer className="footer-container">
                <div className="footer-a">
                    <a href="/introduce">| 소개 |</a>
                    <a href="/terms"> 이용약관 |</a>
                    <a href="/privacy"> 개인정보취급방침 |</a>
                    <a href="/customer"> 고객센터 |</a>
                </div>
                <div className="footer-p">
                    <p>(주) 비드온 | 팀장: 000 | 주소: 서울특별시 서초구 서초동 1318-2</p>
                    <p>Tel: 02-123-8282 | Fax: 02-999-8282 | Email: bidon@email.com</p>
                </div>
            </footer>
    )
}
export default Footer;
