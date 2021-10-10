<template>
   <div class="container">
      <Liked />
    </div>
</template>

<script>
import Liked from "../components/Liked.vue"
export default {
    components:{Liked}

}
</script>

<style scoped>

.container {
  width: 75%;
  display: flex;
  flex-direction: column;
  margin-left: 20vw;
  padding: 1em;
}
 @media screen and (max-width: 950px) {
  .container{
    margin-left: 5%;
    width: 95%;
  }
} 

</style>