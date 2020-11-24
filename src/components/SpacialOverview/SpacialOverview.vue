<template>
  <section class="component">
    <h2>Spacial Overview</h2>
    <group-options></group-options>
    <heat-map></heat-map>
  </section>
</template>

<script>
import HeatMap from './Population/HeatMap.vue';
import GroupOptions from './Population/GroupOptions.vue';

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
  padding: 1rem;
  margin: 0.5rem;
}
</style>
