package com.gromit.auction_back.mypage.myinfo;

import com.gromit.auction_back.User.UserRepository;;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class InfoService {

    private final InfoDAO infoDAO;;
    // 데이터베이스 작업을 처리할 DAO 를 참조함

    public InfoDTO getInfoByUserCode(int userCode) {
        return null;
    }

    public InfoService(InfoDAO infoDAO) {
        this.infoDAO = infoDAO;
    }

    // 비밀번호 변경 메소드
    public void changePassword(int userCode, String newPassword) {
        InfoDTO infoDTO = new InfoDTO();
        infoDTO.setUserCode(userCode);
        infoDTO.setNewPassword(newPassword);  // newPassword 제공

        infoDAO.updateByPassword(infoDTO);
    }

}
