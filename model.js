import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- 1. Basic Scene Setup ---
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
scene.background = null;

// Camera
const width = container.clientWidth;
const height = container.clientHeight;

const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    0.1,
    100
);
camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NoToneMapping;

container.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;
controls.enablePan = false;

// --- 2. Balanced Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// --- 3. Load and Configure the GLB Model ---
// CHANGED: Use an array to store multiple torus references instead of a single variable
const rotatingToruses = []; 
const loader = new GLTFLoader();

loader.load('logo.glb', (gltf) => {
    const model = gltf.scene;
    
    // Scale
    model.scale.set(0.35, 0.35, 0.35);

    // Rotation
    model.rotation.y = -(Math.PI / 2 + Math.PI / 8); 

    // Find all Toruses
    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace;
            
            // CHANGED: Checks if the mesh name contains 'Torus' (case-insensitive)
            if (child.name.toLowerCase().includes('torus')) { 
                rotatingToruses.push(child);
            }
        }
    });
    
    // Dynamic Center
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 2.5;

    controls.target.set(0, 0, 0);
    controls.update();

    scene.add(model);
}, 
undefined, 
(error) => {
    console.error('An error occurred while loading the model:', error);
});

// --- 4. Simple Animation Loop ---
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    
    // CHANGED: Loop through the array and rotate every found Torus mesh
    rotatingToruses.forEach((torus) => {
        torus.rotation.y += 0.010;
    });
    
    renderer.render(scene, camera); 
}
animate();

// --- 5. Window Resize Handler ---
window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});