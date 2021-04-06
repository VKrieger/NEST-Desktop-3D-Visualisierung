<template>
  <section>
    <div v-for="(neuron, index) in layerName" :key="index">
      <heat-map :id="index" :name="neuron" class="heat-map"></heat-map>
    </div>
  </section>
</template>

<script>
import HeatMap from "@/components/SpacialOverview/Population/HeatMap.vue";

import NeuronStore from "@/store/NeuronStore.js";



export default {
  components: { HeatMap },
  data() {
    return {};
  },
  computed: {
    layerName: function() {
      return NeuronStore.state.name;
    },
  },

};
</script>

<style scoped>
* {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0 5px 0 5px;
}

section {
  display: flex;
  flex-wrap: wrap;
}
</style>
