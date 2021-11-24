<template>
  <div>
    <v-skeleton-loader v-if="loadingComponent" type="card-avatar, article, actions"> </v-skeleton-loader>
    <v-sheet v-if="!loadingComponent" elevation="1" :rounded="'sm'" class="mx-auto pb-16">
      <p class="text-h6 pa-4 mb-0">{{ $t('general.user.editREgisteredInformation') }}</p>
      <hr />
      <div class="mx-6">
        <v-card class="text-gold pa-4 pa-md-6 my-8">
          <v-form ref="userForm" @submit.prevent="submit">
            <v-row>
              <v-col cols="5" md="2">
                <p class="mb-0 text-caption">{{ $t('general.mypage.membershipType') }}</p>
              </v-col>
              <v-col cols="7" md="3">
                <p class="mb-0 text-caption">{{ item.user_type.display_name }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" md="2">
                <p class="mb-0 text-caption">{{ $t('general.mypage.name') }}</p>
              </v-col>
              <v-col cols="7" md="10">
                <v-text-field dense outlined v-model="item.name" :rules="rules.name"></v-text-field>
                <span class="red--text">※お名前に変更が生じた場合、弊社より変更理由につきましてお尋ねする場合がございます。</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" md="2">
                <p class="mb-0 text-caption">{{ $t('general.mypage.telephoneNumber') }}</p>
              </v-col>
              <v-col cols="7" md="10">
                <v-text-field dense outlined v-model="item.phone_number" :rules="rules.phoneNumber"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" md="2">
                <p class="mb-0 text-caption">{{ $t('general.mypage.address') }}</p>
              </v-col>
              <v-col cols="7" md="10">
                <v-text-field dense outlined v-model="item.address" :rules="rules.address"></v-text-field>
                <span class="red--text">※ご住所に変更が生じた場合、弊社より変更理由につきましてお尋ねする場合がございます。</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" md="2">
                <p class="mb-0 text-caption">{{ $t('general.auth.email') }}</p>
              </v-col>
              <v-col cols="7" md="10">
                <v-text-field type="email" dense outlined v-model="item.email" :rules="rules.email"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" md="2">
                <p class="mb-0 text-caption">{{ $t('general.auth.password') }}</p>
              </v-col>
              <v-col cols="7" md="10">
                <template v-if="!changePassword">
                  <v-btn
                    color="gold"
                    class="theme--dark"
                    @click="changePassword = true"
                    >{{ $t('general.crud.change') }}</v-btn
                  >
                </template>
                <template v-else>
                  <v-text-field
                    :type="'password'"
                    dense
                    outlined
                    v-model="item.password"
                    @input="item.password = $event !== '' ? $event : null"
                    :rules="item.password ? rules.password : []"
                  ></v-text-field>
                </template>
              </v-col>
            </v-row>
            <div class="py-4 text-center">
              <v-btn type="submit" color="gold" class="theme--dark" :loading="loadingForm">{{ $t('general.user.update') }}</v-btn>
            </div>
          </v-form>
        </v-card>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import rules from '@/const/rules'
import { getForm, update } from '@services/crud';

export default {
  components: {},
  data() {
    return {
      rules: {
        name: [
          v => !!v || this.$t('general.validation.required'),
          v => v.length <= 255 || this.$t('general.validation.length'),
        ],
        phoneNumber: [
          v => !!v || this.$t('general.validation.required'),
          v => rules.phoneNumber.test(v) || this.$t('general.validation.phoneRegex'),
        ],
        address: [
          v => !!v || this.$t('general.validation.required'),
          v => v.length <= 255 || this.$t('general.validation.length'),
        ],
        email: [
          v => !!v || this.$t('general.validation.required'),
          v => rules.email.test( v ) || this.$t('general.validation.email'),
        ],
        password: [v => v.length <= 255 || this.$t('general.validation.length')],
      },
      item: {},
      formData: {},
      submitUrl: '',
      loadingComponent: false,
      changePassword: false,
      loadingForm: false,
    };
  },
  methods: {
    async submit() {
      this.loadingForm = true;
      if (this.$refs.userForm.validate()) {
        let payload = new FormData();
        payload.append('name', this.item.name);
        payload.append('phone_number', this.item.phone_number);
        payload.append('address', this.item.address);
        payload.append('email', this.item.email);
        if (this.item.password) {
          payload.append('password', this.item.password);
        }

        const res = await update(this.submitUrl, payload);
        if (res) {
          this.loadingForm = false;
          this.$router.push({ name: 'mypage' });
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

        this.loadingForm = false;
      }
    },
  },
  async created() {
    try {
      this.loadingComponent = true;
      const userID = this.$store.state.auth.info.role.id;
      const form = await getForm("front" + this.$route.path + "/" + userID);
      let { item, formData, submitUrl } = form;
      this.item = item;
      this.formData = formData;
      this.submitUrl = "front" + submitUrl;
      this.loadingComponent = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
