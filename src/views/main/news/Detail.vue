<template>
  <div>
    <v-sheet elevation="1" :rounded="'sm'" class="mx-auto pb-16">
      <p class="text-h6 pa-4 mb-0">{{ $t('general.news.newsDetail') }}</p>
      <hr />
      <div class="mx-6">
        <v-card class="text-gold my-8" :loading="loading">
          <v-skeleton-loader v-if="loading" type="article"> </v-skeleton-loader>
          <div class="d-flex" v-if="!loading">
            <p class="text-caption pa-4 mb-0">{{ newsDetails.date.created_at_ja }}</p>
            <p class="text-caption pa-4 mb-0">{{ newsDetails.news_item.parse.title }}</p>
          </div>
          <hr />
          <div class="pa-4" v-if="!loading">
            <p class="text-caption mb-0 text-wrap">
              <span v-html="newsDetails.news_item.parse.body"></span>
            </p>
          </div>
        </v-card>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { getAll } from '@services/crud';

export default {
  components: {},
  data() {
    return {
      item: {},
      loading: false,
    };
  },
  computed: {
    newsDetails() {
      return this.item;
    },
  },
  async created() {
    try {
      this.loading = true;
      const userID = this.$store.state.auth.info.role.id;
      const newsID = this.$route.params.newsID;
      let url = `front/news/${userID}/detail/${newsID}`;
      const res = await getAll(url);
      this.item = res;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
<style lang="css" scoped>
.text-wrap {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
