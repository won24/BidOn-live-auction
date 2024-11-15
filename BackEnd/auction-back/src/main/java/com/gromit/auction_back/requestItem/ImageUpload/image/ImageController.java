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
    public ResponseEntity<ImageDTO> getImageByPostId(@PathVariable int postId) {
        ImageDTO imageDTO = imageService.getImageByPostId(postId);
        if (imageDTO != null) {
            return ResponseEntity.ok(imageDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 파일 저장하는 메소드
    private String saveFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        return fileName;
    }
}
