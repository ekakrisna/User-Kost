<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card width="374" height="374" class="px-6 px-sm-12 text-center">
          <p class="text-h6 pt-10">{{ $t('general.auth.transmisionComplete') }}</p>
          <p class="pt-10 text-caption">{{ $t('general.auth.confirmTransmision') }}</p>
        </v-card>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
