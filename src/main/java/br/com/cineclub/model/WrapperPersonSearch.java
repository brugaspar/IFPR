package br.com.cineclub.model;

import java.util.List;

public class WrapperPersonSearch {

  private List<PersonDB> results;

  public List<PersonDB> getResults() {
    if(results != null) {
      results.sort( (f1,f2) -> Integer.compare(f2.getPopularity(), f1.getPopularity()) );
      return results;
    }

    return null;
  }

  public void setResults(List<PersonDB> results) {
    this.results = results;
  }

}