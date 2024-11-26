// 즐겨찾기 Controller

package com.gromit.auction_back.mypage.favorite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;


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


    // 즐겨찾기 목록 조회
    @GetMapping("/favolist")
    public ResponseEntity<List<FavoDTO>> getFavoriteList(@RequestParam int userCode) {
        try {
            List<FavoDTO> favorites = favoService.getAllFavoList(userCode);

            // Null 또는 비어있는 리스트 반환 확인
            if (favorites == null || favorites.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Collections.emptyList());
            }

            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            System.out.println("에러 발생 : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 즐겨찾기 목록 삭제
    @DeleteMapping("/favodelete")
    public ResponseEntity<?> FavoriteDelete(@RequestParam int userCode) {
        try {
            int result = favoService.FavoDelete(userCode);
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


    @GetMapping("/getMyFav")
    public ResponseEntity<List<FavoDTO>> getMyFav(@RequestParam(required = false) int postId,
                                                  @RequestParam(required = false) int userCode) {
        try {
            List<FavoDTO> myFav = favoService.getMyFav(postId, userCode);
            return ResponseEntity.ok(myFav);
        } catch (Exception e) {
            System.out.println("에러 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}


