package br.com.cineclub.controller;

import br.com.cineclub.model.WrapperPersonSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.com.cineclub.model.PersonDB;

@RestController
@RequestMapping("/api/v1")
public class PersonDBConsumer {

  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  @RequestMapping("/persondb/{id}")
  public PersonDB getPersonById(@PathVariable Long id) {

    String personUrl =
            "https://api.themoviedb.org/3/person/" + id + "?api_key=" +  apiKey;

    return apiRequest.getForObject(personUrl, PersonDB.class); // serializado em JSON
  }

  @GetMapping("/searchPerson")
  public WrapperPersonSearch searchPerson(@RequestParam String name){

    String personUrl =
            "https://api.themoviedb.org/3/search/person?api_key=" +  apiKey + "&query=" + name;

    return apiRequest.getForObject(personUrl, WrapperPersonSearch.class);
  }

  @GetMapping("/search1person")
  public PersonDB searchOnePerson(@RequestParam String name){

    String personUrl =
            "https://api.themoviedb.org/3/search/person?api_key=" +  apiKey + "&query=" + name;

    WrapperPersonSearch searchResult = apiRequest.getForObject(personUrl, WrapperPersonSearch.class);
    assert searchResult != null;

    return searchResult.getResults().get(0);
  }

}
