package br.com.cineclube.dao;

import br.com.cineclube.model.People;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PeopleRepository extends JpaRepository<People, Long> {

  List<People> findAll();

}
