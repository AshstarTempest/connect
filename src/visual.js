// visual.js
import anime from 'animejs/lib/anime.es.js';
import * as THREE from 'three';

export function triggerVisualEffects(onComplete) {
  // Create an animation timeline
  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 7500,
    complete: onComplete,
  });

  // Example visual effects
  timeline
    .add({
      targets: '.square',
      translateX: [0, 250],
      rotate: '1turn',
      backgroundColor: '#FF6347',
      duration: 800,
      opacity: [0, 1],
    })
    .add(
      {
        targets: '.circle',
        translateY: [-250, 0],
        scale: [0, 1],
        backgroundColor: '#6A5ACD',
        duration: 1000,
        opacity: [0, 1],
      },
      '-=500'
    )
    .add(
      {
        targets: '.triangle',
        translateX: [250, 0],
        rotate: '1turn',
        backgroundColor: '#3CB371',
        duration: 1200,
        opacity: [0, 1],
      },
      '-=800'
    );

  // Three.js 3D animation
  initThreeJSAnimation();
}

function initThreeJSAnimation() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  camera.position.z = 50;

  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}
