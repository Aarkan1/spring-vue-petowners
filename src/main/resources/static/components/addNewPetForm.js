/**
 * Här tänker jag mig att vi skapar ett
 * formulär för att lägga till en ny pet
 * i databasen, och när vi får ett svar så
 * lägger vi till den i listan vi har i store
 * 
 * Vi behöver ett input-fält, där vi kan
 * lägga till ett namn, samt ett fält för 
 * species..
 * 
 * Borde vi ha ett för Owners också? Det borde
 * vi i sådana fall koppla till existerande
 * owners, vilket i sin tur betyder att vi 
 * borde hämta owners innan vi kommer hit,
 * så vi kan komma åt alla owners ID:n
 * 
 * OBS: I databasen har vi satt not null 
 * på owner. Därför kommer jag i detta 
 * exempel sätta owner till 0
 * 
 * Det tar vi senare, nu gör det inget att
 * djuret inte får en ägare..
 * 
 * Jag kopplar formulärets submit-event
 * till metoden submitNewPet. 
 * Var även snabb med att lägga till 
 * .prevent på eventet, och detta är 
 * för att default beteendet på form i HTML
 * är att göra en hård sidomladdning.. 
 * detta vill vi inte..
 * 
 * Får inte glömma att binda input-fälten
 * med respektive variabel i data()
 * 
 * Det vore trevligt om dessa fält tömdes
 * när man lade till ett nytt djur.
 * 
 * Vi borde inte lägga till ett nytt djur
 * om något av input-fälten är tomma
 * 
 * Sätter vi required som attribut
 * på en input, så får vi ett "snyggt"
 * felmeddelande om vi inte fyller i något.
 * 
 * Vi behöver en dropdown för att välja owner.
 */

 import { create_UUID } from '../utilities/uuid.js'

 export default {
   template: `
    <form @submit.prevent="submitNewPet">
      <input v-model="petName" type="text" 
      required
      placeholder="Enter pet name ...">
      <input v-model="petSpecie" type="text" 
      required
      placeholder="Enter species ...">

      <input 
        type="file" 
        name="files" 
        accept=".png,.jpg,.jpeg,.gif,.bmp,.jfif" 
        multiple 
        required 
        @change="filesChange($event.target.files)"
      />

      <!-- Denna dropdown ska fyllas 
            med namnen från alla owners,
            och om man väljer en, så ska
            petOwner uppdateras med den 
            ägarens id.
          
            Lägger till en default option med 
            värdet 0, vilket inte ger djuret 
            någon ägare-->
      <select v-model="petOwner">
        <option value="0">No owner</option>
        <option 
          v-for="owner of owners"
          :key="owner.id"
          :value="owner.id">
        {{ owner.name }}
        </option>
      </select>

      <button>Add new pet</button>
    </form>
   `,
   data() {
    return  {
      petName: '',
      petSpecie: '',
      petOwner: 0,
      images: [],
      imageFiles: null
    }
   },
//   watch: {
//    petName(val) {
//      console.log(val)
//    }
//   },
   computed: {
    owners() {
      return this.$store.state.owners
    }
   },
   methods: {
    async filesChange(fileList) {
      if (!fileList.length) return;

      // handle file changes
      const formData = new FormData();

      // reset images array on file change
      this.images = []

      // append the files to FormData
      Array.from(Array(fileList.length).keys())
        .map(x => {

          // create a new unique filename
          const uuid = create_UUID()
          // with regex
          // const fileExt = fileList[x].name.replace(/[\w-]*/, '')

          let fileExt = fileList[x].name
          fileExt = fileExt.slice(fileExt.lastIndexOf('.'))
          const filename = uuid + fileExt

          // save image url in frontend array
          this.images.push('/uploads/' + filename)
          formData.append("files", fileList[x], filename);
        });

      // store formData to be sent later
      this.imageFiles = formData
    },
     /**
      * i metoden skapar vi ett objekt
      * som innehåller de egenskaper
      * som servern förväntar sig ta emot. 
      * 
      * Databasen kommer själv lägga till
      * id, så vi behöver inte skicka med det.
      * 
      * Denna fetch kommer skicka en POST 
      * till servern, så den kan lägga till
      * json-objektet vi skickar med i body.
      * 
      * Vi får inte glömma att skriva in i 
      * headern vilket typ av objekt vi skickar,
      * annars vet inte @RequestBody i Spring
      * hur den ska konvertera json-objektet
      * till ett Pet-objekt..
      */
     async submitNewPet() {
        if(!this.petName.trim() &&
            !this.petSpecie.trim() &&
            !this.imageFiles.length) {
              // input-fälten får inte vara tomma!
              return
            }

        let pet = {
          name: this.petName,
          species: this.petSpecie,
          owner: this.petOwner,
          imageUrl: this.images[0]
        }
        // glöm inte att metoden måste vara async
        // för att await ska fungera
        let result = await fetch('/rest/pets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pet)
        })
        // plockar ut objektet ur responsen
        // och lägger i samma variabel
        // som vi fick responsen i
        try {
          result = await result.json()

          // if we created an entity we then
          // send the image files
          await fetch('/api/upload-files', {
            method: 'POST',
            body: this.imageFiles
          });

          this.imageFiles = null
          this.images = []
        } 
        catch {
          console.warn('Could not create entity'); 
        }

        // när vi fått ett svar från servern
        // så får vi tillbaka samma objekt igen,
        // fast med ett nytt färskt ID, direkt
        // från databasen. Denna vill vi lägga till
        // i vår store lista med pets.

        //this.$store.commit('appendPet', result)

        // tömmer fälten när vi lagt till
        // ett nytt djur
        this.petName = ''
        this.petSpecie = ''
     }
   }
 }