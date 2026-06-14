package com.insighthub.cms.repository;
import com.insighthub.cms.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface PostRepository extends JpaRepository<Post,Long>{
    Optional<Post> findBySlug(String slug);
}
