<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card :loading="isLoading" width="374">
          <template slot="progress">
            <v-progress-linear height="4" indeterminate />
          </template>
          <div class="px-6 py-8">
            <p class="text-center text-h6">{{ $t('general.auth.resetPassword') }}</p>
            <p class="text-center text-caption py-4">{{ $t('general.auth.pleasePassword') }}</p>
            <v-form ref="resetPassword" @submit.prevent="submit">
              <p class="mb-4">{{ $t('general.auth.details') }}</p>
              <p class="text-subtitle-2">{{ email }}</p>
              <v-text-field
                v-model="password1"
                type="password"
                :placeholder="$t('general.auth.newPassword')"
                :rules="passwordRule"
                outlined
                required
                append-icon="mdi-lock-outline"
              ></v-text-field>
              <v-text-field
                v-model="password2"
                type="password"
                :placeholder="$t('general.auth.newConfirmPassword')"
                outlined
                required
                append-icon="mdi-lock-outline"
              ></v-text-field>
              <div v-if="doesntMatch">
                <span style="color:red">{{ $t('general.auth.passwordsDontMatch') }}</span>
              </div>
              <v-btn block class="pa-2 theme--dark my-3" color="gold" type="submit">{{
                $t('general.auth.setPassword')
              }}</v-btn>
            </v-form>
          </div>
        </v-card>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {
      password1: '',
      password2: '',
      passwordRule: [
        v => v.length >= 8 || this.$t('general.validation.passwordTooShort'),
        v => v.length <= 32 || this.$t('general.validation.passwordTooLong'),
      ],
      doesntMatch: null,
      isLoading: false,
    };
  },
  computed: {
    sentTo: function() {
      return 'password/reset';
    },
    token: function () {
      return this.$route.query.token;
    },
    email: function () {
      return this.$route.query.email;
    },
  },
  watch: {
    password1: function(before, after) {
      this.doesntMatch = false;
    },
    password2: function(before, after) {
      this.doesntMatch = false;
    },
  },
  methods: {
    async submit() {
      if (this.password1 !== this.password2) {
        this.doesntMatch = true;
        return;
      }
      this.isLoading = true;
      if (this.$refs.resetPassword.validate()) {
        const res = await Vue.axios.post(this.sentTo, {
          token: this.token,
          password: this.password1,
          email: this.email,
        });
        if (res) {
          this.isLoading = false;
          this.$router.push({ name: 'login' });
        }
      } else {
        // if form validation failed
        this.$nextTick(() => {
          let domRect = document.querySelector('.error--text').getBoundingClientRect();
          window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop - 70
          );
        });

        this.isLoading = false;
      }
    },
  },
  created: async function() {},
  mounted: function() {
    console.log(this.$route);
  },
};
</script>

<style lang="scss" scoped>
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
