package com.insighthub.cms.repository;
import com.insighthub.cms.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CommentRepository extends JpaRepository<Comment,Long>{
    List<Comment> findByPostIdAndParentIsNull(Long postId);
}
