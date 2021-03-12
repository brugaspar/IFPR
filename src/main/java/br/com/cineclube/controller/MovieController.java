package br.com.cineclube.controller;

import br.com.cineclube.dao.MovieRepository;
import br.com.cineclube.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
  public String save(Movie movie, Model model) {
    System.out.println(movie.getName());

    repository.save(movie);

    return "redirect:/movies/list";
  }

  @GetMapping(value = "/delete/{id}")
  public String delete(@PathVariable Long id) {
    repository.deleteById(id);

    return "redirect:/movies/list";
  }

  @GetMapping(value = "/edit/{id}")
  public String edit(@PathVariable Long id, Model model) {
    Movie movie = repository.getOne(id);

    model.addAttribute("movie", movie);

    return "movie/new.html";
  }

}