import java.util.ArrayList;
import java.util.List;

public class App {
  List<Bibliography> bibliographyList = new ArrayList<>();

  public static void main(String[] args) {
    App app = new App();

    Book book = new Book(158);
    Magazine magazine = new Magazine(22);
    Article article = new Article(40);

    app.addToBibliography(book);
    app.addToBibliography(magazine);
    app.addToBibliography(article);

    int totalPages = app.calculateTotalPages();

    System.out.println("\nBibliografias adicionadas: " + app.bibliographyList.size());
    System.out.println("Total de páginas: " + totalPages);
  }

  public void addToBibliography(Bibliography bibliography) {
    bibliographyList.add(bibliography);
  }

  public int calculateTotalPages() {
    int pages = 0;

    for(Bibliography bibliography : bibliographyList) {
      pages += bibliography.getPages();
    }

    return pages;
  }
}
