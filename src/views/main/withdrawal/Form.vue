<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card :loading="isLoading" width="374" height="374" class="px-4">
          <v-form class="text-center pb-5 my-auto" @submit.prevent="submit">
            <p class="text-h6 pt-10">{{ $t('general.withdrawal.aplication') }}</p>
            <p class="text-caption py-10" style="white-space: pre-line;">
              {{ $t('general.withdrawal.cancel') }}
            </p>
            <v-row class="px-12 px-md-16">
              <v-col>
                <v-btn block class="pa-2 theme--dark" color="gray" @click="back" type="button">{{
                  $t('general.withdrawal.title')
                }}</v-btn>
              </v-col>
              <v-col>
                <v-btn block class="pa-2 theme--dark" color="gold" type="submit">{{
                  $t('general.withdrawal.detail')
                }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import { getForm, update } from '@services/crud';
export default {
  data() {
    return {
      userId: null,
      submitUrl: '',
      withdrawalComplete: false,
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    async submit() {
      this.isLoading = true;
      const userID = this.$store.state.auth.info.role.id;
      let options = {};
      options.user_id = userID;
      const res = await update('front' + this.submitUrl, options);
      if (res) {
        this.$router.replace({ name: 'withdrawal.complete' });
      }
      this.isLoading = false;
    },
    back() {
      return this.$router.go(-1);
    },
  },
  async created() {
    this.isLoading = true;
    const userID = this.$store.state.auth.info.role.id;
    const form = await getForm('front' + this.$route.path + '/' + userID);

    let { withdrawalComplete, submitUrl } = form;
    this.submitUrl = submitUrl;
    this.withdrawalComplete = withdrawalComplete;
    this.userId = userID;

    if (this.withdrawalComplete) {
      this.withdrawalComplete == false;
      this.$router.push({ name: 'withdrawal.complete' });
    }

    this.isLoading = false;
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
