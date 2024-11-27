package com.gromit.auction_back.admin;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface AdminDAO {
    List<AdminDTO> getAllInquire();

    @Update("UPDATE personal SET answer = #{answer} WHERE userCode = #{userCode}")
    void updateAnswer(int userCode, String answer);

}