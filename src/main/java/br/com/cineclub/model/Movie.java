package br.com.cineclub.model;

import java.time.LocalDate;
import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.format.annotation.DateTimeFormat;

import br.com.cineclub.tmdb.model.MovieTMDB;

@Entity
public class Movie {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Transient
  private MovieTMDB movieDB;

  @NotBlank(message = "Campo obrigatório")
  @Size(min = 1, max = 50, message = "Campo deve conter entre {min} e {max} carácteres")
  @Column(nullable = false)
  private String name;

  @NotNull(message = "Campo obrigatório")
  @DateTimeFormat(pattern = "dd/MM/yyyy")
  private LocalDate releaseDate;

  private Float score;

  @ManyToMany
  @JsonSerialize(using = PersonListSerializer.class)
  @JoinTable(name = "movie_person", joinColumns = { @JoinColumn(name = "movie_id") }, inverseJoinColumns = {
      @JoinColumn(name = "person_id") })
  private Set<Person> persons;

  @ManyToMany
  @JsonSerialize(using = CategoryListSerializer.class)
  @JoinTable(name = "movie_category", joinColumns = { @JoinColumn(name = "movie_id") }, inverseJoinColumns = {
      @JoinColumn(name = "category_id") })
  private Set<Category> categories;

  public Movie() {
  }

  public Movie(String name, Float score, LocalDate releaseDate) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.score = score;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Float getScore() {
    return score;
  }

  public void setScore(Float score) {
    this.score = score;
  }

  public LocalDate getReleaseDate() {
    return releaseDate;
  }

  public void setReleaseDate(LocalDate releaseDate) {
    this.releaseDate = releaseDate;
  }

  public MovieTMDB getMovieTMDB() {
    return movieDB;
  }

  public void setMovieTMDB(MovieTMDB movieDB) {
    this.movieDB = movieDB;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Set<Person> getPersons() {
    return persons;
  }

  public void setPersons(Set<Person> persons) {
    this.persons = persons;
  }

  public Set<Category> getCategories() {
    return categories;
  }

  public void setCategories(Set<Category> categories) {
    this.categories = categories;
  }
}
