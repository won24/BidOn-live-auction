// 즐겨찾기 Service

package com.gromit.auction_back.mypage.favorite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoService {

    private final FavoDAO favoDAO;

    @Autowired
    public FavoService(FavoDAO favoDAO) {
        this.favoDAO = favoDAO;
    }

    public int addFavorite(FavoDTO favoDTO) {
        int result = favoDAO.addFav(favoDTO);
        return result;

    }

    public int deleteFavorite(int postId, int userCode) {
        int result = favoDAO.deleteFav(postId, userCode);
        return result;
    }


    public List<FavoDTO> getMyFav (int postId, int userCode) {
        return favoDAO.getMyFav(postId, userCode);
    }

    // 즐겨찾기 목록 조회
    public List<FavoDTO> getAllFavoList(int userCode) {
        List<FavoDTO> getAllFavoList = favoDAO.getAllFavoList(userCode);
        return getAllFavoList;
    }

    public int FavoDelete(int userCode) {
        int result = favoDAO.favodelete(userCode);
        return result;
    }
}
