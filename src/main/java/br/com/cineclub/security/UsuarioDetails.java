package br.com.cineclub.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.cineclub.model.User;

public class UsuarioDetails implements UserDetails { // espelhamento da classe User mas para o Spring

  private String email; // ou username
  private String password;

  private List<GrantedAuthority> authorities; // roles (SUPERADMIN, ADMIN, USER, VISITOR, ...)

  public UsuarioDetails(User user) {
    this.email = user.getEmail();
    this.password = user.getPassword();
    this.authorities = Arrays.stream(
            user.getRoles().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
  }
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.authorities;
  }
  @Override
  public String getPassword() {
    return this.password;
  }
  @Override
  public String getUsername() {
    return this.email;
  }
  @Override
  public boolean isAccountNonExpired() {
    // TODO - get from database
    return true;
  }
  @Override
  public boolean isAccountNonLocked() {
    // TODO - get from database
    return true;
  }
  @Override
  public boolean isCredentialsNonExpired() {
    // TODO - get from database
    return true;
  }
  @Override
  public boolean isEnabled() {
    // TODO - get from database
    return true;
  }
}
