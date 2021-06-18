package br.com.cineclub.tmdb.model;

import java.util.List;

public class WrapperMovieSearch {
  private List<MovieTMDB> results;

  public List<MovieTMDB> getResults() {
    results.sort((f1, f2) -> Integer.compare(f2.getVote_count(), f1.getVote_count()));
    return results;
  }

  public void setResults(List<MovieTMDB> results) {
    this.results = results;
  }

}