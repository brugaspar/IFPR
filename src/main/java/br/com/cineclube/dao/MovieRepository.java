package br.com.cineclube.dao;

import br.com.cineclube.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

//  List<Movie> findAll();

}