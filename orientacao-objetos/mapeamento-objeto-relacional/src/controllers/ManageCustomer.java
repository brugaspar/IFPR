package controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

import models.Customer;
import models.DAOCustomer;

public class ManageCustomer {
  Scanner scanner;
  DAOCustomer customerDAO;

  public ManageCustomer() {
    scanner = new Scanner(System.in);
    customerDAO = new DAOCustomer();
  }

  public void customerMenu() {
    int option = -1;

    while (option != 0) {
      System.out.println("\n------- Gerenciamento de Clientes -------\n");
      System.out.println("[1] Cadastrar.");
      System.out.println("[2] Editar.");
      System.out.println("[3] Listar.");
      System.out.println("[4] Consultar por código.");
      System.out.println("[5] Excluir por código.");
      System.out.println("[0] Voltar ao menu principal.");
      System.out.print("-> ");

      try {
        option = Integer.parseInt(scanner.nextLine());
      } catch (NumberFormatException e) {
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
    Customer customer = new Customer();

    System.out.println("\n------- Cliente -------\n");

    System.out.print("Nome: ");
    customer.setName(scanner.nextLine());

    System.out.print("E-mail: ");
    customer.setEmail(scanner.nextLine());

    System.out.print("Telefone: ");
    customer.setPhone(scanner.nextLine());

    System.out.print("Documento: ");
    customer.setDocNumber(scanner.nextLine());

    boolean storedCustomer = customerDAO.store(customer);

    if (storedCustomer) {
      System.out.println("\nCadastrado com sucesso!");
    }
  }

  public void update() {
    Customer customer = new Customer();
    int option = -1;

    System.out.println("\n------- Cliente -------");

    System.out.print("\n[1] Buscar por código ou [2] Listar clientes? ");
    option = Integer.parseInt(scanner.nextLine());

    if (option == 2) {
      this.index();
    }

    System.out.print("\nQual o código do cliente que deseja editar? ");
    customer.setId(Integer.parseInt(scanner.nextLine()));

    System.out.println("\nPressione [Enter] para continuar...");
    scanner.nextLine();

    System.out.print("Nome: ");
    customer.setName(scanner.nextLine());

    System.out.print("E-mail: ");
    customer.setEmail(scanner.nextLine());

    System.out.print("Telefone: ");
    customer.setPhone(scanner.nextLine());

    System.out.print("Documento: ");
    customer.setDocNumber(scanner.nextLine());

    boolean updateCustomer = customerDAO.update(customer);

    if (updateCustomer) {
      System.out.println("\nEditado com sucesso!");
    }
  }

  public void show() {
    Customer customer = new Customer();

    int option = -1;

    System.out.println("\n------- Cliente -------");

    System.out.print("\n[1] Buscar por código ou [2] Listar clientes? ");
    option = Integer.parseInt(scanner.nextLine());

    if (option == 2) {
      this.index();
    }

    System.out.print("\nQual o código do cliente que deseja consultar? ");
    customer.setId(Integer.parseInt(scanner.nextLine()));

    ArrayList<Customer> customers = customerDAO.show(customer);

    Iterator<Customer> iterator = customers.iterator();

    while (iterator.hasNext()) {
      Customer storedCustomer = iterator.next();

      System.out.println("\nCódigo: " + storedCustomer.getId());
      System.out.println("Nome: " + storedCustomer.getName());
      System.out.println("E-mail: " + storedCustomer.getEmail());
      System.out.println("Telefone: " + storedCustomer.getPhone());
      System.out.println("Documento: " + storedCustomer.getDocNumber());
    }
  }

  public void index() {
    ArrayList<Customer> customerList = customerDAO.index();

    Iterator<Customer> iterator = customerList.iterator();

    while (iterator.hasNext()) {
      Customer customer = iterator.next();

      System.out.println("\nCódigo: " + customer.getId());
      System.out.println("Nome: " + customer.getName());
      System.out.println("E-mail: " + customer.getEmail());
      System.out.println("Telefone: " + customer.getPhone());
      System.out.println("Documento: " + customer.getDocNumber());
    }
  }

  public void delete() {
    Customer customer = new Customer();
    int option = -1;

    System.out.println("\n------- Cliente -------");

    System.out.print("\n[1] Buscar por código ou [2] Listar clientes? ");
    option = Integer.parseInt(scanner.nextLine());

    if (option == 2) {
      this.index();
    }

    System.out.print("\nQual o código do cliente que deseja excluir? ");
    customer.setId(Integer.parseInt(scanner.nextLine()));

    System.out.println("\nPressione [Enter] para continuar...");
    scanner.nextLine();

    boolean deleted = customerDAO.delete(customer.getId());

    if (deleted) {
      System.out.println("Excluído com sucesso!");
    }
  }
}