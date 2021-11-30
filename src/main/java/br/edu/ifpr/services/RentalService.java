package br.edu.ifpr.services;

import br.edu.ifpr.entities.Movie;
import br.edu.ifpr.entities.Rental;
import br.edu.ifpr.entities.User;
import br.edu.ifpr.utils.DateUtil;

import java.util.Date;

public class RentalService {

  public Rental movieRental(User user, Movie movie) throws Exception {
    if(user == null) {
      throw new Exception("Usuário não pode ser nulo");
    }

    if(movie == null) {
      throw new Exception("Filme não pode ser nulo");
    }

    if(movie.getStock() == 0) {
      throw new Exception("Não é possível alugar filme sem estoque");
    }


    Rental rental = new Rental();

    rental.setMovie(movie);
    rental.setUser(user);
    rental.setRentalDate(new Date());
    rental.setAmount(movie.getPrice());

    Date returnDate = new Date();
    returnDate = DateUtil.addDays(returnDate, 1);

    rental.setReturnDate(returnDate);

    // TODO: add save method to rental
    // TODO: remove stock from movie

    return rental;
  }

  public static void main(String[] args) {

  }

}
