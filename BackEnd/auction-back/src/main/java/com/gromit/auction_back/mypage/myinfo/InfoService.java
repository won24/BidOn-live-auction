package com.gromit.auction_back.mypage.myinfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfoService {

    private final InfoDAO infoDAO;
    // 데이터베이스 작업을 처리할 DAO 를 참조함

    @Autowired
    public InfoService(InfoDAO infoDAO) {
        this.infoDAO = infoDAO;
        // 생성자에서 InfoDAO 객체를 받아 초기화함
    }

    public List<InfoDTO> allSelect() {
        return infoDAO.getAllSelect();
        // infoDAO 객체의 getAllSelect() 매소드를 호출하여 결과를 가져옴
    }
}
