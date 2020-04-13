package com.example.demo.services;

import com.example.demo.entities.Owner;
import com.example.demo.entities.Pet;
import com.example.demo.repositories.OwnerRepo;
import com.example.demo.repositories.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Denna service har lite mer logik i sig än PetServicen har.
 */
@Service
public class OwnerService {

  /**
   * Här används både OwnerRepo och PetRepo
   * i samma service, trots att detta inte är PetServicen.
   *
   * Varför jag valde att göra såhär är för att när vi hämtar
   * en Owner så vill vi även lägga till alla hens husdjur innan
   * vi skickar tillbaka ownern.
   *
   * Vi kunde skapat en metod för att hämta dessa pets i PetService,
   * och då hade vi behövt ladda in PetService med @Autowired istället.
   *
   * Ingen speciell anledning till varför jag valde att göra såhär,
   * jag sparar några rader kod, och det gör ingen större skillnad då
   * logiken fortfarande är kvar i en Service.
   */
  @Autowired
  private OwnerRepo ownerRepo;
  @Autowired
  private PetRepo petRepo;

  /**
   * Kommer nu fixa när man hämtar alla owners så fylls deras listor
   * med deras husdjur
   */
  public List<Owner> findAllOwners() {
    List<Owner> owners = (List<Owner>) ownerRepo.findAll();

    // samma som en for-each loop, fast som lambda istället
    // bara för att vi kan ;)
    owners.forEach(owner -> {
      // copy paste galore!
      List<Pet> pets = petRepo.findAllByOwner(owner.getId()); // use the same ID as the owner when we ask for the pets
      owner.setPets(pets);
    });

    /**
     * OBS: Detta är inte det bästa sättet att göra detta på.
     * Här gör vi en separat hämtning från databasen för varje
     * owner i listan.
     *
     * Rätt sätt hade varit att automatiskt lägga ihop dessa 1:M relationer
     * redan i databasen. Det kommer vi gå genom senare...
     */

    return owners;
  }

  /**
   * När vi hämtar en Owner från databasen så vill vi även
   * ladda in hens husdjur i listan av pets.
   *
   * För att göra detta fick vi skapa en metod i PetRepo för att
   * hämta alla djur på ägarens ID. Dessa djur kunde vi sen lägga
   * i ägarens lista.
   */
  public Owner findOneOwner(int id) { // the ID which we want to find an owner
    Owner owner = ownerRepo.findById(id);
    if(owner == null) return null; // don't get the pets if there's no owner

    List<Pet> pets = petRepo.findAllByOwner(id); // use the same ID as the owner when we ask for the pets
    owner.setPets(pets);

    return owner;
  }
}
