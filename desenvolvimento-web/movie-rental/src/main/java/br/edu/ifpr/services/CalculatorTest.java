package br.edu.ifpr.services;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.equalTo;

import br.edu.ifpr.entities.Calculator;
import org.junit.Assert;
import org.junit.Test;

public class CalculatorTest {

    @Test
    public void shouldAddTwoNumbers() {
        Calculator calculator = new Calculator();
        Integer num1 = 5;
        Integer num2 = 3;

        Integer result = calculator.sum(num1, num2);

        Assert.assertThat(8, is(equalTo(result)));
    }

    @Test
    public void shouldSubtractTwoNumbers() {
        Calculator calculator = new Calculator();
        Integer num1 = 5;
        Integer num2 = 3;

        Integer result = calculator.subtract(num1, num2);

        Assert.assertThat(2, is(equalTo(result)));
    }

    @Test
    public void shouldDivideTwoNumbers() {
        Calculator calculator = new Calculator();
        Integer num1 = 15;
        Integer num2 = 3;

        Integer result = calculator.divide(num1, num2);

        Assert.assertThat(5, is(equalTo(result)));
    }

    @Test
    public void shouldMultiplyTwoNumbers() {
        Calculator calculator = new Calculator();
        Integer num1 = 5;
        Integer num2 = 3;

        Integer result = calculator.multiply(num1, num2);

        Assert.assertThat(15, is(equalTo(result)));
    }

    @Test(expected = ArithmeticException.class)
    public void shouldThrowExceptionWhenDividingByZero() throws ArithmeticException {
        Calculator calculator = new Calculator();
        Integer num1 = 6;
        Integer num2 = 0;

        calculator.divide(num1, num2);
    }

}
