package br.com.cineclube.controller;

import br.com.cineclube.dao.PeopleRepository;
import br.com.cineclube.model.Movie;
import br.com.cineclube.model.People;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/peoples")
public class PeopleController {

  @Autowired
  PeopleRepository repository;

  @RequestMapping("/new")
  public String newForm(Model model) {
    People people = new People();

    model.addAttribute("people", people);

    return "people/new.html";
  }

  @RequestMapping("/list")
  public String list(Model model) {
    List<People> peoplesList = repository.findAll();

    model.addAttribute("peoplesList", peoplesList);

    return "people/list.html";
  }

  @PostMapping("/save")
  public String save(People people) {
    repository.save(people);

    return "redirect:/peoples/list";
  }

  @GetMapping(value = "/delete/{id}")
  public String delete(@PathVariable Long id) {
    repository.deleteById(id);

    return "redirect:/peoples/list";
  }

  @GetMapping(value = "/edit/{id}")
  public String edit(@PathVariable Long id, Model model) {
    People people = repository.getOne(id);

    model.addAttribute("people", people);

    return "people/new.html";
  }

}