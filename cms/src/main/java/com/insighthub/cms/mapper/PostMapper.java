package com.insighthub.cms.mapper;
import com.insighthub.cms.dto.PostResponse;
import com.insighthub.cms.entity.Post;
import org.springframework.stereotype.Component;
@Component
public class PostMapper {
    public PostResponse mapToResponse(Post post){
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
