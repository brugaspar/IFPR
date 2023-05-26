package com.example.listviewapp;

import java.util.ArrayList;
import java.util.List;

public class ProgrammingLanguage {

    public String name;
    public Integer image;
    public String description;

    public ProgrammingLanguage(String name, Integer image, String description) {
        this.name = name;
        this.image = image;
        this.description = description;
    }

    public static List<ProgrammingLanguage> getProgrammingLanguages() {
        List<ProgrammingLanguage> programmingLanguages = new ArrayList<>();

        programmingLanguages.add(new ProgrammingLanguage("JavaScript", R.drawable.javascript, "Uma das linguagens mais usadas da atualidade. Muito versátil."));
        programmingLanguages.add(new ProgrammingLanguage("Java", R.drawable.java, "Não gosto dessa linguagem, sem mais."));
        programmingLanguages.add(new ProgrammingLanguage("PHP", R.drawable.php, "Outra linguagem bastante usada, principalmente na WEB."));
        programmingLanguages.add(new ProgrammingLanguage("C#", R.drawable.csharp, "Linguagem desenvolvida pela Microsoft. É orientada a objetos."));
        programmingLanguages.add(new ProgrammingLanguage("C++", R.drawable.cplusplus, "Linguagem baseada em C, craida na década de 80."));
        programmingLanguages.add(new ProgrammingLanguage("Python", R.drawable.python, "Criada nos anos 90. É uma das linguagens mais fáceis de se aprender."));
        programmingLanguages.add(new ProgrammingLanguage("Ruby", R.drawable.ruby, "É uma linguagem orientada a objetos e de sintaxe simples."));
        programmingLanguages.add(new ProgrammingLanguage("Swift", R.drawable.swift, "Criada pela Apple, é usada na criação de aplicativos do ecossistema Apple."));
        programmingLanguages.add(new ProgrammingLanguage("C", R.drawable.c, "Muito usada no aprendizado de lógica da programação e como base para outras linguagens."));
        programmingLanguages.add(new ProgrammingLanguage("Kotlin", R.drawable.kotlin, "Usada para desktop, mobile e WEB, sendo considerada linguagem oficial do Android."));

        return programmingLanguages;
    }

}
