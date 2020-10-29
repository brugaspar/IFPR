package br.com.ifpr.codes;

public class Flight {
  private String flightNumber;
  private String airplaneNumber;
  private String date;
  private String origin;
  private String destination;
  private Boolean isInternational;
  private int passengersCount;
  private Passenger[] vetPassengers = {};

  public Flight() {
    this.vetPassengers = new Passenger[10];
  }

  public String getFlightNumber() {
    return this.flightNumber;
  }

  public void setFlightNumber(String flightNumber) {
    this.flightNumber = flightNumber;
  }

  public String getAirplaneNumber() {
    return this.airplaneNumber;
  }

  public void setAirplaneNumber(String airplaneNumber) {
    this.airplaneNumber = airplaneNumber;
  }

  public String getDate() {
    return this.date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getOrigin() {
    return this.origin;
  }

  public void setOrigin(String origin) {
    this.origin = origin;
  }

  public String getDestination() {
    return this.destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public Boolean getIsInternational() {
    return this.isInternational;
  }

  public void setIsInternational(Boolean isInternational) {
    this.isInternational = isInternational;
  }

  public int getPassengersCount() {
    return this.passengersCount;
  }

  public void setPassengersCount(int passengersCount) {
    this.passengersCount = passengersCount;
  }

  public Passenger getVetPassenger(int index) {
    return this.vetPassengers[index];
  }

  public void setVetPassenger(Passenger passenger) {
    this.setPassengersCount(this.getPassengersCount() + 1);

    int index = this.getPassengersCount() - 1;

    this.vetPassengers[index] = passenger;
  }
}
