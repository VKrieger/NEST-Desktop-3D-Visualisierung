<template>
  <div class="grid-container">
    <spacial-overview class="Spacial-Overview"></spacial-overview>
    <three-vis class="Vis"></three-vis>
    <time-overview class="Time-Overview"></time-overview>
  </div>
</template>

<script>
import SpacialOverview from "./components/SpacialOverview/SpacialOverview.vue";
import TimeOverview from "./components/TimeOverview/TimeOverview.vue";
import ThreeVis from "./components/ThreeVis/ThreeVis.vue";

export default {
  components: {
    SpacialOverview,
    TimeOverview,
    ThreeVis,
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 550px 0.5fr;
  grid-template-areas:
    "Spacial-Overview Vis Vis Vis"
    "Spacial-Overview Vis Vis Vis"
    "Time-Overview Time-Overview Time-Overview Time-Overview";
}

.Time-Overview { 
  grid-area: Time-Overview;


 }

.Spacial-Overview { grid-area: Spacial-Overview;
 }

.Vis { grid-area: Vis;
 }


</style>
