export default {
  template: `
    <form @submit.prevent="doLogin">
      <h2>Login</h2>
      <input 
        v-model="username" 
        required
        type="text" 
        placeholder="username..">
      <input 
        v-model="password" 
        required 
        type="password" 
        placeholder="password..">

      <p v-if="errorLogin">Wrong username or password</p>
      <button>Submit</button>

      <p class="authenticate-text" @click="$router.push('/register')">Don't have an account?</p>
    </form>
  `,
  data() {
    return {
      username: '',
      password: '',
      errorLogin: false
    }
  },
  methods: {
    async doLogin() {
      this.errorLogin = false

      const credentials = 'username=' +
      encodeURIComponent(this.username)
      + '&password=' +
      encodeURIComponent(this.password)
      
      console.log(credentials);

      let response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: credentials
      });

      if(response.url.includes('error')) {
        console.log('Wrong username/password');
        this.errorLogin = true
      } else {
        this.$router.push('/')
        
        let user = await fetch('/auth/whoami')
        user = await user.json()
        this.$store.commit('setUser', user)
        console.log('Successfully logged in:', user)
      }
    }
  }
}