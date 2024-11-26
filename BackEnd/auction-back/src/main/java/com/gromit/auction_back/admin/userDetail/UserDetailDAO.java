package com.gromit.auction_back.admin.userDetail;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserDetailDAO {

//    @Select("SELECT u.*, b.postId " +
//            "FROM users u " +
//            "LEFT JOIN Board b ON u.UserCode = b.userCode " +
//            "WHERE u.isAdmin = false")

    @Select("SELECT * FROM users WHERE isAdmin = false")
    List<UserDetailDTO> getAllUsers();

//    ("SELECT u.*, b.postId,b.Title " +
//            "FROM users u " +
//            "LEFT JOIN Board b ON u.UserCode = b.userCode " +
//            "WHERE u.isAdmin = false AND u.UserCode = #{userCode}")
    @Select("SELECT * FROM users WHERE UserCode = #{userCode}")
    UserDetailDTO fineByUserCode(int userCode);

    @Select("SELECT * FROM Board WHERE userCode = #{userCode}")
    List<UserDetailDTO> getBoardsByUserCode(int userCode);
}
