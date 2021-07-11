package br.com.cineclub.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Campo obrigatório")
  @Size(min = 2, max = 50, message = "Campo deve conter entre {min} e {max} carácteres")
  @Column(nullable = false)
  private String name;

  @NotBlank(message = "Campo obrigatório")
  @Email(message = "E-mail inválido")
  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @NotBlank(message = "Obrigatório algum nível de autorização")
  @Column(nullable = false)
  private String roles;

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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRoles() {
    return roles;
  }

  public void setRoles(String roles) {
    this.roles = roles;
  }

}