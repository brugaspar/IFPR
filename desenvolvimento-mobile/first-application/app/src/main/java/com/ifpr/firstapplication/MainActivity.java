package com.ifpr.firstapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText name;
    private EditText edEmail;
    private EditText phone;
    private RadioButton female;
    private RadioButton male;
    @SuppressLint("UseSwitchCompatOrMaterialCode")
    private Switch switchNotification;

    private LinearLayout layoutVisibility;
    private TextView text_name;
    private TextView text_gender;
    private TextView text_email;
    private TextView text_phone;
    private TextView text_notifications;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        name = findViewById(R.id.name);
        edEmail = findViewById(R.id.email);
        phone = findViewById(R.id.phone);
        female = findViewById(R.id.female);
        male = findViewById(R.id.male);
        CheckBox music = findViewById(R.id.preference_music);
        CheckBox movie = findViewById(R.id.preference_movie);
        CheckBox sport = findViewById(R.id.preference_sport);
        CheckBox gastronomy = findViewById(R.id.preference_gastronomy);
        switchNotification = findViewById(R.id.switch_notification);
        Button show_button = findViewById(R.id.show_button);
        Button clean_button = findViewById(R.id.clean_button);
        layoutVisibility = findViewById(R.id.visibility_linear);

        text_name = findViewById(R.id.text_name);
        text_gender = findViewById(R.id.text_gender);
        text_email = findViewById(R.id.text_email);
        text_phone = findViewById(R.id.text_phone);
        text_notifications = findViewById(R.id.text_notifications);

        show_button.setOnClickListener(this);
        clean_button.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.show_button){
            layoutVisibility.setVisibility(View.VISIBLE);
            text_name.setText(name.getText());
            text_gender.setText(male.getText());
            text_email.setText(edEmail.getText());
            text_phone.setText(phone.getText());
            text_notifications.setText(switchNotification.getText());
        }
        else if (v.getId() == R.id.clean_button){
            layoutVisibility.setVisibility(View.INVISIBLE);
        }
    }
}