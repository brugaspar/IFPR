package com.example.fragmentappcounter;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity implements ButtonFragment.OnIncrementListener {

    private CounterFragment counter1Fragment;
    private CounterFragment counter2Fragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

        ButtonFragment buttonFragment = new ButtonFragment();
        fragmentTransaction.add(R.id.layButton, buttonFragment);

        counter1Fragment = new Counter1Fragment();
        fragmentTransaction.add(R.id.layCounter1, counter1Fragment);

        counter2Fragment = new Counter2Fragment();
        fragmentTransaction.add(R.id.layCounter2, counter2Fragment);

        fragmentTransaction.commit();
    }

    @Override
    public void onIncrement() {
        counter1Fragment.increment();
        counter2Fragment.increment();
    }

}