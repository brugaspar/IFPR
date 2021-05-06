package br.com.cineclub.controller;

import java.util.List;

import br.com.cineclub.dao.CategoryRepository;
import br.com.cineclub.model.Category;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import br.com.cineclub.dao.PersonRepository;
import br.com.cineclub.model.Person;

@RestController
@RequestMapping("/api")
public class ApiController {

  final PersonRepository personRepository;
  final CategoryRepository categoryRepository;

  public ApiController(PersonRepository personRepository, CategoryRepository categoryRepository) {
    this.personRepository = personRepository;
    this.categoryRepository = categoryRepository;
  }

  @GetMapping("/cast")
  public List<Person> personsCast(@RequestParam(value = "search", required = false) String query) {
    if (!StringUtils.hasLength(query)) {
      return personRepository.findAll();
    }

    return personRepository.findByNameIgnoreCaseContaining(query);
  }

  @GetMapping("/categories")
  public List<Category> moviesCategories(@RequestParam(value = "search", required = false) String query) {
    if (!StringUtils.hasLength(query)) {
      return categoryRepository.findAll();
    }

    return categoryRepository.findByNameIgnoreCaseContaining(query);
  }

}
