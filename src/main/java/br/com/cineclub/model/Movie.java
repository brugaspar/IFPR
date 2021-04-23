package br.com.cineclub.model;

import java.time.LocalDate;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Movie {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotBlank(message = "Campo obrigatório")
  @Size(min = 1, max = 50, message = "Campo deve conter entre {min} e {max} carácteres")
  @Column(nullable = false)
  private String name;

  @NotNull(message = "Campo obrigatório")
  @Past
  @DateTimeFormat(pattern = "dd/MM/yyyy")
  private LocalDate releaseDate;

  @NotBlank(message = "Campo obrigatório")
  private String category;

  private Float score;

  @ManyToMany
  @JoinTable(name = "movie_person", joinColumns = {@JoinColumn(name = "movie_id")}, inverseJoinColumns = {@JoinColumn(name = "person_id")})
  private Set<Person> persons;

  public Movie() {
  }

  public Movie(String name, Float score, LocalDate releaseDate, String category) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.score = score;
    this.category = category;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
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

}
