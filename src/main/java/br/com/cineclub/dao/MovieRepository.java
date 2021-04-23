package br.com.cineclub.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import br.com.cineclub.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

  List<Movie> findByCategory(String category);

  List<Movie> findByName(String name);

  List<Movie> findByNameAndCategory(String name, String category);

  List<Movie> findByNameOrCategory(String name, String category);

  List<Movie> findByOrderByCategory();

  List<Movie> findByOrderByCategoryDesc();

  List<Movie> findByScoreGreaterThan(Float score);

  List<Movie> findByScoreGreaterThanEqual(Float score);

  List<Movie> findByScoreLessThanEqual(Float score);

  List<Movie> findTop3ByScoreGreaterThanEqualOrderByScoreDesc(Float score);

  List<Movie> findByScoreBetween(Float min, Float max);

  boolean existsMovieByCategory(String category);

  @Query("select f from Movie f where f.category = ?1")
  List<Movie> selectMovieByCategory(String category);

  @Query("select f from Movie f join f.persons p where p.name = ?1 and f.category = ?2")
  List<Movie> findByPersonAndCategory(String name, String category);

}
