package com.insighthub.cms.controller;
import com.insighthub.cms.dto.PostModerationRequest;
import com.insighthub.cms.dto.PostResponse;
import com.insighthub.cms.service.ModerationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/admin/moderation")
@PreAuthorize("hasRole('ADMIN')")
public class ModerationController {
    private final ModerationService moderationService;
    public ModerationController(ModerationService moderationService){
        this.moderationService = moderationService;
    }
    @GetMapping("/pending")
    public List<PostResponse> getPendingPosts(){
        return moderationService.getPendingPosts();
    }
    @PutMapping("/{postId}")
    public PostResponse moderatePost(@PathVariable Long postId,
                                     @RequestBody PostModerationRequest request){
        return moderationService.moderatePost(postId,request);
    }
}
