<template>
  <div class="line">
    <v-row>
      <v-col cols="6" md="7">
        <p class="pa-2 mb-0 text-caption">{{ value.date_format.created_at_ja }}</p>
      </v-col>
      <v-col cols="6" md="3">
        <p class="pa-2 pr-6 mb-0 text-caption text-right text-blue" v-if="value.use_points >= 0">
          +{{ value.use_points | numeral('0,0') }} P
        </p>
        <p class="pa-2 pr-6 mb-0 text-caption text-right text-red" v-if="value.use_points < 0">
          {{ value.use_points | numeral('0,0') }} P
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
  },
};
</script>
<style lang="scss" scoped>
.line {
  border-bottom: 1px solid#ddd;
}
</style>
