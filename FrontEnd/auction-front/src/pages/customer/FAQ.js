import './Customer.css';
import React from 'react';

const FAQ = () =>{

    return (
        <div className="faq-section">
            <h2>자주하는 질문</h2>
            <table className="faq-table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>등록일</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>3</td>
                    <td>제목</td>
                    <td>등록일</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>제목</td>
                    <td>등록일</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>제목</td>
                    <td>등록일</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export default FAQ;