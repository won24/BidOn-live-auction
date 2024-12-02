package com.gromit.auction_back.userPost;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserPostDAO {


    int putUserPost(UserPostDTO userPostDTO);

    List<UserPostDTO> getUserPost(int postId, int userCode);
}
