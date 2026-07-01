package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.CommentRequest;
import com.insighthub.cms.dto.CommentResponse;
import com.insighthub.cms.entity.Comment;
import com.insighthub.cms.entity.Post;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.CommentRepository;
import com.insighthub.cms.repository.PostRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.CommentService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public CommentServiceImpl(CommentRepository commentRepository,
                              PostRepository postRepository,
                              UserRepository userRepository){
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    @Override
    public CommentResponse addComment(Long postId,
                                      CommentRequest request,
                                      String userEmail){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());
        if(request.getParentId() != null){
            Comment parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParent(parent);
        }
        return mapToResponse(commentRepository.save(comment));
    }
    @Override
    public List<CommentResponse> getComments(Long postId){
        return commentRepository.findByPostIdAndParentIsNull(postId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    private CommentResponse mapToResponse(Comment comment){
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setContent(comment.getContent());
        response.setUserName(comment.getUser().getName());
        response.setCreatedAt(comment.getCreatedAt());
        if(comment.getReplies() != null){
            response.setReplies(
                    comment.getReplies()
                            .stream()
                            .map(this::mapToResponse)
                            .toList()
            );
        }
        return response;
    }
}
