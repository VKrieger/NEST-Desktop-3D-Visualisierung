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
  computed: {
    count() {
      return global.state.count
    },
  },
  watch: {
    'global.state.count':{
      handler: function() {
        console.log(NeuronStore.state.populations[global.state.count][0][3]);
        console.log(NeuronStore.state.populations[global.state.count][1][3]);
        // for(let i = 0,i <= 1000,i++){
        //   for(let j = 0, j < NeuronStore.state.populations[global.state.count].length; j++){
        //     if(i=== NeuronStore.state.populations[global.state.count][j][2]){
        //       this.spikeCount[global.state.count][i] += NeuronStore.state.populations[global.state.count][j][3] 
        //     }
        //   }
        // }
        this.chart.layout.datarevision = new Date().getTime();
        for(let i= 0;i < NeuronStore.state.populations[global.state.count].length; i++){
        this.chart.traces[global.state.count].x.push(NeuronStore.state.populations[global.state.count][i][2]);
        this.chart.traces[global.state.count].y.push(NeuronStore.state.populations[global.state.count][i][3]);
        }
      },
      deep: true,
    },
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
  // methods: {
  //   addData: function() {
  //     if(global.state.count >= 0){
  //     this.chart.layout.datarevision = new Date().getTime();
  //     this.chart.traces[0].y.push(NeuronStore.state.populations[0]);
  //     }
  //   },

  data() {
    return {
      spikeCount:[],
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
