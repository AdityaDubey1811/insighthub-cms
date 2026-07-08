package com.insighthub.cms.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "post_versions")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id",nullable = false)
    private Post post;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String content;

    private LocalDateTime editedAt;
}
