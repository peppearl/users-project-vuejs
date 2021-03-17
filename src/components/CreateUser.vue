<template>
  <div>
    <br>
    <div class="container">
      <div class="row">
        <div class="card d-flex justify-content-center mx-auto my-3 p-5">
          <h1>Créer un nouvel utilisateur</h1>
          <InputCreate
              v-model:first-name="form.firstName" label1="FIRST NAME"
              v-model:last-name="form.lastName" label2="LAST NAME"
              v-model:email="form.email" label4="EMAIL"
              v-model:birth-date="form.birthDate" label3="BIRTH DATE"
              v-model:pic="form.pic" label5="IMAGE"
          ></InputCreate>
          <SelectCreate label="Sélectionnez le genre" v-model:gender="form.gender"/>
          <div class="form-button pt-4">
            <button type="submit" class="btn btn-primary btn-block btn-lg" value="Register" name="register"
                    @click="createUser">
              <span>CREER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import InputCreate from "@/components/input/InputCreate";
import SelectCreate from "@/components/select/SelectCreate";


export default {
  name: "CreateUser",
  components: {
    InputCreate,
    SelectCreate
  },
  data() {
    return {
      errored: false,
      form: {
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        pic: '',
        email: ''
      }
    }
  },
  methods: {
    createUser() {
      axios
          .post(`http://localhost:12346/users`, this.form)
          .then(response => {
            console.log(response)
              alert("Utilisateur créé !")
              this.$router.push('/users')
          })
          .catch(error => {
            console.log(error)
            if (error.response.status === 405) {
              alert("Email déjà utilisé !")
            }
            this.errored = true
          })
    },
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 0;
  width: 550px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)
}
h1 {
  color: #b033ff;
  padding: 10px 0 20px;
  font-weight: 900
}
.form-group label {
  font-size: 9px;
  font-weight: bold
}
.form-group span {
  color: rgb(255, 0, 0)
}
.btn-block {
  border-radius: 0;
  border: none;
  margin-top: 10px;
  padding-top: 0;
  background: #b033ff
}
.btn-block:hover {
  background: #b033ff;
}
.btn-block:focus {
  box-shadow: none;
  background: #b033ff !important
}
.btn-primary span {
  font-size: 12px
}
</style>