package controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

import models.DAOVehicle;
import models.Vehicle;

public class ManageVehicle {
  Scanner scanner;
  DAOVehicle vehicleDAO;

  public ManageVehicle() {
    scanner = new Scanner(System.in);
    vehicleDAO = new DAOVehicle();
  }

  public void vehicleMenu() {
    int option = -1;

    while (option != 0) {
      System.out.println("\n------- Gerenciamento de Veículos -------\n");
      System.out.println("[1] Cadastrar.");
      System.out.println("[2] Editar.");
      System.out.println("[3] Listar.");
      System.out.println("[4] Consultar por código.");
      System.out.println("[5] Excluir por código.");
      System.out.println("[0] Voltar ao menu principal.");
      System.out.print("-> ");

      try {
        option = Integer.parseInt(scanner.nextLine());
      } catch (Exception e) {
        System.out.println("Erro interno, tente novamente!");
      }

      switch (option) {
        case 0:
          break;
        case 1:
          store();
          break;
        case 2:
          update();
          break;
        case 3:
          index();
          break;
        case 4:
          show();
          break;
        case 5:
          delete();
          break;
        default:
          System.out.println("Opção inválida, tente novamente!");
          break;
      }
    }
  }

  public void store() {
    Vehicle vehicle = new Vehicle();

    System.out.println("\n------- Veículo -------\n");

    System.out.print("Marca: ");
    vehicle.setBrand(scanner.nextLine());

    System.out.print("Modelo: ");
    vehicle.setModel(scanner.nextLine());

    System.out.print("Chassis: ");
    vehicle.setChassis(scanner.nextLine());

    System.out.print("Ano: ");
    vehicle.setYear(Integer.parseInt(scanner.nextLine()));

    boolean storedVehicle = vehicleDAO.store(vehicle);

    if (storedVehicle) {
      System.out.println("\nCadastrado com sucesso!");
    }
  }

  public void update() {
    Vehicle vehicle = new Vehicle();
    int option = -1;

    System.out.println("\n------- Veículo -------");

    System.out.print("\n[1] Buscar por código ou [2] Listar veículos? ");
    option = Integer.parseInt(scanner.nextLine());

    if (option == 2) {
      this.index();
    }

    System.out.print("\nQual o código do veículo que deseja editar? ");
    vehicle.setId(Integer.parseInt(scanner.nextLine()));

    System.out.println("\nPressione [Enter] para continuar...");
    scanner.nextLine();

    System.out.print("Marca: ");
    vehicle.setBrand(scanner.nextLine());

    System.out.print("Modelo: ");
    vehicle.setModel(scanner.nextLine());

    System.out.print("Chassis: ");
    vehicle.setChassis(scanner.nextLine());

    System.out.print("Ano: ");
    String year = scanner.nextLine();

    if (year == null || year == "") {
      vehicle.setYear(0);
    } else {
      vehicle.setYear(Integer.parseInt(year));
    }

    boolean updatedVehicle = vehicleDAO.update(vehicle);

    if (updatedVehicle) {
      System.out.println("\nEditado com sucesso!");
    }
  }

  public void show() {
    Vehicle vehicle = new Vehicle();

    int option = -1;

    System.out.println("\n------- Veículo -------");

    System.out.print("\n[1] Buscar por código ou [2] Listar veículos? ");
    option = Integer.parseInt(scanner.nextLine());

    if (option == 2) {
      this.index();
    }

    System.out.print("\nQual o código do veículo que deseja consultar? ");
    vehicle.setId(Integer.parseInt(scanner.nextLine()));

    ArrayList<Vehicle> vehicles = vehicleDAO.show(vehicle);

    Iterator<Vehicle> iterator = vehicles.iterator();

    while (iterator.hasNext()) {
      Vehicle storedVehicle = iterator.next();

      System.out.println("\nCódigo: " + storedVehicle.getId());
      System.out.println("Marca: " + storedVehicle.getBrand());
      System.out.println("Modelo: " + storedVehicle.getModel());
      System.out.println("Chassis: " + storedVehicle.getChassis());
      System.out.println("Ano: " + storedVehicle.getYear());
    }
  }

  public void index() {
    ArrayList<Vehicle> vehicleList = vehicleDAO.index();

    Iterator<Vehicle> iterator = vehicleList.iterator();

    while (iterator.hasNext()) {
      Vehicle vehicle = iterator.next();

      System.out.println("\nCódigo: " + vehicle.getId());
      System.out.println("Marca: " + vehicle.getBrand());
      System.out.println("Modelo: " + vehicle.getModel());
      System.out.println("Chassis: " + vehicle.getChassis());
      System.out.println("Ano: " + vehicle.getYear());
    }
  }

  public void delete() {
    Vehicle vehicle = new Vehicle();
    int option = -1;

    System.out.println("\n------- Veículo -------");

    System.out.print("\n[1] Buscar por código ou [2] Listar veículos? ");
    option = Integer.parseInt(scanner.nextLine());

    if (option == 2) {
      this.index();
    }

    System.out.print("\nQual o código do veículo que deseja excluir? ");
    vehicle.setId(Integer.parseInt(scanner.nextLine()));

    System.out.println("\nPressione [Enter] para continuar...");
    scanner.nextLine();

    boolean deleted = vehicleDAO.delete(vehicle);

    if (deleted) {
      System.out.println("Excluído com sucesso!");
    }
  }
}