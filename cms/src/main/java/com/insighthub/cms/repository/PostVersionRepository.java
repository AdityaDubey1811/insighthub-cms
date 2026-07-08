package com.insighthub.cms.repository;
import com.insighthub.cms.entity.PostVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface PostVersionRepository extends JpaRepository<PostVersion,Long>{
    List<PostVersion> findByPostIdOrderByEditedAtDesc(Long postId);
}
