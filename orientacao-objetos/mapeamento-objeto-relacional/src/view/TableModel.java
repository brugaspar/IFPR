package view;

import java.util.ArrayList;
import javax.swing.table.AbstractTableModel;

import models.Customer;

public class TableModel extends AbstractTableModel {
    public static final int COLUMN_ID = 0;
    public static final int COLUMN_NAME = 1;
    public static final int COLUMN_EMAIL = 2;
    public static final int COLUMN_PHONE = 3;
    public static final int COLUMN_DOCUMENT = 4;
    
    public ArrayList<Customer> customersList;
    
    public TableModel(ArrayList<Customer> customersArray) {
        customersList = new ArrayList<>(customersArray);
    } 
    
    @Override
    public int getRowCount() {
        return customersList.size();
    }

    @Override
    public int getColumnCount() {
        return 5;
    }

    @Override
    public Object getValueAt(int rowIndex, int columnIndex) {
        Customer customer = customersList.get(rowIndex);
        
        if(columnIndex == COLUMN_ID) {
            return customer.getId();
        } 
        
        if(columnIndex == COLUMN_NAME) {
            return customer.getName();
        } 
        
        if(columnIndex == COLUMN_EMAIL) {
            return customer.getEmail();
        } 
        
        if(columnIndex == COLUMN_PHONE) {
            return customer.getPhone();
        } 
        
        if(columnIndex == COLUMN_DOCUMENT) {
            return customer.getDocNumber();
        } 
        
        return "";
    }
    
    @Override
    public String getColumnName(int columnIndex) {
        if(columnIndex == COLUMN_ID) {
            return "Código";
        } 
        
        if(columnIndex == COLUMN_NAME) {
            return "Nome";
        } 
        
        if(columnIndex == COLUMN_EMAIL) {
            return "E-mail";
        } 
        
        if(columnIndex == COLUMN_PHONE) {
            return "Telefone";
        } 
        
        if(columnIndex == COLUMN_DOCUMENT) {
            return "Documento";
        } 
        
        return "";
    }
    
}
