package br.com.cineclub.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.cineclub.dao.UserRepository;
import br.com.cineclub.model.User;

@Service
public class UserService implements UserDetailsService {
  // Nossa service precisa implementar a interface UserDetailsService

  @Autowired
  UserRepository dao;
  // carrega do database os dados do usuario de acordo com o username fornecido
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    // ir na UsuarioRepository e consultar se o usuario existe....
    User user = dao.findByEmail(email);
    if (user==null) {
      throw new UsernameNotFoundException("Login invalido");
    }
    UsuarioDetails usd = new UsuarioDetails(user);
    return usd;

  }
}

