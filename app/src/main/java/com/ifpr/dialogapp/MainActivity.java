package com.ifpr.dialogapp;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.Calendar;

public class MainActivity extends AppCompatActivity implements DateDialog.OnDateSetListener, TimeDialog.OnTimeSetListener {

    private TextView dateTimeText;
    String myDate = "", myHour = "";

    @SuppressLint("DefaultLocale")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dateTimeText = findViewById(R.id.dateTimeText);

        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        int month = now.get(Calendar.MONTH);
        int day = now.get(Calendar.DAY_OF_MONTH);
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);

        myDate = String.format("%02d/%02d/%d", day, month+1, year);
        myHour = String.format("%02d:%02d", hour, minute);

        dateTimeText.setText(String.format("%s %s", myDate, myHour));

        Button dateButton = findViewById(R.id.dateButton);
        Button hourButton = findViewById(R.id.hourButton);

        dateButton.setOnClickListener(v -> {
            DateDialog dialog = new DateDialog();
            dialog.show(getSupportFragmentManager(), "dateDialog");
        });

        hourButton.setOnClickListener(v -> {
            TimeDialog dialog = new TimeDialog();
            dialog.show(getSupportFragmentManager(), "timeDialog");
        });
    }

    @SuppressLint("DefaultLocale")
    @Override
    public void onDateSet(int year, int month, int day) {
        myDate = String.format("%02d/%02d/%d", day, month+1, year);
        dateTimeText.setText(String.format("%s %s", myDate, myHour));
    }

    @SuppressLint("DefaultLocale")
    @Override
    public void onTimeSet(int hour, int minute) {
        myHour = String.format("%02d:%02d", hour, minute);
        dateTimeText.setText(String.format("%s %s", myDate, myHour));
    }

}