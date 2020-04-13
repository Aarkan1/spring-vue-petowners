package com.example.demo.entities;

import javax.persistence.*;

@Entity
@Table(name = "pets")
public class Pet {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private String species;
  private int owner;
  private String imageUrl; // camelCase - snake_case

  /**
   * Vi vill lägga till en action som vi kan
   * göra en switch på, men den ska inte finnas
   * i databasen.
   * För detta måste vi använda @Transient
   */
  @Transient
  public String action;

  public Pet() {
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSpecies() {
    return species;
  }

  public void setSpecies(String species) {
    this.species = species;
  }

  public int getOwner() {
    return owner;
  }

  public void setOwner(int owner) {
    this.owner = owner;
  }
}
