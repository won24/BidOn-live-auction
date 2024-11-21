package com.gromit.auction_back.Notice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;
    public List<NoticeDTO> getAllNotice() {
        return noticeMapper.getAllNotice();
    }
}
