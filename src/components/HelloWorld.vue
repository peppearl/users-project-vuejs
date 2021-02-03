<template>
  <div>
    <h1>Users</h1>
    <hr>
    <button
        id="fetch-users"
        class="btn btn-outline-dark joli"
        @click="fetchUsers"
    >
      Afficher 20 nouveaux utilisateurs
    </button>
    <button
        class="btn btn-outline-dark"
        @click="resetFilter"
    >
      reset
    </button>
    <br>
    <label>
      <input
          v-model="genderFilter"
          :disabled="genderFilter.length<2 && genderFilter.includes('male')"
          type="checkbox"
          value="male"
      >
      Hommes
    </label>
    <label>
      <input
          v-model="genderFilter"
          :disabled="genderFilter.length<2 && genderFilter.includes('female')"
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
    <div>
      <label>Trier par âge :
      </label>
      <p v-if="currentSortDir === ''">Par défaut</p>
      <p v-else-if="currentSortDir === 'asc'">Croissant</p>
      <p v-else>Décroissant</p>
    </div>
    <p v-if="results.length">
      il y a <strong>{{ sortedAge.length }}</strong> utilisateur{{ sortedAge.length > 1 ? 's' : '' }}
      filtré{{ sortedAge.length > 1 ? 's' : '' }} sur {{ results.length }} totaux
    </p>
    <p v-else>
      il n'y a <strong>aucun</strong> utilisateur récupéré
    </p>
    <table
        v-if="results.length"
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
      genderFilter: (this.$route.query.gender || 'male,female').split(','),
      filterByName: this.$route.query.search || '',
      currentSort: 'age',
      currentSortDir: this.$route.query.sort || '',
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
        if (!this.currentSortDir) return 0;
        const modifier = this.currentSortDir === 'desc' ? -1 : 1;
        return (a.dob.age - b.dob.age) * modifier;
      });
    },
  },
  mounted() {
    console.log(this.$route)
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
    sortBy(s) {
      //if s == current sortBy, reverse
      if (s === this.currentSort) {
        if (this.currentSortDir === '') {
          this.currentSortDir = 'asc'
          return this.results
        } else if (this.currentSortDir === 'asc') {
          this.currentSortDir = 'desc'
        } else if (this.currentSortDir === 'desc') {
          this.currentSortDir = ''
        }
        this.currentSort = s;
      }
    },
    resetFilter() {
      this.genderFilter = ['male', 'female'];
      this.filterByName = '';
      this.currentSortDir = ''
    },
    updateQuery() {
      const query = {};
      if (this.genderFilter.length < 2) {
        query.gender = this.genderFilter.join(',')
      }
      if (this.filterByName) {
        query.search = this.filterByName
      }
      if (this.currentSortDir) {
        query.sort = this.currentSortDir
      }
      this.$router.push({query})
    }
  },
  watch: {
    genderFilter() {
      this.updateQuery()
    },
    filterByName() {
      this.updateQuery()
    },
    currentSortDir() {
      this.updateQuery()
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