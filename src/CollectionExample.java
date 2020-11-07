import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public class CollectionExample {
  public static void main(String[] args) throws Exception {
    String[] colors = { "Magenta", "Red", "White", "Blue", "Cyan" };

    List<String> list = new ArrayList<String>();

    for (String color : colors) {
      list.add(color);
    }

    String[] removeColors = { "Red", "White", "Blue" };

    List<String> removeList = new ArrayList<String>();

    for (String color : removeColors) {
      removeList.add(color);
    }

    System.out.println("\nArrayList: ");

    for (int i = 0; i < list.size(); i++) {
      System.out.println(list.get(i));
    }

    removeColors(list, removeList);

    System.out.println("\nArrayList depois de chamar removeColors(): ");

    for (String color : list) {
      System.out.println(color + " ");
    }

    String[] addColors = { "Green", "Yellow", "Black" };

    for (String color : addColors) {
      list.add(color);
    }

    System.out.println("\nArrayList com as novas cores: ");

    for (String color : list) {
      System.out.println(color + " ");
    }
  }

  private static void removeColors(Collection<String> collection1, Collection<String> collection2) {
    Iterator<String> iterator = collection1.iterator();

    while (iterator.hasNext()) {
      if (collection2.contains(iterator.next())) {
        iterator.remove();
      }
    }
  }
}
