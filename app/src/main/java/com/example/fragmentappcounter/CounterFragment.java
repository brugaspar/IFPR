package com.example.fragmentappcounter;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import java.io.Serializable;

public abstract class CounterFragment extends Fragment implements Serializable {

    private TextView counterText;
    private int counter;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(getFragmentView(), container, false);

        counterText = (TextView) view.findViewById(R.id.counterText);

        if(savedInstanceState != null) {
            this.counter = savedInstanceState.getInt("counter");
        }

        counterText.setText(String.valueOf(counter));

        return view;
    }

    public void increment() {
        counter++;
        counterText.setText(String.valueOf(counter));
    }

    protected abstract int getFragmentView();

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt("counter", counter);
    }

}
