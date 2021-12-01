package br.edu.ifpr.services;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;

import br.edu.ifpr.entities.*;
import org.junit.*;
import org.junit.rules.ErrorCollector;
import org.junit.rules.ExpectedException;

import java.util.ArrayList;
import java.util.List;

public class RentalServiceTest {

    @Rule
    public ErrorCollector error = new ErrorCollector();

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    RentalService rentalService;
    List<Movie> movies = new ArrayList<>();

    @Before
    public void setup() {
        rentalService = new RentalService();
        movies.clear();
    }

    @Test
    public void verifyRental() throws Exception {
        RentalService rentalService = new RentalService();
        User user = new User("Bruno");

        Movie movie = new Movie("Alice no País das Maravilhas", 3, 5.0);

        movies.add(movie);

        Rental rental = rentalService.movieRental(user, movies);

        Double expectedValue = 5.0;

        Assert.assertThat(rental.getAmount(), is(equalTo(5.0)));

        error.checkThat(rental.getAmount(), is(expectedValue));
    }

    @Test(expected = Exception.class)
    public void verifyMovieWithoutStock() throws Exception {
        User user = new User("Bruno");
        Movie movie = new Movie("Alice no País das Maravilhas", 0, 5.0);

        movies.add(movie);

        rentalService.movieRental(user, movies);
    }

    @Test
    public void verifyMovieWithoutStockWithException() {
        User user = new User("Bruno");
        Movie movie = new Movie("Alice no País das Maravilhas", 0, 5.0);

        movies.add(movie);

        try {
            rentalService.movieRental(user, movies);
            Assert.fail("Deveria ter lançado exceção");
        } catch (Exception e) {
            Assert.assertEquals("Não é possível alugar filme sem estoque", e.getMessage());
        }
    }

    @Test
    public void shouldThrowExceptionWhenUserIsNull() throws Exception {
        Movie movie = new Movie("Alice no País das Maravilhas", 0, 5.0);

        movies.add(movie);

        expectedException.expect(Exception.class);
        expectedException.expectMessage("Usuário não pode ser nulo");

        rentalService.movieRental(null, movies);
    }

    @Test
    public void shouldThrowExceptionWhenMovieIsNull() throws Exception {
        User user = new User("Bruno");

        expectedException.expect(Exception.class);
        expectedException.expectMessage("Pelo menos 1 filme obrigatório");

        rentalService.movieRental(user, null);
    }

    @Test
    public void shouldAddMultipleMoviesOnRental() throws Exception {
        User user = new User("Bruno");
        List<Movie> movies = new ArrayList<>();

        Movie firstMovie = new Movie("Alice no País das Maravilhas", 5, 5.0);
        movies.add(firstMovie);
        Movie secondMovie = new Movie("Matrix", 3, 8.0);
        movies.add(secondMovie);

        rentalService.movieRental(user, movies);
    }

    @Test
    public void shouldAddDiscountOnMovies() throws Exception {
        User user = new User("Bruno");
        List<Movie> movies = new ArrayList<>();

        Movie firstMovie = new Movie("Alice no País das Maravilhas", 5, 5.0);
        movies.add(firstMovie);
        Movie secondMovie = new Movie("Matrix", 3, 8.0);
        movies.add(secondMovie);
        Movie thirdMovie = new Movie("Indiana Jone", 2, 9.0);
        movies.add(thirdMovie);
        Movie fourthMovie = new Movie("John Wick", 3, 50.0);
        movies.add(fourthMovie);
        Movie fifthMovie = new Movie("Dora Aventureira", 1, 1.0);
        movies.add(fifthMovie);
        Movie sixthMovie = new Movie("Velozes e Furiosos", 4, 4.0);
        movies.add(sixthMovie);

        Rental rental = rentalService.movieRental(user, movies);

        Assert.assertThat(rental.getAmount(), is(equalTo(45.0)));
    }

}
