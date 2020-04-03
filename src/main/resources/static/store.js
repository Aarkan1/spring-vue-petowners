import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import Vuex from 'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.esm.browser.js'
Vue.use(Vuex)

/**
 * Kommer lägga till en array i state
 * där vi kan spara de hämtade husdjuren.
 * Den är tom nu, men den kommer snart 
 * fyllas på när vi hämtar djuren från 
 * servern. 
 * 
 * Vi ändrar ALDRIG direkt i state. 
 * Detta är bad practice, och det blir lätt
 * buggar om man gör detta. 
 * 
 * Därför används ALLTID mutations när 
 * vi vill uppdatera något i state.
 * 
 * 
 * Öpnnar vi devtools i chrome, och har 
 * extensionet Vue DevTools installerat
 * så kan vi se att vi sparar en lista
 * i vår store efter vi hämtat alla pets
 * 
 * Efter vi laddat vår store med en lista 
 * av pets, så kan vi använda denna lista 
 * i en annan komponent
 * 
 * Vi behöver lägga till en array för owners
 * i state, och en tillhörande mutation
 * som uppdaterar dessa när vi hämtat dem
 */

export const store = new Vuex.Store({
  state: {
    pets: [],
    owners: [],
    user: null
  },
  mutations: {
    // mutation-metoden får denna stores 
    // state som parameter, samt det 
    // objekt som skickas när vi anropar
    // denna mutation från en komponent.

    // för att anropa en mutation så skriver man
    // this.$store.commit('vilkenMutation', {objektet som mutationen tar emot})

    // Detta gör vi nu i getPetsButton komponenten
    setPets(state, pets) {
      state.pets = pets
    },
    appendPet(state, pet) {
      /**
       * denna mutation kommer lägga till den 
       * pet vi får från servern i listan med 
       * de andra husdjuren.
       */

       state.pets.push(pet)
    },
    /**
     * Tänker mig att vi hämtar owners direkt 
     * när vi laddar app.js, i created()
     */
    setOwners(state, owners) {
      state.owners = owners
    },
    setUser(state, user) {
      state.user = user
    }
  },
  // actions kommer vi använda senare i kursen
  // actions: {}
})