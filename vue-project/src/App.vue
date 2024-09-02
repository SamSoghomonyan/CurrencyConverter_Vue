<template>
  <div id="app">
    <Header
      :baseCurrency="baseCurrency"
      @update:baseCurrency="updateBaseCurrency"
    />
    <router-view :rates="rates" :baseCurrency="baseCurrency" />
  </div>
</template>

<script>
import ConvertPage from "./components/ConvertPage.vue";

export default {
  components: {
    ConvertPage,
  },
  data() {
    return {
      rates: {},
      baseCurrency: "rub",
    };
  },
  methods: {
    updateBaseCurrency(newCurrency) {
      this.baseCurrency = newCurrency;
    },
  },
};
</script>
