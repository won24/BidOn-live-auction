package com.gromit.auction_back.model;

import com.gromit.auction_back.common.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDAO {

    List<UserDTO> selectAllUsers();
}
