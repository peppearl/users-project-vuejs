<template>
  <button class="btn btn-outline-dark" @click="deleteUser">Supprimer</button>
</template>
<script>
export default {
  name: "DeleteUser",
  props: {
    deleteUser: Function
  },
  watch: {
    deleteUser() {
      this.$parent.deleteUser()
    }
  }
}
</script>
