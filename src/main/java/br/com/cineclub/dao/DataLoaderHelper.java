package br.com.cineclub.dao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import br.com.cineclub.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

//@Service
public class DataLoaderHelper {
  @Autowired
  static RestTemplate apiRequest;

  @Value("${api.moviedb.key}")
  static String apiKey;

  @SuppressWarnings("OptionalGetWithoutIsPresent")
  public static void loadData(MovieRepository movieRepository, PersonRepository personRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
    List<Category> categoriesList = new ArrayList<>();
    categoriesList.add(new Category("Comédia"));
    categoriesList.add(new Category("Ação"));
    categoriesList.add(new Category("Aventura"));
    categoriesList.add(new Category("Drama"));
    categoriesList.add(new Category("Suspense"));
    categoriesList.add(new Category("Terror"));
    categoriesList.add(new Category("Ficção Científica"));
    categoryRepository.saveAll(categoriesList);

    List<Movie> movieList = new ArrayList<>();
    movieList.add(new Movie("Avatar", 7f, LocalDate.of(2009, 1, 28)));
    movieList.add(new Movie("Matrix", 9f, LocalDate.of(1999, 1, 1)));
    movieList.add(new Movie("Titanic", 4f, LocalDate.of(1997, 1, 1)));
    movieList.add(new Movie("Star Wars: Episódio I", 6.5f, LocalDate.of(1999, 1, 21)));
    movieList.add(new Movie("13º Andar", 7.10f, LocalDate.of(1999, 1, 21)));
    movieRepository.saveAll(movieList);

    List<Person> personList = new ArrayList<>();
    personList.add(new Person("Sam Worthington", LocalDate.of(1978, 6, 19)));
    personList.add(new Person("Zoë Saldaña", LocalDate.of(1999, 11, 28)));
    personList.add(new Person("Keanu Reeves", LocalDate.of(1964, 9, 2)));
    personList.add(new Person("Laurence Fishburne", LocalDate.of(1961, 7, 30)));
    personList.add(new Person("Leonardo DiCaprio", LocalDate.of(1974, 11, 11)));
    personList.add(new Person("Kate Winslet", LocalDate.of(1975, 10, 5)));
    personList.add(new Person("Natalie Portman", LocalDate.of(1981, 6, 9)));
    personList.add(new Person("Liam Neeson", LocalDate.of(1952, 6, 7)));
    personList.add(new Person("Hayden Christensen", LocalDate.of(1981, 4, 19)));
    personList.add(new Person("Gretchen Mol", LocalDate.of(1972, 11, 8)));
    personList.add(new Person("Craig Bierko", LocalDate.of(1964, 8, 18)));
    personRepository.saveAll(personList);

    Movie avatar = movieRepository.findById(1L).get();
    Set<Person> avatarCast = new HashSet<>();
    avatarCast.add(personRepository.findById(1L).get());
    avatarCast.add(personRepository.findById(2L).get());
    Set<Category> avatarCategories = new HashSet<>();
    avatarCategories.add(categoryRepository.findById(2L).get());
    avatarCategories.add(categoryRepository.findById(7L).get());
    avatar.setPersons(avatarCast);
    avatar.setCategories(avatarCategories);
    movieRepository.save(avatar);

    Movie matrix = movieRepository.findById(2L).get();
    Set<Person> matrixCast = new HashSet<>();
    Set<Category> matrixCategories = new HashSet<>();
    matrixCategories.add(categoryRepository.findById(2L).get());
    matrixCategories.add(categoryRepository.findById(7L).get());
    matrixCast.add(personRepository.findById(3L).get());
    matrixCast.add(personRepository.findById(4L).get());
    matrix.setPersons(matrixCast);
    matrix.setCategories(matrixCategories);
    movieRepository.save(matrix);

    Movie titanic = movieRepository.findById(3L).get();
    Set<Person> titanicCast = new HashSet<>();
    Set<Category> titanicCategories = new HashSet<>();
    titanicCategories.add(categoryRepository.findById(4L).get());
    titanicCast.add(personRepository.findById(5L).get());
    titanicCast.add(personRepository.findById(6L).get());
    titanic.setPersons(titanicCast);
    titanic.setCategories(titanicCategories);
    movieRepository.save(titanic);

    Movie starWars = movieRepository.findById(4L).get();
    Set<Person> starWarsCast = new HashSet<>();
    Set<Category> starWarsCategories = new HashSet<>();
    starWarsCategories.add(categoryRepository.findById(3L).get());
    starWarsCategories.add(categoryRepository.findById(7L).get());
    starWarsCast.add(personRepository.findById(7L).get());
    starWarsCast.add(personRepository.findById(8L).get());
    starWarsCast.add(personRepository.findById(9L).get());
    starWars.setPersons(starWarsCast);
    starWars.setCategories(starWarsCategories);
    movieRepository.save(starWars);

    Movie thirteenFloor = movieRepository.findById(5L).get();
    Set<Person> thirteenFloorCast = new HashSet<>();
    Set<Category> thirteenFloorCategories = new HashSet<>();
    thirteenFloorCategories.add(categoryRepository.findById(5L).get());
    thirteenFloorCategories.add(categoryRepository.findById(6L).get());
    thirteenFloorCast.add(personRepository.findById(10L).get());
    thirteenFloorCast.add(personRepository.findById(11L).get());
    thirteenFloor.setPersons(thirteenFloorCast);
    thirteenFloor.setCategories(thirteenFloorCategories);
    movieRepository.save(thirteenFloor);

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    User maria = new User();
    maria.setEmail("maria90@test.org");
    maria.setPassword(passEncoder.encode("123"));
    maria.setName("Maria Aparecida");
    maria.setRoles("ROLE_USER");
    userRepository.save(maria);

    User admin = new User();
    admin.setEmail("admin@test.org");
    admin.setPassword(passEncoder.encode("123"));
    admin.setName("Admin");
    admin.setRoles("ROLE_ADMIN");
    userRepository.save(admin);

    User guest = new User();
    guest.setEmail("guest@test.org");
    guest.setPassword(passEncoder.encode("123"));
    guest.setName("Guest");
    guest.setRoles("ROLE_GUEST");
    userRepository.save(guest);
  }

//  @Bean
  public CommandLineRunner loader(MovieRepository movieRepository, PersonRepository personRepository, CategoryRepository categoryRepository, UserRepository userRepository) {

    return (args) -> {
      DataLoaderHelper.loadData(movieRepository, personRepository, categoryRepository, userRepository);
    };
  }
}