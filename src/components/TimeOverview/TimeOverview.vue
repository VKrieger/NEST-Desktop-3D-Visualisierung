<template>
  <div :ref="chart.uuid"></div>
</template>

<script>
import Plotly from "plotly.js-dist";
import NeuronStore from "@/store/NeuronStore.js";
// import {inject} from "vue";

export default {
  inject: ["global"],
  mounted() {
    Plotly.plot(
      this.$refs[this.chart.uuid],
      this.chart.traces,
      this.chart.layout,
      this.chart.config
    );
    this.addData()
  },
  watch: {
    chart: {
      handler: function() {
        Plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout
        );
      },
      deep: true,
    },
  },
  methods: {
    addData: function() {
      if(global.state.count >= 0){
      this.chart.layout.datarevision = new Date().getTime();
      this.chart.traces[0].x.push(NeuronStore.state.populations[0].time);
      this.chart.traces[0].y.push(NeuronStore.state.populations[0].count);
      }
    },
  },
  data() {
   
    return {
      chart: {
        uuid: "123",
        traces: [
          {
            x: [],
            y: [],
            type: "histogram",
          },
        ],
        layout: {
          title: "Time Overview",
          xaxis: {
            title: "Time",
          },
          yaxis: {
            title: "Spike Count",
          },
          barmode: "group",
          bargap: 0.008,
        },
        config: {
          responsive: true,
          displaylogo: false,
        },
      },
    };
  },
};
</script>

<style scoped>
* {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>
