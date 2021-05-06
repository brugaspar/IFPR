package br.com.cineclub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotBlank(message = "Campo obrigatório")
  @Size(min = 3, max = 50, message = "Campo deve conter entre {min} e {max} carácteres")
  @Column(unique = true, nullable = false)
  @JsonProperty("text")
  private String name;

  @JsonIgnore
  @ManyToMany(mappedBy = "categories")
  private Set<Movie> movies;

  public Category() {}

  public Category(String name) {
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Set<Movie> getMovies() {
    return movies;
  }

  public void setMovies(Set<Movie> movies) {
    this.movies = movies;
  }

}