package models;

public class Vehicle {
  private int id;
  private String brand;
  private String model;
  private String chassis;
  private int year;

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getBrand() {
    return this.brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getModel() {
    return this.model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public String getChassis() {
    return this.chassis;
  }

  public void setChassis(String chassis) {
    this.chassis = chassis;
  }

  public int getYear() {
    return this.year;
  }

  public void setYear(int year) {
    this.year = year;
  }
}