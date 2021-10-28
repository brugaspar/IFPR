package com.example.downloadimagesapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ProgressBar;

public class MainActivity extends AppCompatActivity {
    private ImageButton downloadButton;
    private EditText editUrl;
    private ImageView imageView;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        downloadButton = findViewById(R.id.downloadButton);
        editUrl = findViewById(R.id.editUrl);
        imageView = findViewById(R.id.imageView);
        progressBar = findViewById(R.id.progressBar);

        downloadButton.setOnClickListener(v -> {
            DownloadTask task = new DownloadTask(downloadButton, imageView, progressBar);
            task.execute(editUrl.getText().toString());
        });
    }
}