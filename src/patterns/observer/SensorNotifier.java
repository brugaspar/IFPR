package patterns.observer;

import java.util.ArrayList;
import java.util.List;

public class SensorNotifier {
  private final List<Observer> observers = new ArrayList<>();

  public void attach(Observer observer) {
    this.observers.add(observer);
  }

  public void remove(Observer observer) {
    this.observers.remove(observer);
  }

  private void notifyAllObservers(int lumens) {
    for(Observer observer : observers) {
      observer.update(lumens);
    }
  }

  public void updateLumens(int lumens) {
    System.out.println("\nQuantidade de lúmens atualizada para: " + lumens);
    notifyAllObservers(lumens);
  }
}
