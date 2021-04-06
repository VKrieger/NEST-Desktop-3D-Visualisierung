
import { reactive} from "vue";

const NeuronStore = {
  state: reactive({
    populations: [],
    name:[],
    currentTime: 0,
    count: 0,
    maxTime: 6
  }),
  addPopulation(data) {
    this.state.populations.push(data);
  },
  changeTime(value) {
    this.state.currentTime = (value ) % 1000;
  },
  getTime() {
    return this.state.currentTime;
  },
  getCount() {
    return this.state.count;
  },
  incrementCount(){
    this.state.count = this.state.count + 1;
  },
  changeMaxTime(value) {
    if(this.state.maxTime < value){
      this.state.maxTime = Math.round(value);
    }
  }
};

export default NeuronStore;
