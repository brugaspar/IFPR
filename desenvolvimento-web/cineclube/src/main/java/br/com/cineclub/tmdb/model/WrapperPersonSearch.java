package br.com.cineclub.tmdb.model;

import java.util.List;

public class WrapperPersonSearch {

  private List<PersonTMDB> results;

  public List<PersonTMDB> getResults() {
    if (results != null) {
      results.sort((f1, f2) -> Double.compare(f2.getPopularity(), f1.getPopularity()));
      return results;
    }

    return null;
  }

  public void setResults(List<PersonTMDB> results) {
    this.results = results;
  }

}