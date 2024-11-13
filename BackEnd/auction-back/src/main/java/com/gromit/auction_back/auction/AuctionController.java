package com.gromit.auction_back.auction;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auction")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @GetMapping
    public List<AuctionDTO> auctionList(){
        List<AuctionDTO> auctionList = auctionService.getAllList();
        System.out.println("auctionList = " + auctionList);
        return auctionList;
    }

    @GetMapping("/antique")
    public List<AuctionDTO> antiqueList(){
        List<AuctionDTO> auctionList = auctionService.getAntiqueList();
        System.out.println("auctionList = " + auctionList);
        return auctionList;
    }

    @GetMapping("/limited")
    public List<AuctionDTO> limitedList(){
        List<AuctionDTO> auctionList = auctionService.getLimitedList();
        System.out.println("auctionList = " + auctionList);
        return auctionList;
    }

    @GetMapping("/discontinuation")
    public List<AuctionDTO> discotinuationList(){
        List<AuctionDTO> auctionList = auctionService.getDiscontinuationList();
        System.out.println("auctionList = " + auctionList);
        return auctionList;
    }

    @GetMapping("/artproduct")
    public List<AuctionDTO> artproductList(){
        List<AuctionDTO> auctionList = auctionService.getArtProductList();
        System.out.println("auctionList = " + auctionList);
        return auctionList;
    }

    @GetMapping("/valuables")
    public List<AuctionDTO> valuablesList(){
        List<AuctionDTO> auctionList = auctionService.getValuablesList();
        System.out.println("auctionList = " + auctionList);
        return auctionList;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getAuctionDetail(@PathVariable int postId){
        // 조회수
//        auctionService.updateHits(postId);
        try {
            AuctionDTO auctionDTO = auctionService.detail(postId);
            System.out.println(auctionDTO);
            if( auctionDTO == null ) {
                auctionDTO = new AuctionDTO();
                auctionDTO.setTitle("데이터 없음");
                return new ResponseEntity<>(auctionDTO, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(auctionDTO, HttpStatus.OK);
            }

        }catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }







}
