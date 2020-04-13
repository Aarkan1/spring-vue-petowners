/**
 * lägger till fetchPets-knappen i home komponenten. 
 * 
 * Först importerar vi komponenten,
 * sen registrerar vi att vi vill använda
 * den i home's template.
 * Efter det kan vi lägga till den som 
 * en tagg i templaten.
 * 
 * Vi lägger till vår nya komponent under knappen, 
 * så ser vi om det fungerar.. 
 * 
 * Lägger till vårt nya formulär där vi kan 
 * skapa nya djur att skicka till databasen.
 * 
 * Hade nog inte skadat med lite snygg CSS...
 */

 import getPetsButton from '../components/getPetsButton.js'
 import petsList from '../components/petsList.js'
 import addNewPetForm from '../components/addNewPetForm.js'
 import { connect, sendSocketEvent } from '../socket.js'

export default {
  components: {
    getPetsButton,
    petsList,
    addNewPetForm
  },
  template: `
    <div>
      <h2>Home</h2>
      <getPetsButton />
      <addNewPetForm v-if="$store.state.user" />
      <br>
      <button @click="sendMessage">Send message</button>
      <button @click="sendBid">Send bid</button>

      <petsList />
    </div>
  `,
  methods: {
    sendMessage() {
      const newMessage = {
        action: 'message', 
        message: 'Test message',
        timestamp: Date.now()
      }

      sendSocketEvent(newMessage)
    },
    sendBid() {
      const newBid = {
        action: 'bid', 
        message: 'Test bid',
        timestamp: Date.now()
      }

      sendSocketEvent(newBid)
    }
  },
  mounted() {
    // fake login
//    connect()
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to, from, next);
    
  //   if(this.$store.state.user) {
  //     next()
  //   }
  // }
}