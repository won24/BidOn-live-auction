package com.gromit.auction_back.User;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDAO {
    List<UserDTO> selectAllUsers();
}
