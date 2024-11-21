package com.gromit.auction_back.requestItem.ImageUpload.image;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/images")
public class ImageController {
    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.base-url}")
    private String baseUrl;

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadImages(
            @RequestParam("images") MultipartFile[] files,
            @RequestParam("postId") int postId) {
        List<String> fileUrls = new ArrayList<>();
        logger.info("Uploading files: {}, postId: {}", Arrays.toString(files), postId);
        // 여러 이미지 URL을 저장
        for (MultipartFile file : files) {
            try {
                String fileName = saveFile(file);
                String fileUrl = baseUrl + fileName;
                fileUrls.add(fileUrl);  // URL 리스트에 추가

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Collections.singletonList("비상비상~! :" + e.getMessage()));
            }
        }
        // 이미지 URL들을 한 번에 저장
        imageService.addImages(postId, fileUrls);
        // 저장된 URL 리스트 반환
        return ResponseEntity.ok(fileUrls);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<ImageDTO>> getImageByPostId(@PathVariable int postId) {
        List<ImageDTO> images = imageService.getImageByPostId(postId);

        if (images != null) {
            return ResponseEntity.ok(images);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 파일 저장하는 메소드
    private String saveFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        // 로그 추가
        System.out.println("파일 저장 경로: " + filePath.toString());

        Files.createDirectories(filePath.getParent()); // 디렉토리 생성
        Files.write(filePath, file.getBytes()); // 파일 저장
        System.out.println("파일 저장 완료: " + fileName);

        return fileName;
    }


    // 게시물 수정 페이지 - 이미지 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteImg( @RequestParam(required = false) String imageUrl,
                                        @RequestParam(required = false) int postId) {
        System.out.println("imageUrl = " + imageUrl);
        System.out.println("postId = " + postId);
        try {
            int result = imageService.deleteImg(imageUrl,postId);
            if (result > 0) {
                return new ResponseEntity<>("이미지 삭제 성공",  HttpStatus.OK);
            } else {
                return new ResponseEntity<>("이미지 삭제 실패", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println("에러 발생: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
