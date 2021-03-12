package br.com.cineclube.controller;

import br.com.cineclube.dao.MovieRepository;
import br.com.cineclube.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/movies")
public class MovieController {

  @Autowired
  MovieRepository repository;

  @RequestMapping("/new")
  public String newForm(Model model) {
    Movie movie = new Movie();

    model.addAttribute("movie", movie);

    return "movie/new.html";
  }

  @RequestMapping("/list")
  public String list(Model model) {
    List<Movie> moviesList = repository.findAll();

    model.addAttribute("moviesList", moviesList);

    return "movie/list.html";
  }

  @PostMapping("/save")
  public String save(Movie movie) {
    repository.save(movie);

    return "redirect:/movies/list";
  }

}