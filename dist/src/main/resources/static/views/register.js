export default {
  template: `
    <form @submit.prevent="doRegister">
      <h2>Register</h2>
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
      <button>Submit</button>

      <p class="authenticate-text" @click="$router.push('/login')">Already have an account?</p>
    </form>
  `,
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async doRegister() {
      const credentials = {
        username: this.username,
        password: this.password
      }

      console.log(credentials);

      let response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      try {
        response = await response.json()
        console.log('Successfully registered:', response)

        this.$router.push('/login')
      } catch {
        console.log('Error, could not register');
      }
    }
  }
}