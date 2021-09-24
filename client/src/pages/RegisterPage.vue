<template>
  <div class="register">
    <div class="top">
      <router-link to="/">
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
      <input class="input" type="text" placeholder="Full name" >
      <input class="input" type="text" placeholder="Email">
      <input class="input" type="text" placeholder="Username (optional)">
      <input class="input" type="text" placeholder="Password">
      <div class="birthinput-wrap">
        <input class="input" type="text" placeholder="Day">
        <input class="input" type="text" placeholder="Month">
        <input class="input input-year" type="text" placeholder="Year">
      </div>
      <div class="gender-selection">
        <div class="gender-options">
          <input class="input-gender" type="checkbox">
          <label class="genderlabel" for="">Male</label>
        </div>
        <div class="gender-options">
          <input class="input-gender" type="checkbox">
          <label class="genderlabel" for="">Female</label>
        </div>
      </div>
    </div>
    <hr class="break" />
    <div class="submit-wrap">
      <button class="submit">Sign up</button>
    </div>
  </div>
</template>

<script>
export default {

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

  input[type=text] {
    color: white;
    font-size: 14px;
    font-weight: 900;
  }

  input[type=text]:focus {
    border: 3px solid rgb(22, 96, 165);
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