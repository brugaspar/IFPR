package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import database.LoadDriver;

public class DAOCustomer {
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

  public boolean store(Customer customer) {
    boolean result = false;

    try {
      connect();

      String sql = "INSERT INTO customer VALUES (NULL, ?, ?, ?, ?)";

      PreparedStatement preparedStatement = connection.prepareStatement(sql);

      preparedStatement.setString(1, customer.getName());
      preparedStatement.setString(2, customer.getEmail());
      preparedStatement.setString(3, customer.getPhone());
      preparedStatement.setString(4, customer.getDocNumber());

      preparedStatement.execute();
      preparedStatement.close();

      result = true;
    } catch (SQLException e) {
      System.out.println("SQLException when inserting into customer: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }

  public boolean update(Customer customer) {
    boolean result = false;

    try {
      connect();

      String sql = "UPDATE customer SET name = ?, email = ?, phone = ?, docNumber = ? WHERE id = ?";

      PreparedStatement preparedStatement = connection.prepareStatement(sql);

      preparedStatement.setString(1, customer.getName());
      preparedStatement.setString(2, customer.getEmail());
      preparedStatement.setString(3, customer.getPhone());
      preparedStatement.setString(4, customer.getDocNumber());
      preparedStatement.setInt(5, customer.getId());

      preparedStatement.execute();
      preparedStatement.close();

      result = true;
    } catch (SQLException e) {
      System.out.println("SQLException when updating customer: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }

  public ArrayList<Customer> index() {
    ArrayList<Customer> results = new ArrayList<Customer>();

    try {
      connect();

      String sql = "SELECT * FROM customer";

      statement = connection.createStatement();
      ResultSet resultSet = statement.executeQuery(sql);

      while (resultSet.next()) {
        Customer customer = new Customer();

        customer.setId(resultSet.getInt("id"));
        customer.setName(resultSet.getString("name"));
        customer.setEmail(resultSet.getString("email"));
        customer.setPhone(resultSet.getString("phone"));
        customer.setDocNumber(resultSet.getString("docNumber"));

        results.add(customer);
      }

      statement.close();
      resultSet.close();
    } catch (SQLException e) {
      System.out.println("SQLException when selecting customers: " + e.getMessage());
    } finally {
      disconnect();
    }

    return results;
  }

    public ArrayList<Customer> findByFilter(String field, String filter) {
    ArrayList<Customer> results = new ArrayList<>();

    if(!field.equals("name") && !field.equals("email")) {
        return results;
    }
    
    try {
      connect();

      String sql = "SELECT * FROM customer " + " where " + field + " like '%" + filter + "%'";

      statement = connection.createStatement();
      
        try (ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                Customer customer = new Customer();

                customer.setId(resultSet.getInt("id"));
                customer.setName(resultSet.getString("name"));
                customer.setEmail(resultSet.getString("email"));
                customer.setPhone(resultSet.getString("phone"));
                customer.setDocNumber(resultSet.getString("docNumber"));

                results.add(customer);
            }

            statement.close();
        }
    } catch (SQLException e) {
      System.out.println("SQLException when selecting customers: " + e.getMessage());
    } finally {
      disconnect();
    }

    return results;
  }  
  
  public ArrayList<Customer> show(Customer customer) {
    ArrayList<Customer> result = new ArrayList<Customer>();

    try {
      connect();

      String sql = "SELECT * FROM customer WHERE id = " + customer.getId();

      statement = connection.createStatement();

      ResultSet resultSet = statement.executeQuery(sql);

      while (resultSet.next()) {
        Customer storedCustomer = new Customer();

        storedCustomer.setId(resultSet.getInt("id"));
        storedCustomer.setName(resultSet.getString("name"));
        storedCustomer.setEmail(resultSet.getString("email"));
        storedCustomer.setPhone(resultSet.getString("phone"));
        storedCustomer.setDocNumber(resultSet.getString("docNumber"));

        result.add(storedCustomer);
      }

      statement.close();
      resultSet.close();
    } catch (SQLException e) {
      System.out.println("SQLException when selecting customer: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }

  public boolean delete(int id) {
    boolean result = false;

    try {
      connect();

      String sql = "DELETE FROM customer WHERE id = ?";

      PreparedStatement preparedStatement = connection.prepareStatement(sql);

      preparedStatement.setInt(1, id);

      preparedStatement.execute();
      preparedStatement.close();

      result = true;
    } catch (SQLException e) {
      System.out.println("SQLException when deleting customer: " + e.getMessage());
    } finally {
      disconnect();
    }

    return result;
  }
}