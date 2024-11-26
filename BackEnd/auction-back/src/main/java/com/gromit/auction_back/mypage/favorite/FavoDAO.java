package com.gromit.auction_back.mypage.favorite;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface FavoDAO {

//    List<FavoDTO> favoResultMap(int userCode);

    int addFav(FavoDTO favoDTO);

    int deleteFav(int postId, int userCode);

    List<FavoDTO> getMyFav(int postId, int userCode);

    List<FavoDTO> getAllFavoList(int userCode);
}
