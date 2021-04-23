package br.com.cineclub.controller;

import java.util.List;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import br.com.cineclub.dao.MovieRepository;
import br.com.cineclub.model.Category;
import br.com.cineclub.model.Movie;

@Controller
@RequestMapping("/movies")
public class MovieController {

  final MovieRepository movieRepository;

  public MovieController(MovieRepository movieRepository) {
    this.movieRepository = movieRepository;
  }

  @RequestMapping("/new")
  public String newForm(Model model) {
    Movie movie = new Movie();

    model.addAttribute("categories", Category.values());
    model.addAttribute("movie", movie);

    return "movie/keepMovie";
  }

  @GetMapping(value = "/delete/{id}")
  public String delete(@PathVariable Long id) {
    movieRepository.deleteById(id);

    return "redirect:/movie/list";
  }

  @GetMapping(value = "/edit/{id}")
  public String edit(@PathVariable Long id, Model model) {
    Movie movie = movieRepository.getOne(id);

    model.addAttribute("movie", movie);
    model.addAttribute("categories", Category.values());

    return "movie/list";
  }

  @RequestMapping("/list")
  public String list(Model model) {
    List<Movie> movieList = movieRepository.findAll();

    model.addAttribute("categories", Category.values());
    model.addAttribute("movieList", movieList);
    model.addAttribute("category", "Selecionar");

    return "movie/list";
  }

  @PostMapping("/save")
  public String save(@Valid Movie movie, BindingResult result, Model model) {
    if (result.hasErrors()) {
      model.addAttribute("categories", Category.values());

      return "movie/keepMovie";
    }

    movieRepository.save(movie);

    return "redirect:/movies/list";
  }

  @PostMapping(value = "/category")
  public String filtra(Category cat, Model model) {
    List<Movie> movies = movieRepository.findByCategory(cat.name());

    model.addAttribute("movieList", movies);
    model.addAttribute("category", cat.getName());
    model.addAttribute("categories", Category.values());

    return "movie/list";
  }
}
