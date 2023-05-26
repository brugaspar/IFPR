package patterns.observer;

public class InternalObserver extends Observer {
  public InternalObserver(SensorNotifier notifier) {
    this.notifier = notifier;
    this.notifier.attach(this);
  }

  public void update(int lumens) {
    System.out.println("\nOBSERVADOR INTERNO\n");

    if (lumens > 300) {
      System.out.println("Desligando todas as lâmpadas internas da casa...");
    } else if (lumens < 100) {
      System.out.println("Ligando todas as lâmpadas internas da casa...");
    } else {
      System.out.println("Ligando metade das lâmpadas internas da casa...");
    }
  }
}
