<template>
  <section id="three" @drop.prevent="addFile" @dragover.prevent></section>
</template>

<script>
import * as neurons from "./neurons.js";
import NeuronStore from "../../store/NeuronStore.js";

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      NeuronStore,
      neuron: [],
      time: NeuronStore.getTime()
    };
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
      var allTextLines = dat.split(/\r\n|\n/);

      for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(" ");
        var tarr = [];
        for (var j = 0; j < data.length; j++) {
          tarr.push(parseFloat(data[j]));
        }
        this.neuron.push(tarr);
      }
      NeuronStore.addPopulation(this.neuron);
      console.log(NeuronStore.state.populations);
      this.neuron = [];
      console.log(
        "x: " +
          NeuronStore.state.populations[0][0][0] +
          " y: " +
          NeuronStore.state.populations[0][0][1] +
          " Time: " +
          NeuronStore.state.populations[0][0][2] +
          "ms Spike Count: " +
          NeuronStore.state.populations[0][0][3]
      );
      NeuronStore.state.count++;
      setInterval(function() {
        NeuronStore.changeTime();
        this.time = NeuronStore.getTime();
      }, 10000);
    },

    addFile(e) {
      this.handleFiles(e.dataTransfer.files);

    },
  },

  mounted() {

    const context = neurons.createNeuronVis(document.getElementById("three"));
    context.init();
    context.animate();
  },
};
</script>

<style scoped>
* {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
