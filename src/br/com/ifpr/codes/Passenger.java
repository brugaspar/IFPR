package br.com.ifpr.codes;

public class Passenger {
  private String name;
  private String docNumber;
  private String nacionality;
  private int age;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDocNumber() {
    return this.docNumber;
  }

  public void setDocNumber(String docNumber) {
    this.docNumber = docNumber;
  }

  public String getNacionality() {
    return this.nacionality;
  }

  public void setNacionality(String nacionality) {
    this.nacionality = nacionality;
  }

  public int getAge() {
    return this.age;
  }

  public void setAge(int age) {
    this.age = age;
  }
}
