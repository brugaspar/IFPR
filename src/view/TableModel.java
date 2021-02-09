package view;

import java.util.ArrayList;
import javax.swing.table.AbstractTableModel;

import models.Vehicle;

public class TableModel extends AbstractTableModel {
    public static final int COLUMN_ID = 0;
    public static final int COLUMN_BRAND = 1;
    public static final int COLUMN_MODEL = 2;
    public static final int COLUMN_CHASSIS = 3;
    public static final int COLUMN_YEAR = 4;
    
    public ArrayList<Vehicle> vehiclesList;
    
    public TableModel(ArrayList<Vehicle> vehiclesArr) {
        vehiclesList = new ArrayList<Vehicle>(vehiclesArr);
    } 
    
    @Override
    public int getRowCount() {
        return vehiclesList.size();
    }

    @Override
    public int getColumnCount() {
        return 5;
    }

    @Override
    public Object getValueAt(int rowIndex, int columnIndex) {
        Vehicle vehicle = vehiclesList.get(rowIndex);
        
        if(columnIndex == COLUMN_ID) {
            return vehicle.getId();
        } 
        
        if(columnIndex == COLUMN_BRAND) {
            return vehicle.getBrand();
        } 
        
        if(columnIndex == COLUMN_MODEL) {
            return vehicle.getModel();
        } 
        
        if(columnIndex == COLUMN_CHASSIS) {
            return vehicle.getChassis();
        } 
        
        if(columnIndex == COLUMN_YEAR) {
            return vehicle.getYear();
        } 
        
        return "";
    }
    
    @Override
    public String getColumnName(int columnIndex) {
        if(columnIndex == COLUMN_ID) {
            return "Código";
        } 
        
        if(columnIndex == COLUMN_BRAND) {
            return "Marca";
        } 
        
        if(columnIndex == COLUMN_MODEL) {
            return "Modelo";
        } 
        
        if(columnIndex == COLUMN_CHASSIS) {
            return "Chassis";
        } 
        
        if(columnIndex == COLUMN_YEAR) {
            return "Ano";
        } 
        
        return "";
    }
    
}
