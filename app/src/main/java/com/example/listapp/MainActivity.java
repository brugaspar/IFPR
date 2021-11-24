package com.example.listapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.graphics.Color;
import android.os.Bundle;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener, ActionMode.Callback, ItemDialog.OnItemListener {

    private ListView list;
    private ItemAdapter adapter;
    private int selectedItem;
    private String selectedItemName;
    private boolean insertMode;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = findViewById(R.id.toolbar);
//        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(v -> {
            ItemDialog dialog = new ItemDialog();
            dialog.show(getSupportFragmentManager(), "itemDialog");
            insertMode = true;
        });

        list = findViewById(R.id.list);
        adapter = new ItemAdapter(this);
        list.setAdapter(adapter);
        list.setOnItemClickListener(this);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();

        if(id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        selectedItem = position;
        selectedItemName = (String) adapter.getItem(position);
        view.setBackgroundColor(Color.LTGRAY);
        startActionMode(this);
    }

    @Override
    public boolean onCreateActionMode(ActionMode mode, Menu menu) {
        getMenuInflater().inflate(R.menu.context_menu, menu);
        return true;
    }

    @Override
    public boolean onPrepareActionMode(ActionMode mode, Menu menu) {
        return false;
    }

    @Override
    public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
        int id = item.getItemId();

        if(id == R.id.action_delete) {
            adapter.removeItem(selectedItem);
            mode.finish();
            return true;
        } else if (id == R.id.action_edit) {
            ItemDialog dialog = new ItemDialog();
            dialog.setItem(selectedItemName);
            dialog.show(getSupportFragmentManager(), "itemDialog");
            insertMode = false;
            mode.finish();
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void onDestroyActionMode(ActionMode mode) {
        View view = list.getChildAt(selectedItem);
        view.setBackgroundColor(Color.TRANSPARENT);
    }

    @Override
    public void onItem(String item) {
        if(insertMode) {
            adapter.insertItem(item);
        } else {
            adapter.updateItem(selectedItem, item);
        }
    }
}