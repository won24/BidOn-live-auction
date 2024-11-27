package com.gromit.auction_back.admin.userDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserDetailService {
    private final UserDetailDAO userDetailDAO;

    @Autowired
    public UserDetailService(UserDetailDAO userDetailDAO){
        this.userDetailDAO = userDetailDAO;
    }

    public List<UserDetailDTO> getAllUsers() {
        return userDetailDAO.getAllUsers();
    }

    public UserDetailDTO getUserByCode(int userCode) {
        System.out.println("서비스 유저코드"+userCode);
        return userDetailDAO.fineByUserCode(userCode);
    }

    public List<UserDetailDTO> getBoardsByUserCode(int userCode) {
        return userDetailDAO.getBoardsByUserCode(userCode);
    }

    public boolean updateUserCash(int userCode, int newCash) {
        try {
            // MyBatis를 통해 캐시 업데이트
            userDetailDAO.updateUserCash(userCode, newCash);
            return true; // 업데이트 성공
        } catch (Exception e) {
            e.printStackTrace();
            return false; // 오류 발생 시 false 반환
        }
    }
}
