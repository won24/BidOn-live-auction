package com.gromit.auction_back.Personal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class PersonalController {

    @Autowired
    PersonalService personalService;

    @PostMapping("/personal")
    public List<PersonalDTO> personalList(@RequestBody PersonalDTO userData) {
        System.out.println(userData);
        // userData를 이용하여 필요한 처리를 수행
        int userCode = userData.getUserCode();
        System.out.println("요청온 유저 코드를 보자잇"+userCode);
        List<PersonalDTO> personalList = personalService.getAllList(userCode);
        System.out.println(personalList);
        return personalList;
    }
   @PostMapping("/personalinquire")
    public ResponseEntity<String> saveInquire(@RequestBody PersonalDTO personalDTO){
       try {
           System.out.println(personalDTO);
           // inquiryData를 이용하여 저장 로직 수행
           personalService.saveInquiry(personalDTO);
           return ResponseEntity.ok("성공핑");
       } catch (Exception e) {
           return ResponseEntity.badRequest().body("Error saving inquiry: " + e.getMessage());
       }
   }



}
