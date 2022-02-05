package patterns.singleton;

public class SiteConfiguration {
  private final String id;
  private final String title;
  private final String subtitle;
  private final String email;

  private static Integer visitorsCount = 0;
  private static SiteConfiguration configuration;

  private SiteConfiguration() {
    id = "[(SiteConfiguration) Singleton ID = " + System.currentTimeMillis() + "]";
    visitorsCount = 0;

    title = "Site Configuration Title";
    subtitle = "Site Configuration Subtitle";
    email = "site.configuration@email.com";
  }

  public static SiteConfiguration getInstance() {
    if(configuration == null) {
      configuration = new SiteConfiguration();
    }

    addVisitor();

    return configuration;
  }

  public static void addVisitor() {
    visitorsCount++;
  }

  public void showVisitorsCount() {
    System.out.println(id);
    System.out.println("\tQtde. de Visitantes: " + visitorsCount);
  }

  public String getTitle() {
    return title;
  }

  public String getSubtitle() {
    return subtitle;
  }

  public String getEmail() {
    return email;
  }
}
