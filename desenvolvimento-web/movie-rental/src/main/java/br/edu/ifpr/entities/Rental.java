package br.edu.ifpr.entities;

import java.util.Date;
import java.util.List;

public class Rental {

  private User user;
  private List<Movie> movies;

  private Date rentalDate;
  private Date returnDate;
  private Double amount;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Date getRentalDate() {
    return rentalDate;
  }

  public void setRentalDate(Date rentalDate) {
    this.rentalDate = rentalDate;
  }

  public Date getReturnDate() {
    return returnDate;
  }

  public void setReturnDate(Date returnDate) {
    this.returnDate = returnDate;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public List<Movie> getMovies() {
    return movies;
  }

  public void setMovies(List<Movie> movies) {
    this.movies = movies;
  }

}
