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

@Service
public class PostServiceImpl implements PostService{
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public PostServiceImpl(PostRepository postRepository,UserRepository userRepository){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    @Override
    public PostResponse createPost(PostRequest request,String authorEmail){
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setSlug(generateSlug(request.getTitle()));
        post.setStatus(PostStatus.DRAFT);
        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);
        return mapToResponse(savedPost);
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
    private PostResponse mapToResponse(Post post){
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        response.setContent(post.getContent());
        response.setSlug(post.getSlug());
        response.setStatus(post.getStatus().name());
        response.setAuthorName(post.getAuthor().getName());
        response.setCreatedAt(post.getCreatedAt());
        return response;
    }
}
