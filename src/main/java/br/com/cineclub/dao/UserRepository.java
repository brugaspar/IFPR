package br.com.cineclub.dao;

import br.com.cineclub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  User findUserById(Long id);

  User findByEmail(String email);

}