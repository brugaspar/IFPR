package com.example.fragmentappcolor;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity implements ButtonFragment.OnChangeColorListener {

    private ColorFragment colorFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        colorFragment = (ColorFragment) getSupportFragmentManager().findFragmentById(R.id.colorFragment);
    }

    @Override
    public void changeColor(int color) {
        colorFragment.setColor(color);
    }

}