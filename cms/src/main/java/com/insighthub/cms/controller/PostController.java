package com.insighthub.cms.controller;
import com.insighthub.cms.dto.PostRequest;
import com.insighthub.cms.dto.PostResponse;
import com.insighthub.cms.service.PostService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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
    @GetMapping
    public List<PostResponse> getAllPosts(){
        return postService.getAllPosts();
    }
    @GetMapping("/{slug}")
    public PostResponse getPostBySlug(@PathVariable String slug){
        return postService.getPostBySlug(slug);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('AUTHOR')")
    public PostResponse updatePost(@PathVariable Long id,
                                   @RequestBody PostRequest request,
                                   Authentication authentication){
        return postService.updatePost(id,request,authentication.getName());
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('AUTHOR')")
    public void deletePost(@PathVariable Long id,
                           Authentication authentication){
        postService.deletePost(id, authentication.getName());
    }
}
