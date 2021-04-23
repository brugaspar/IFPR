package br.com.cineclub.dao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import br.com.cineclub.model.Category;
import br.com.cineclub.model.Movie;
import br.com.cineclub.model.Person;

@Service
public class DataLoaderHelper {

  public static void loadData(MovieRepository daof, PersonRepository daop) {

    List<Movie> movieList = new ArrayList<>();
    movieList.add(new Movie("Avatar", 7f, LocalDate.of(2009, 1, 28), Category.SCIFI.name()));
    movieList.add(new Movie("Matrix", 9f, LocalDate.of(1999, 1, 1), Category.SCIFI.name()));
    movieList.add(new Movie("Terminator", 8f, LocalDate.of(1984, 1, 1), Category.SCIFI.name()));
    movieList.add(new Movie("Rock", 6f, LocalDate.of(1976, 1, 1), Category.ACTION.name()));
    movieList.add(new Movie("Titanic", 4f, LocalDate.of(1997, 1, 1), Category.DRAMA.name()));
    movieList.add(new Movie("Alien", 10f, LocalDate.of(1979, 1, 1), Category.SCIFI.name()));
    movieList.add(new Movie("Chernobyl", 9.40f, LocalDate.of(2019, 1, 21), Category.SCIFI.name()));
    movieList.add(new Movie("Terminator", 8.11f, LocalDate.of(1984, 1, 21), Category.SCIFI.name()));
    movieList.add(new Movie("Breaking Bad", 10f, LocalDate.of(2008, 1, 21), Category.CRIME.name()));
    movieList.add(new Movie("Game of Thrones", 9.3f, LocalDate.of(2011, 1, 21), Category.ACTION.name()));
    movieList.add(new Movie("Star Wars: Episode I", 6.5f, LocalDate.of(1999, 1, 21), Category.SCIFI.name()));
    movieList.add(new Movie("The Thirteenth Floor", 7.10f, LocalDate.of(1999, 1, 21), Category.SCIFI.name()));
    daof.saveAll(movieList);

    List<Person> personList = new ArrayList<>();
    personList.add(new Person("Leonard Skin", LocalDate.of(1944, 4, 8)));
    personList.add(new Person("Jake Skin", LocalDate.of(1999, 11, 28)));
    personList.add(new Person("Arnold Shuartz", LocalDate.of(1962, 11, 15)));
    personList.add(new Person("Kate Blan", LocalDate.of(2008, 5, 1)));
    personList.add(new Person("Anne Silver", LocalDate.of(1981, 6, 20)));
    personList.add(new Person("Athena Greek", LocalDate.of(2012, 8, 10)));
    personList.add(new Person("Artemis Greek", LocalDate.of(1980, 1, 1)));
    daop.saveAll(personList);

    /**
     * ADICIONAR elenco de atores para os filmes:
     * */

    Set<Person> avatarCast = new HashSet<>();
    avatarCast.add(daop.findById(1L).get());
    avatarCast.add(daop.findById(2L).get());
    Movie avatar = daof.findById(1L).get();
    avatar.setPersons(avatarCast);
    daof.save(avatar);

    Movie matrix = daof.findById(2L).get();
    Set<Person> matrixCast = new HashSet<>();
    matrixCast.add(daop.findById(1L).get());
    matrixCast.add(daop.findById(3L).get());
    matrixCast.add(daop.findById(2L).get());
    matrix.setPersons(matrixCast);
    daof.save(matrix);

    Movie alien = daof.findById(5L).get();
    Set<Person> alienCast = new HashSet<>();
    alienCast.add(daop.findById(2L).get());
    alien.setPersons(alienCast);
    daof.save(alien);

  }

  @Bean
  public CommandLineRunner loader(MovieRepository daof, PersonRepository daop) {
    return (args) -> {
      DataLoaderHelper.loadData(daof, daop);
    };
  }
}
