package com.insighthub.cms.dto;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
@Data
public class PostVersionResponse {
    private Long id;
    private String content;
    private LocalDateTime editedAt;
}
