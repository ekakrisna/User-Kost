<template>
  <div class="line">
    <v-row>
      <v-col cols="5" md="3">
        <p class="pa-2 mb-0 text-caption">{{ value.date.created_at_ja }}</p>
      </v-col>
      <v-col cols="5" md="3">
        <p class="pa-2 mb-0 text-caption">{{ value.news_item.parse.title }}</p>
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
