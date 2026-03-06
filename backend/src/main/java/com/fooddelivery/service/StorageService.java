package com.fooddelivery.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Abstraction for file storage. Swap implementation for S3 migration.
 */
public interface StorageService {

    String store(MultipartFile file);

    void delete(String path);
}
