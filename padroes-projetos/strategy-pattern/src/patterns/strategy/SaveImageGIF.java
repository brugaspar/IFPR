package patterns.strategy;

public class SaveImageGIF implements SaveImageStrategy {
  public void save() {
    System.out.println("Saving image in GIF...");
  }
}
