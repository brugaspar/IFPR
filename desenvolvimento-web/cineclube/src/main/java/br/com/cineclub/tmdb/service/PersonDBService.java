package br.com.cineclub.tmdb.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.com.cineclub.tmdb.model.PersonTMDB;
import br.com.cineclub.tmdb.model.WrapperPersonSearch;

@Service
public class PersonDBService {

  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  public PersonTMDB getById(Long id) {
    String filmeUrl = "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey;
    PersonTMDB ator = apiRequest.getForObject(filmeUrl, PersonTMDB.class);
    return ator;
  }

  public PersonTMDB searchByName(String name) {
    Map<String, String> params = new HashMap<>();
    params.put("key", apiKey);
    params.put("query", name);
    params.put("lang", "en-US");

    String url = "https://api.themoviedb.org/3/search/person?api_key={key}&query={query}&language={lang}";
    WrapperPersonSearch search = apiRequest.getForObject(url, WrapperPersonSearch.class, params);

    PersonTMDB person = new PersonTMDB();

    if (search.getResults() != null && search.getResults().size() > 0) {
      person = search.getResults().get(0);
    }

    return person;

  }

}