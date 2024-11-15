package com.gromit.auction_back.auction;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        System.out.println("앤티크 = " + auctionList);
        return auctionList;
    }

    @GetMapping("/limited")
    public List<AuctionDTO> limitedList(){
        List<AuctionDTO> auctionList = auctionService.getLimitedList();
        System.out.println("한정판 = " + auctionList);
        return auctionList;
    }

    @GetMapping("/discontinuation")
    public List<AuctionDTO> discotinuationList(){
        List<AuctionDTO> auctionList = auctionService.getDiscontinuationList();
        System.out.println("단종템 = " + auctionList);
        return auctionList;
    }

    @GetMapping("/artproduct")
    public List<AuctionDTO> artproductList(){
        List<AuctionDTO> auctionList = auctionService.getArtProductList();
        System.out.println("예술품 = " + auctionList);
        return auctionList;
    }

    @GetMapping("/valuables")
    public List<AuctionDTO> valuablesList(){
        List<AuctionDTO> auctionList = auctionService.getValuablesList();
        System.out.println("귀중품 = " + auctionList);
        return auctionList;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getAuctionDetail(@PathVariable int postId){
        // 조회수
//        auctionService.updateHits(postId);
        try {
            AuctionDTO auctionDTO = auctionService.detail(postId);
            System.out.println("디테일"+auctionDTO);
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


    @GetMapping("/auction/antique")
    public ResponseEntity<List<AuctionDTO>> searchItems(@RequestParam(required = false) String q) {
        System.out.println("검색어 : " + q);

        if (q == null || q.trim().isEmpty()) {
            System.out.println("검색 실패");
            List<AuctionDTO> allItems = auctionService.getAllList();  // 전체 리스트 반환
            return ResponseEntity.ok(allItems);
        }

        try {
            List<AuctionDTO> items = auctionService.searchItems(q);
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            System.out.println("에러 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }





}
