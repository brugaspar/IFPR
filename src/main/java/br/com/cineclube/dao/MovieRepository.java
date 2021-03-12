package br.com.cineclube.dao;

import br.com.cineclube.model.Movie;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MovieRepository extends CrudRepository<Movie, Long> {

  List<Movie> findAll();

}