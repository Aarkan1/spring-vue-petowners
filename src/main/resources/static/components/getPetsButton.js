/**
 * Denna komponent kommer bara vara en knapp,
 * som kommer ladda in alla husdjur när
 * vi klickar på den.
 * 
 * Templaten är en enkel knapp. 
 * Denna knapp binder jag klicket till
 * en metod, getPets.
 * 
 * getPets kommer anropa rest-routen 
 * '/rest/pets', och sedan skriva ut
 * listan i consolen.
 * 
 * Nästa sak är att den lista vi nu får 
 * hade varit bra om den hamnade i vår 
 * store, så andra komponenter kan ta 
 * del av den, kanske till att skriva 
 * ut med v-for i en petsList-komponent?
 */

// import { eventBus } from '../main.js'

export default {
  template: `
    <button @click="getPets">Fetch Pets</button>
  `,
  methods: {
    async getPets() {
      let pets = await fetch('/rest/pets')
      pets = await pets.json()

      console.log(pets)

      // efter vi hämtat alla pets lägger
      // vi till dessa till vår store
      this.$store.commit('setPets', pets)


      // for(let pet of pets) {
      //   console.log(pet.name)
      // }

      // more effective for..of loop
      // pets.forEach( (pet, i) => {
      //   console.log(i, pet.name)
      // })

      /**
       * filter creates a copy of the array.
       * To choose which items should be in the 
       * new array, we must return a condition
       * on each item. If the condition is true,
       * the item gets added to the new array.
       */
      // let cats = pets.filter(pet => {
      //   // returnera en boolean
      //   return pet.species === 'Cat'
      // })

      // console.log('Cats:')
      // cats.forEach(cat => {
      //   console.log(cat.name)
      // });

      // let dogs = pets.filter(pet => {
      //   return pet.species === 'Dog'
      // })

      // console.log('Dogs:')
      // dogs.forEach(dog => {
      //   console.log(dog.name)
      // });

      // let petsWithLongNames = pets.filter(pet => {
      //   return pet.name.length > 5
      // })
      
      // console.log('Pets with long names:')
      // petsWithLongNames.forEach(pet => {
      //   console.log(pet.name)
      // });

      // pets.sort((p1, p2) => p1.name < p2.name ? -1 : 1)

      // same as above
      // pets.sort((p1, p2) => {
      //   if(p1.name < p2.name) {
      //     return -1
      //   } else {
      //     return 1
      //   }
      // })


      /**
       * we can use map to create a new array
       * with new content based of the pets array
       */
      // let petNames = pets.map(pet => {
      //   return `Specie: ${pet.species}, name: ${pet.name}` 
      // })

      // let petNamesAndSpecie = pets.map(pet => {
      //   return {
      //     name: pet.name,
      //     species: pet.species
      //   }
      // })

      // console.log(petNamesAndSpecie)

      // ALLT på en gång
      // let catNames = pets
      //       .filter(pet => pet.species === 'Cat')
      //       .map(cat => cat.name)
      //       .sort((catName1, catName2) => catName1 > catName2 ? -1 : 1 )


      // console.log(catNames)

      // let klick= {
      //   message: 'Clicked on pets'
      // }

      // this.$store.commit('mutation', data)
      // emit triggers all listeners
//      eventBus.$emit('pet-button-clicked', klick)
    }
  },

//  mounted() {
//    // on listens on a channel
//    eventBus.$on('pet-button-clicked', data => {
//      console.log('getPetsButton:', data);
//    })
//  },
//
//  beforeDestroy() {
//    eventBus.$off('pet-button-clicked')
//  }
}