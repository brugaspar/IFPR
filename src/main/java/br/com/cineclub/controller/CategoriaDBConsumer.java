package br.com.cineclub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.com.cineclub.model.CategoryDB;
import br.com.cineclub.model.WrapperCategorySearch;

@RestController
@RequestMapping("/api/v1")
public class CategoriaDBConsumer {

  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  @RequestMapping("/categorydb/{id}")
  public CategoryDB getFilmeById(@PathVariable Long id) {

    String movieUrl = "https://api.themoviedb.org/3/genre/" + id + "?api_key=" + apiKey + "&language=pt-BR";

    return apiRequest.getForObject(movieUrl, CategoryDB.class); // serializado em JSON
  }

  @GetMapping("/searchCategory")
  public WrapperCategorySearch searchCategory() {

    String movieUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + "&language=pt-BR";

    return apiRequest.getForObject(movieUrl, WrapperCategorySearch.class);
  }

}