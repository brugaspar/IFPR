import java.util.ArrayList;
import java.util.Scanner;

public class Main {
  ArrayList<Pet> list = new ArrayList<Pet>();
  Scanner scanner;

  public static void main(String[] args) {
    Main main = new Main();

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
    Pet pet = new Pet();

    this.scanner.nextLine();

    System.out.println("\nNome: ");
    pet.setName(this.scanner.nextLine());

    System.out.println("\nTipo: ");
    pet.setType(this.scanner.nextLine());

    System.out.println("\nCor: ");
    pet.setColor(this.scanner.nextLine());

    System.out.println("\nIdade: ");
    pet.setAge(this.scanner.nextInt());

    this.list.add(pet);
  }

  public void listPets() {
    System.out.println("\nListagem de pets:\n");

    for (Pet pet : list) {
      String petData = "\nNome: " + pet.getName() + " | Tipo: " + pet.getType() + " | Cor: " + pet.getColor()
          + " | Idade: " + pet.getAge();

      System.out.println(petData);
    }
  }
}