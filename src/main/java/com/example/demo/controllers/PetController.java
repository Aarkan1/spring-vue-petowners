package com.example.demo.controllers;

import com.example.demo.entities.Pet;
import com.example.demo.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Mina kommentarer kommer se ut såhär,
 * och detta kommer vara lite överallt
 * i koden :P
 */

/**
 * RestController
 * Det är controllern som hanterar trafiken mellan
 * frontend och den logik vi har i backend.
 *
 * Denna controller måste vi annotera med
 * @RestController
 */
@RestController
public class PetController {

  /**
   * Spring är ett ramverk som bygger mycket på
   * Dependency injection. Detta betyder att
   * Spring själv sköter i vilken ordning
   * programmet ska importera/initialisera objekt.
   *
   * Detta blir "enkelt" om vi annoterar det som ska
   * injectas med @Autowired.
   * Det gör vi primärt endast med våra Services och Repositories
   */
  @Autowired
  PetService petService;

  /**
   * Vi skapar så kallade "endpoints" med
   * @GetMapping.
   * Med detta kan vi skapa en metod som lyssnar
   * på att vår hemsida ska fråga efter något.
   *
   * Här lyssnar vi på när vår hemsida går till
   * URL:en "/rest/pets", och när detta sker
   * kommer vi fråga databasen efter alla pets
   * och skicka tillbaka dessa.
   */
  @GetMapping("/rest/pets")
  public List<Pet> getAllPets() {
    return petService.findAllPets();
  }

  /**
   * Vill vi kunna fråga efter en specifik entitet
   * på t ex ID, så kan vi skapa en mapping med en
   * så kallad "dynamisk parameter". Denna parameter
   * placerar vi i ett par måsvingar "{}" i URL:en.
   *
   * Då kan vi med ännu en annotation hämta ut denna parameter
   * och lägga den i en variabel, som vi sedan kan använda för
   * att leta upp en entitet med samma ID.
   *
   * Notera att vi kan plocka ut variabeln genom
   * annoteringen @PathVariable
   */
  @GetMapping("/rest/pets/{id}")
  public Pet getOnePet(@PathVariable int id) {
    return petService.findOnePet(id);
  }

  /**
   * I denna speciella endpoint vill vi filtrera ut alla
   * entiteter som har samma "specie".
   * Hade vi skrivit denna route "/rest/pets/{specie}"
   * så hade den krockat med metoden ovanför.
   * Detta är för att då hade båda routes lyssnat på en
   * dynamisk parameter på "samma ställe" i URL:en:
   * "/rest/pets/{specie}"
   * "/rest/pets/{id}"
   *
   * Därför flyttade vi ner {specie} till en egen URL
   * */
  @GetMapping("/rest/pets/specie/{specie}")
  public List<Pet> getPetsBySpecie(@PathVariable String specie) {
    return petService.findBySpecie(specie);
  }

  /**
   * @PostMapping lyssnar på POST-requests, så även om vi skriver
   * samma route(URL) här, som vi gör i en @GetMapping högre upp,
   * så är detta inget problem.
   * När vi anropa en rest-route med GET så kommer vi endast in
   * i metoderna annoterade med @GetMapping,
   * Skulle en request komma som använder POST, så kommer
   * denna metod att anropas.
   *
   * Denna metod tar emot ett json-objekt, som den konverterar
   * till en klass med annoteringen @RequestBody.
   * Denna konvertering sker automatiskt, utan att vi behöver
   * tänka på hur. Tack Spring! :)
   *
   * Vi måste dock vara tydliga med vilken klass vi vill
   * att det ikommande json-objektet skall konverteras till.
   *
   * Notera! Objektet vi får från frontenden måste ha samma
   * egenskapsnamn som den i vald klass.
   *
   * Skulle vi skicka med något felstavat, eller inte alls,
   * så kommer den egenskapen bli null i vårt Pet-objekt.
   * */
  @PostMapping("/rest/pets")
  public Pet createNewPet(@RequestBody Pet pet) {
    return petService.createNewPet(pet);
  }

}
