package br.com.ifpr.codes;

import java.util.Scanner;

public class Main {
  private Airline airline;
  private Scanner scanner;

  public static void main(String[] args) throws Exception {
    Main company = new Main();

    company.airline = new Airline();

    company.scanner = new Scanner(System.in);

    System.out.println("\n----- Companhia Aérea -----\n");

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
      System.out.println("\n---------------------------");
      System.out.println("[1] Cadastrar novo vôo");
      System.out.println("[2] Listar vôos existentes");
      System.out.println("[3] Consultar vôo");
      System.out.println("[4] Listar companhias");
      System.out.println("[5] Sair");
      System.out.println("---------------------------");
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
          // showFlight();
          break;
        case "4":
          // listAirlines();
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

      Boolean isInternational = true;

      System.out.println("\n------- Novo Vôo -------\n");

      System.out.print("Informe o número do vôo: ");
      flight.setFlightNumber(this.scanner.nextLine());

      System.out.print("Informe o número do avião: ");
      flight.setAirplaneNumber(this.scanner.nextLine());

      System.out.print("Informe o local de origem: ");
      flight.setOrigin(this.scanner.nextLine());

      System.out.print("Informe o local de destino: ");
      flight.setDestination(this.scanner.nextLine());

      System.out.print("Vôo internacional? [S/N] ");
      String option = this.scanner.nextLine();
      switch (option) {
        case "S":
        case "s":
          flight.setIsInternational(isInternational);
          break;
        case "N":
        case "n":
          flight.setIsInternational(!isInternational);
          break;
        default:
          System.out.println("\nOps! Opção inválida.");
          flight.setIsInternational(!isInternational);
          break;
      }

      System.out.println("\n------- Passageiros -------");

      for (int i = 0; i < 10; i++) {
        System.out.print("\nInforme o nome: [Vazio para sair] ");
        String passengerName = this.scanner.nextLine();

        if (passengerName.equals("")) {
          break;
        }

        Passenger passenger = new Passenger();

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
    Flight flight = new Flight();

    System.out.println(flight.getAirplaneNumber());
    System.out.println(flight.getVetPassenger(0));

    System.out.println(this.airline.getVetFlights(0));
  }

  public void clearBuffer(Scanner scanner) {
    if (scanner.hasNextLine()) {
      scanner.nextLine();
    }
  }
}