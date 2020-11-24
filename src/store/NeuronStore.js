

const NeuronStore = {
  state: {
    populations: [],
    currentTime: 0,
    count: 0
  },
  addPopulation(name) {
    this.state.populations.push(name);
  },
  changeTime() {
      this.state.currentTime = this.state.currentTime + 1;
  },
  getTime() {
      return this.state.currentTime;
  }
};

export default NeuronStore;
