<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card :loading="isLoading" width="374">
          <template slot="progress">
            <v-progress-linear height="4" indeterminate />
          </template>
          <div class="px-6 py-10">
            <v-alert v-model="isInvalid" dense type="error">
              入力されたメールアドレスは登録されていません。
            </v-alert>
            <v-form ref="forgotPassword" @submit.prevent="submit" class="text-center ma-3 pb-5">
              <p class="text-h6">{{ $t('general.auth.forForgotPassword') }}</p>
              <p class="text-center text-caption py-6">{{ $t('general.auth.submitForgotPassword') }}</p>
              <v-text-field
                v-model="email"
                type="email"
                :placeholder="$t('general.auth.email')"
                :rules="emailRules"
                outlined
                required
                append-icon="mdi-email-outline"
                class="pb-4"
              ></v-text-field>
              <v-btn block class="pa-2 theme--dark" color="gold" type="submit">{{
                $t('general.auth.sendingForgotPassword')
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
import rules from '@/const/rules'

export default {

  // Reactive data
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => rules.email.test( v ) || 'E-mail must be valid',
    ],

    isLoading: false, // Form loading state
    isInvalid: false, // Invalid user email/request

  }),

  // Computed properties
  computed: {},

  // Methods
  methods: {

    // Form submit
    async submit(){

      // Set loading
      this.isLoading = true

      // When form is valid
      if( this.$refs.forgotPassword.validate()){
        try {

          // Do the request
          const data = { email: this.email, requester_base_url: window.location.origin }
          const response = await Vue.axios.post( 'password/forgot', data )

          // On valid response
          if( response && 200 === response.status ){

            // Redirect to transmission page
            this.$router.push({ name: 'transmission.complete' });

          }
        }

        // On error set invalid
        catch( error ){ 
          this.isInvalid = true
          console.log( error )
        }
      }

      // If form validation failed
      else {

        // Scroll to the alert
        this.$nextTick(() => {
          let domRect = document.querySelector('.error--text').getBoundingClientRect()
          window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop - 70
          )
        })
      }

      // Reset loading
      this.isLoading = false
    },
  },

  // Watchers
  watch: {

    // Watch email and reset the invalid state on changed
    email(){ this.isInvalid = false },

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
</style>
