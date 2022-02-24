package patterns.strategy;

public class Context {
  private SaveImageStrategy strategy;

  public void setStrategy(SaveImageStrategy strategy) {
    this.strategy = strategy;
  }

  public void execute() {
    strategy.save();
  }
}
