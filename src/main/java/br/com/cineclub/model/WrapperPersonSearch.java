package br.com.cineclub.model;

import java.util.List;

public class WrapperPersonSearch {

  private List<PersonDB> results;

  public List<PersonDB> getResults() {
    results.sort( (f1,f2) -> Integer.compare(f2.getPopularity(), f1.getPopularity()) );
    return results;
  }

  public void setResults(List<PersonDB> results) {
    this.results = results;
  }

}