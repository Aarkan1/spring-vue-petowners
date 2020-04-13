package com.example.demo.entities;

import javax.persistence.*;
import java.util.List;

/**
 * En entitet som vi använder i databasen måste annoteras med @Entity.
 * Spring vet inte automatiskt vilken tabell denna entitet tillhör,
 * så vi får manuellt lägga till en annotation för detta.
 *
 * Notera: Det är bara klasser som vi använder ifrån databasen som annoteras med @Entity.
 * Har vi skapat en egen klass som vi använder internt till annan logik, t ex en FileUtility klass,
 * så ska inte dessa annoteras.
 */
@Entity
@Table(name = "owners")
public class Owner {

  /**
   * Den egenskap som är kopplad till tabellens Primary Key
   * måste annoteras med @Id, och vill vi när vi skapar en ny rad
   * i databasen(lägger till en ny entitet), så behöver vi också
   * berätta att vi vill använda databasens inbygga "Autoincrement"
   *
   * Detta görs med @GeneratedValue, och vi får INTE glömma lägga till
   * vilken strategi den ska göra detta på...
   *
   * copy paste is your friend :)
   */
  @Id // Primary key
  @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrement
  private int id;
  private String name;

  /**
   * Har vi en egenskap som inte finns i tabellen, men vi vill
   * använda den i vår kod. T ex så vill vi ha en lista med husdjur
   * när vi skickar en Owner till frontenden, men vi vill inte ha denna
   * egenskap i databasen.
   * Då annoterar vi denna egenskap med @Transient
   */
  @Transient // this annotation will ignore the variable in the database
  private List<Pet> pets;

  public Owner() {
  }

  public List<Pet> getPets() {
    return pets;
  }

  public void setPets(List<Pet> pets) {
    this.pets = pets;
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
}
