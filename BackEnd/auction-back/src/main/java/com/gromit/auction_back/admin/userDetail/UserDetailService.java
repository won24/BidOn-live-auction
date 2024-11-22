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
        return userDetailDAO.fineByUserCode(userCode);
    }

    public List<UserDetailDTO> getBoardsByUserCode(int userCode) {
        return userDetailDAO.getBoardsByUserCode(userCode);
    }
}
