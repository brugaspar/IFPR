package patterns.strategy;

public class SaveImageJPG implements SaveImageStrategy {
  public void save() {
    System.out.println("Saving image in JPG...");
  }
}
