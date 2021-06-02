package br.com.cineclub.controller;

import br.com.cineclub.model.CategoryDB;
import br.com.cineclub.model.WrapperCategorySearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Controller
@RequestMapping("/categoriesDB")
public class CategoryDBController {
  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  @GetMapping("/list")
  public String list(Model model) {
    String categoryUrl =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + "&language=pt-BR";

    WrapperCategorySearch searchResult = apiRequest.getForObject(categoryUrl, WrapperCategorySearch.class);
    assert searchResult != null;

    List<CategoryDB> categoryList = searchResult.getGenres().size() != 0 ? searchResult.getGenres() : null;

    model.addAttribute("categoryList", categoryList);

    return "category/categoriesDB";
  }
}
