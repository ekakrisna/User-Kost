<template>
  <v-navigation-drawer class="backblack" v-model="drawerOpen" app>
    <v-app-bar class="backblack" flat>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ $t('general.nav.projectName') }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <!-- {{ $t('general.nav.grune') }} -->
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-app-bar>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-group>
        <template>
          <v-list-item :to="{ name: 'mypage' }">
            <v-list-item-content>
              <v-list-item-title class="textwhite">{{ $t('general.nav.mypage') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template>
          <v-list-item :to="{ name: 'user.edit', params: { id: this.user.id } }">
            <v-list-item-content>
              <v-list-item-title class="textwhite">{{ $t('general.nav.userEdit') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template>
          <v-list-item :to="{ name: 'point', params: { id: this.user.id } }">
            <v-list-item-content>
              <v-list-item-title class="textwhite">{{ $t('general.nav.point') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template>
          <v-list-item :to="{ name: 'news', params: { id: this.user.id } }">
            <v-list-item-content>
              <v-list-item-title class="textwhite">{{ $t('general.nav.news') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template>
          <v-list-item :to="{ name: 'logout' }">
            <v-list-item-content>
              <v-list-item-title class="textwhite">{{ $t('general.nav.logout') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { show } from '@services/crud';

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      user: {
        id: 1,
      },
    };
  },
  computed: {
    drawerOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    activeSide: function(routeName) {
      if (routeName == this.$route.name) {
        return 'v-list-item--active';
      } else if (routeName == 'news.new') {
        if (this.$route.name == 'news.edit') {
          return 'v-list-item--active';
        }
      }
    },
  },
  async created() {
    this.loadingComponent = true;
    try {
      this.user = await show('front/mypage');
    } catch (err) {
      console.log(err);
    }
    this.loadingComponent = false;
  },
};
</script>
<style>
.backblack {
  color: white !important;
  background-color: black !important;
}

.textwhite {
  color: white !important;
}
</style>
