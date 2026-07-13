package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.AnalyticsResponse;
import com.insighthub.cms.entity.Post;
import com.insighthub.cms.repository.PostLikeRepository;
import com.insighthub.cms.repository.PostRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.AnalyticsService;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import com.insighthub.cms.exception.ResourceNotFoundException;
@Service
public class AnalyticsServiceImpl implements AnalyticsService {
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final UserRepository userRepository;
    public AnalyticsServiceImpl(PostRepository postRepository,
                                PostLikeRepository postLikeRepository,
                                UserRepository userRepository){
        this.postRepository = postRepository;
        this.postLikeRepository = postLikeRepository;
        this.userRepository = userRepository;
    }
    @Override
    public AnalyticsResponse getPostAnalytics(Long postId){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        AnalyticsResponse response = new AnalyticsResponse();
        response.setPostId(post.getId());
        response.setTitle(post.getTitle());
        response.setViews(post.getViews());
        response.setLikes(postLikeRepository.countByPostId(postId));
        return response;
    }
    @Override
    public List<AnalyticsResponse> getTopPosts(){
        return postRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Post::getViews).reversed())
                .limit(10)
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public List<AnalyticsResponse> getAuthorPostsAnalytics(String authorEmail){
        return postRepository.findAll()
                .stream()
                .filter(post -> post.getAuthor().getEmail().equals(authorEmail))
                .map(this::mapToResponse)
                .toList();
    }
    private AnalyticsResponse mapToResponse(Post post){
        AnalyticsResponse response = new AnalyticsResponse();
        response.setPostId(post.getId());
        response.setTitle(post.getTitle());
        response.setViews(post.getViews());
        response.setLikes(postLikeRepository.countByPostId(post.getId()));
        return response;
    }
}
