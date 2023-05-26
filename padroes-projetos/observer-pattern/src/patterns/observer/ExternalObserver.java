package patterns.observer;

public class ExternalObserver extends Observer {
  public ExternalObserver(SensorNotifier notifier) {
    this.notifier = notifier;
    this.notifier.attach(this);
  }

  public void update(int lumens) {
    System.out.println("\nOBSERVADOR EXTERNO\n");

    if (lumens > 200) {
      System.out.println("Desligando todas as lâmpadas externas da casa...");
    } else if (lumens <= 50) {
      System.out.println("Ligando todas as lâmpadas externas da casa...");
    } else {
      System.out.println("Ligando apenas as lâmpadas de LED externas da casa...");
    }
  }
}
