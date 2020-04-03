export default {
  template: `
    <div id="app">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/owners">Owners</router-link>
        <a @click="doLogout">📲</a>
      </nav>

      <main>
        <router-view />
      </main>
    </div>
  `,
  data() {
    return {
      queryId: 123,
      queryName: 'Adam'
    }
  },
  methods: {
    doLogout() {
      fetch('/logout')
      console.log('Successfully logged out');

      // reset user on logout
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    }
  },
  /**
   * Att vi lägger denna fetch i app.js 
   * är för att vi vill bara hämta dessa owners
   * en gång: när vi startar appen. 
   * Behöver vi ha en färsk lista med senaste
   * uppdateringen så måste vi göra en ny
   * fetch och $store.commit i den komponent
   * som kräver detta. 
   * 
   * I mitt fall är jag nöjd med detta.
   * 
   * för att kunna använda await i en 
   * lifecycle-hook måste den vara async
   */
  async created() {
    let user = await fetch('/auth/whoami')

    try {
      user = await user.json()
      this.$store.commit('setUser', user)
      console.log(user);
    } catch {
      console.log('Client not authenticated');
    }


    let owners = await fetch('/rest/owners')
    owners = await owners.json()

    // när vi fått våra owners from servern
    // kan vi uppdatera listan i store
    this.$store.commit('setOwners', owners)

    /**
     * Vi ser i Vue DevTools att listan i store
     * uppdateras med "alla" owners när vi laddar
     * sidan.
     */
  }
}