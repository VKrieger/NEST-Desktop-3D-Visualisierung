<template>
  <section>
    <div class="range">
      <div class="sliderValue">
        <span>{{ value }}</span>
      </div>
      <div class="field">
        <input
          type="range"
          min="0"
          :max="maxValue"
          v-model="this.value"
          steps="1"
          @input="changeTime"
        />
      </div>
    </div>
  </section>
</template>

<script>
import NeuronStore from "@/store/NeuronStore.js";


export default {
  data() {
    return {
      value: 0,
    };
  },
  computed: {
    maxValue: function() {
      return NeuronStore.state.maxTime;
    }
  },
  methods: {
    changeTime() {
      NeuronStore.changeTime(this.value);
    },
  },
};
</script>

<style scoped>
.range {
  height: 80px;
  padding: 0 225px 0 65px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
}

.field {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75%;
  position: relative;
}

.range input {
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  border: none;
  z-index: 2222;
}
.range input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  background: grey;
  cursor: pointer;
}
</style>
