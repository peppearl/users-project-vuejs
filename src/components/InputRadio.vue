<template>
  <label>
    {{label}}
    <input type="radio" :value="value" :name="name">
  </label>
</template>

<script>
export default {
  name: 'InputRadio',
  props: [
    "label",
    "value",
    "name"
  ]
}
</script>