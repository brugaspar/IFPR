package br.com.cineclub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NavigationController {

  @RequestMapping("/")
  public String index() {
    return "index";
  }

}
