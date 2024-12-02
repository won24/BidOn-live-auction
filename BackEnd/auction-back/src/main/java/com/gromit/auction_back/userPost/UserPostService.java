package com.gromit.auction_back.userPost;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPostService {

    private final UserPostDAO userPostDAO;

    @Autowired
    public UserPostService(UserPostDAO userPostDAO) {
        this.userPostDAO = userPostDAO;
    }


    public int putUserPost(UserPostDTO userPostDTO) {
        int result = userPostDAO.putUserPost(userPostDTO);
        return result;
    }

    public List<UserPostDTO> getUserPost(int postId, int userCode) {
        return userPostDAO.getUserPost(postId, userCode);
    }
}
