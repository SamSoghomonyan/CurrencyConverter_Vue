<template>
  <div id="app">
    <h1>Currency Converter</h1>
    <div>
      <label for="amount">Amount:</label>
      <input
        v-model.number="amount"
        id="amount"
        type="number"
        placeholder="Enter amount"
      />
    </div>
    <div>
      <label for="from">From:</label>
      <select v-model="fromCurrency" id="from">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency.toUpperCase() }}
        </option>
      </select>
    </div>
    <div>
      <label for="to">To:</label>
      <select v-model="toCurrency" id="to">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency.toUpperCase() }}
        </option>
      </select>
    </div>
    <p v-if="result !== null">
      {{ amount }} {{ fromCurrency.toUpperCase() }} = {{ result }}
      {{ toCurrency.toUpperCase() }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      amount: 1,
      fromCurrency: "usd",
      toCurrency: "rub",
      result: null,
      currencies: ["usd", "rub", "eur", "brl", "kzt", "idr"],
      rates: {},
    };
  },
  methods: {
    async fetchRates() {
      try {
        const response = await axios.get(
          "https://status.neuralgeneration.com/api/currency"
        );
        this.rates = response.data;
        this.convertCurrency(); // Convert after fetching rates
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    },
    convertCurrency() {
      const conversionKey = `${this.fromCurrency}-${this.toCurrency}`;
      if (this.rates[conversionKey]) {
        this.result = (this.amount * this.rates[conversionKey]).toFixed(2);
      } else {
        this.result = "Conversion not available";
      }
    },
  },
  watch: {
    amount: "convertCurrency",
    fromCurrency: "convertCurrency",
    toCurrency: "convertCurrency",
  },
  created() {
    this.fetchRates();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
label {
  margin-right: 10px;
}
input,
select {
  margin-bottom: 10px;
}
</style>
