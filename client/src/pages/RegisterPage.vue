<template>
  <div class="register">
    <div class="top">
      <router-link to="/Home">
        <p class="goback-route">Home</p>
      </router-link>
      <h1 class="pagetitle">Registration</h1>
    </div>
    <div class="productname-icon">
      <h3 class="productname">Ljudio</h3>
      <img src="../assets/Logo.png" alt="" class="logo">
    </div>
    <hr class="break" />
    <div class="fields">
      <input class="input" type="text" placeholder="Full name" name="fullname" v-model="user.name">
      <input class="input" type="text" placeholder="Email" name="email" v-model="user.email">
      <p class="errorEmail" v-if="isDuplicatedEmail">Email already in use</p>
      <input class="input" type="text" placeholder="Username (optional)" name="username">
      <input class="input" type="password" placeholder="Password" name="password" v-model="user.password">
      <div class="birthinput-wrap">
        <input class="input" type="text" placeholder="Day" name="day" v-model="user.birthday">
        <input class="input" type="text" placeholder="Month" name="month" v-model="user.birthmonth">
        <input class="input input-year" type="text" placeholder="Year" name="year" v-model="user.birthyear">
      </div>
      <div class="gender-selection">
        <div class="gender-options">
          <input @click="setGender($event)" class="input-gender" type="checkbox" name="male" :disabled="this.genderSelected.male">
          <label class="genderlabel" for="">Male</label>
        </div>
        <div class="gender-options">
          <input @click="setGender($event)" class="input-gender" type="checkbox" name="female" :disabled="this.genderSelected.female">
          <label class="genderlabel" for="">Female</label>
        </div>
      </div>
    </div>
    <hr class="break" />
    <div class="submit-wrap">
      <button @click="register()" class="submit">Sign up</button>      
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        birthday: '',
        birthmonth: '',
        birthyear: '',
        gender: '',
        isDuplicatedEmail:false,
        isLoggedIn:false,
      },
      genderSelected: {male: false, female: false}
    }
  },
  computed:{
    isLoggedIn(){
      console.log('isLoggedIn',this.$store.state.loggedIn)
      return this.$store.state.loggedIn;
    },
    isDuplicatedEmail(){
       if (this.$store.state.duplicateEmail == 'Email already in use'){      
        return true
      }
    },
  },
  methods: {
    setGender(event) {
      switch(event.target.name) {
        case 'male':
          this.genderSelected.female = !this.genderSelected.female;
          this.user.gender = event.target.name;
          break;
        case 'female':
          this.genderSelected.male = !this.genderSelected.male;
          this.user.gender = event.target.name;
          break;
      }
    },
    async register() {
      let credentials = {
        firstname: this.user.name.split(' ')[0],
        lastname: this.user.name.split(' ')[1],
        email: this.user.email,
        password: this.user.password,
        birthday: this.user.birthday + '-' + this.user.birthmonth + '-' + this.user.birthyear,
        gender: this.user.gender,
        playlist: null,
        liked: null
      }
      
      await this.$store.dispatch('register', credentials);
     /*  if (this.$store.state.duplicateEmail == 'Email already in use'){        
        this.isDuplicateEmail = true
        console.log('this.duplicateEmail in register metod',this.isDuplicateEmail)
      } */
      if (this.isLoggedIn){
         console.log('this.isLoggedIn before push to home',this.isLoggedIn)
        this.$router.push('/Home');
      }
      
      /* for(let attr in this.user) {
        attr = '';
      } */
    }
  }
}
</script>

<style scoped>

  a {
    text-decoration: none;
    color: white;
  }

  .break {
    width: 50%;
    margin: 2em auto;
    border-color: rgba(255, 255, 255, 0.1);
  }

  input[type=text], input[type=password] {
    color: white;
    font-size: 14px;
    font-weight: 900;
  }

  input[type=text]:focus {
    border: 3px solid rgb(22, 96, 165);
  }

  input[type=password]:focus {
    border: 3px solid rgb(22, 96, 165);
  }
  .errorEmail {
    color:red
  }
  /* .top {
    width: 75%;
    margin: 0 auto;
  } */

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

  .productname-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
  }

  .productname {
    font-size: 28px;
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

  .register {
    width: 50vw;
    margin: 0 auto;
    margin-top: 4em;
  }

  .pagetitle {
    margin-bottom: 1em;
    font-size: 46px;
    font-weight: 900;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 2em;
    width: 75%;
    margin: 0 auto;
  }

  .birthinput-wrap {
    display: flex;
    gap: 0.5em;
  }

  .input-year {
    width: 50vw;
  }

  .gender-selection {
    display: flex;
    gap: 6em;
  }

  .gender-options {
    display: flex;
    gap: 1em;
    justify-content: center;
    align-items: center;
  }

  .input-gender {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    appearance: none;
    -webkit-appearance: none;
    border: 1px solid rgba(196, 196, 196, 0.1);;
    outline: none;
    cursor: pointer;
  }

  .input-gender:checked {
    background-color: rgb(22, 96, 165);
  }

  .genderlabel {
    font-weight: 900;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.3);
  }

  .submit-wrap {
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .submit {
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
  }

  .submit:hover {
    opacity: 0.8;
  }

</style>