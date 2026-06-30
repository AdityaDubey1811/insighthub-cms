package com.insighthub.cms.service;
import com.insighthub.cms.dto.CommentRequest;
import com.insighthub.cms.dto.CommentResponse;
import java.util.List;

public interface CommentService {
    CommentResponse addComment(Long postId,CommentRequest request,String userEmail);
    List<CommentResponse> getComments(Long postId);
}
