<template>
  <div :ref="chart.uuid"></div>
</template>

<script>
import Plotly from "plotly.js-dist";
import NeuronStore from "@/store/NeuronStore.js";
import global from "@/store/global.js";


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

        this.chart.layout.datarevision = global.state.count;
        for (
          let i = 0;
          i < NeuronStore.state.populations[global.state.count].length;
          i++
        ) {
          this.chart.traces[global.state.count].name =
            NeuronStore.state.name[global.state.count]
          ;
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
        console.log(this.chart.layout.xaxis.range[1]);
        NeuronStore.changeMaxTime(this.chart.layout.xaxis.range[1])
        console.log(NeuronStore.state.maxTime);
      },
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
            hisfunc: "sum",
          },
        ],
        layout: {
          title: "Time Overview",
          xaxis: {
            title: "Time t",
            rangemode: "tozero",
          },
          yaxis: {
            title: "Spike Count",
          },
          barmode: "stack",
          bargap: 0,
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
