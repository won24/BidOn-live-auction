package com.gromit.auction_back.requestItem;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
public class ImageUploadController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.base-url}")
    private String baseUrl;

    @PostMapping("/upload-image")
    public ResponseEntity<ImageResponse> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            // 파일 이름 생성 (중복 방지를 위해 UUID 사용)
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // 저장할 경로 생성 및 디렉토리 확인
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);  // 디렉토리 없으면 생성
            }
            Path filePath = uploadPath.resolve(fileName);

            // 파일 저장
            Files.write(filePath, file.getBytes());

            // URL 생성
            String fileUrl = baseUrl + fileName;

            // 응답으로 이미지 URL 반환
            return ResponseEntity.ok(new ImageResponse(fileUrl));

        } catch (IOException e) {
            return ResponseEntity.status(500).body(new ImageResponse("파일 업로드 실패: " + e.getMessage()));
        }
    }

    public static class ImageResponse {
        private String imageUrl;

        public ImageResponse(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }
}

