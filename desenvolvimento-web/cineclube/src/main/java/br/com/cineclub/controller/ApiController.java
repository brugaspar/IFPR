package br.com.cineclub.controller;

import java.util.List;

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
import br.com.cineclub.tmdb.model.MovieTMDB;
import br.com.cineclub.tmdb.model.PersonTMDB;
import br.com.cineclub.tmdb.service.MovieDBService;
import br.com.cineclub.tmdb.service.PersonDBService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiController {

  final PersonRepository personRepository;
  final CategoryRepository categoryRepository;
  final MovieRepository movieRepository;
  final MovieDBService movieDBService;
  final PersonDBService personDBService;

  public ApiController(PersonRepository personRepository, CategoryRepository categoryRepository,
      MovieRepository movieRepository, MovieDBService movieDBService, PersonDBService personDBService) {
    this.personRepository = personRepository;
    this.categoryRepository = categoryRepository;
    this.movieRepository = movieRepository;
    this.movieDBService = movieDBService;
    this.personDBService = personDBService;
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
  Person getPerson(@PathVariable Long id) {
    Person person = personRepository.findById(id).get();

    PersonTMDB persondb = personDBService.searchByName(person.getName());

    person.setPersonTMDB(persondb);

    return person;
  }

  @GetMapping("/movie/{id}")
  Movie getMovie(@PathVariable Long id) {
    Movie movie = movieRepository.findById(id).get();

    MovieTMDB moviedb = movieDBService.searchOneMovie(movie.getName(), movie.getReleaseDate().getYear());

    movie.setMovieTMDB(moviedb);

    return movie;
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
    personRepository.save(person);
    return new ResponseEntity<>(person, HttpStatus.CREATED);
  }

  @DeleteMapping("/persons/{id}")
  void deletePerson(@PathVariable Long id) {
    personRepository.deletePerson(id);
  }

}
