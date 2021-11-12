package com.example.fragmentappcounter;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

public class ButtonFragment extends Fragment implements View.OnClickListener {

    private OnIncrementListener listener;

    public ButtonFragment() {}

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_button, container, false);
        Button button = (Button) view.findViewById(R.id.incrementButton);
        button.setOnClickListener(this);

        return view;
    }

    @Override
    public void onClick(View v) {
        if(listener != null) {
            listener.onIncrement();
        }
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);

        if(context instanceof OnIncrementListener) {
            listener = (OnIncrementListener) context;
        } else {
            throw new RuntimeException(context.toString() + " must implement OnIncrementListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        listener = null;
    }

    public interface OnIncrementListener {
        void onIncrement();
    }

}
