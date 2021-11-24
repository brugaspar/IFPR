package com.example.listapp;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatDialogFragment;

import java.util.Objects;

public class ItemDialog extends AppCompatDialogFragment implements DialogInterface.OnClickListener {

    private OnItemListener listener;
    private EditText editText;
    private String item;

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        builder.setTitle(R.string.item);
        builder.setPositiveButton(R.string.ok, this);
        builder.setNegativeButton(R.string.cancel, this);

        LayoutInflater inflater = requireActivity().getLayoutInflater();
        View view = inflater.inflate(R.layout.dialog_item, null);
        builder.setView(view);

        this.editText = view.findViewById(R.id.edit_item);

        if(item != null) {
            editText.setText(item);
        }

        return builder.create();
    }

    public void setItem(String item) {
        this.item = item;
    }

    @Override
    public void onClick(DialogInterface dialog, int which) {
        if(which == DialogInterface.BUTTON_POSITIVE) {
            String item = editText.getText().toString();

            if(!TextUtils.isEmpty(item)){
                listener.onItem(item);
            }
        }
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);

        if(!(context instanceof OnItemListener)) {
            throw new IllegalArgumentException("The activity must implements ItemDialog.ItemListener");
        }

        this.listener = (OnItemListener) context;
    }

    @Override
    public void onDetach() {
        super.onDetach();
        listener = null;
    }

    public interface OnItemListener {
        void onItem(String item);
    }

}
