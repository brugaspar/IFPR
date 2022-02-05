package patterns.singleton;

public class ClientSiteConfiguration {
  public static void main(String[] args) {
    // First call to SiteConfiguration
    SiteConfiguration configuration = SiteConfiguration.getInstance();
    configuration.showVisitorsCount();
    System.out.println("Configuration 1: " + configuration.getTitle() + " - " + configuration.getSubtitle() + " - " + configuration.getEmail());

    // Second call to SiteConfiguration
    SiteConfiguration configuration2 = SiteConfiguration.getInstance();
    System.out.println("Configuration 2: " + configuration2.getTitle() + " - " + configuration2.getSubtitle() + " - " + configuration2.getEmail());

    // Third call to SiteConfiguration
    SiteConfiguration configuration3 = SiteConfiguration.getInstance();

    configuration3.showVisitorsCount(); // Should show 3 visitors
    configuration.showVisitorsCount(); // Should show 3 visitors
  }
}
