<template>
  <div class="row">
    <div class="px-2 py-0 mb-3" :class="[labelClass]">
      <div class="row flex-md-column justify-content-md-center">
        <div class="px-2 py-2 col-auto d-flex align-items-center">
          <strong class="input-title">{{ title }}</strong>
        </div>
        <div class="px-2 py-0 col-auto">
          <span class="input-title-label required m-0" v-if="required">
            {{ $t('general.validation.required') }}
          </span>
          <span class="input-title-label optional m-0" v-if="optional">
            {{ $t('general.validation.optional') }}
          </span>
        </div>
      </div>
    </div>

    <div class="px-2 py-0" :class="[contentClass]">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
    },
    required: Boolean,
    optional: Boolean,
    pair: { type: Boolean, default: false },
  },
  computed: {
    labelClass() {
      return this.pair ? 'col-md-6 col-lg-4' : 'col-md-3 col-lg-2';
    },
    contentClass() {
      return this.pair ? 'col-md-6 col-lg-8' : 'col-md-9 col-lg-10';
    },
  },
};
</script>

<style lang="scss">
.input-title {
  font-size: 1rem;
}
.input-title-label {
  font-size: 0.6875rem;
  position: relative;
  padding: 0.125rem 0.625rem;
  border-radius: 0.75rem;
  display: inline-block;
  margin-left: 0;
  margin-top: 0.375rem;
}
.input-title-label.required {
  color: red;
  border: solid 1px red;
}
.input-title-label.optional {
  color: green;
  border: solid 1px green;
}

.v-messages {
  min-height: 0 !important;
  font-size: 0.8125rem !important;
}
.v-messages__message {
  line-height: 1.6 !important;
}
.v-text-field__details {
  min-height: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-bottom: 0 !important;
}
.v-input--dense {
  & > .v-input__control {
    & > .v-input__slot {
      margin-bottom: 0.5rem !important;
    }
  }
}
</style>