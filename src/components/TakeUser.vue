<template>
  <div class="hello">
    <table id="tbl-users" class="table table-hover" v-if="usersFiltered.length">
      <thead>
        <tr>
          <th></th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th @click="changeSort">
            Age
            <i v-if="sortDirection" class="fa" v-bind:class="[ sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down' ]"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersFiltered" :key="user">
          <td>
            <router-link :to="{name : 'EditUser', params: {id: user.id} }">
              <img :src="user.avatarUrl"/>
            </router-link>
          </td>
          <td>
            <router-link :to="{name : 'EditUser', params: {id: user.id} }">
              {{user.lastName}}
            </router-link></td>
          <td>{{user.firstName}}</td>
          <td>{{user.email}}</td>
          <td>{{user.age}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TakeUser',
  props: {
    usersFiltered: Array,
    genderFilter : Array,
    search : String,
    sortDirection : String,
    changeSort : Function
  },
  watch:{
    changeSort(){
      this.$parent.changeSort()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
