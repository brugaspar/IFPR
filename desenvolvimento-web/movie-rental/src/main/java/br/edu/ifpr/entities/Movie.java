package br.edu.ifpr.entities;

public class Movie {

  private String name;
  private Integer stock;
  private Double price;

  public Movie() {}

  public Movie(String name, Integer stock, Double price) {
    this.name = name;
    this.stock = stock;
    this.price = price;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getStock() {
    return stock;
  }

  public void setStock(Integer stock) {
    this.stock = stock;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

}
