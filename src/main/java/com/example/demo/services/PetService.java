package com.example.demo.services;

import com.example.demo.entities.Pet;
import com.example.demo.repositories.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Att vi använder services istället för att använda vår
 * PetRepo direkt i vår PetController är för att vi inte
 * vill ha logik i controllern. Det går väl an i mindre projekt,
 * men så fort vår backend blir mer komplex, så vill vi bryta ut
 * logiken i fler filer.
 * Det blir lättare att förstår vad som sköter vad, lättare att hitta buggar
 * samt att vi får en tydlig struktur var saker och ting sker.
 *
 * En service måste vi annotera med @Service för att vi ska kunna
 * ladda in den med @Autowired. Samma gäller repository senare.
 *
 * Finns inte mycket mer att säga om denna service,
 * den sköter logiken för att hämta och spara pets i databasen.
 *
 * OwnerService klassen är tydligare varför vi vill använda en service
 * som sköter logiken.
 */

@Service
public class PetService {

  /**
   * Laddar in PetRepo likadant som
   * controllern laddade in denna service.
   */
  @Autowired
  private PetRepo petRepo;

  @Autowired
  private SocketService socketService;

  public List<Pet> findAllPets() {
    return (List<Pet>) petRepo.findAll();
  }

  /**
   * Vi kunde skriva över "findById" metoden i repositoryt för
   * att slippa behöva använda "Optional<>"
   *
   * När vi ändrat metoden i repositoryt måste vi komma ihåg
   * att ändra returen på alla ställen i kedjan..
   * */
  public Pet findOnePet(int id) {
    return petRepo.findById(id);
  }

  public List<Pet> findBySpecie(String specie) {
    return petRepo.findAllBySpeciesIgnoreCase(specie);
  }

  /**
   * Vi vill uppdatera alla anslutna klienter att en ny pet har skapats.
   * Först behöver vi kolla med try-catch att det gick att spara entiteten i
   * databasen, sen behöver vi använda SocketServicens metod sendToAll,
   * för att sen skicka vidare detta till alla.
   */
  public Pet createNewPet(Pet newPet) {
    Pet dbPet = null;
    try {
      dbPet = petRepo.save(newPet);

      dbPet.action = "new-pet";

      socketService.sendToAll(dbPet, Pet.class);
    } catch(Exception e) {
      e.printStackTrace();
    }

    return dbPet;
  }
}
