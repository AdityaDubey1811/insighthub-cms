package com.insighthub.cms.controller;
import com.insighthub.cms.dto.CommentRequest;
import com.insighthub.cms.dto.CommentResponse;
import com.insighthub.cms.service.CommentService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {
    private final CommentService commentService;
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }
    @PostMapping
    public CommentResponse addComment(@PathVariable Long postId,
                                      @RequestBody CommentRequest request,
                                      Authentication authentication){
        return commentService.addComment(
                postId,
                request,
                authentication.getName()
        );
    }
    @GetMapping
    public List<CommentResponse> getComments(@PathVariable Long postId){
        return commentService.getComments(postId);
    }
}
