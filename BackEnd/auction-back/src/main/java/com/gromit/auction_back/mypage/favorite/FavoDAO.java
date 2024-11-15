package com.gromit.auction_back.mypage.favorite;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface FavoDAO {
    List<FavoDTO> getAllFavoList(int userCode);
}
