<template>
  <section>
    <div class="range">
      <div class="sliderValue">
        <span>{{ value }} t </span>
        <span><button id="play" @click="increment">play</button></span>
        <span><button id="pause" @click="stop" >pause</button></span>
        <span><button @click="changeMerge">{{status}}</button></span>
      </div>
      <div class="field">
        <input
          id="slider"
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
      interval: null,
    };
  },
  computed: {
    maxValue: function() {
      return NeuronStore.state.maxTime;
    },
    status: function() {
      if(NeuronStore.state.merge) {
        return "merged"
      } else {
        return "separated"
      }
    }
  },
  methods: {
    changeTime() {
      NeuronStore.changeTime(this.value);
    },
    changeMerge() {
    
      NeuronStore.changeMerge();
    },
    setSlider() {
      const slider = document.getElementById("slider");
 
      slider.stepUp();
      slider.dispatchEvent(new Event("input"));
    },
    stop() {
      clearInterval(this.interval);
    },
    increment() {
      this.interval = setInterval(this.setSlider, 1000);
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
