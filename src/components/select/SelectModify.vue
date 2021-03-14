<template>
  <label>
    {{ label }}
    <select :value="gender" @input="$emit('update:gender', $event.target.value)">
      <option disabled value="">Choisissez</option>
      <option value="female">Femme</option>
      <option value="male">Homme</option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'InputTest',
  props: {
    label: String,
    gender: String,
  },
  emits: ['update:gender'],
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