<template>
  <section id="three" @drop.prevent="addFile" @dragover.prevent></section>
</template>

<script>
import neurons from "./neurons.js";
import NeuronStore from "@/store/NeuronStore.js";
import global from "@/store/global.js";
// import {inject} from "vue";


export default {
  inject: ["global"],
  data() {
    return {
      NeuronStore,
      time: NeuronStore.getTime(),
      lengthP: NeuronStore.state.populations.length

    };
  },
  created() {
    window.addEventListener("resize", neurons.onWindowResize, false);

  },
  methods: {
    // File input
    handleFiles(files) {
      // Check for the various File API support.
      if (window.FileReader) {
        // FileReader are supported.
        this.getAsText(files[0]);
      } else {
        alert("FileReader are not supported in this browser.");
      }
    },

    getAsText(fileToRead) {
      let reader = new FileReader();
      reader.readAsText(fileToRead);
      reader.onload = this.loadHandler;
    },

    loadHandler(event) {
      let dat = event.target.result;
      this.processData(dat);
    },

    processData(dat) {
      const allTextLines = dat.split(/\r\n|\n/);
      const data = new Array();
      for (var i = 0; i < allTextLines.length - 1; i++) {
        let d = allTextLines[i].split(" ");
        let x = parseInt(d[0]);
        let y = parseInt(d[1]);
        let time = parseInt(d[2]);
        let count = parseFloat(d[3]);
        if (isNaN(x) || isNaN(y)) return;
        data.push([x, y, time, count]);
  
      }
      NeuronStore.addPopulation(data);
      const x = 40,
        y = 40;
      const population = neurons.createPopulation(x, y);
      const pos = population.children.map((neuron) => {
        const p = neuron.userData.pos;
        return `${p.x},${p.y}`;
      });
      data.map((d) => {
        const neuronIdx = pos.indexOf(`${d[0]},${d[1]}`);
        if (neuronIdx != -1 && neuronIdx < population.children.length) {
          const neuron = population.children[neuronIdx];
          neuron.userData.times.push(d[2]);
          neuron.userData.count.push(d[3]);
        }
      });
          global.increment();
          // console.log(NeuronStore.state.populations[0][0][2], global.state.count);
    },

    addFile(e) {
      this.handleFiles(e.dataTransfer.files);
    },
  },

  mounted() {
    neurons.init("three");
    neurons.animate();
    setInterval(() =>NeuronStore.changeTime(), 100);
  },
};
</script>

<style scoped>
* {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

  display: flex;
  align-items: center;
  justify-content: center;
}

#three {
  overflow: hidden;
}
</style>
