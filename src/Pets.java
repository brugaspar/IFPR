import java.util.ArrayList;
import java.util.Scanner;

public class Pets {
  ArrayList<ArrayList<String>> list = new ArrayList<ArrayList<String>>();
  Scanner scanner;

  public static void main(String[] args) {
    Pets main = new Pets();

    main.menu();
  }

  public void menu() {
    this.scanner = new Scanner(System.in);

    int option = 0;

    while (option != 3) {
      System.out.println("\nCadastro e Listagem de pets: ");

      System.out.println("1 - Cadastrar");
      System.out.println("2 - Listar");
      System.out.println("3 - Sair");
      System.out.print("-> ");
      option = this.scanner.nextInt();

      switch (option) {
        case 1:
          newPet();
          break;
        case 2:
          listPets();
          break;
        case 3:
          break;
        default:
          break;
      }
    }
  }

  public void newPet() {
    ArrayList<String> pets = new ArrayList<String>();

    String name, type, color, age;

    this.scanner.nextLine();

    System.out.println("\nNome: ");
    name = this.scanner.nextLine();

    System.out.println("\nTipo: ");
    type = this.scanner.nextLine();

    System.out.println("\nCor: ");
    color = this.scanner.nextLine();

    System.out.println("\nIdade: ");
    age = this.scanner.nextLine();

    pets.add("Nome: " + name + "; Tipo: " + type + "; Cor: " + color + "; Idade: " + age);

    this.list.add(pets);
  }

  public void listPets() {
    System.out.println("\nListagem de pets:\n");

    for (ArrayList<String> pet : list) {
      System.out.println(pet);
    }
  }
}