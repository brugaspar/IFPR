package br.com.cineclub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.com.cineclub.model.MovieDB;
import br.com.cineclub.model.WrapperMovieSearch;

@RestController
@RequestMapping("/api/v1")
public class MovieDBConsumer {

  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  @RequestMapping("/moviedb/{id}")
  public MovieDB getFilmeById(@PathVariable Long id) {

    String movieUrl =
            "https://api.themoviedb.org/3/movie/" + id + "?api_key=" +  apiKey;

    return apiRequest.getForObject(movieUrl, MovieDB.class); // serializado em JSON
  }

  @GetMapping("/search")
  public WrapperMovieSearch searchMovie(@RequestParam String title, @RequestParam Integer year){

    String movieUrl =
            "https://api.themoviedb.org/3/search/movie?api_key=" +  apiKey + "&query=" + title + "&year=" + year;

    return apiRequest.getForObject(movieUrl, WrapperMovieSearch.class);
  }

  @GetMapping("/search1")
  public MovieDB searchOneMovie(@RequestParam String title, @RequestParam Integer year){

    String movieUrl =
            "https://api.themoviedb.org/3/search/movie?api_key=" +  apiKey + "&query=" + title + "&year=" + year;

    WrapperMovieSearch searchResult = apiRequest.getForObject(movieUrl, WrapperMovieSearch.class);
    assert searchResult != null;

    return searchResult.getResults().get(0);
  }

}
