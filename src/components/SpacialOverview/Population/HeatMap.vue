<template>
  <section>
    <div  :id="id"  :class="{ 'resizable-content': !isActive, expand: isActive }">
      <div  class="neuron-name" @dblclick="isActive = !isActive">
        {{ name }}
      </div>
    </div>
  </section>
</template>

<script>

// import neurons from "@/components/ThreeVis/neurons.js";
// import global from "@/store/global.js";
export default {
  props: {
    name: { required: true, type: String },
    id: { required: true },
  },
  data() {
    return {
      isActive: false,
    };
  },

  //    created() {
       
  //   neurons.initH("id");
  //   neurons.animate2();

  // }

};
</script>

<style scoped>
.resizable-content {
  margin: 10px;
  height: 200px;
  width: 180px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
}

.expand {
  margin: 10px;
  height: 450px;
  width: 400px;

  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
}

.neuron-name {
  width: 100%;
  height: 20px;

  text-align: center;
  cursor: pointer;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
}
#three {
  overflow: hidden;
}
</style>
