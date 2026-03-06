package com.fooddelivery.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "media_files")
public class MediaFile extends BaseEntity {

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String storagePath;

    private String contentType;

    private Long fileSize;

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }
    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }
    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }
}
