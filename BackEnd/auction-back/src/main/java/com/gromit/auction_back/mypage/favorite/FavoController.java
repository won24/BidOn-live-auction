package com.gromit.auction_back.mypage.favorite;

import com.gromit.auction_back.auction.AuctionDTO;
import com.gromit.auction_back.requestItem.RequestItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/favo")
public class FavoController {

    private final FavoService favoService;
    private final FavoDAO favoDAO;

    @Autowired
    public FavoController(FavoService favoService, FavoDAO favoDAO) {
        this.favoService = favoService;
        this.favoDAO = favoDAO;
    }

    @PostMapping("/favoList")
    public List<FavoDTO> favolist(@RequestBody FavoDTO favoDTO) {
        System.out.println("요청 받은 데이터: " + favoDTO); // 요청 데이터 확인용 출력
        int usercode = favoDTO.getUserCode();
        System.out.println(usercode + "코드");
        List<FavoDTO> allList = favoService.allselect(favoDTO); // 서비스에서 데이터 가져오기
        System.out.println(allList);
        return allList; // 가져온 데이터를 클라이언트로 반환
    }


    // 즐겨찾기 추가
    @PostMapping("addfav")
    public ResponseEntity<?> addFavorite(@RequestBody FavoDTO favoDTO) {

        try {
            int result = favoService.addFavorite(favoDTO);
            if (result > 0) {
                return new ResponseEntity<>("즐겨찾기 추가", HttpStatus.CREATED);
            } else
                return new ResponseEntity<>("즐겨찾기 추가 실패", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("에러 발생: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 즐겨찾기 해제
    @DeleteMapping("/deletefav")
    public ResponseEntity<?> deleteFavorite(@RequestParam(required = false) int postId, @RequestParam(required = false) int userCode) {

        try {
            int result = favoService.deleteFavorite(postId, userCode);
            if (result > 0) {
                return new ResponseEntity<>("즐겨찾기 해제 성공",  HttpStatus.OK);
            } else {
                return new ResponseEntity<>("즐겨찾기 해제 실패", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println("에러 발생: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getfav")
    public ResponseEntity<List<FavoDTO>> getMyFav(@RequestParam(required = false) int postId,
                                                  @RequestParam(required = false) int userCode) {

        System.out.println("postId = " + postId);
        System.out.println("userCode = " + userCode);

        try {
            List<FavoDTO> myFav = favoService.getMyFav(postId, userCode);
            System.out.println("myFav = " + myFav);
            return ResponseEntity.ok(myFav);
        } catch (Exception e) {
            System.out.println("에러 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
