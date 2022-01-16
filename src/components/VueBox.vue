<template lang="pug">
#vue-box-wrapper
  div {{ input }}
  #vue-row(v-for="id in input")
    span {{ id }}
    input(type="text")
</template>

<script>
export default {
  name: "vue-box",
  props: {
    input: {
      default: [],
    },
  },
  data() {
    return {
      data: [],
    };
  },
};
</script>

<style lang="scss">
#vue-box-wrapper {
  width: 400px;
  height: 400px;
  margin: auto;
  border-radius: 8px;
  background-color: #f1f1f1;
}
</style>
