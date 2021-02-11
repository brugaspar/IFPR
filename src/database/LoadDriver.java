package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class LoadDriver {
    private static Connection connection = null;

    public static Connection createConnection() throws ClassNotFoundException, SQLException {
        String user = "admin";
        String password = "admin";
        String url = "jdbc:mysql://localhost:3306/car_rental?user=" + user + "&password=" + password + "&useTimezone=true&serverTimezone=UTC";

        Class.forName("com.mysql.cj.jdbc.Driver");

        connection = DriverManager.getConnection(url);

        return connection;
    }
}