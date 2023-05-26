package br.edu.ifpr.services;

import br.edu.ifpr.entities.Movie;
import br.edu.ifpr.entities.Rental;
import br.edu.ifpr.entities.User;
import br.edu.ifpr.utils.DateUtil;

import java.util.Date;
import java.util.List;

public class RentalService {

  public Rental movieRental(User user, List<Movie> movies) throws Exception {
    if(user == null) {
      throw new Exception("Usuário não pode ser nulo");
    }

    if(movies == null) {
      throw new Exception("Pelo menos 1 filme obrigatório");
    }

    if(!(movies.size() > 0)) {
      throw new Exception("Pelo menos 1 filme obrigatório");
    }

    Double amount = 0.0;

    for(int i = 0; i < movies.size(); i++) {
      if(movies.get(i) == null) {
        throw new Exception("Filme não pode ser nulo");
      }

      if(movies.get(i).getStock() == 0) {
        throw new Exception("Não é possível alugar filme sem estoque");
      }

      int position = i + 1;

      if(position <= 2) {
        amount += movies.get(i).getPrice();
      }
      if(position == 3) {
        amount += movies.get(i).getPrice() - (movies.get(i).getPrice() * 0.25);
      }
      if(position == 4) {
        amount += movies.get(i).getPrice() - (movies.get(i).getPrice() * 0.5);
      }
      if(position == 5) {
        amount += movies.get(i).getPrice() - (movies.get(i).getPrice() * 0.75);
      }
      if(position == 6) {
        amount += movies.get(i).getPrice() - (movies.get(i).getPrice() * 1);
      }
    }

    Rental rental = new Rental();

    rental.setMovies(movies);
    rental.setUser(user);
    rental.setRentalDate(new Date());
    rental.setAmount(amount);

    Date returnDate = new Date();
    returnDate = DateUtil.addDays(returnDate, 1);

    if(DateUtil.verifyDayOfWeek(returnDate, 1)) {
      returnDate = DateUtil.addDays(returnDate, 1);
    }

    rental.setReturnDate(returnDate);

    // TODO: add save method to rental
    // TODO: remove stock from movie

    return rental;
  }

  public static void main(String[] args) {

  }

}
