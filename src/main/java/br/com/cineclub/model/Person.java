package br.com.cineclub.model;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Person {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  public PersonDB getPersonDB() {
    return personDB;
  }

  public void setPersonDB(PersonDB personDB) {
    this.personDB = personDB;
  }

  @Transient
  private PersonDB personDB;

  @NotBlank(message = "Campo obrigatório")
  @Size(min = 3, max = 50, message = "Campo deve conter entre {min} e {max} carácteres")
  @Column(nullable = false)
  @JsonProperty("text")
  private String name;

  @Past(message = "Deve ser uma data no passado")
  @DateTimeFormat(pattern = "dd/MM/yyyy")
  @NotNull(message = "Campo obrigatório")
  private LocalDate birthday;

  @JsonIgnore
  @ManyToMany(mappedBy = "persons")
  private Set<Movie> movies;

  @Transient
  private Integer age;

  public Person() {
  }

  public Person(String name, LocalDate birthday) {
    this.name = name;
    this.birthday = birthday;
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

  public LocalDate getBirthday() {
    return birthday;
  }

  public void setBirthday(LocalDate birthday) {
    this.birthday = birthday;
  }

  public Integer getAge() {
    age = (int) ChronoUnit.YEARS.between(birthday, LocalDate.now());
    return age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public Set<Movie> getMovies() {
    return movies;
  }

  public void setMovies(Set<Movie> movies) {
    this.movies = movies;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;

    result = prime * result + ((birthday == null) ? 0 : birthday.hashCode());
    result = prime * result + ((name == null) ? 0 : name.hashCode());

    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;

    if (obj == null) return false;

    if (getClass() != obj.getClass()) return false;

    Person otherPerson = (Person) obj;

    if (birthday == null) {
      if (otherPerson.birthday != null) return false;
    } else if (!birthday.equals(otherPerson.birthday)) return false;

    if (name == null) {
      return otherPerson.name == null;
    } else return name.equals(otherPerson.name);
  }

}
