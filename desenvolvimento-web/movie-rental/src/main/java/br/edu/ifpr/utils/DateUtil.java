package br.edu.ifpr.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtil {

  public static Date addDays(Date date, Integer days) {
    Calendar calendar = Calendar.getInstance();

    calendar.setTime(date);
    calendar.add(Calendar.DAY_OF_MONTH, days);

    return calendar.getTime();
  }

  public static Date getDateDifference(Integer days) {
    return addDays(new Date(), days);
  }

  public static Date getDate(Integer day, Integer month, Integer year) {
    Calendar calendar = Calendar.getInstance();

    calendar.set(Calendar.DAY_OF_MONTH, day);
    calendar.set(Calendar.MONTH, month - 1);
    calendar.set(Calendar.YEAR, year);

    return calendar.getTime();
  }

  public static boolean isSameDate(Date date, Date comparisonDate) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);

    Calendar comparisonCalendar = Calendar.getInstance();
    comparisonCalendar.setTime(comparisonDate);

    boolean day = calendar.get(Calendar.DAY_OF_MONTH) == comparisonCalendar.get(Calendar.DAY_OF_MONTH);
    boolean month = calendar.get(Calendar.MONTH) == comparisonCalendar.get(Calendar.MONTH);
    boolean year = calendar.get(Calendar.YEAR) == comparisonCalendar.get(Calendar.YEAR);

    return day && month && year;
  }

  public static boolean verifyDayOfWeek(Date date, Integer dayOfWeek) {
    Calendar calendar = Calendar.getInstance();

    calendar.setTime(date);

    return calendar.get(Calendar.DAY_OF_WEEK) == dayOfWeek;
  }

}
