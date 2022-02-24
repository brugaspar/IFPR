package patterns.strategy;

import patterns.factory.FactorySaveImageStrategy;

import javax.swing.*;

public class Client {
  // save an image in different formats
  // PNG, JPEG, GIF...

  public static void main(String[] args) {
    Context context = new Context();

    Object[] formats = { "PNG", "JPG", "GIF", "BMP" };

    String format = (String) JOptionPane.showInputDialog(
      null,
      "Select the image format",
      "Save Image",
      JOptionPane.INFORMATION_MESSAGE,
      null,
      formats,
      formats[0]
    );

    FactorySaveImageStrategy factory = new FactorySaveImageStrategy();
    SaveImageStrategy strategy = factory.createStrategy(format);

    context.setStrategy(strategy);

    context.execute();
  }
}
