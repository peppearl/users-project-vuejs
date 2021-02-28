<template>
  <div>
    <h1>Modifier utilisateur n° {{ `${this.$route.params.id}` }}</h1>
    <br>
    <div>
      <button
          class="btn btn-outline-dark joli"
          @click="back"
      >
        Retour
      </button>
    </div>
    <InputText label="nom" :value="user.lastName"/>
    <InputText label="prenom" :value="user.firstName"/>
  </div>
</template>

<script>
import InputText from "../components/InputText.vue"
import axios from "axios"

export default {
  name: 'EditUser',
  components: {
    InputText
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    fetchUser() {
      axios
          .get(`http://localhost:12346/users/${this.$route.params.id}`)
          .then(response => this.user = response.data)
    }
  },
  created() {
    this.fetchUser();
  }
}
</script>

<style>
#edit {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.headt {
  display: flex;
  justify-content: space-around;
}
</style>