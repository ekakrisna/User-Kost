<template>
  <div>
    <v-skeleton-loader v-if="loadingComponent" type="card-avatar, article, actions"> </v-skeleton-loader>
    <v-sheet v-if="!loadingComponent" elevation="1" :rounded="'sm'" class="mx-auto pb-16">
      <p class="text-h6 pa-4 mb-0">{{ $t('general.point.pointsMutationHistory') }}</p>
      <hr />
      <div class="mx-6">
        <div class="d-flex justify-space-between">
          <p class="py-4 mb-0">{{ $t('general.mypage.ownedPoints') }}</p>
          <p class="py-4 mb-0 text-gold" v-if="!loading">{{ item.totalPoint.toLocaleString() }} P</p>
        </div>
        <v-data-table
          :headers="headers"
          :items="displayedRecords"
          :options.sync="options"
          :server-items-length="totalRecords"
          :loading="loading"
          class="elevation-1 my-4"
          hide-default-footer
          fixed-header
          mobile-breakpoint="0"
        >
          <template v-slot:item.generated_use_point="{ item }">
            <span :style="item.style">{{ item.sign }} {{ item.use_points.toLocaleString() }} P</span>
            <span> ({{ parseInt(item.remainingPoints).toLocaleString() }} P)</span>
            <p class="mb-0">{{ item.pointTypeId }}</p>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="activeFilters.page"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            :length="paginationLength"
            :total-visible="7"
          ></v-pagination>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { getAll } from '@services/crud';
import io from 'lodash';
import constants from '@/const/const';

export default {
  components: {},
  data() {
    return {
      loadingComponent: false,
      formData: {},
      totalRecords: 0,
      records: [],
      loading: true,
      options: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 20,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: [],
      },
      activeFilters: {},
      defaultFilters: {
        dateStart: '',
        dateEnd: '',
        page: 1,
        sortBy: '',
        sortDesc: '',
      },
      paginationLength: 1,
      recordsIDArray: [],
      item: {
        totalPoint: 0,
        remainingPoints: 0,
        pointTypeId: 0,
      },
      pointTypeOther: constants.pointType.other,
    };
  },
  watch: {
    options: {
      handler(to) {
        this.updateFilters();
      },
      deep: true,
    },
    'activeFilters.page': {
      immediate: true,
      deep: true,
      handler() {
        this.updateFilters();
      },
    },
    $route: {
      immediate: true,
      deep: true,
      handler(to) {
        this.updateFilters();
        this.getAllRecords();
      },
    },
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('general.pointHistory.date'),
          value: 'date',
          width: 160,
        },
        {
          text: this.$t('general.pointHistory.details'),
          value: 'generated_use_point',
        },
      ];
    },
    displayedRecords() {
      return this.records.map((record, index) => ({
        ...record,
        number: index + 1,
        date: record.date_format.created_at_ja ?? '-',
        usePoints: record.generated_use_point ?? '-',
        remainingPoints: record.generated_remaining_point ?? '0',
        pointTypeId:
          record.point_type_id === this.pointTypeOther
            ? `${record.point_type.display_name} - ${record.other_detail}`
            : record.point_type.display_name,
        style: record.use_points >= 0 ? 'color: #0097a7' : 'color: #dc3545',
        sign: record.use_points >= 0 ? '+' : '',
      }));
    },
  },
  created() {
    var query = this.$route.query;

    // need to change the data type to int, to make filter selected on input
    if (query.page) query.page = Number(query.page);

    this.activeFilters = io.assign({}, this.defaultFilters, query);

    this.options.sortBy[0] = query.sortBy;
    this.options.sortDesc[0] = query.sortDesc;
  },
  methods: {
    usePointTextColorHandler: function(use_points) {
      return use_points > 0 ? 'text-blue' : 'text-red';
    },
    // update and push filter into vue router
    updateFilters: io.throttle(function() {
      if (this.options.sortBy) this.activeFilters.sortBy = this.options.sortBy;
      if (this.options.sortDesc) this.activeFilters.sortDesc = this.options.sortDesc;

      const filters = io.cloneDeep(this.activeFilters);
      const keys = Object.keys(filters);

      keys.forEach(key => {
        if (!String(filters[key])) delete filters[key];
      });

      this.$router.replace({ query: filters }).catch(function(e) {});
    }, 500),

    getAllRecords: async function() {
      try {
        const userID = this.$store.state.auth.info.role.id;
        let url = `front${this.$route.path}/${userID}`;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        this.loading = true;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters,
        });
        this.records = res.records.data;
        if (this.record != 0) {
          this.item.remainingPoints = Number(res.records.data[0].remaining_points);
          this.item.pointTypeId = Number(res.records.data[0].point_type_id);
        }
        this.item.totalPoint = res.formData.user.remaining_points;
        this.totalRecords = res.records.total;
        this.formData = res.formData;
        this.paginationLength = res.records.last_page;
        this.recordsIDArray = res.idArray;
      } catch (err) {
        if (err.isHandled) {
          // Do nothing
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
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
