package br.com.cineclub.controller;

import br.com.cineclub.dao.CategoryRepository;
import br.com.cineclub.model.Category;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping("/categories")
public class CategoryController {

  final CategoryRepository categoryRepository;

  public CategoryController(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  @GetMapping("/list")
  public String list(Model model) {
    model.addAttribute("categoryList", categoryRepository.findAll());

    return "category/list";
  }

  @GetMapping("/new")
  public String newForm(Model model) {
    Category p = new Category();
    model.addAttribute("category", p);

    return "category/keepCategory";
  }

  @GetMapping("/delete/{id}")
  public String delete(@PathVariable Long id) {
    categoryRepository.deleteCategory(id);

    return "redirect:/categories/list";
  }

  @GetMapping("/edit/{id}")
  public String edit(@PathVariable Long id, Model model) {
    Category p = categoryRepository.findById(id).get();
    model.addAttribute("category", p);

    return "category/keepCategory";
  }

  @PostMapping("/save")
  public String save(@Valid Category category, BindingResult result, Model model) {
    if (result.hasErrors()) return "category/keepCategory";

    categoryRepository.save(category);

    return "redirect:/categories/list";
  }

}