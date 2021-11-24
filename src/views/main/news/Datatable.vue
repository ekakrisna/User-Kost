<template>
  <div>
    <v-sheet elevation="1" :rounded="'sm'" class="mx-auto pb-16">
      <p class="text-h6 pa-4 mb-0">{{ $t('general.news.newsList') }}</p>
      <hr />
      <div class="mx-5">
        <v-data-table
          :loading="loading"
          :headers="headers"
          hide-default-header
          :items="displayedNews"
          :page.sync="currentPage"
          :items-per-page="15"
          hide-default-footer
          class="elevation-1 my-4"
          :options.sync="options"
          :server-items-length="totalNews"
          mobile-breakpoint="0"
          @page-count="totalPages = $event"
          @click:row="showDetails"
        >
          <template v-slot:item.date="{ item }">
              <span class="text-gold">{{ item.date }}</span>
          </template>
          <template v-slot:item.title="{ item }">
              <span class="text-gold">{{ item.title }}</span>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="currentPage" :length="totalPages" @input="handlePageChanges" total-visible="7"></v-pagination>
        </div>
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
      currentPage: 1,
      totalPages: 0,
      newsList: [],
      totalNews: 0,
      loading: false,
      options: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 15,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: [],
      },
      headers: [
        { text: this.$t('general.mypage.date'), value: 'date' },
        { text: this.$t('general.point.details'), value: 'title' },
      ],
    };
  },
  watch: {},
  computed: {
    displayedNews(){
      return this.newsList.map((news) => ({
        ...news,
        date: this.formatDate(news.created_at),
        title: news.news_item.title,
      }))
    }
  },
  mounted() {
    this.getAllNews();
  },
  methods: {
    handlePageChanges(value){
      this.options.page = value;
      this.getAllNews();
    },
    getAllNews: async function(){
      try {
        const userID = this.$store.state.auth.info.role.id;
        let url = `front${this.$route.path}/${userID}`;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options; 
        this.loading = true;
        const res = await getAll(url,{
          itemsPerPage,
          page,
          sortBy,
          sortDesc
        });
        this.newsList = res.newsList.data;
        this.totalNews = res.newsList.total;
      } catch (error) {
        console.log(error)
      }finally{
        this.loading = false;
      }
    },
    showDetails(item){
      let newsId = item.news_item.id;
      let userId = item.user_id;
      this.$router.push({ name: 'news.detail', params: { userID: userId, newsID: newsId }});
    },
    formatDate(dateStr) {
      let date = new Date(dateStr);
      let year = date.getFullYear();
      let month = `${date.getMonth() + 1}`.padStart(2, '0');
      let day = `${date.getDate()}`.padStart(2, '0');
      return `${year}年${month}月${day}日`;
    },
  },
};
</script>
<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover {
  cursor: pointer;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-weight: bold !important;
  font-size: 18px !important;
  white-space: nowrap;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}
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
