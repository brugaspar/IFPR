package com.ifpr.counterapplication;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private Button startButton;
    private TextView counterText;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        startButton = findViewById(R.id.startButton);
        counterText = findViewById(R.id.counterText);
        progressBar = findViewById(R.id.progressBar);

        startButton.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        Counter counter = new Counter(startButton, counterText, progressBar);
        progressBar.setMax(10);
        counter.execute(10);
    }
}