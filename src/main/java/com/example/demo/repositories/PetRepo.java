package com.example.demo.repositories;

import com.example.demo.entities.Pet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Ett repository är den del av Spring
 * som kommunicerar med databasen. Den gör detta med
 * inbyggda metoder i "CrudRepository", som vi får genom arv.
 *
 * Vi kan här lägga till egna metoder för att hämta data från
 * databasen.
 *
 * Det kan vara lite lurigt hur detta fungerar, men det som händer är
 * att Spring gör om metoden till en SQL-query. Det kan kännas som att vi
 * tappar lite kontroll med detta, och vi kan, om vi vill, ändå skriva en
 * query manuellt. Det går jag dock inte genom idag...
 *
 * Ett repository måste vara ett interface som annoteras med @Repository.
 * Annoteringen gör att vi kan ladda in detta repository med @Autowired.
 */
@Repository
public interface PetRepo extends CrudRepository<Pet, Integer> { // CrudRepository wants to know which entity belongs to this repo, and what type the Primary Key is.
  public List<Pet> findAllBySpeciesIgnoreCase(String specie); // SELECT * FROM pets WHERE upper(species) = upper(specie)
  public List<Pet> findAllByOwner(int ownerId);    // SELECT * FROM pets WHERE owner = ownerId

  /**
   * Vill vi slippa använda "Optional<>" så kan vi enkelt skapa samma metod här:
   *
   * Vi får inte glömma att ändra våra "returer" nu när vi ändrar detta.
   * */
  public Pet findById(int id);
}
