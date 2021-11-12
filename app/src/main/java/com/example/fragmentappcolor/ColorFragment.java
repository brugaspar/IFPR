package com.example.fragmentappcolor;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

public class ColorFragment extends Fragment {

    private TextView backgroundText;

    public ColorFragment() {}

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_color, container, false);
        backgroundText = view.findViewById(R.id.backgroundText);

        return view;
    }

    public void setColor(int color) {
        backgroundText.setBackgroundColor(color);
    }

}
