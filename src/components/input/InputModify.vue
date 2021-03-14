<template>
  <label class="m-r-10">
    {{ label1 }}
    <input
        type="text"
        :value="firstName"
        @input="$emit('update:firstName', $event.target.value)">
  </label>

  <label class="m-r-10">
    {{ label2 }}
    <input
        type="text"
        :value="lastName"
        @input="$emit('update:lastName', $event.target.value)">
  </label>
  <label class="m-r-10">
    {{ label3 }}
    <input
        type="date"
        :value="birthDate"
        @input="$emit('update:birthDate', $event.target.value)">
  </label>
  <br>
  <label class="m-r-10">
    {{ label4 }}
    <input id="emailInput"
        type="text"
        :value="email"
        @input="$emit('update:email', $event.target.value)">
  </label>
  <br>
  <label class="m-r-10">
    {{ label5 }}
    <input
        type="radio"
        :value="gender"
        :name="name"
        @input="$emit('update:gender', $event.target.value)">
  </label>
  <label class="m-r-10">
    {{ label6 }}
    <input
        type="radio"
        :value="gender"
        :name="name"
        @input="$emit('update:gender', $event.target.value)">
  </label>
</template>

<script>
export default {
  name: 'InputTest',
  props: {
    firstName: String,
    lastName: String,
    label1: String,
    label2: String,
    label3: String,
    label4: String,
    label5: String,
    label6: String,
    birthDate: String,
    email: String,
    gender: String,
    name: String,

  },
  emits: ['update:firstName', 'update:lastName', 'update:birthDate', 'update:email', 'update:gender', 'update:gender'],
}
</script>
<style>
.m-r-10 {
  margin-right: 10px
}
#emailInput
{
  width: 400px;
}
</style>