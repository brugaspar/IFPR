package br.com.cineclub.model;

import java.util.List;

public class WrapperCategorySearch {

  private List<CategoryDB> genres;

  public List<CategoryDB> getGenres() {
    if(genres != null) {
      genres.sort( (f1,f2) -> Long.compare(f2.getId(), f1.getId()));
      return genres;
    }

    return null;
  }

  public void setGenres(List<CategoryDB> genres) {
    this.genres = genres;
  }

}