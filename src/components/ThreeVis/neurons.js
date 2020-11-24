import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import NeuronStore from "../../store/NeuronStore.js";

// passed in container id within which this animation will be shown
export function createNeuronVis(container) {
  var ctx = new Object();
  (ctx.init = function init() {
    ctx.container = container;
    ctx.camera = new THREE.PerspectiveCamera(
      60,
      ctx.container.clientWidth / ctx.container.clientHeight,
      0.1,
      1000
    );
    ctx.camera.position.x = -100;
    ctx.camera.position.y = 100;

    ctx.scene = new THREE.Scene();

    // Create Neuron Forms //
    function createNeuron() {
      //   let currentTime = NeuronStore.state.currentTime;
      //   let setColor = 0x980000;
      //   const population1 = NeuronStore.state.populations[0];
      //   for (let k = 0; k < population1.length; k++) {

      //         if (
      //           population1[k][2] === currentTime
      //         ) {
      //           const geometry = new THREE.BoxGeometry(1, 0, 1);
      //           const material = new THREE.MeshLambertMaterial({
      //             transparent: false,
      //             visible: true,
      //             color: setColor,
      //           });
      //           ctx.neuron = new THREE.Mesh(geometry, material);
      //           ctx.neuron.position.set(population1[k][0], 0, population1[k][1]);
      //           ctx.scene.add(ctx.neuron);
      //     }
      //   }

      let setColor = 0x980000;
      ctx.timeArray = new Array();
      for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshLambertMaterial({
            transparent: false,
            visible: false,
            color: setColor,
          });
          ctx.neuron = new THREE.Mesh(geometry, material);
          ctx.neuron.position.set(i, 0, j);
          ctx.scene.add(ctx.neuron);
        }
      }

      //     let currentTime = 8;
      //         const population1 = NeuronStore.state.populations;
      // for (let i = 0; i < population1.length; i++) {
      //   for (let j = 0; j < ctx.scene.children.length; j++) {
      //     if (
      //       population1[i][2] === currentTime &&
      //       ctx.scene.children[j].position.x === population1[i][0] &&
      //       ctx.scene.children[j].position.z === population1[i][1]
      //     ) {
      //       ctx.scene.children[j].visible = true;
      //     } else {
      //         ctx.scene.children[j].visible = false;
      //     }
      //   }
      // }
    }

    createNeuron();

    /////////////////////////////

    ctx.ambientLight = new THREE.AmbientLight();
    ctx.scene.add(ctx.ambientLight);
    ctx.directionalLight = new THREE.DirectionalLight();
    ctx.directionalLight.position.x = 0;
    ctx.directionalLight.position.y = 80;
    ctx.directionalLight.position.z = 10;
    ctx.scene.add(ctx.directionalLight);

    ctx.scene.background = new THREE.Color();

    ctx.axes = new THREE.AxesHelper(5);
    ctx.scene.add(ctx.axes);

    ctx.renderer = new THREE.WebGLRenderer({ antialias: true });
    ctx.renderer.setSize(ctx.container.clientWidth, ctx.container.clientHeight);
    ctx.container.appendChild(ctx.renderer.domElement);

    ctx.orbitControls = new OrbitControls(ctx.camera, ctx.renderer.domElement);

    ctx.stats = new Stats();
    document.body.appendChild(ctx.stats.dom);

    ctx.grid1 = new THREE.GridHelper(80, 40);
    ctx.grid1.position.set(-0.5, -0.5, -0.5);
    ctx.scene.add(ctx.grid1);
  }),
    //   ctx.updateNeurons = function updateNeurons() {
    //     console.log(ctx.scene);
    //     const population1 = NeuronStore.state.populations[0];
    //     const sceneChildren = ctx.scene.children;
    //     for (let i = 0; i < population1.length - 3; i++) {
    //         console.log(population1.length);
    //       for (let j = 0; j < sceneChildren.length; j++) {
    //         if (
    //           population1[i][2] === NeuronStore.getTime() &&
    //           sceneChildren[j].position.x === population1[i][0] &&
    //           sceneChildren[j].position.z === population1[i][1]
    //         ) {
    //           sceneChildren[j].visible = true;
    //         } else {
    //            sceneChildren[j].visible = false;
    //         }
    //       }
    //     }
    //   },

    (ctx.animate = function animate() {
        
      requestAnimationFrame(animate);
      if (NeuronStore.state.count > 0) {

        // const sceneChildren = ctx.scene.children;
        const population1 = NeuronStore.state.populations[0];
        // for (let i = 0; i < population1.length; i++) {
        //   if (population1[i][2] === 8) {
        //         ctx.timeArray.push(population1[i]);
        //   }


        //   for (let i = 0; i < 40; i++) {
        //     for (let j = 0; j < 40; j++) {
        //         if (
        //             (sceneChildren[j].position.x === population1[i][0]) &&
        //             (sceneChildren[j].position.z === population1[i][1])
        //           ) {
        //             sceneChildren[j].visible = true;
        //           } else {
        //             sceneChildren[j].visible = false;
        //           }
        //         }
        //     }
        // }

          for (let i = 0; i < population1.length; i++) {
              if(population1[i][2] === 20){
                 const geometry = new THREE.BoxGeometry(1, population1[i][3] / 50, 1);
                  const material = new THREE.MeshBasicMaterial({ transparent: true,visible: true, color: 0x980000 });
                  ctx.neuron = new THREE.Mesh(geometry, material);
                  ctx.neuron.position.set(population1[i][0], population1[i][3] / 100, population1[i][1]);
                  ctx.scene.add(ctx.neuron);
            }
          }
        cancelAnimationFrame(animate);
      }
      ctx.renderer.render(ctx.scene, ctx.camera);
      ctx.stats.update();
    });

  return ctx;
}
