package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.PostRequest;
import com.insighthub.cms.dto.PostResponse;
import com.insighthub.cms.entity.Post;
import com.insighthub.cms.entity.PostStatus;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.PostRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.PostService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.insighthub.cms.mapper.PostMapper;
import com.insighthub.cms.entity.PostVersion;
import com.insighthub.cms.repository.PostVersionRepository;
@Service
public class PostServiceImpl implements PostService{
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostMapper postMapper;
    private final PostVersionRepository postVersionRepository;
    public PostServiceImpl(PostRepository postRepository,
                           UserRepository userRepository,
                           PostMapper postMapper,
                           PostVersionRepository postVersionRepository){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postMapper = postMapper;
        this.postVersionRepository = postVersionRepository;
    }
    @Override
    public PostResponse createPost(PostRequest request,String authorEmail){
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setSlug(generateSlug(request.getTitle()));
        post.setStatus(PostStatus.PENDING);
        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);
        return postMapper.mapToResponse(savedPost);
    }
    private String generateSlug(String title){
        String baseSlug = title.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
        String slug = baseSlug;
        int count = 1;
        while(postRepository.findBySlug(slug).isPresent()){
            slug = baseSlug + "-" +count++;
        }
        return slug;
    }
    @Override
    public List<PostResponse> getAllPosts(){
        return postRepository.findAll()
                .stream()
                .map(postMapper::mapToResponse)
                .toList();
    }
    @Override
    public PostResponse getPostBySlug(String slug){
        Post post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return postMapper.mapToResponse(post);
    }
    @Override
    public PostResponse updatePost(Long postId,PostRequest request,String userEmail){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if(!post.getAuthor().getEmail().equals(userEmail)){
            throw new RuntimeException("Not allowed");
        }
        PostVersion version = new PostVersion();
        version.setPost(post);
        version.setContent(post.getContent());
        version.setEditedAt(LocalDateTime.now());
        postVersionRepository.save(version);
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setUpdatedAt(LocalDateTime.now());
        Post updated = postRepository.save(post);
        return postMapper.mapToResponse(updated);
    }
    @Override
    public void deletePost(Long postId,String userEmail){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if(!post.getAuthor().getEmail().equals(userEmail)){
            throw new RuntimeException("Not allowed");
        }
        postRepository.delete(post);
    }
}
