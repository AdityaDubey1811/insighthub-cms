package com.insighthub.cms.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "followers",
       uniqueConstraints = @UniqueConstraint(columnNames = {"follower_id","following_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id",nullable = false)
    private User follower;

    @ManyToOne
    @JoinColumn(name = "following_id",nullable = false)
    private User following;
}
