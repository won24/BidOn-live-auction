package com.gromit.auction_back.auction;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.function.Supplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Slf4j
@RestController
@RequestMapping("/auction")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    private static final Logger logger = LoggerFactory.getLogger(AuctionController.class);


    // 전체, 카테고리별 리스트 받아오기
    private ResponseEntity<List<AuctionDTO>> getAuctionList(Supplier<List<AuctionDTO>> serviceCall, String logMessage) {

        List<AuctionDTO> auctionList = serviceCall.get();
        logger.info(logMessage + "조회 완료. 항목 수: {}", auctionList.size());
        return ResponseEntity.ok(auctionList);
    }

    @GetMapping("")
    public ResponseEntity<List<AuctionDTO>> getAllList() {
        return getAuctionList(auctionService::getAllList, "전체목록");
    }

    @GetMapping("/antique")
    public ResponseEntity<List<AuctionDTO>> getAntiqueList() {
        return getAuctionList(auctionService::getAntiqueList, "앤티크");
    }


    @GetMapping("/limited")
    public ResponseEntity<List<AuctionDTO>> getLimitedList() {
        return getAuctionList(auctionService::getLimitedList, "한정판");
    }


    @GetMapping("/discontinuation")
    public ResponseEntity<List<AuctionDTO>> getDiscontinuationList() {
        return getAuctionList(auctionService::getDiscontinuationList, "단종품");
    }


    @GetMapping("/artproduct")
    public ResponseEntity<List<AuctionDTO>> getArtProductList() {
        return getAuctionList(auctionService::getArtProductList, "예술품");
    }


    @GetMapping("/valuables")
    public ResponseEntity<List<AuctionDTO>> getValuablesList() {
        return getAuctionList(auctionService::getValuablesList, "귀중품");
    }


    // 게시글 상세 조회
    @GetMapping("/{postId}")
    public ResponseEntity<?> getAuctionDetail(@PathVariable int postId){

        AuctionDTO auctionDTO = auctionService.detail(postId);

        if( auctionDTO == null ) {
            auctionDTO = new AuctionDTO();
            auctionDTO.setTitle("데이터 없음");
            return new ResponseEntity<>(auctionDTO, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(auctionDTO, HttpStatus.OK);
        }

    }


    // 카테고리 내에서 검색한 리스트
    @GetMapping("/search")
    public ResponseEntity<List<AuctionDTO>> searchItems(@RequestParam(required = false) String q,
                                                        @RequestParam(required = false) String categoryCode) {

        if (q == null || q.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
        String decodedQ = URLDecoder.decode(q, StandardCharsets.UTF_8);

        List<AuctionDTO> items = auctionService.searchItems(decodedQ,categoryCode);
        return ResponseEntity.ok(items);

    }

    // 전체 리스트에서 검색
    @GetMapping("/searchitem")
    public ResponseEntity<List<AuctionDTO>> searchItemAllCategory(@RequestParam(required = false) String q){
        if (q == null || q.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
        String decodedQ = URLDecoder.decode(q, StandardCharsets.UTF_8);

        List<AuctionDTO> items = auctionService.searchItemAllCategory(decodedQ);
        return ResponseEntity.ok(items);
    }


    // 게시글 수정
    @PutMapping("/update")
    public ResponseEntity<?> updatePost(@RequestBody AuctionDTO auctionDTO) {

        try {
            int result = auctionService.update(auctionDTO);
            if (result > 0) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 수정 실패");
            }
        } catch (Exception e) {
            logger.error("게시글 수정 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    // 게시글 삭제
    @PostMapping("/delete/{postId}")
    public ResponseEntity<?> notUsePost(@PathVariable int postId) {

        try {
            int result = auctionService.notUsePost(postId);
            if (result > 0) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 삭제 실패");
            }
        }catch (Exception e) {
            logger.error("게시글 삭제 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // 게시글 승인
    @PostMapping("/approval/{postId}")
    public ResponseEntity<?> approval(@PathVariable int postId) {
        try {
            int result = auctionService.approval(postId);
            if (result > 0) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 승인 실패");
            }
        } catch (Exception e) {
            logger.error("게시글 승인 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // 라이브 리스트
    @GetMapping("/live")
    public ResponseEntity<List<AuctionDTO>> getLiveList() {
        return getAuctionList(auctionService::getLiveList, "라이브 방송 중");
    }

    // 라이브 경매 상태 변경
    @PostMapping("/endlive/{postId}")
    public ResponseEntity<?> setPostStatus(@PathVariable int postId) {
        try {
            System.out.println("와이낫");
            int result = auctionService.setPostStatus(postId);
            if (result > 0) {

                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("라이브 후 게시글 상태 변경 실패");
            }
        } catch (Exception e) {
            logger.error("게시글 상태 on-> done 변경 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 라이브 경매 업데이트
    @PostMapping("/startlive/{postId}")
    public ResponseEntity<?> updateLivePost(@PathVariable int postId) {
        try {
            int result = auctionService.updateLivePost(postId);
            if (result > 0) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("라이브 상태로 변경 실패");
            }
        } catch (Exception e) {
            logger.error("게시글 상태 off-> on 변경 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 라이브 경매 후 board 정보 업데이트
    @PostMapping("/final")
    public ResponseEntity<?> updatePostAfterLive(@RequestBody AuctionDTO auctionDTO) {
        try {
            int result = auctionService.updatePostAfterLive(auctionDTO);
            if (result > 0) {
                System.out.println("라이브 경매 후 board 정보 업데이트 성공");
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("라이브 후 정보 수정 실패");
            }
        } catch (Exception e) {
            logger.error("라이브 후 정보 수정 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}


