package patterns.observer;

public abstract class Observer {
  protected SensorNotifier notifier;
  public abstract void update(int lumens);
}
