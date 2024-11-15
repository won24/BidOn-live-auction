package com.gromit.auction_back.auction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {

    private final AuctionDAO auctionDAO;

    @Autowired
    public AuctionService(AuctionDAO auctionDAO) {
        this.auctionDAO = auctionDAO;
    }

    public List<AuctionDTO> getAllList() {
        return auctionDAO.selectAllAuction();
    }


    public List<AuctionDTO> getAntiqueList() {
        return auctionDAO.antiqueList();
    }

    public List<AuctionDTO> getLimitedList() {
        return auctionDAO.limitedList();
    }

    public List<AuctionDTO> getDiscontinuationList() {
        return auctionDAO.discontinuationList();
    }

    public List<AuctionDTO> getArtProductList() {
        return auctionDAO.artProductList();
    }

    public List<AuctionDTO> getValuablesList() {
        return auctionDAO.valuablesList();
    }

    public void updateHits(int postId) {
        auctionDAO.updateHits(postId);
    }


    public AuctionDTO detail(int postId) {
        AuctionDTO auctionDTO = auctionDAO.selectAuctionDetail(postId);
        return auctionDTO;
    }

    public List<AuctionDTO> searchItems(String q) {
        return auctionDAO.selectSearchItems(q);
    }
}
