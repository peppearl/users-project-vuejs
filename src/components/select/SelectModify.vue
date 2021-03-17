<template>
  <div class="form-check form-check-inline">
    <label>
      {{ label }}
      <select :value="gender" @input="$emit('update:gender', $event.target.value)">
        <option disabled value="">Choisissez</option>
        <option value="female">Femme</option>
        <option value="male">Homme</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectModify',
  props: {
    label: String,
    gender: String,
  },
  emits: ['update:gender'],
}
</script>
<style>
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
.btn-primary span {
  font-size: 12px
}
</style>