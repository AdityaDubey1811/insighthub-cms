package com.insighthub.cms.controller;
import com.insighthub.cms.dto.PostRequest;
import com.insighthub.cms.dto.PostResponse;
import com.insighthub.cms.service.PostService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;
    public PostController(PostService postService){
        this.postService = postService;
    }
    @PostMapping
    @PreAuthorize("hasRole('AUTHOR')")
    public PostResponse createPost(@RequestBody PostRequest request,
                                   Authentication authentication){
        return postService.createPost(
                request,
                authentication.getName()
        );
    }
}
