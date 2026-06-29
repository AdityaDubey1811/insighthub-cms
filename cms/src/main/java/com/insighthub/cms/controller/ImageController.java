package com.insighthub.cms.controller;
import com.insighthub.cms.dto.ImageUploadResponse;
import com.insighthub.cms.service.CloudinaryService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/images")
public class ImageController {
    private final CloudinaryService cloudinaryService;
    public ImageController(CloudinaryService cloudinaryService){
        this.cloudinaryService = cloudinaryService;
    }
    @PostMapping("/upload")
    @PreAuthorize("hasRole('AUTHOR')")
    public ImageUploadResponse uploadImage(@RequestParam("file") MultipartFile file){
        String imageUrl = cloudinaryService.uploadImage(file);
        return new ImageUploadResponse(imageUrl);
    }
}
