package br.com.cineclub.tmdb.model;

public class PersonTMDB {

  private Long id;
  private String name;
  private Double popularity;
  private String profile_path;
  private String biography;
  private String know_for_department;

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

  public Double getPopularity() {
    return popularity;
  }

  public void setPopularity(Double popularity) {
    this.popularity = popularity;
  }

  public String getProfile_path() {
    return "https://image.tmdb.org/t/p/w500" + profile_path;
  }

  public void setProfile_path(String profile_path) {
    this.profile_path = profile_path;
  }

  public String getBiography() {
    return biography;
  }

  public void setBiography(String biography) {
    this.biography = biography;
  }

  public String getKnow_for_department() {
    return know_for_department;
  }

  public void setKnow_for_department(String know_for_department) {
    this.know_for_department = know_for_department;
  }

}