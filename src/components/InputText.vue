<template>
  <label>
    {{label}}
    <input type="text" :value="value">
  </label>
</template>

<script>
export default {
  name: 'InputText',
  props: [
    "label",
    "value"
  ]
}
</script>