package br.com.cineclub.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.*;

public class PersonListSerializer extends StdSerializer<Set<Person>> {

  private static final long serialVersionUID = 1L;

  public PersonListSerializer() {
    this(null);
  }

  public PersonListSerializer(Class<Set<Person>> t) {
    super(t);
  }

  @Override
  public void serialize(Set<Person> cast, JsonGenerator generator, SerializerProvider provider)
          throws IOException {

    Map<String, Object> personMap;
    List<Map<String, Object>> castList = new ArrayList<>();

    for (Person p : cast) {
      personMap = new HashMap<>();
      personMap.put("id", p.getId());
      personMap.put("name", p.getName());
      castList.add(personMap);
    }

    generator.writeObject(castList);

  }

  public void serialize_simple_exemple(Set<Person> cast, JsonGenerator generator, SerializerProvider provider)
          throws IOException {
    List<String> serializedList = new ArrayList<>();
    for (Person p : cast)
      serializedList.add(p.getName());
    generator.writeObject(serializedList);
  }

}