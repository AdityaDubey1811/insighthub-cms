package com.insighthub.cms.controller;
import com.insighthub.cms.service.LikeService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/posts/{postId}/likes")
public class LikeController {
    private final LikeService likeService;
    public LikeController(LikeService likeService){
        this.likeService = likeService;
    }
    @PostMapping
    public void toggleLike(@PathVariable Long postId,
                           Authentication authentication){
        likeService.toggleLike(postId, authentication.getName());
    }
    @GetMapping
    public long getLikeCount(@PathVariable Long postId){
        return likeService.getLikeCount(postId);
    }
}
