package br.com.cineclub.model;

public enum Category {

  ACTION("Ação"),
  ADVENTURE("Aventura"),
  ANIMATION("Animação"),
  BIOGRAPHY("Biografia"),
  COMEDY("Comédia"),
  CRIME("Crime"),
  DRAMA("Drama"),
  DOCUMENTARY("Documentário"),
  FANTASY("Fantasia"),
  MISTERY("Mistério"),
  HORROR("Terror"),
  ROMANCE("Romance"),
  SCIFI("Ficção Científica");

  private final String name;

  Category(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

}