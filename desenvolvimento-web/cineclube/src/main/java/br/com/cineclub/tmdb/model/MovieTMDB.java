package br.com.cineclub.tmdb.model;

public class MovieTMDB {

  private Long id;
  private String title;
  private String overview;
  private Integer vote_count;
  private Float vote_average;

  private String poster_path;

  public String getPoster_path() {
    return "https://image.tmdb.org/t/p/w500" + poster_path;
  }

  public void setPoster_path(String poster_path) {
    this.poster_path = poster_path;
  }

  public Integer getVote_count() {
    return vote_count;
  }

  public void setVote_count(Integer vote_count) {
    this.vote_count = vote_count;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getOverview() {
    return overview;
  }

  public void setOverview(String overview) {
    this.overview = overview;
  }

  public Float getVote_average() {
    return vote_average;
  }

  public void setVote_average(Float vote_average) {
    this.vote_average = vote_average;
  }

}