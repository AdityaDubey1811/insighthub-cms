package com.insighthub.cms.mapper;

import com.insighthub.cms.dto.PostResponse;
import com.insighthub.cms.entity.Post;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PostMapper {

    public PostResponse mapToResponse(Post post) {

        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        response.setContent(post.getContent());
        response.setSlug(post.getSlug());
        response.setStatus(post.getStatus().name());
        response.setAuthorName(post.getAuthor().getName());
        response.setAuthorId(post.getAuthor().getId());
        response.setCreatedAt(post.getCreatedAt());

        if (post.getCategory() != null) {
            response.setCategoryId(post.getCategory().getId());
            response.setCategoryName(post.getCategory().getName());
        }
        if (post.getTags() != null) {
            response.setTagIds(
                    post.getTags()
                            .stream()
                            .map(tag -> tag.getId())
                            .collect(Collectors.toSet())
            );
            response.setTagNames(
                    post.getTags()
                            .stream()
                            .map(tag -> tag.getName())
                            .collect(Collectors.toSet())
            );
        }
        return response;
    }
}