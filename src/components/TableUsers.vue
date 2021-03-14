<template>
  <table
      v-if="sortedAge.length"
      id="tbl-users"
      class="table table-hover"
  >
    <thead>
    <tr>
      <th/>
      <th>Nom</th>
      <th>Email</th>
      <th>Genre</th>
      <th @click="sortBy('age')">
          <span v-if="currentSortDir === 'desc'">
            <svg
                data-v-1061b08a=""
                height="16"
                viewBox="0 0 320 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            ><path
                d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
                data-v-1061b08a=""
                fill="currentColor"
            /></svg>
          </span>
        <span v-else-if="currentSortDir === 'asc'">
            <svg
                data-v-1061b08a=""
                height="16"
                viewBox="0 0 320 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            ><path
                d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
                data-v-1061b08a=""
                fill="currentColor"
            /></svg>
          </span>
        <span v-else>
            <svg
                data-v-1061b08a=""
                height="16"
                viewBox="0 0 320 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            ><path
                d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
                data-v-1061b08a=""
                fill="currentColor"
            ></path>
            </svg>
          </span>
        Age
      </th>
    </tr>
    </thead>

    <tbody
        id="tbody-users"
    >
    <tr
        v-for="user in sortedAge"
        :key="user"
    >
        <td>
          <img :src="user.pic" alt="photo">
        </td>
      <router-link :to="{name : 'User', params: {id: user.id} }" class="routerUser">
        <td>{{ user.firstName }} {{ user.lastName }}</td>
      </router-link>
        <td>{{ user.email }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.age }}</td>
    </tr>
    </tbody>

  </table>
</template>

<script>
export default {
  name: 'TableUsers',
  props: {
    sortedAge: Array,
    currentSortDir: String,
    sortBy: Function
  },
  watch: {
    sortBy(s) {
      this.$parent.sortBy(s)
    }
  }
}
</script>

<style scoped>
th {
  color: #b033ff;
}
img {
  max-width: 60px;
}
.routerUser {
  color: #b033ff;
  text-decoration:none;
}
</style>