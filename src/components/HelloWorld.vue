<template>
  <div>
    <h1>VueJS Users</h1>
    <hr>
    <button
        id="fetch-users"
        class="btn btn-outline-dark joli"
        @click="fetchUsers"
    >
      Afficher 20 nouveaux utilisateurs
    </button>
    <br>
    <label>
      <input
          v-model="genderFilter"
          type="checkbox"
          value="male"
      >
      Hommes
    </label>
    <label>
      <input
          v-model="genderFilter"
          type="checkbox"
          value="female"
      >
      Femmes
    </label>
    <div id="divHidden">
      {{ genderFilter }}
    </div>
    <div>
      <label>
        Rechercher un utilisateur
        <input
            v-model="filterByName"
            placeholder="Rechercher un utilisateur"
        >
      </label>
    </div>
    <table
        id="tbl-users"
        class="table table-hover"
    >
      <thead>
      <tr>
        <th/>
        <th>Nom</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Genre</th>
        <th @click="sort('age')">
          <span v-if="currentSortDir === 'desc'">
            <svg
                data-v-1061b08a=""
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
            ><path
                data-v-1061b08a=""
                fill="currentColor"
                d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
            /></svg>
          </span>
          <span v-else>
            <svg
                data-v-1061b08a=""
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
            ><path
                data-v-1061b08a=""
                fill="currentColor"
                d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
            /></svg></span>
          Age
        </th>
      </tr>
      </thead>
      <tbody
          id="tbody-users"
      >
      <tr
          v-for="user in sortedAge"
          :key="user.email"
      >
        <td><img :src="user.picture.thumbnail"></td>
        <td>{{ user.name.first }} {{ user.name.last }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.dob.age }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      results: [],
      errored: false,
      genderFilter: ['male', 'female'],
      filterByName: '',
      currentSort: 'age',
      currentSortDir: 'asc',
    }
  },
  computed: {
    usersFiltered() {
      return this.results.filter(user => this.genderFilter.includes(user.gender));
    },
    getFilteredNames() {
      return this.usersFiltered.filter(user => {
        return (user.name.first + ' ' + user.name.last).toLowerCase().includes(this.filterByName.toLowerCase());
      })
    },
    sortedAge() {
      return this.getFilteredNames.slice().sort((a, b) => {
        let modifier = 1;

        if (this.currentSortDir === 'desc') modifier = -1;
        if (a.dob.age < b.dob.age) return -1 * modifier;
        if (a.dob.age > b.dob.age) return modifier;
        return 0;
      });
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
          .get('https://randomuser.me/api/?results=20')
          .then(response => (this.results = [...this.results, ...response.data.results]))
          .catch(error => {
            console.log(error)
            this.errored = true
          })
    },
    sort(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: 900;
  margin: 20px 0 0;
  color: #b033ff;
}

th {
  color: #b033ff;
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

label {
  margin: 10px 10px !important;
}

#divHidden {
  display: none;
}

.joli {
  margin-right: 10px;
}
</style>