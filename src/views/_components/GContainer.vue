<template>
  <div class="container">
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.container {
  max-width: 750px !important;
}
</style>
