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

    public List<FavoDTO> getAllFavoList(FavoDTO favoDTO) {
        return favoDAO.getAllFavoList(favoDTO);
    }
}
