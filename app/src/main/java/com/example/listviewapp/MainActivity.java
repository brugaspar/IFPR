package com.example.listviewapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import java.util.List;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView programmingLanguagesList = findViewById(R.id.programmingLanguagesList);

        List<ProgrammingLanguage> programmingLanguages = ProgrammingLanguage.getProgrammingLanguages();

        programmingLanguagesList.setAdapter(new ProgrammingLanguageAdapter(this, programmingLanguages));
        programmingLanguagesList.setOnItemClickListener(this);
    }


    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        ProgrammingLanguage programmingLanguage = (ProgrammingLanguage) parent.getAdapter().getItem(position);
        Toast.makeText(this, "Linguagem: " + programmingLanguage.name, Toast.LENGTH_SHORT).show();
    }
}