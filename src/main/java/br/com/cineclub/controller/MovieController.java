package br.com.cineclub.controller;

import java.util.List;
import javax.validation.Valid;

import br.com.cineclub.dao.CategoryRepository;
import br.com.cineclub.model.Category;
import br.com.cineclub.model.MovieDB;
import br.com.cineclub.model.WrapperMovieSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import br.com.cineclub.dao.MovieRepository;
import br.com.cineclub.model.Movie;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/movies")
public class MovieController {

  final MovieRepository movieRepository;
  final CategoryRepository categoryRepository;

  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  public MovieController(MovieRepository movieRepository, CategoryRepository categoryRepository) {
    this.movieRepository = movieRepository;
    this.categoryRepository = categoryRepository;
  }

  @RequestMapping("/new")
  public String newForm(Model model) {
    Movie movie = new Movie();

    List<Category> categories = categoryRepository.findAll();

    model.addAttribute("categories", categories);
    model.addAttribute("movie", movie);

    return "movie/keepMovie";
  }

  @GetMapping(value = "/delete/{id}")
  public String delete(@PathVariable Long id) {
    movieRepository.deleteById(id);

    return "redirect:/movies/list";
  }

  @GetMapping(value = "/edit/{id}")
  public String edit(@PathVariable Long id, Model model) {
    Movie movie = movieRepository.getOne(id);

    model.addAttribute("movie", movie);

    String movieUrl =
            "https://api.themoviedb.org/3/search/movie?api_key=" +  apiKey +
                    "&query=" + movie.getName() + "&year=" + movie.getReleaseDate().getYear();

    WrapperMovieSearch searchResult = apiRequest.getForObject(movieUrl, WrapperMovieSearch.class);
    assert searchResult != null;
    MovieDB moviedb = searchResult.getResults().get(0);
    movie.setMovieDB(moviedb);

    return "movie/keepMovie";
  }

  @RequestMapping("/list")
  public String list(Model model) {
    List<Movie> movieList = movieRepository.findAll();
    List<Category> categories = categoryRepository.findAll();

    model.addAttribute("categories", categories);
    model.addAttribute("movieList", movieList);
    model.addAttribute("category", "Selecionar");

    return "movie/list";
  }

  @PostMapping("/save")
  public String save(@Valid Movie movie, BindingResult result, Model model) {
    if (result.hasErrors()) {
      System.out.println(result.getAllErrors());

      List<Category> categories = categoryRepository.findAll();

      model.addAttribute("categories", categories);

      return "movie/keepMovie";
    }

    movieRepository.save(movie);

    return "redirect:/movies/list";
  }

  @PostMapping(value = "/category")
  public String filtra(Category cat, Model model) {
    List<Movie> movies = movieRepository.findByCategory(cat.getName());
    List<Category> categories = categoryRepository.findAll();

    model.addAttribute("movieList", movies);
    model.addAttribute("category", cat.getName());
    model.addAttribute("categories", categories);

    return "movie/list";
  }
}
