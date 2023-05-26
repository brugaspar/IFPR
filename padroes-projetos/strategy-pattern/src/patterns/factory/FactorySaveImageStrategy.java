package patterns.factory;

import patterns.strategy.*;

public class FactorySaveImageStrategy {
  public SaveImageStrategy createStrategy(String format) {
    SaveImageStrategy strategy = null;

    switch (format) {
      case "JPG" -> {
        strategy = new SaveImageJPG();
      }
      case "GIF" -> {
        strategy = new SaveImageGIF();
      }
      case "BMP" -> {
        strategy = new SaveImageBMP();
      }
      default -> {
        strategy = new SaveImagePNG();
      }
    }

    return strategy;
  }
}
