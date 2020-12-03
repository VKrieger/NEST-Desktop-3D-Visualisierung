import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import NeuronStore from "../../store/NeuronStore.js";

const colors = [
  0xf500f5,
  0x0d0bf5,
  0xe01200,
  0x00f535,
  0x15cfe0,
  0xf56f09,
  0xe0ad0a,
  0xe0768b,
];

let container,
  stats,
  clock,
  delta = 0;
let scene, camera, renderer;
let populations;
let renderedTime = 0;

const fps = 30; // frames per seconds

function init(containerId) {
  container = document.getElementById(containerId);

  camera = new THREE.PerspectiveCamera(
    100,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(100, 100, 0);

  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.background = new THREE.Color();

  /////////////////////////////

  const ambientLight = new THREE.AmbientLight();
  scene.add(ambientLight);

  // const directionalLight = new THREE.DirectionalLight();
  // directionalLight.position.x = 100;
  // directionalLight.position.y = 80;
  // directionalLight.position.z = 10;
  // scene.add(directionalLight);

  const grid1 = new THREE.GridHelper(80, 40);
  grid1.position.set(0, 0, 0);
  scene.add(grid1);

  const axes = new THREE.AxesHelper(5);
  scene.add(axes);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  new OrbitControls(camera, renderer.domElement);

  populations = new THREE.Group();
  scene.add(populations);

  stats = new Stats();
  container.appendChild(stats.dom);
}

function animate() {
  requestAnimationFrame(animate);

  const interval = 1 / fps;
  delta += clock.getDelta();
  if (delta > interval) {
    stats.begin();
    render();
    stats.end();
    delta = delta % interval;
  }
  // stats.update();
}

function render() {
  const t = NeuronStore.state.currentTime;
  if (renderedTime != t) {
    populations.children.forEach((population) => {
      population.children.forEach((neuron) => {
        neuron.visible = neuron.userData.times.includes(t);
        if (neuron.visible) {
          const y =
            neuron.userData.count[neuron.userData.times.indexOf(t)] / 300;
          neuron.scale.y = y;
          neuron.position.y = neuron.scale.y / 2;
        }
      });
    });
    renderedTime = t;
  }
  renderer.render(scene, camera);
}
// Create Neuron Forms //
function createPopulation(x, y) {
  const pop = new THREE.Group();

  const popIdx = populations.children.length;

  const material = new THREE.MeshLambertMaterial({
    transparent: false,
    visible: true,
    color: colors[popIdx],
  });
  let neuron;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const geometry = new THREE.BoxGeometry(1.5, 1, 1.5);
      neuron = new THREE.Mesh(geometry, material);
      neuron.position.set(i * 2 - x + 1, 1 / 2, j * 2 - y + 1);
      neuron.userData = {
        pos: {
          x: i,
          y: j,
        },
        times: [],
        count: [],
      };
      pop.add(neuron);
      pop.userData = { popIdx };
    }
  }

  if (popIdx > 0) {
    if (popIdx === 1) {
      scene.add(scene.children[1].clone().translateZ(popIdx * -(2 * y + 10)));
      pop.translateZ(popIdx * -(2 * y + 10));
    } else if (popIdx % 2 != 0) {
      scene.add(
        scene.children[1]
          .clone()
          .translateX((popIdx - 1) * (x + 5))
          .translateZ(-(2 * y + 10))
      );
      pop.translateZ(-(2 * y + 10));
      pop.translateX((popIdx - 1) * (x + 5));
    } else {
      scene.add(scene.children[1].clone().translateX(popIdx * (x + 5)));
      pop.translateX(popIdx * (x + 5));
    }
  }
  populations.add(pop);
  return pop;
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  render();
}

export default {
  init,
  animate,
  createPopulation,
  onWindowResize,
};
