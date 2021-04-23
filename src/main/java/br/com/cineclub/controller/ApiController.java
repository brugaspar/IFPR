package br.com.cineclub.controller;

import java.util.List;

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

  public ApiController(PersonRepository personRepository) {
    this.personRepository = personRepository;
  }

  @GetMapping("/cast")
  public List<Person> pessoasElenco(@RequestParam(value = "search", required = false) String query) {
    if (!StringUtils.hasLength(query)) {
      return personRepository.findAll();
    }

    return personRepository.findByNameIgnoreCaseContaining(query);
  }

}
