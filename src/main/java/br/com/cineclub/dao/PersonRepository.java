package br.com.cineclub.dao;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import br.com.cineclub.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

  List<Person> findByBirthdayBefore(LocalDate data);

  List<Person> findByBirthdayAfter(LocalDate data);

  List<Person> findByNameIgnoreCaseContaining(String query);

  @Transactional
  @Modifying(clearAutomatically = true, flushAutomatically = true)
  @Query("delete from Person p where p.id = :id")
  void deletePerson(Long id);

}
