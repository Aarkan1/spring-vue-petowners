/**
 * Bonus: 
 * Kommer lägga till att när vi hämtar 
 * owners, så får vi alla pets även om 
 * vi hämtar alla owners, inte bara 1
 * 
 * Dessa kommer vi loopa ut, med tillhörande
 * pets i about-sidan
 * 
 * Här behöver vi faktiskt hämta owners
 * igen, om vi alltid vill ha den senaste
 * uppdaterade listan, även om vi lägger 
 * till djur medans vi är på sidan, och
 * inte vill göra en hård sidomladdning.
 */

//import { eventBus } from '../main.js'

import { disconnect } from '../socket.js'

export default {
  template: `
    <div>
      <h2>Owners</h2>

      <!--
        Skapar en div för varje owner,
        i den skriver vi ut hens namn
        samt loopar ut listan med hens
        husdjur. 

        Som ni ser går det hur bra som helst
        att ha en v-for loop i en annan
        v-for loop.
        -->
      <div class="owner pet-card" 
          v-for="owner of owners"
          :key="owner.id"
          @click="goToOwnerDetails(owner.id)">
          <h3>{{ owner.name }}</h3>
      </div>
    </div>
  `,
  methods: {
    goToOwnerDetails(id) {
      this.$router.push('/owners/' + id)
    }
  },
  computed: {
    owners() {
      return this.$store.state.owners
    }
  },
  /**
   * Hämtar owners var gång vi går 
   * till denna vyn
   */
  async mounted() {
    let owners = await fetch('/rest/owners')
    owners = await owners.json()
    this.$store.commit('setOwners', owners)


    // fake logout
//    disconnect()


    
    
    // console.log(owners);
    // console.log(this.$route.query)

    // '/owners' == {}
    // '/owners?owner=2&name=Ralf' == {owner: "2", name: "Ralf"}


    // on listens on a channel
//    eventBus.$on('pet-button-clicked', data => {
//      console.log('about:', data);
//    })
  },

//  beforeDestroy() {
//    eventBus.$off('pet-button-clicked')
//  }
}