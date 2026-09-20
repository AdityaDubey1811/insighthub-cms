package com.insighthub.cms.dto;
import lombok.Data;
import java.util.Set;
@Data
public class PostRequest{
    private String title;
    private String content;
    private Long categoryId;
    private Set<Long> tagIds;
}
