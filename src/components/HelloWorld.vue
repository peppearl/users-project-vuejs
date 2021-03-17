<template>
  <div>
    <h1>Users</h1>
    <hr>
    <button
        id="fetch-users"
        class="btn btn-outline-dark joli"
        @click="fetchUsers"
    >
      Afficher 8 nouveaux utilisateurs
    </button>
    <button
        class="btn btn-outline-dark joli"
        @click="resetFilter"
    >
      Remettre les filtres par défaut
    </button>
    <router-link :to="{name : 'Create'}">
    <button
        class="btn btn-dark"
    >
      Ajouter un nouvel utilisateur
    </button>
    </router-link>
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
            type="search"
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
    <TableUsers :sortedAge="sortedAge" :currentSortDir="currentSortDir" :sortBy="sortBy" :deleteUser="deleteUser" />
  </div>
</template>

<script>
import axios from 'axios'
import TableUsers from "@/components/TableUsers";
export default {
  name: 'HelloWorld',
  components: {
    TableUsers
  },
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
        return (user.firstName + ' ' + user.lastName).toLowerCase().includes(this.filterByName.toLowerCase());
      })
    },
    sortedAge() {
      return this.getFilteredNames.slice().sort((a, b) => {
        if (!this.currentSortDir) return 0;
        const modifier = this.currentSortDir === 'desc' ? -1 : 1;
        return (a.age - b.age) * modifier;
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
          .get('http://localhost:12346/users')
          .then(response => (this.results = [...this.results, ...response.data]))
          .catch(error => {
            console.log(error)
            this.errored = true
          })
    },
    deleteUser() {
      axios
          .delete( `http://localhost:12346/users/`)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
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
      this.$router.push({ query })
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