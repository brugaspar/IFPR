package br.com.cineclub.dao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import br.com.cineclub.model.Category;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import br.com.cineclub.model.CategoryEnum;
import br.com.cineclub.model.Movie;
import br.com.cineclub.model.Person;

@Service
public class DataLoaderHelper {

  public static void loadData(MovieRepository movieRepository, PersonRepository personRepository, CategoryRepository categoryRepository) {

    List<Movie> movieList = new ArrayList<>();
    movieList.add(new Movie("Avatar", 7f, LocalDate.of(2009, 1, 28), CategoryEnum.SCIFI.name()));
    movieList.add(new Movie("Matrix", 9f, LocalDate.of(1999, 1, 1), CategoryEnum.SCIFI.name()));
    movieList.add(new Movie("Terminator", 8f, LocalDate.of(1984, 1, 1), CategoryEnum.SCIFI.name()));
    movieList.add(new Movie("Rock", 6f, LocalDate.of(1976, 1, 1), CategoryEnum.ACTION.name()));
    movieList.add(new Movie("Titanic", 4f, LocalDate.of(1997, 1, 1), CategoryEnum.DRAMA.name()));
    movieList.add(new Movie("Alien", 10f, LocalDate.of(1979, 1, 1), CategoryEnum.SCIFI.name()));
    movieList.add(new Movie("Chernobyl", 9.40f, LocalDate.of(2019, 1, 21), CategoryEnum.SCIFI.name()));
    movieList.add(new Movie("Terminator", 8.11f, LocalDate.of(1984, 1, 21), CategoryEnum.SCIFI.name()));
    movieList.add(new Movie("Star Wars: Episode I", 6.5f, LocalDate.of(1999, 1, 21), CategoryEnum.SCIFI.name()));
    movieList.add(new Movie("The Thirteenth Floor", 7.10f, LocalDate.of(1999, 1, 21), CategoryEnum.SCIFI.name()));
    movieRepository.saveAll(movieList);

    List<Person> personList = new ArrayList<>();
    personList.add(new Person("Mark Hamill", LocalDate.of(1944, 4, 8)));
    personList.add(new Person("Harrison Ford", LocalDate.of(1999, 11, 28)));
    personList.add(new Person("Arnold Schwarzenegger", LocalDate.of(1962, 11, 15)));
    personRepository.saveAll(personList);

    List<Category> categoryList = new ArrayList<>();
    categoryList.add(new Category("Comedy"));
    categoryList.add(new Category("Action"));
    categoryList.add(new Category("Drama"));
    categoryRepository.saveAll(categoryList);

    Set<Person> avatarCast = new HashSet<>();
    avatarCast.add(personRepository.findById(1L).get());
    avatarCast.add(personRepository.findById(2L).get());
    Movie avatar = movieRepository.findById(1L).get();
    avatar.setPersons(avatarCast);
    movieRepository.save(avatar);

    Movie matrix = movieRepository.findById(2L).get();
    Set<Person> matrixCast = new HashSet<>();
    matrixCast.add(personRepository.findById(1L).get());
    matrixCast.add(personRepository.findById(3L).get());
    matrixCast.add(personRepository.findById(2L).get());
    matrix.setPersons(matrixCast);
    movieRepository.save(matrix);

    Movie alien = movieRepository.findById(5L).get();
    Set<Person> alienCast = new HashSet<>();
    alienCast.add(personRepository.findById(2L).get());
    alien.setPersons(alienCast);
    movieRepository.save(alien);

  }

  @Bean
  public CommandLineRunner loader(MovieRepository movieRepository, PersonRepository personRepository, CategoryRepository categoryRepository) {
    return (args) -> {
      DataLoaderHelper.loadData(movieRepository, personRepository, categoryRepository);
    };
  }
}
