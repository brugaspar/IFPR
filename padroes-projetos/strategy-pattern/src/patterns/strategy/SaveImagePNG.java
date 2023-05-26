package patterns.strategy;

public class SaveImagePNG implements SaveImageStrategy {
  public void save() {
    System.out.println("Saving image in PNG...");
  }
}
