<template>
  <div :ref="chart.uuid"></div>
</template>

<script>
import Plotly from "plotly.js-dist";
import NeuronStore from "@/store/NeuronStore.js";
import global from "@/store/global.js";
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
  },
  watch: {
    "global.state.count": {
      handler: function() {
        // console.log(NeuronStore.state.populations[global.state.count][0][3]);
        // console.log(NeuronStore.state.populations[global.state.count][1][3]);
        // console.log(global.state.count);
        this.chart.layout.datarevision = global.state.count;
        for (
          let i = 0;
          i < NeuronStore.state.populations[global.state.count].length;
          i++
        ) {
          this.chart.traces[global.state.count].x.push(
            NeuronStore.state.populations[global.state.count][i][2]
          );
          this.chart.traces[global.state.count].y.push(
            NeuronStore.state.populations[global.state.count][i][3]
          );
        }
        Plotly.addTraces(this.$refs[this.chart.uuid], {
          x: [],
          y: [],
          type: "histogram",
          hisfunc: "sum",
        });
      },
      // deep: true,
    },
    // chart: {
    //   handler: function() {
    //     Plotly.react(
    //       this.$refs[this.chart.uuid],
    //       this.chart.traces,
    //       this.chart.layout
    //     );
    //   },
    //   deep: true,
    // },
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
            hisfunc: "sum",
          },
        ],
        layout: {
          title: "Time Overview",
          xaxis: {
            title: "Time ms",
            rangemode: "tozero",
            range: [0, 10000],
          },
          yaxis: {
            title: "Spike Count",
          },
          barmode: "stack",
          bargap: 0.008,
          showlegend: true,
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
