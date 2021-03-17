<template>
  <div class="form-row">
    <div class="form-group col-md-6 first">
      <label for="inputFirstName">{{ label1 }} <span>*</span></label>
      <input type="text" class="form-control" id="inputFirstName" name="firstname" required
             :value="firstName"
             @input="$emit('update:firstName', $event.target.value)">
      <div id="fname_error" class="val_error"></div>
    </div>
    <div class="form-group col-md-6 first">
      <label for="inputLastName">{{ label2 }} <span>*</span></label>
      <input type="text" class="form-control" id="inputLastName" name="lastname"
             :value="lastName"
             @input="$emit('update:lastName', $event.target.value)">
      <div id="lname_error" class="val_error"></div>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-12">
      <label for="inputEmail">{{ label4 }} <span>*</span></label>
      <input type="email" class="form-control" id="inputEmail" name="youremail"
             :value="email"
             @input="$emit('update:email', $event.target.value)">
      <div id="email_error" class="val_error"></div>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-12">
      <label for="inputPic">{{ label5 }} <span>*</span></label><br>
      <input type="file" id="inputPic" name="yourpic" accept="image/*"
             :value="pic"
             @input="$emit('update:pic', $event.target.value)"
             @change="handleFileUpload">
      <div id="pic_error" class="val_error"></div>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-12"><label for="inputBirthDate">{{ label3 }} <span>*</span></label>
      <input type="date" class="form-control" id="inputBirthDate" name="yourbirthd"
             :value="birthDate"
             @input="$emit('update:birthDate', $event.target.value)">
      <div id="phone_error" class="val_error"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputCreate',
  props: {
    firstName: String,
    lastName: String,
    label1: String,
    label2: String,
    label3: String,
    label4: String,
    label5: String,
    birthDate: String,
    email: String,
    pic: String,
    handleFileUpload: Function
  },
  emits: ['update:firstName', 'update:lastName', 'update:birthDate', 'update:email', 'update:pic'],
  watch: {
    handleFileUpload() {
      this.$parent.handleFileUpload()
    }
  }
}
</script>
<style>
h1 {
  color: #b033ff;
  padding: 10px 0 20px;
  font-weight: 900
}

.form-group {
  margin-top: 20px
}

.first {
  margin-top: 0 !important
}

.form-control {
  border-radius: 0
}

.form-group label {
  font-size: 9px;
  font-weight: bold
}

.form-group span {
  color: rgb(255, 0, 0)
}

.form-control:focus {
  border: 2px solid #adb5bd;
  border-radius: 0;
  box-shadow: none;
  background: #ff000012;
  letter-spacing: 1px;
  color: #000
}

.btn-primary span {
  font-size: 12px
}

.val_error {
  color: #dc3545;
  font-size: 10px;
  padding-top: 5px;
  font-weight: bold
}
</style>