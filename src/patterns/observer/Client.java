package patterns.observer;

public class Client {
  public static void main(String[] args) {
    SensorNotifier notifier = new SensorNotifier();

    new InternalObserver(notifier);
    new ExternalObserver(notifier);

    notifier.updateLumens(105);
  }
}
