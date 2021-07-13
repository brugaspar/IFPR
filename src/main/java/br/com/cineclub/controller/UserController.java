package br.com.cineclub.controller;

import br.com.cineclub.dao.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import br.com.cineclub.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/users")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/new")
  public String newForm(Model model) {
    User user = new User();
    model.addAttribute("user", user);
    return "user/keepUser";
  }

  @GetMapping(value = "/edit/{id}")
  public String edit(@PathVariable Long id, Model model) {
    User user = userRepository.findUserById(id);

    model.addAttribute("user", user);

    return "user/keepUser";
  }

  @GetMapping("/list")
  public String list(Model model) {
    List<User> users = userRepository.findAll();
    model.addAttribute("userList", users);
    return "user/list";
  }

  @GetMapping(value = "/delete/{id}")
  public String delete(@PathVariable Long id) {
    userRepository.deleteById(id);

    return "redirect:/users/list";
  }

  @PostMapping("/save")
  public String save(@Valid User user, BindingResult result, Model model) {
    if (result.hasErrors())
      return "user/keepUser";

    User storedUser = userRepository.findUserById(user.getId());

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    if(!passEncoder.matches(user.getOldPassword(), storedUser.getPassword())) {
      return "user/keepUser";
    }

    user.setPassword(passEncoder.encode(user.getPassword()));

    userRepository.save(user);

    return "redirect:/users/list";
  }

}