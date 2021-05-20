package br.com.cineclub.controller;

import java.util.List;
import java.util.Optional;

import br.com.cineclub.dao.CategoryRepository;
import br.com.cineclub.dao.MovieRepository;
import br.com.cineclub.model.Category;
import br.com.cineclub.model.Movie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import br.com.cineclub.dao.PersonRepository;
import br.com.cineclub.model.Person;

@RestController
@RequestMapping("/api")
public class ApiController {

  final PersonRepository personRepository;
  final CategoryRepository categoryRepository;
  final MovieRepository movieRepository;

  public ApiController(PersonRepository personRepository, CategoryRepository categoryRepository, MovieRepository movieRepository) {
    this.personRepository = personRepository;
    this.categoryRepository = categoryRepository;
    this.movieRepository = movieRepository;
  }

  @GetMapping("/cast")
  public List<Person> personsCast(@RequestParam(value = "search", required = false) String query) {
    if (!StringUtils.hasLength(query)) {
      return personRepository.findAll();
    }

    return personRepository.findByNameIgnoreCaseContaining(query);
  }

  @GetMapping("/categories")
  public List<Category> moviesCategories(@RequestParam(value = "search", required = false) String query) {
    if (!StringUtils.hasLength(query)) {
      return categoryRepository.findAll();
    }

    return categoryRepository.findByNameIgnoreCaseContaining(query);
  }

  @GetMapping(value = "/movies")
  Iterable<Movie> getMovies() {
    return movieRepository.findAll();
  }

  @GetMapping("/person/{id}")
  Optional<Person> getPerson(@PathVariable Long id) {
    return personRepository.findById(id);
  }

  @GetMapping(value = "/persons")
  Iterable<Person> getPersons() {
    return personRepository.findAll();
  }

  @PostMapping("/persons")
  Person postPerson(@RequestBody Person person) {
    personRepository.save(person);
    return person;
  }

  @PutMapping("/persons/{id}")
  ResponseEntity<Person> putPerson(@PathVariable Long id, @RequestBody Person person) {
    Person p = personRepository.save(person);
    return new ResponseEntity<>(person, HttpStatus.CREATED);
  }

  @DeleteMapping("/persons/{id}")
  void deletePerson(@PathVariable Long id) {
    personRepository.deletePerson(id);
  }

}
