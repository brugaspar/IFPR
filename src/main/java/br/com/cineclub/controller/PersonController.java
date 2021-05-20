package br.com.cineclub.controller;

import javax.validation.Valid;

import br.com.cineclub.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import br.com.cineclub.dao.PersonRepository;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/persons")
public class PersonController {

  final PersonRepository personRepository;

  @Value("${api.moviedb.key}")
  private String apiKey;

  @Autowired
  private RestTemplate apiRequest;

  public PersonController(PersonRepository personRepository) {
    this.personRepository = personRepository;
  }

  @GetMapping("/list")
  public String list(Model model) {
    model.addAttribute("personList", personRepository.findAll());

    return "person/list";
  }

  @GetMapping("/new")
  public String newForm(Model model) {
    Person p = new Person();
    model.addAttribute("person", p);

    return "person/keepPerson";
  }

  @GetMapping("/delete/{id}")
  public String delete(@PathVariable Long id) {
    personRepository.deletePerson(id);

    return "redirect:/persons/list";
  }

  @GetMapping("/edit/{id}")
  public String edit(@PathVariable Long id, Model model) {
    Person p = personRepository.findById(id).get();
    model.addAttribute("person", p);

    String personUrl =
            "https://api.themoviedb.org/3/search/person?api_key=" +  apiKey +
                    "&query=" + p.getName();

    WrapperPersonSearch searchResult = apiRequest.getForObject(personUrl, WrapperPersonSearch.class);
    assert searchResult != null;
    PersonDB  persondb = searchResult.getResults().get(0);

    p.setPersonDB(persondb);

    return "person/keepPerson";
  }

  @PostMapping("/save")
  public String save(@Valid Person person, BindingResult result, Model model) {
    if (result.hasErrors()) return "person/keepPerson";

    personRepository.save(person);

    return "redirect:/persons/list";
  }
}
