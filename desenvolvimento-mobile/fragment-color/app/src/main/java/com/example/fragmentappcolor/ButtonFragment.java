package com.example.fragmentappcolor;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

public class ButtonFragment extends Fragment implements View.OnClickListener {

    private OnChangeColorListener listener;

    public ButtonFragment() {}

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_button, container, false);

        Button blackButton = view.findViewById(R.id.blackButton);
        Button blueButton = view.findViewById(R.id.blueButton);
        Button greenButton = view.findViewById(R.id.greenButton);
        Button redButton = view.findViewById(R.id.redButton);
        Button yellowButton = view.findViewById(R.id.yellowButton);

        blackButton.setOnClickListener(this);
        blueButton.setOnClickListener(this);
        greenButton.setOnClickListener(this);
        redButton.setOnClickListener(this);
        yellowButton.setOnClickListener(this);

        return view;
    }

    @Override
    public void onClick(View v) {
        int color = Color.WHITE;
        int id = v.getId();

        if(id == R.id.blackButton) {
            color = Color.BLACK;
        }

        if(id == R.id.blueButton) {
            color = Color.BLUE;
        }

        if(id == R.id.greenButton) {
            color = Color.GREEN;
        }

        if(id == R.id.redButton) {
            color = Color.RED;
        }

        if(id == R.id.yellowButton) {
            color = Color.YELLOW;
        }

        if(listener != null) {
            listener.changeColor(color);
        }
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);

        if(context instanceof OnChangeColorListener) {
            listener = (OnChangeColorListener) context;
        } else {
            throw new RuntimeException(context.toString() + " must implement OnChangeColorListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();

        listener = null;
    }

    public interface OnChangeColorListener {
        void changeColor(int color);
    }

}
