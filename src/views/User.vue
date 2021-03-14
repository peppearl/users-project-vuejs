<template>
  <div>
    <div>
      <EditUser/>
    </div>
  </div>
</template>
<script>
import EditUser from '@/components/EditUser.vue'

export default {
  name: 'User',
  components: {
    EditUser
  },
}
</script>

<style>
#app {
  font-family: 'Playfair Display', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>