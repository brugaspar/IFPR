package br.com.cineclub.model;

public class MovieDB {

  private Long id;
  private String title;
  private String overview;
  private Integer vote_count;
  private String poster_path;

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

  public Integer getVote_count() {
    return vote_count;
  }

  public void setVote_count(Integer vote_count) {
    this.vote_count = vote_count;
  }

  public String getPoster_path() {
    return "https://image.tmdb.org/t/p/w500"+poster_path;
  }

  public void setPoster_path(String poster_path) {
    this.poster_path = poster_path;
  }

}