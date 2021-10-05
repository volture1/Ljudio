<template>
    <div class="login">
      <div class="top">
        <router-link to="/">
          <p class="goback-route">Home</p>
        </router-link>  
        <h1 class="pagetitle">Login</h1>
      </div>
      <div class="productname-icon">
        <h3 class="productname">Ljudio</h3>
        <img src="../assets/Logo.png" alt="" class="logo">
      </div>
      <hr class="break">
      <form @submit.prevent="handleSubmit">
        <div class="fields">
          <input class="input" v-model="email" type="email" placeholder="Email" >
          <input class="input" v-model="password" type="password" placeholder="Password" >
          <div v-if="tempError" class="error">{{tempError}}</div>
        </div>
        <div class="login-wrap">
          <button class="btn">Log in</button>          
        </div> 
      </form>  
      <hr class="break">
      <div class="register-router-wrap">
        <p class="register-router">Don't have an account yet?</p>
        <button class="btn register-btn" @click="register">Register</button>       
      </div>
    </div>
</template>

<script>


export default {
  data(){
    return{
      email:"",
      password:"",
      tempError:""
    }
  },
  computed:{
    isLoggedIn(){     
      return this.$store.state.loggedIn;
    },
    currentUser(){      
      return this.$store.state.currentUser;
    },
    checkEmail(){
      if (this.email == this.currentUser.email){
        this.tempError = "email or password can not be null"
        return 
      }
    },
  },
  methods:{
    register(){
      this.$router.push('/Register')     
    },
    async handleSubmit(){
      const credentials = {
        email:this.email,
        password:this.password
      }
      
      if(credentials.email =='' || credentials.password =='' ){
         this.tempError = "Email or password can not be null"
        return
      }
      if(credentials.email === this.currentUser.email){
          this.tempError = "You have already login"          
          return
      }
      await this.$store.dispatch('login',credentials)   
      if(!this.isLoggedIn){
        this.tempError = "wrong email or password"
      }
      this.$router.push('/Home')
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: white;
  }

  .login {
    width: 50vw;
    margin: 0 auto;
    margin-top: 4em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .break {
    width: 15vw;
    margin: 1em auto;
    border-color: rgba(255, 255, 255, 0.1);
  }

  .goback-route {
    font-size: 12px;
    margin-bottom: 2em;
    text-decoration: underline;
    font-weight: 900;
    cursor: pointer
  }

  .goback-route:hover {
    opacity: 0.5;
  }

  .pagetitle {
    margin-bottom: 1em;
    font-size: 46px;
    font-weight: 900;
  }

  .productname-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
  }

  .productname {
    font-size: 28px;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 2em;
    width: 25vw;
    margin: 0 auto;
  }

  .input {
    padding: 12px 6px;
    outline: none;
    border: none;
    border-radius: 5px;
    /* background-color: #131212af; */
    background-color: rgba(196, 196, 196, 0.1);
    border: 3px solid transparent;
    box-sizing: border-box;
  }

  input[type=email], input[type=password] {
    color: white;
    font-size: 14px;
    font-weight: 900;
  }

  input[type=email]:focus, input[type=password]:focus {
    border: 3px solid rgb(22, 96, 165);
  }

  .login-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register-router-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .register-router {
    font-size: 14px;
    opacity: 0.5;
    margin-bottom: 0.25em;
  }

  .btn {
    cursor: pointer;
    outline: none;
    padding: 0.5em 6em;
    background-color: rgba(196, 196, 196, 0.1);
    font-weight: 500;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: 900;
    margin-top: 2em;
  }

  .btn:hover {
    opacity: 0.8;
  }

  .register-btn {
    margin-top: 0.25em;
  }
</style>