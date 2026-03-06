package com.fooddelivery.controller;

import com.fooddelivery.model.entity.MediaFile;
import com.fooddelivery.repository.MediaFileRepository;
import com.fooddelivery.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final StorageService storageService;
    private final MediaFileRepository mediaFileRepo;

    public MediaController(StorageService storageService, MediaFileRepository mediaFileRepo) {
        this.storageService = storageService;
        this.mediaFileRepo = mediaFileRepo;
    }

    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> upload(@RequestParam("file") MultipartFile file) {
        String path = storageService.store(file);

        MediaFile mf = new MediaFile();
        mf.setFilename(file.getOriginalFilename());
        mf.setStoragePath(path);
        mf.setContentType(file.getContentType());
        mf.setFileSize(file.getSize());
        mediaFileRepo.save(mf);

        return ResponseEntity.ok(Map.of("url", "/api/media/files/" + path));
    }
}
