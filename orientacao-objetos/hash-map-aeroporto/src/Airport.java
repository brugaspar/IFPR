import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

public class Airport {
  public static void main(String[] args) {
    Airport airport = new Airport();
    airport.run();
  }

  public void run() {
    HashMap<String, String> airportsList = new HashMap<String, String>();

    BufferedReader reader = null;

    String airportCSV = "aeroportos.csv";
    String line = "";
    String dividerCSV = ";";

    try {
      reader = new BufferedReader(new FileReader(airportCSV));

      while ((line = reader.readLine()) != null) {
        String[] list = line.split(dividerCSV);

        airportsList.put(list[list.length - 2], (list[list.length - 1]).trim());
      }

      System.out.println("\nConteúdo do HashMap com Aeroportos: ");

      System.out.println("\n" + airportsList + "\n");
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      if (reader != null) {
        try {
          reader.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
  }
}