package com.insighthub.cms.repository;
import com.insighthub.cms.entity.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface FollowerRepository extends JpaRepository<Follower,Long>{
    Optional<Follower> findByFollowerIdAndFollowingId(Long followerId,Long followingId);
    long countByFollowingId(Long followingId);
    long countByFollowerId(Long followerId);
}
