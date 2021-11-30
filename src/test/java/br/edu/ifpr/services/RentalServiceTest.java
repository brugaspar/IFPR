package br.edu.ifpr.services;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;

import br.edu.ifpr.entities.*;
import org.junit.*;
import org.junit.rules.ErrorCollector;
import org.junit.rules.ExpectedException;

public class RentalServiceTest {

    @Rule
    public ErrorCollector error = new ErrorCollector();

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    RentalService rentalService;

    @Before
    public void setup() {
        rentalService = new RentalService();
    }

    @After
    public void tearDown() {
        System.out.println("After");
    }

    @Test
    public void verifyRental() throws Exception {
        RentalService rentalService = new RentalService();
        User user = new User("Bruno");
        Movie movie = new Movie("Alice no País das Maravilhas", 3, 5.0);

        Rental rental = rentalService.movieRental(user, movie);

        Double expectedValue = 5.0;

        Assert.assertThat(rental.getAmount(), is(equalTo(5.0)));

        error.checkThat(rental.getAmount(), is(expectedValue));
    }

    @Test(expected = Exception.class)
    public void verifyMovieWithoutStock() throws Exception {
        User user = new User("Bruno");
        Movie movie = new Movie("Alice no País das Maravilhas", 0, 5.0);
        rentalService.movieRental(user, movie);
    }

    @Test
    public void verifyMovieWithoutStockWithException() {
        User user = new User("Bruno");
        Movie movie = new Movie("Alice no País das Maravilhas", 0, 5.0);

        try {
            rentalService.movieRental(user, movie);
            Assert.fail("Deveria ter lançado exceção");
        } catch (Exception e) {
            Assert.assertEquals("Não é possível alugar filme sem estoque", e.getMessage());
        }
    }

    @Test
    public void shouldThrowExceptionWhenUserIsNull() throws Exception {
        Movie movie = new Movie("Alice no País das Maravilhas", 0, 5.0);

        expectedException.expect(Exception.class);
        expectedException.expectMessage("Usuário não pode ser nulo");

        rentalService.movieRental(null, movie);
    }

    @Test
    public void shouldThrowExceptionWhenMovieIsNull() throws Exception {
        User user = new User("Bruno");

        expectedException.expect(Exception.class);
        expectedException.expectMessage("Filme não pode ser nulo");

        rentalService.movieRental(user, null);
    }

}
