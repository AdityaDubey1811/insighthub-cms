package com.insighthub.cms.repository;
import com.insighthub.cms.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoryRepository extends JpaRepository<Category,Long> {
}
