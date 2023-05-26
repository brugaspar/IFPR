package patterns.strategy;

public class SaveImageBMP implements SaveImageStrategy {
  public void save() {
    System.out.println("Saving image in BMP...");
  }
}
