import { reactive} from "vue";

const state = reactive({
  count: -1,
});

const increment = function() {
    this.state.count++;
}

export default { state, increment };
