package br.com.cineclub.model;

import java.util.List;

public class WrapperMovieSearch {

  private List<MovieDB> results;

  public List<MovieDB> getResults() {
    results.sort( (f1,f2) -> Integer.compare(f2.getVote_count(), f1.getVote_count()) );
    return results;
  }

  public void setResults(List<MovieDB> results) {
    this.results = results;
  }

}