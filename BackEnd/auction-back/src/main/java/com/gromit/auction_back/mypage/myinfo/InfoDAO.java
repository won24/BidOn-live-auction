package com.gromit.auction_back.mypage.myinfo;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InfoDAO {
    List<InfoDTO> getAllSelect();
}
