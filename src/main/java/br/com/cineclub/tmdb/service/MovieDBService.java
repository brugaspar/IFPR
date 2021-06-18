package br.com.cineclub.tmdb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.com.cineclub.tmdb.model.MovieTMDB;
import br.com.cineclub.tmdb.model.WrapperMovieSearch;

@Service
public class MovieDBService {

  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  public WrapperMovieSearch searchMovie(String title, Integer year) {

    String movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + title + "&year="
        + year;

    WrapperMovieSearch searchResult = apiRequest.getForObject(movieUrl, WrapperMovieSearch.class);

    return searchResult;

  }

  public MovieTMDB getMovieById(Long id) {

    String movieUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;

    MovieTMDB movie = apiRequest.getForObject(movieUrl, MovieTMDB.class);

    return movie;

  }

  public MovieTMDB searchOneMovie(String title, Integer year) {

    String movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + title + "&year="
        + year;

    WrapperMovieSearch searchResult = apiRequest.getForObject(movieUrl, WrapperMovieSearch.class);

    MovieTMDB movie = new MovieTMDB();

    if (searchResult.getResults() != null && searchResult.getResults().size() > 0) {
      movie = searchResult.getResults().get(0);
    }

    return movie;

  }

}