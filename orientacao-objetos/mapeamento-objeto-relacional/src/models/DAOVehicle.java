package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import database.LoadDriver;

public class DAOVehicle {
  private Connection connection = null;
  private Statement statement = null;

  private void connect() {
    try {
      connection = LoadDriver.createConnection();
    } catch (ClassNotFoundException e) {
      System.out.println("\nClass Exception Error: " + e.getMessage());
    } catch (SQLException e) {
      System.out.println("\nSQLException Error: " + e.getMessage());
    }
  }

  private void disconnect() {
    try {
      connection.close();
    } catch (SQLException e) {
      System.out.println("\nSQLException Error: " + e.getMessage());
    }
  }

  public boolean store(Vehicle vehicle) {
    boolean result = false;

    try {
      connect();

      String sql = "INSERT INTO vehicle VALUES (NULL, ?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, vehicle.getBrand());
            preparedStatement.setString(2, vehicle.getModel());
            preparedStatement.setString(3, vehicle.getChassis());
            preparedStatement.setInt(4, vehicle.getYear());
            
            preparedStatement.execute();
        }

      result = true;
    } catch (SQLException e) {
      System.out.println("SQLException when inserting into vehicle: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }

  public boolean update(Vehicle vehicle) {
    boolean result = false;

    try {
      connect();

      String sql = "UPDATE vehicle SET brand = ?, model = ?, chassis = ?, year = ? WHERE id = ?";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, vehicle.getBrand());
            preparedStatement.setString(2, vehicle.getModel());
            preparedStatement.setString(3, vehicle.getChassis());
            preparedStatement.setInt(4, vehicle.getYear());
            preparedStatement.setInt(5, vehicle.getId());
            
            preparedStatement.execute();
        }

      result = true;
    } catch (SQLException e) {
      System.out.println("SQLException when updating vehicle: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }

  public ArrayList<Vehicle> index() {
    ArrayList<Vehicle> results = new ArrayList<>();

    try {
      connect();

      String sql = "SELECT * FROM vehicle";

      statement = connection.createStatement();
        try (ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                Vehicle vehicle = new Vehicle();
                
                vehicle.setId(resultSet.getInt("id"));
                vehicle.setBrand(resultSet.getString("brand"));
                vehicle.setModel(resultSet.getString("model"));
                vehicle.setChassis(resultSet.getString("chassis"));
                vehicle.setYear(resultSet.getInt("year"));
                
                results.add(vehicle);
            }
            
            statement.close();
        }
    } catch (SQLException e) {
      System.out.println("SQLException when selecting vehicles: " + e.getMessage());
    } finally {
      disconnect();
    }

    return results;
  }

  public ArrayList<Vehicle> show(Vehicle vehicle) {
    ArrayList<Vehicle> result = new ArrayList<>();

    try {
      connect();

      String sql = "SELECT * FROM vehicle WHERE id = " + vehicle.getId();

      statement = connection.createStatement();

        try (ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                Vehicle storedVehicle = new Vehicle();
                
                storedVehicle.setId(resultSet.getInt("id"));
                storedVehicle.setBrand(resultSet.getString("brand"));
                storedVehicle.setModel(resultSet.getString("model"));
                storedVehicle.setChassis(resultSet.getString("chassis"));
                storedVehicle.setYear(resultSet.getInt("year"));
                
                result.add(storedVehicle);
            }
            
            statement.close();
        }
    } catch (SQLException e) {
      System.out.println("SQLException when selecting vehicle: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }

    public ArrayList<Vehicle> findByFilter(String field, String filter) {
    ArrayList<Vehicle> results = new ArrayList<>();

    if(!field.equals("brand") && !field.equals("model")) {
        return results;
    }
    
    try {
      connect();

      String sql = "SELECT * FROM vehicle " + " where " + field + " like '%" + filter + "%'";

      statement = connection.createStatement();
      
        try (ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                Vehicle vehicle = new Vehicle();

                vehicle.setId(resultSet.getInt("id"));
                vehicle.setBrand(resultSet.getString("brand"));
                vehicle.setModel(resultSet.getString("model"));
                vehicle.setChassis(resultSet.getString("chassis"));
                vehicle.setYear(resultSet.getInt("year"));

                results.add(vehicle);
            }

            statement.close();
        }
    } catch (SQLException e) {
      System.out.println("SQLException when selecting vehicles: " + e.getMessage());
    } finally {
      disconnect();
    }

    return results;
  }
  
  public boolean delete(int id) {
    boolean result = false;

    try {
      connect();

      String sql = "DELETE FROM vehicle WHERE id = ?";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);
            
            preparedStatement.execute();
        }

      result = true;
    } catch (SQLException e) {
      System.out.println("SQLException when deleting vehicle: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }
}