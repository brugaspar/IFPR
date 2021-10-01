package com.ifpr.styleapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.SeekBar;

import java.text.NumberFormat;

public class MainActivity extends AppCompatActivity implements View.OnClickListener,
		SeekBar.OnSeekBarChangeListener, RadioGroup.OnCheckedChangeListener {

	SeekBar simpleSeekBar;
	EditText editText;
	CheckBox negrito;
	CheckBox italico;
	CheckBox maiusculo;
	RadioGroup radioGroup;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		simpleSeekBar=(SeekBar)findViewById(R.id.simpleSeekBar);
		editText = findViewById(R.id.principal_input);
		negrito = findViewById(R.id.negrito);
		italico = findViewById(R.id.italico);
		maiusculo = findViewById(R.id.maiscula);
		radioGroup = findViewById(R.id.color_radio);

		radioGroup.setOnCheckedChangeListener((RadioGroup.OnCheckedChangeListener) this);

		negrito.setOnCheckedChangeListener(new CheckBox.OnCheckedChangeListener() {

			@Override
			public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
				if(b) {
					editText.setTypeface(null, Typeface.BOLD);
					if(italico.isChecked())
						editText.setTypeface(null, Typeface.BOLD_ITALIC);
				} else {
					editText.setTypeface(null, Typeface.NORMAL);
					if(italico.isChecked())
						editText.setTypeface(null, Typeface.ITALIC);
					else
						editText.setTypeface(null, Typeface.NORMAL);
				}
			}
		});

		italico.setOnCheckedChangeListener(new CheckBox.OnCheckedChangeListener() {

			@Override
			public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
				if(b) {
					editText.setTypeface(null, Typeface.BOLD);
					if(italico.isChecked())
						editText.setTypeface(null, Typeface.BOLD_ITALIC);
				} else {
					editText.setTypeface(null, Typeface.NORMAL);
					if(italico.isChecked())
						editText.setTypeface(null, Typeface.ITALIC);
					else
						editText.setTypeface(null, Typeface.NORMAL);
				}
			}
		});

		maiusculo.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean b) {
				editText.setAllCaps(b);
			}
		});

		simpleSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
			int progressChangedValue = 0;

			public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
				progressChangedValue = progress;
			}

			public void onStartTrackingTouch(SeekBar seekBar) {

			}

			public void onStopTrackingTouch(SeekBar seekBar) {
				editText.setTextSize(progressChangedValue);
			}
		});



	}

	@Override
	public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

	}

	@Override
	public void onStartTrackingTouch(SeekBar seekBar) {

	}

	@Override
	public void onStopTrackingTouch(SeekBar seekBar) {

	}

	@Override
	public void onCheckedChanged(RadioGroup group, int checkedId) {

		RadioButton checkedRadioButton = group.findViewById(checkedId);
		if (checkedRadioButton.getId() == R.id.red)
			editText.setTextColor(Color.parseColor("#FF0000"));
		if (checkedRadioButton.getId() == R.id.blue)
			editText.setTextColor(Color.parseColor("#1e139c"));
		if (checkedRadioButton.getId() == R.id.yellow)
			editText.setTextColor(Color.parseColor("#fcba03"));
	}

	@Override
	public void onClick(View view) {

	}

	@Override
	public void onPointerCaptureChanged(boolean hasCapture) {

	}
}