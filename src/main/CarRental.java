package main;

import java.util.Scanner;

import controllers.ManageCustomer;
import controllers.ManageVehicle;
import view.VehicleView;

public class CarRental {
  public static void main(String[] args) {
       new VehicleView().setVisible(true);
      
//    CarRental rental = new CarRental();

//    rental.menu
  }

  public void menu() {
    int option = -1;

    Scanner scanner = new Scanner(System.in);

    while (option != 0) {
      System.out.println("\n------- Locadora -------\n");
      System.out.println("[1] Gerenciar veículos.");
      System.out.println("[2] Gerenciar clientes.");
      System.out.println("[0] Sair do sistema.");
      System.out.print("-> ");

      try {
        option = Integer.parseInt(scanner.nextLine());
      } catch (Exception e) {
        System.out.println("Erro interno, tente novamente!");
      }

      switch (option) {
        case 0:
          System.out.println("\nEncerrando...\n");
          break;
        case 1:
          ManageVehicle manageVehicle = new ManageVehicle();
          manageVehicle.vehicleMenu();
          break;
        case 2:
          ManageCustomer manageCustomer = new ManageCustomer();
          manageCustomer.customerMenu();
        default:
          System.out.println("\nOpção inválida, tente novamente!");
          break;
      }
    }

    scanner.close();
  }
}
