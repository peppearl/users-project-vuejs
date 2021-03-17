<template>
  <div>
    <h1>Utilisateur n° {{ `${this.$route.params.id}` }}</h1>
    <br>
    <div>
      <button
          class="btn btn-outline-dark joli"
          @click="back"
      >
        Retour
      </button>
    </div>
  </div>
  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <div class="container d-flex justify-content-center">
        <div class="col-md-12">
          <div class="card user-card-full">
            <div class="row m-l-0 m-r-0">
              <div class="col-sm-4 bg-c-lite-green user-profile">
                <div class="card-block text-center text-white">
                  <div class="m-b-25"><img :src="user.pic" class="img-radius" alt="User-Profile-Image"></div>
                  <h6 class="f-w-600">{{ user.firstName }}</h6>
                  <h6 class="f-w-600">{{ user.lastName }}</h6>
                  <p>{{ user.gender }}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="card-block">
                  <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                  <div class="row">
                    <div class="col-sm-12 m-b-20">
                      <p class="m-b-10 f-w-600">Email</p>
                      <h6 class="text-muted f-w-400">{{ user.email }}</h6>
                    </div>
                    <div class="col-sm-12 m-b-20">
                      <p class="m-b-10 f-w-600">Age</p>
                      <h6 class="text-muted f-w-400">{{ user.age }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <form @submit.prevent>
    <div class="container">
      <div class="row">
        <div class="card d-flex justify-content-center mx-auto my-3 p-5">
          <h2>Modifier l'utilisateur</h2>
          <InputModify
              v-model:first-name="user.firstName" label1="Prénom"
              v-model:last-name="user.lastName" label2="Nom"
              v-model:birth-date="user.birthDate" label3="Date de naissance"
              v-model:email="user.email" label4="Email"
          ></InputModify>
          <br>
          <SelectModify label="Sélectionnez le genre :" v-model:gender="user.gender"/>
          <div class="center">
            <button class="btn btn-dark m-r-10" @click="updateUser">Envoyer</button>
            <button class="btn btn-outline-dark" @click="resetForm">Annuler les modifications</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios"
import SelectModify from "@/components/select/SelectModify";
import InputModify from "@/components/input/InputModify";

export default {
  name: 'EditUser',
  components: {
    InputModify,
    SelectModify,
  },
  data() {
    return {
      user: {},
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
    },
    updateUser() {
      axios
          .put(`http://localhost:12346/users/${this.$route.params.id}`,
              {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                birthDate: this.user.birthDate,
                pic: this.user.pic,
                gender: this.user.gender
              })
          .then(response => {
            console.log(response)
            alert("Utilisateur modifié !")
            this.$router.push('/users');
          })
    },
    resetForm(e) {
      e.preventDefault()
      return this.fetchUser()
    },
  },
  created() {
    this.fetchUser();
  }
}
</script>

<style>
h2 {
  font-weight: 900;
  color: #b033ff;
}
/* Template Bootstrap */
.padding {
  padding: 3rem !important
}
.user-card-full {
  overflow: hidden
}
.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 30px
}
.m-r-0 {
  margin-right: 0
}
.m-r-10 {
  margin-right: 10px
}
.m-l-0 {
  margin-left: 0
}
.user-card-full .user-profile {
  border-radius: 5px 0 0 5px
}
.bg-c-lite-green {
  background: -webkit-gradient(linear, left top, right top, from(#b033ff), to(#ee5a6f));
  background: linear-gradient(to right, #ee5a6f, #b033ff)
}
.user-profile {
  padding: 20px 0
}
.card-block {
  padding: 1.25rem
}
.m-b-25 {
  margin-bottom: 25px
}
.img-radius {
  border-radius: 5px;
  max-width: 200px;
}
h6 {
  font-size: 16px
}
.card .card-block p {
  line-height: 25px
}
@media only screen and (min-width: 1400px) {
  p {
    font-size: 14px
  }
}
.card-block {
  padding: 1.25rem
}
.b-b-default {
  border-bottom: 1px solid #e0e0e0
}
.m-b-20 {
  margin-bottom: 20px
}
.p-b-5 {
  padding-bottom: 5px !important
}
.card .card-block p {
  line-height: 25px
}
.m-b-10 {
  margin-bottom: 10px
}
.text-muted {
  color: #919aa3 !important
}
.b-b-default {
  border-bottom: 1px solid #e0e0e0
}
.f-w-600 {
  font-weight: 600
}
.m-b-20 {
  margin-bottom: 20px
}
.p-b-5 {
  padding-bottom: 5px !important
}
.m-b-10 {
  margin-bottom: 10px
}
.user-card-full .social-link li {
  display: inline-block
}
.user-card-full .social-link li a {
  font-size: 20px;
  margin: 0 10px 0 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out
}
.center {
  margin: 10px auto !important;
}
</style>