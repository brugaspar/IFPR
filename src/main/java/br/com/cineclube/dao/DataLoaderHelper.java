package br.com.cineclube.dao;

import br.com.cineclube.model.Category;
import br.com.cineclube.model.Movie;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

public class DataLoaderHelper {

  public static void loadData(MovieRepository daof /*, PessoaRepository daop*/) {

    List<Movie> moviesList = new ArrayList<>();
    moviesList.add(new Movie("Avatar", 7f, 2009, Category.ACTION.name()));
    moviesList.add(new Movie("Matrix", 9f, 1999, Category.SCIFI.name()));
    moviesList.add(new Movie("Terminator", 8f, 1984, Category.SCIFI.name()));
    moviesList.add(new Movie("Rock", 6f, 1976, Category.ACTION.name()));
    moviesList.add(new Movie("Titanic",	4f, 1997, Category.DRAMA.name()));
    moviesList.add(new Movie("Alien", 10f, 1979, Category.SCIFI.name()));
    daof.saveAll(moviesList);

//		List<Pessoa> pessoaList = new ArrayList<>();
//		pessoaList.add(new Pessoa("Leonard"));
//		pessoaList.add(new Pessoa("Jake"));
//		pessoaList.add(new Pessoa("Arnold"));
//		pessoaList.add(new Pessoa("Kate"));
//		pessoaList.add(new Pessoa("Anne"));
//		daop.saveAll(pessoaList);
  }
  // @Bean => indica que o metodo loader gera um Bean gerenciado pelo Spring container.
  // CommandLineRunner => indica que deve ser executado pelo SpringApplication.
  @Bean
  public CommandLineRunner loader(MovieRepository daof/*, PessoaRepository daop*/) {
    return (args) -> {
      DataLoaderHelper.loadData(daof/*, daop*/);
    };
  }

}
