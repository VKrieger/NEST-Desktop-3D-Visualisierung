

const NeuronStore = {
  state: {
    populations: [],
    currentTime: 300,
    count: 0,
  },
  addPopulation(name) {
    this.state.populations.push(name);
  },
  changeTime() {
    this.state.currentTime = (this.state.currentTime + 1) % 1000;
  },
  getTime() {
    return this.state.currentTime;
  },
  getCount() {
    return this.state.count;
  },
  incrementCount(){
    this.state.count = this.state.count + 1;
  }
};

export default NeuronStore;
