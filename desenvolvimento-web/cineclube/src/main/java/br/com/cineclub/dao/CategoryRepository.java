package br.com.cineclub.dao;

import br.com.cineclub.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  List<Category> findByOrderByNameAsc();

  List<Category> findByNameIgnoreCaseContaining(String query);

  @Transactional
  @Modifying(clearAutomatically = true, flushAutomatically = true)
  @Query("delete from Category p where p.id = :id")
  void deleteCategory(Long id);
}