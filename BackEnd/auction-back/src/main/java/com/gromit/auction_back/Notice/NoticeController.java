package com.gromit.auction_back.Notice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("customer")
public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notice")
    public List<NoticeDTO> NoticeList(){
        List<NoticeDTO> noticeList = noticeService.getAllNotice();
        return noticeList;
    }

}
