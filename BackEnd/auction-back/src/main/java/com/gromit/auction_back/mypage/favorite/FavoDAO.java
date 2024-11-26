package com.gromit.auction_back.mypage.favorite;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FavoDAO {

    int addFav(FavoDTO favoDTO);

    int deleteFav(int postId, int userCode);

    List<FavoDTO> getMyFav(int postId, int userCode);

    // 즐겨찾기 목록 조회
    List<FavoDTO> getAllFavoList(@Param("userCode") int userCode);

    // 즐겨찾기 목록 삭제
    int favodelete(int userCode);
}
