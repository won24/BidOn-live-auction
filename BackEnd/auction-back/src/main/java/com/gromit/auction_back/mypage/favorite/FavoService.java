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

    public List<FavoDTO> allselect(FavoDTO favoDTO) {
        int userCode = favoDTO.getUserCode();
        System.out.println(userCode);
        return favoDAO.getAllFavoList(userCode);
    }


    public int addFavorite(FavoDTO favoDTO) {
        int result = favoDAO.addFav(favoDTO);
        return result;

    }

    public int deleteFavorite(int postId, int userCode) {
        int result = favoDAO.deleteFav(postId, userCode);
        return result;
    }
<<<<<<< HEAD

    public List<FavoDTO> getMyFav (int postId, int userCode) {
        return favoDAO.getMyFav(postId, userCode);

    }
=======
>>>>>>> ba9a1363906e08327081328917646d5fbc785a5a
}
