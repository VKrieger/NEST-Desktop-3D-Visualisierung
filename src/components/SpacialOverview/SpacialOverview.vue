<template>
  <section class="component">
    <p>Spacial Overview</p>
    <group-options></group-options>
    <heat-map></heat-map>
  </section>
</template>

<script>
import HeatMap from "./Population/HeatMap.vue";
import GroupOptions from "./Population/GroupOptions.vue";

export default {
  components: {
    HeatMap,
    GroupOptions,
  },
};
</script>

<style scoped>
.component {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  font-family: Arial, Helvetica, sans-serif;
}
</style>
