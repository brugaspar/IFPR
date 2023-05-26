package com.example.listviewapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

public class ProgrammingLanguageAdapter extends BaseAdapter {

    private final Context context;
    private final List<ProgrammingLanguage> programmingLanguages;

    public ProgrammingLanguageAdapter(Context context, List<ProgrammingLanguage> programmingLanguages) {
        this.context = context;
        this.programmingLanguages = programmingLanguages;
    }

    @Override
    public int getCount() {
        return programmingLanguages.size();
    }

    @Override
    public Object getItem(int position) {
        return programmingLanguages.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        @SuppressLint("ViewHolder")
        View view = LayoutInflater.from(context).inflate(R.layout.adapter_programming_languages, parent, false);
        TextView name = view.findViewById(R.id.programmingLanguageName);
        ImageView image = view.findViewById(R.id.programmingLanguageImage);
        TextView description = view.findViewById(R.id.programmingLanguageDescription);

        ProgrammingLanguage programmingLanguage = programmingLanguages.get(position);

        name.setText(programmingLanguage.name);
        image.setImageResource(programmingLanguage.image);
        description.setText(programmingLanguage.description);

        return view;
    }
}
