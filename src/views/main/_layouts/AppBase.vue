<template>
  <div>
    <base-nav-left v-model="drawerOpen"></base-nav-left>
    <base-app-bar v-model="drawerOpen"></base-app-bar>

    <v-main>
      <base-notification-snackbar></base-notification-snackbar>
      <v-progress-linear v-if="loadingPage" indeterminate></v-progress-linear>
      <g-container></g-container>
      <!--<v-container class="py-8 px-6 mb-10" fluid>
        <router-view :key="$route.path"></router-view>
      </v-container>-->
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BaseAppBar from './BaseAppBar.vue';
import BaseNavLeft from './BaseNavLeft.vue';
import BaseNotificationSnackbar from './BaseNotificationSnackbar.vue';
import GContainer from '@views/_components/GContainer.vue';
export default {
  data() {
    return {
      drawerOpen: false,
    };
  },
  computed: mapState({
    loadingPage: state => state.global.loadingPage,
  }),
  components: {
    GContainer,
    BaseNavLeft,
    BaseAppBar,
    BaseNotificationSnackbar,
  },
};
</script>
