package br.com.ifpr.codes;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Scanner;

public class Main {
  private Airline airline;
  private Scanner scanner;

  public static void main(String[] args) throws Exception {
    Main company = new Main();

    company.airline = new Airline();

    company.scanner = new Scanner(System.in);

    System.out.println("\n------ Companhia Aérea ------\n");

    System.out.print("Informe o nome: ");
    company.airline.setName(company.scanner.nextLine());

    System.out.print("Informe o telefone: ");
    company.airline.setTelephone(company.scanner.nextLine());

    System.out.print("Informe o e-mail: ");
    company.airline.setEmail(company.scanner.nextLine());

    company.menu();
  }

  public void menu() throws Exception {
    String option = "";

    while (!option.equals("5")) {
      System.out.println("\n------------------------------");
      System.out.println("[1] Cadastrar novo vôo");
      System.out.println("[2] Listar vôos existentes");
      System.out.println("[3] Consultar vôo");
      System.out.println("[4] Listar dados da companhia");
      System.out.println("[5] Sair");
      System.out.println("------------------------------");
      System.out.print("--> ");

      option = this.scanner.nextLine();

      switch (option) {
        case "1":
          newFlight();
          break;
        case "2":
          listFlights();
          break;
        case "3":
          showFlight();
          break;
        case "4":
          listAirlineInfo();
          break;
        case "5":
          System.out.println("\nEncerrando...\n");
          break;
        default:
          System.out.println("\nEita! Parece que você escolheu uma opção inválida, tente novamente.");
          break;
      }
    }
  }

  public void newFlight() {
    try {
      Flight flight = new Flight();
      SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
      Date date = new Date(System.currentTimeMillis());

      Boolean isInternational = true;

      System.out.println("\n--------- Novo Vôo ---------\n");

      System.out.print("Informe o número do vôo: ");
      flight.setFlightNumber(this.scanner.nextLine());

      System.out.print("Informe o número do avião: ");
      flight.setAirplaneNumber(this.scanner.nextLine());

      System.out.print("Informe o local de origem: ");
      flight.setOrigin(this.scanner.nextLine());

      System.out.print("Informe o local de destino: ");
      flight.setDestination(this.scanner.nextLine());

      System.out.print("Vôo internacional? [S/N] ");
      String option = this.scanner.nextLine().toUpperCase();
      switch (option) {
        case "S":
          flight.setIsInternational(isInternational);
          break;
        case "N":
          flight.setIsInternational(!isInternational);
          break;
        default:
          System.out.println("\nOps! Opção inválida.");
          flight.setIsInternational(!isInternational);
          break;
      }

      flight.setDate(formatter.format(date).toString());

      System.out.println("\n--------- Passageiros ---------");

      for (int i = 0; i < 10; i++) {
        Passenger passenger = new Passenger();

        System.out.print("\nInforme o nome: [Vazio para sair] ");

        String passengerName = this.scanner.nextLine();

        if (passengerName.equals("")) {
          break;
        }

        passenger.setName(passengerName);

        System.out.print("Informe o documento: ");
        passenger.setDocNumber(this.scanner.nextLine());

        System.out.print("Informe a nacionalidade: ");
        passenger.setNacionality(this.scanner.nextLine());

        System.out.print("Informe a idade: ");
        passenger.setAge(this.scanner.nextInt());

        flight.setVetPassenger(passenger);

        clearBuffer(this.scanner);
      }

      this.airline.setVetFlights(flight);
    } catch (Exception err) {
      System.out.println("ERROR: " + err);
    }
  }

  public void listFlights() {
    System.out.println("------------------------------");
    System.out.println("Relatorio de Vôo");

    System.out.println("\nCompanhia: " + this.airline.getName());

    for (int i = 0; i < this.airline.getFlightsCount(); i++) {
      Flight flightInfo = this.airline.getVetFlights(i);

      String flightNumber = "Vôo: " + flightInfo.getFlightNumber();

      String airplaneNumber = "Avião: " + flightInfo.getAirplaneNumber();

      String flightOrigin = "Local de origem: " + flightInfo.getOrigin();

      String flightDestination = "Local de destino: " + flightInfo.getDestination();

      String flightIsInternational = flightInfo.getIsInternational() ? "Internacional: [X]" : "Internacional: []";

      String flightDate = "Data do vôo: " + flightInfo.getDate();

      String finalFlightInfo = "\n" + flightNumber + " | " + airplaneNumber + " | " + flightOrigin + "\n"
          + flightDestination + " | " + flightIsInternational + " | " + flightDate;
      System.out.println(finalFlightInfo);
    }

    System.out.print("\nPressione enter para continuar...");
    this.scanner.nextLine();
  }

  public void showFlight() {
    try {
      System.out.println("------------------------------");
      System.out.println("Consulta de Vôo");

      System.out.print("Informe o número do Vôo: ");
      String flightNumber = this.scanner.nextLine();

      Boolean findFlight = false;

      for (int i = 0; i < this.airline.getFlightsCount(); i++) {
        Flight flightInfo = this.airline.getVetFlights(i);

        if (flightInfo.getFlightNumber().equals(flightNumber)) {
          System.out.println("\nPassageiros do Vôo: ");

          int index = 0;

          System.out.println("\nVôo: " + flightNumber);

          while (flightInfo.getVetPassenger(index) != null) {
            Passenger passengerInfo = flightInfo.getVetPassenger(index);

            String passengerName = "Nome: " + passengerInfo.getName();

            String passengerDoc = "Documento: " + passengerInfo.getDocNumber();

            String passengerNacionality = "Nacionalidade: " + passengerInfo.getNacionality();

            String passengerAge = "Idade: " + passengerInfo.getAge();

            String finalPassengerInfo = "\n" + passengerName + " | " + passengerDoc + " | " + passengerNacionality
                + " | " + passengerAge;
            System.out.println(finalPassengerInfo);

            index++;
          }

          findFlight = true;
          break;
        }
      }

      if (!findFlight) {
        System.out.println("Vôo não encontrado!");
      }

      System.out.print("\nPressione enter para continuar...");
      this.scanner.nextLine();
    } catch (Exception error) {
      System.out.println("Opa! Algo de errado não está certo.");
    }
  }

  public void listAirlineInfo() {
    System.out.println("------------------------------");
    System.out.println("Informações da Companhia");

    Airline airlineInfo = this.airline;

    String airlineName = "\nNome: " + airlineInfo.getName();

    String airlineTelephone = "Telefone: " + airlineInfo.getTelephone();

    String airlineEmail = "E-mail: " + airlineInfo.getEmail();

    String finalAirlineInfo = airlineName + " | " + airlineTelephone + " | " + airlineEmail;
    System.out.println(finalAirlineInfo);

    System.out.print("\nPressione enter para continuar...");
    this.scanner.nextLine();
  }

  public void clearBuffer(Scanner scanner) {
    if (scanner.hasNextLine()) {
      scanner.nextLine();
    }
  }
}