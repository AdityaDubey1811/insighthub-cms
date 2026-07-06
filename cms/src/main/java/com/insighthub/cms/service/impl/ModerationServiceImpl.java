package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.PostModerationRequest;
import com.insighthub.cms.dto.PostResponse;
import com.insighthub.cms.entity.Post;
import com.insighthub.cms.entity.PostStatus;
import com.insighthub.cms.repository.PostRepository;
import com.insighthub.cms.service.ModerationService;
import org.springframework.stereotype.Service;
import java.util.List;
import com.insighthub.cms.mapper.PostMapper;
@Service
public class ModerationServiceImpl implements ModerationService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    public ModerationServiceImpl(PostRepository postRepository,PostMapper postMapper){
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }
    @Override
    public List<PostResponse> getPendingPosts(){
        return postRepository.findByStatus(PostStatus.PENDING)
                .stream()
                .map(postMapper::mapToResponse)
                .toList();
    }
    @Override
    public PostResponse moderatePost(Long postId,
                                     PostModerationRequest request){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setStatus(PostStatus.valueOf(request.getStatus()));
        Post updated = postRepository.save(post);
        return postMapper.mapToResponse(updated);
    }
}
