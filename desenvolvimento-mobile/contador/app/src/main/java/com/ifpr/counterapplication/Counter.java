package com.ifpr.counterapplication;
import android.os.AsyncTask;
import android.os.SystemClock;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

public class Counter extends AsyncTask<Integer, Integer, Void> {

    private Button startButton;
    private TextView counterText;
    private ProgressBar progressBar;

    public Counter(Button startButton, TextView counterText, ProgressBar progressBar) {
        this.startButton = startButton;
        this.counterText = counterText;
        this.progressBar = progressBar;
    }

    @Override
    protected void onPreExecute() {
        startButton.setEnabled(false);
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        startButton.setEnabled(true);
    }

    @Override
    protected void onProgressUpdate(Integer... values) {
        int c = values[0];
        counterText.setText(String.valueOf(c));
        progressBar.setProgress(progressBar.getMax()-c);
    }

    @Override
    protected Void doInBackground(Integer... integers) {
        int max = integers[0];

        for(int i = max; i >= 0; i--){
            SystemClock.sleep(1000);
            publishProgress(i);
        }

        return null;
    }
}