<template>
  <v-sheet>
    <div class="wrapper">
      <!-- Points Mutation History -->
      <div class="px-6">
        <div class="text-h5 font-weight-bold py-3">
          {{$t('general.pointHistory.pointsMutationHistory')}}
        </div>
        <v-divider class="mb-3"></v-divider>
      </div>
      <!-- Points Mutation History -->

      <!-- Owned Points -->
      <div class="point-reguster pt-1">
          <v-row class="mt-5 px-8">
              <h4>
              {{$t('general.pointHistory.ownedPoints')}}
              </h4>
          </v-row>
      </div>
      <!-- Owned Points -->
      
      <!-- Point Table -->
      <v-data-table
      :headers="headers"
      :items="displayedRecords"
      :options.sync="options"
      :server-items-length="totalRecords"
      :loading="loading"
      class="elevation-1"
      hide-default-footer
      >
      <template v-slot:item.generated_use_point="{ item }">
        <div>
          <span :class="usePointTextColorHandler(item.use_points)">
            {{item.use_points | numeral('0,0')}} P
          </span>
        </div>
      </template>
      </v-data-table>
      <v-row class="mt-4">
        <v-col cols=5 class="px-10">
          表示数: {{totalRecords}}
        </v-col>
        <v-col class="text-center" cols=7>
          <v-pagination
            v-model="activeFilters.page"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            :length="paginationLength"
            :total-visible="7"
          ></v-pagination>
        </v-col>
      </v-row>
        <!-- Point Table -->

    </div>
  </v-sheet>
</template>

<script>
import Vue from 'vue';
import io from 'lodash';
import { getAll } from '@services/crud';

export default {
  components: {},
  data() {
    return {
      formData: {},
      totalRecords: 0,
      records: [],
      loading: true,
      options: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 50,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: [],
        userId: 1,
      },
      activeFilters: {},
      defaultFilters: {
        userId: '',
        dateStart: '',
        dateEnd: '',
        page: 1,
        sortBy: '',
        sortDesc: '',
      },
      paginationLength: 1,
      recordsIDArray: [],
    };
  },

  watch: {
    options: {
      handler(to) {
        this.updateFilters();
      },
      deep: true,
    },

    defaultFilters: {
      handler(to){
        console.log(to);
      },
      deep: true,
    },

    // activeFilters: {
    //   handler() {
    //     this.updateFilters();
    //   },
    //   deep: true,
    // },
    
    'activeFilters.page': {
      immediate: true,
      deep: true,
      handler(){
        this.updateFilters();
      }
    },

    $route: {
      immediate: true,
      deep: true,
      handler(to){
        this.updateFilters();
        this.getAllRecords();
      }
    }
  },

  computed: {
    headers(){
      return [
        {
          text: this.$t('general.pointHistory.date'),
          value: 'created_at',
        },
        {
          text: this.$t('general.pointHistory.details'),
          value: ('use_point', 'remaining_point')
        },
      ]
    },
    displayedRecords() {
      return this.records.map((record, index) => ({
        ...record,
        number: index + 1,
        // date: record.date_format.created_at ?? '-',
        // usePoints: record.generated_use_point ?? '-',
        // detail: record.point_type_id === 5 ? 'その他 - ' + record.other_detail : record.point_type.display_name,
      }));
    },
  },
  created: async function() {
    var query = this.$route.query;

    // need to change the data type to int, to make filter selected on input
    if(query.page) query.page = Number(query.page);

    this.activeFilters = io.assign({}, this.defaultFilters, query );

    this.activeFilters.userId = Number(this.$route.params.id);

    this.options.sortBy[0] = query.sortBy;
    this.options.sortDesc[0] = query.sortDesc;
  },

  methods: {

    usePointTextColorHandler: function (use_points){
      return use_points > 0 ? 'text-blue' : 'text-red';
    },

    // update and push filter into vue router
    updateFilters: io.throttle( function() {
      
      if(this.options.sortBy) this.activeFilters.sortBy = this.options.sortBy;
      if(this.options.sortDesc) this.activeFilters.sortDesc = this.options.sortDesc;
      this.options.userId = Number(this.$route.params.id);

      const filters = io.cloneDeep( this.activeFilters );
      const keys = Object.keys(filters);
      keys.forEach((key) => {
        if(!String(filters[key])) delete filters[key];;
      });

      this.$router.push({  query: filters }).catch( function(e){});
    }, 500),

    getAllRecords: async function() {
      try {
        let url = 'front/point/' + this.$route.params.id;
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc, userId } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          userId,
          ...this.activeFilters,
        });
        console.log(res);
        this.records = res.records.data;
        if (this.record != 0) {
            this.item.remainingPoints = Number(res.records.data[0].remaining_points);
        }
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
    }
  },
};
</script>

<style lang="scss">
.wrapper {
    box-shadow: 0px 1px 3px 0px rgb(0 0 0 /12%);
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-weight: bold !important;
  font-size: 18px !important;
  white-space: nowrap;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}

span.text-red{
  color: #FE4B44;
}

span.text-blue{
  color: #1976d2;
}
</style>
