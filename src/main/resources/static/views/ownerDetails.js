export default {
  template: `
    <div>
      <h2>{{ owner.name }}</h2>

       <h4>Pets:</h4>
        <ul>
          <li v-for="pet of owner.pets" 
            :key="pet.id"
            class="pet-card">
            name: {{ pet.name }} <br>
            species: {{ pet.species }}
          </li>
        </ul>
    </div>
  `,
  data() {
    return {
      owner: {
        name: '',
        pets: []
      }
    }
  },
  async created() {
    // we can access all dynamic url params
    // in this.$route.params

    // params == parameters
    console.log(this.$route.params.id);

    let owner = await fetch('/rest/owners/' + this.$route.params.id)
    // before .json() we can check with 
    // an if-statement if we got an owner 
    // or not
    
    owner = await owner.json()
    console.log(owner);

    /**
     * this.owner points att the owner in data().
     * 
     * this in Vue always refers to the component instance,
     * so this.owner is the owner in data(), 
     * and the owner(without this) is the local 
     * variable in the created() scope
     */
    this.owner = owner
  }
}