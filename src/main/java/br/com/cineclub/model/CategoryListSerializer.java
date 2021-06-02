package br.com.cineclub.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.*;

public class CategoryListSerializer extends StdSerializer<Set<Category>> {

  private static final long serialVersionUID = 1L;

  public CategoryListSerializer() {
    this(null);
  }

  public CategoryListSerializer(Class<Set<Category>> t) {
    super(t);
  }

  @Override
  public void serialize(Set<Category> category, JsonGenerator generator, SerializerProvider provider)
      throws IOException {

    Map<String, Object> categoryMap;
    List<Map<String, Object>> categoryList = new ArrayList<>();

    for (Category p : category) {
      categoryMap = new HashMap<>();
      categoryMap.put("id", p.getId());
      categoryMap.put("name", p.getName());
      categoryList.add(categoryMap);
    }

    generator.writeObject(categoryList);

  }

  public void serialize_simple_example(Set<Category> category, JsonGenerator generator, SerializerProvider provider)
      throws IOException {
    List<String> serializedList = new ArrayList<>();
    for (Category c : category)
      serializedList.add(c.getName());
    generator.writeObject(serializedList);
  }

}