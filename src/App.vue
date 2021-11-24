<template>
  <v-app id="inspire" :style="{ background: '#F8F6F0' }">
    <v-progress-linear indeterminate v-if="loadingPage"></v-progress-linear>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  metaInfo() {
    return {
      title: 'CLUB ICHIJOプレミアム会員 | 一条工務店宮城｜仙台・宮城の住宅・宅地・ハウスメーカー',
    };
  },
  data: () => ({}),
  computed: mapState({
    loadingPage: state => state.global.loadingPage,
  }),
};
</script>
