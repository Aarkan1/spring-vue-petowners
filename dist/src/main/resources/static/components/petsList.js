/**
 * Skapar en ny komponent för att loopa 
 * ut alla husdjur som vi laddat i vår store
 * 
 * Tänker mig att vi skapar en ul,
 * och fyller på denna med djur
 * när de hämtats
 * 
 * För att loopa ut något i DOM:en med Vue
 * kan vi enkelt använda Vues inbyggda v-for.
 * Den ser ut lite som en for..of loop, 
 * det viktiga är att vi måste lägga till en 
 * key som är unik för varje objekt i listan.
 * 
 * Detta är för att Vue har ett väldigt smart
 * sätt att veta vad den ska rendera om. 
 * Vue renderar bara om det i en v-for där
 * key ändras.
 * Det andra lämnas kvar som det är, för att
 * det är mer effektivt och gör vår 
 * applikation snabbare.
 * 
 * Vi ser på hemsidan att detta funkar,
 * så vi kan lägga till mer i våra 
 * li-element.
 */
//import { eventBus } from '../main.js'

 export default {
   template: `
    <ul>
      <li v-for="pet of pets" 
          :key="pet.id"
          class="pet-card">
          <img width="80px" height="80px" :src="pet.imageUrl" />
          name: {{ pet.name }} <br>
          species: {{ pet.species }}
        </li>
    </ul>
   `,
   computed: {
     // det är ofta vi hämtar något från store
     // och lägger i en computed. 
     // Då triggar vi reaktivitet(om-rendering)
     // om något ändras i store
    pets() {
      return this.$store.state.pets
    }
   },
//   mounted() {
//    // on listens on a channel
//    eventBus.$on('pet-button-clicked', data => {
//      console.log('getList:', data);
//    })
//  },
//
//  beforeDestroy() {
//    eventBus.$off('pet-button-clicked')
//  },
 }