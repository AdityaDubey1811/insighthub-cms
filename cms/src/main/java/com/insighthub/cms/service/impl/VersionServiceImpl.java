package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.PostVersionResponse;
import com.insighthub.cms.entity.Post;
import com.insighthub.cms.entity.PostVersion;
import com.insighthub.cms.repository.PostRepository;
import com.insighthub.cms.repository.PostVersionRepository;
import com.insighthub.cms.service.VersionService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.insighthub.cms.exception.ResourceNotFoundException;
@Service
public class VersionServiceImpl implements VersionService{
    private final PostRepository postRepository;
    private final PostVersionRepository postVersionRepository;
    public VersionServiceImpl(PostRepository postRepository,PostVersionRepository postVersionRepository){
        this.postRepository = postRepository;
        this.postVersionRepository = postVersionRepository;
    }
    @Override
    public List<PostVersionResponse> getVersions(Long postId){
        return postVersionRepository.findByPostIdOrderByEditedAtDesc(postId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public void restoreVersion(Long versionId){
        PostVersion version = postVersionRepository.findById(versionId)
                .orElseThrow(() -> new ResourceNotFoundException("Version not found"));
        Post post = version.getPost();
        PostVersion backup = new PostVersion();
        backup.setPost(post);
        backup.setContent(post.getContent());
        backup.setEditedAt(LocalDateTime.now());
        postVersionRepository.save(backup);
        post.setContent(version.getContent());
        postRepository.save(post);
    }
    private PostVersionResponse mapToResponse(PostVersion version){
        PostVersionResponse response = new PostVersionResponse();
        response.setId(version.getId());
        response.setContent(version.getContent());
        response.setEditedAt(version.getEditedAt());
        return response;
    }
}
