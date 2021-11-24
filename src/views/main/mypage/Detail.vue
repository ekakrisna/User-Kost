<template>
  <div>
    <v-skeleton-loader v-if="loadingComponent" type="card-avatar, article, actions"> </v-skeleton-loader>
    <v-sheet v-if="!loadingComponent" elevation="1" :rounded="'sm'" class="mx-auto pb-16">
      <p class="text-h6 pa-4 mb-0">{{ $t('general.mypage.mypage') }}</p>
      <hr />
      <div class="mx-6">
        <p class="py-4 mb-0">{{ $t('general.mypage.news') }}</p>
        <v-card class="text-gold px-2">
          <div v-for="news in user.newsItemDeliveries" :key="news.id">
            <ListNewsDetail :value="news" />
          </div>
          <router-link class="text-decoration-none text-gold" :to="{ name: 'news', params: { id: user.id } }">
            <p class="py-4 mb-0 text-right text-caption">
              {{ $t('general.mypage.seeNewsList') }}
              <v-icon>mdi-chevron-right</v-icon>
            </p>
          </router-link>
        </v-card>
      </div>
      <div class="mx-6">
        <div class="d-flex justify-space-between">
          <p class="py-4 mb-0">{{ $t('general.mypage.ownedPoints') }}</p>
          <p class="py-4 mb-0 text-gold">{{ user.remainingPoints | numeral('0,0') }}P</p>
        </div>
        <v-card class="text-gold px-2">
          <div v-for="point in user.pointHistories" :key="point.id">
            <ListPointDetail :value="point" />
          </div>
          <router-link class="text-decoration-none text-gold" :to="{ name: 'point', params: { id: user.id } }">
            <p class="py-4 mb-0 text-right text-caption">
              {{ $t('general.mypage.seePoints') }}
              <v-icon>mdi-chevron-right</v-icon>
            </p>
          </router-link>
        </v-card>
      </div>
      <v-card class="px-2 my-10 mx-6">
        <v-row>
          <v-col cols="6">
            <p class="pa-2 mb-0 text-h6">{{ $t('general.mypage.renewalDueDate') }}</p>
          </v-col>
          <v-col cols="6">
            <p class="pa-2 pr-6 mb-0 text-h6 text-right text-gold">{{ user.expirationAt }}</p>
          </v-col>
        </v-row>
      </v-card>
      <div class="mx-6">
        <p class="py-4 mb-0">{{ $t('general.mypage.registeredInformation') }}</p>
        <v-card class="px-2 py-4">
          <v-row>
            <v-col cols="4">
              <p class="px-2 mb-0 text-caption">{{ $t('general.mypage.membershipType') }}</p>
            </v-col>
            <v-col>
              <p class="px-2 pr-6 mb-0 text-caption">{{ user.userType.display_name }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <p class="px-2 mb-0 text-caption">{{ $t('general.mypage.name') }}</p>
            </v-col>
            <v-col>
              <p class="px-2 pr-6  mb-0 text-caption">{{ user.name }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <p class="px-2 mb-0 text-caption">{{ $t('general.auth.email') }}</p>
            </v-col>
            <v-col>
              <p class="px-2 pr-6  mb-0 text-caption">{{ user.email }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <p class="px-2 mb-0 text-caption">{{ $t('general.mypage.telephoneNumber') }}</p>
            </v-col>
            <v-col>
              <p class="px-2 pr-6  mb-0 text-caption">{{ user.phone }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <p class="px-2 mb-0 text-caption">{{ $t('general.mypage.address') }}</p>
            </v-col>
            <v-col>
              <p class="px-2 pr-6  mb-0 text-caption">{{ user.address }}</p>
            </v-col>
          </v-row>
          <div class="text-center pt-6">
            <router-link class="text-decoration-none text-gold" :to="{ name: 'user.edit', params: { id: user.id } }">
              <v-btn color="gold" class="theme--dark">{{ $t('general.mypage.edit') }}</v-btn>
            </router-link>
          </div>
        </v-card>
        <div class="text-center pt-6">
          <a
            href="https://ichijo-miyagi.co.jp/clubichijo/#frequentlyQuestions"
            class="d-block text-caption text-gray pb-6"
            >{{ $t('general.mypage.frequentlyAsked') }}</a
          >
          <a href="https://ichijo-miyagi.co.jp/clubichijo/terms/" class="d-block text-caption text-gray pb-6">{{
            $t('general.mypage.clickHere')
          }}</a>
          <router-link class="d-block text-caption text-gray" :to="{ name: 'withdrawal.application' }">
            {{ $t('general.mypage.cancel') }}
          </router-link>
        </div>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { show } from '@services/crud';
import ListNewsDetail from '@views/main/mypage/components/ListNewsDetail.vue';
import ListPointDetail from '@views/main/mypage/components/ListPointDetail.vue';

export default {
  components: { ListNewsDetail, ListPointDetail },
  data() {
    return {
      user: {
        id: '',
        newsItemDeliveries: '',
        pointHistories: '',
        userType: '',
        name: '',
        email: '',
        address: '',
        phone: '',
        remainingPoints: '',
      },
      formData: {},
      loadingComponent: false,
    };
  },
  computed: {},
  methods: {},
  async created() {
    this.loadingComponent = true;
    try {
      const form = await show('front' + this.$route.path);
      this.user = {
        ...this.user,
        id: form.id,
        name: form.name,
        email: form.email,
        address: form.address,
        phone: form.phone_number,
        expirationAt: form.date.expiration_at_ja,
        newsItemDeliveries: form.users_news_with_limits,
        userType: form.user_type,
        remainingPoints: form.remaining_points,
        pointHistories: form.point_histories,
      };
    } catch (err) {
      console.log(err);
    }
    this.loadingComponent = false;
  },
};
</script>

<style lang="scss" scoped>
.text-gold i,
.text-gold {
  color: #bb9b2d;
}

.text-red {
  color: #dc3545;
}

.text-blue {
  color: #0097a7;
}

.text-gray {
  color: #999999;
}
</style>
