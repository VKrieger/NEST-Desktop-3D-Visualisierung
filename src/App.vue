<template>
  <div class="grid-container">
    <spacial-overview class="Spacial-Overview"></spacial-overview>
    <three-vis class="Vis"></three-vis>
    <time-overview class="Time-Overview"></time-overview>
  </div>
</template>

<script>
import SpacialOverview from "@/components/SpacialOverview/SpacialOverview.vue";
import TimeOverview from "@/components/TimeOverview/TimeOverview.vue";
import ThreeVis from "@/components/ThreeVis/ThreeVis.vue";

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
  box-sizing: border-box;
}

.Spacial-Overview {
  left: 0;
  top: 0;
  position: fixed;
  width: 25%;
  height: 66%;
}

.Vis {
  position: fixed;
  top: 0;
  left: 25%;
  width: 75%;
  height: 66%;
}

.Time-Overview {
  position: fixed;
  bottom: -1.5%;
  left: 0;
  width: 100%;
  height: 35%;
}
</style>
