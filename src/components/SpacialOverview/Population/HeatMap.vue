<template>
  <section>
    <div :id="id" :class="{ 'resizable-content': !isActive, expand: isActive }">
      <div class="neuron-name" @dblclick="resize">
        {{ name }}
      </div>
    </div>
  </section>
</template>

<script>
import * as THREE from "three";

let scene, camera, renderer;

export default {
  props: {
    name: { required: true, type: String },
    id: { required: true },
  },
  data() {
    return {
      isActive: false,
      population: this.id,
    };
  },

  mounted() {
    this.initThree(this.population);
  },
  methods: {
    resize() {
      this.isActive = !this.isActive;
    },

    initThree(containerId) {
      const container = document.getElementById(containerId);
      let aspect = container.clientWidth / container.clientHeight;
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(
        -40 * aspect,
        40 * aspect,
        40,
        -40,
        -1000,
        1000
      );

      camera.position.set(0, 0, -1);

      renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      scene.background = new THREE.Color();

      /////////////////////////////

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const grid1 = new THREE.GridHelper(80, 40);
      grid1.rotation.x = Math.PI / 2;

      scene.add(grid1);

      this.animate();
    },

    animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(this.animate);
    },
  },
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
