<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container  class="d-flex justify-center">
        <v-card :loading="isLoading" width="374">
          <div class="px-6 py-8">
            <template slot="progress">
              <v-progress-linear height="4" indeterminate />
            </template>
            <v-alert v-model="showAlert" dense type="error">
              メールアドレスまたはパスワードが間違えています。
            </v-alert>
            <v-alert v-model="showCheckMailAlert" dense type="success">
              メールアドレスにリンクを送りました。ご確認ください。
            </v-alert>
            <p class="text-h6 text-center mb-8">{{ $t('general.auth.login') }}</p>
            <v-form @submit.prevent="login">
              <v-text-field
                :label="$t('general.auth.email')"
                v-model="email"
                :placeholder="$t('general.placeholder.email')"
                :rules="emailRules"
                outlined
                required
                append-icon="mdi-email-outline"
              ></v-text-field>
              <v-text-field
                :label="$t('general.auth.password')"
                v-model="password"
                type="password"
                :placeholder="$t('general.auth.password')"
                :rules="passwordRules"
                outlined
                required
                append-icon="mdi-lock-outline"
              ></v-text-field>
              <v-card>
                <v-btn block class="pa-2 theme--dark" color="gold" type="submit">{{ $t('general.auth.login') }}</v-btn>
              </v-card>
            </v-form>
            <v-row class="pt-10 text-center">
              <v-col cols="12">
                <router-link :to="{ name: 'contact' }" class="text-caption">{{ $t('general.auth.forgetEmail') }}</router-link>
              </v-col>
              <v-col cols="12">
                <router-link :to="{ name: 'password.forget' }" class="text-caption">{{ $t('general.auth.forgetPassword') }}</router-link>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-container>
    </v-container>
    <v-overlay v-if="loading_hand_shake" value="Loading...">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue';
import Cookies from 'js-cookie';

export default {
  data: () => ({
    email: '',
    password: '',
    tfa_token_1: null,
    tfa_token_2: null,
    // remember: false,
    loading_hand_shake: true,
    emailRules: [
      v => !!v || 'メールアドレスが正しくありません',
      v =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'メールアドレスが正しくありません',
    ],
    passwordRules: [v => !!v || 'パスワードが正しくありません'],
  }),
  computed: mapState({
    isLoading: state => state.auth.isLoading,
    showAlert: state => state.auth.showAlert,
    showCheckMailAlert: state => state.auth.isCheckMail,
    tfaToken2: state => state.auth.tfaToken2 //reads tfaToken2
  }),
  watch:  {
    //watch tfaToken2
      tfaToken2: {
      handler() {
        console.log("setting tfaToken2 cookie as ", this.tfaToken2);
        Cookies.set("tfaToken2", this.tfaToken2); //writes tfaToken2
      },
      deep: true,
    },
  },

  methods: {
    login() {
      let credentials = {
        email: this.email,
        password: this.password,
        remember: this.remember,
        tfa_token_1: this.tfa_token_1,
        tfa_token_2: this.tfa_token_2,
        isFrontend: true,
        requester_base_url: window.location.origin
      };
      this.$store.dispatch('auth/login', { credentials });
    },
    initHandShake: async function() {
      if (!this.loading_hand_shake) {
        // End this method if you are already hand shaked.
        return;
      }
      try {
        const res = await Vue.axios.get('/hand-shake');
        if (res.data.result == '___SUCCESS___') {
          this.loading_hand_shake = false;
        } else {
          throw new Error('hand shaking is not succeed.');
        }
      } catch (err) {
        console.error(
          'Hand shaking is not succeed. 1. If Request url is not correct,you can check client/.env file. 2.If file access is denied, please execute artisan config:clear in docker container, not on host. '
        );
        console.error(err);
      }
    },
  },
  created: async function() {
    console.debug('begin:created');
    this.initHandShake();
    //get tokens if they exist
    this.tfa_token_1 =  this.$attrs.tfaToken1; //from the link
    this.tfa_token_2 = Cookies.get("tfaToken2"); //from the cookies  
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

a {
  color: #999999 !important;
}
</style>
