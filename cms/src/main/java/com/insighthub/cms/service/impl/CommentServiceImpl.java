package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.CommentRequest;
import com.insighthub.cms.dto.CommentResponse;
import com.insighthub.cms.entity.Comment;
import com.insighthub.cms.entity.NotificationType;
import com.insighthub.cms.entity.Post;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.CommentRepository;
import com.insighthub.cms.repository.PostRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.CommentService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.insighthub.cms.service.NotificationService;
@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    public CommentServiceImpl(CommentRepository commentRepository,
                              PostRepository postRepository,
                              UserRepository userRepository,
                              NotificationService notificationService){
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
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
        Comment savedComment = commentRepository.save(comment);
        if(request.getParentId() == null){
            if (post.getAuthor().getId() != user.getId()) {
                notificationService.sendNotification(
                        post.getAuthor().getId(),
                        NotificationType.COMMENT,
                        user.getName() + " commented on your post"
                );
            }
        }else{
            if (comment.getParent().getUser().getId() != user.getId()) {
                notificationService.sendNotification(
                        comment.getParent().getUser().getId(),
                        NotificationType.REPLY,
                        user.getName() + " replied to your comment"
                );
            }
        }
        return mapToResponse(savedComment);
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
