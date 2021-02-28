<template>
  <h1>Profil de {{ `${this.$route.params.id}` }}</h1>
  <pre>{{ user }}</pre>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  methods: {
    back() {
      this.$router.go(-1)
    },
    fetchUsers() {
      axios
          .get(`http://localhost:12346/users/${this.$route.params.id}`)
          .then(response => (this.results = [...this.results, ...response.data]))
          .catch(error => {
            console.log(error)
            this.errored = true
          })
    }
  }
}
</script>

<style scoped>

</style>