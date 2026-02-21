import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PlacedObject } from './KitchenPlanner3D';
import { create3DObject, ObjectType, applyColorToObject } from './create3DObjects';

interface ThreeSceneProps {
  addedObjects: PlacedObject[];
  selectedObjectId: number | null;
  onObjectSelect: (timestamp: number | null) => void;
  onObjectUpdate: (timestamp: number, updates: Partial<PlacedObject>) => void;
  showGrid?: boolean;
  gridSnapping?: boolean;
  gridSize?: number;
  cameraView?: 'free' | 'top' | 'front' | 'side';
  sceneRef?: React.MutableRefObject<any>;
  cameraRef?: React.MutableRefObject<any>;
  rendererRef?: React.MutableRefObject<any>;
}

export function ThreeScene({ 
  addedObjects, 
  selectedObjectId, 
  onObjectSelect,
  onObjectUpdate,
  showGrid = true,
  gridSnapping = true,
  gridSize = 0.1,
  cameraView = 'free',
  sceneRef: externalSceneRef,
  cameraRef: externalCameraRef,
  rendererRef: externalRendererRef
}: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const loadedModelsRef = useRef<Map<number, THREE.Group>>(new Map());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const selectionBoxRef = useRef<THREE.BoxHelper | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight1.position.set(10, 15, 10);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    directionalLight1.shadow.camera.near = 0.5;
    directionalLight1.shadow.camera.far = 50;
    directionalLight1.shadow.camera.left = -15;
    directionalLight1.shadow.camera.right = 15;
    directionalLight1.shadow.camera.top = 15;
    directionalLight1.shadow.camera.bottom = -15;
    directionalLight1.shadow.bias = -0.0001;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, 10, -5);
    scene.add(directionalLight2);

    const rimLight = new THREE.DirectionalLight(0xffffee, 0.6);
    rimLight.position.set(-10, 8, 5);
    scene.add(rimLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffee, 0x888888, 0.5);
    scene.add(hemisphereLight);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xfafafa,
      roughness: 0.7,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.position.y = -0.01;
    floor.name = 'floor';
    scene.add(floor);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync objects with scene
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;
    const currentTimestamps = new Set(addedObjects.map(obj => obj.timestamp));

    // Remove deleted objects
    const toRemove: number[] = [];
    loadedModelsRef.current.forEach((model, timestamp) => {
      if (!currentTimestamps.has(timestamp)) {
        scene.remove(model);
        toRemove.push(timestamp);
      }
    });
    toRemove.forEach(ts => loadedModelsRef.current.delete(ts));

    // Add new objects
    addedObjects.forEach((placedObj) => {
      if (!loadedModelsRef.current.has(placedObj.timestamp)) {
        const object3D = create3DObject(placedObj.item.id as ObjectType);
        object3D.userData.timestamp = placedObj.timestamp;
        object3D.name = `object-${placedObj.timestamp}`;
        
        scene.add(object3D);
        loadedModelsRef.current.set(placedObj.timestamp, object3D);
      }

      // Update existing object properties
      const model = loadedModelsRef.current.get(placedObj.timestamp);
      if (model) {
        model.position.set(placedObj.position.x, placedObj.position.y, placedObj.position.z);
        model.rotation.set(
          (placedObj.rotation.x * Math.PI) / 180,
          (placedObj.rotation.y * Math.PI) / 180,
          (placedObj.rotation.z * Math.PI) / 180
        );
        model.scale.set(placedObj.scale.x, placedObj.scale.y, placedObj.scale.z);
        
        if (placedObj.color) {
          applyColorToObject(model, placedObj.color);
        }
      }
    });
  }, [addedObjects]);

  // Handle mouse clicks for selection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      if (!sceneRef.current || !cameraRef.current) return;

      // Calculate mouse position in normalized device coordinates
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children, true);

      console.log('🖱️ Click detected, intersects:', intersects.length);

      if (intersects.length > 0) {
        // Find the object with timestamp userData (skip floor, grid, etc.)
        for (const intersect of intersects) {
          let currentObject = intersect.object;
          
          // Traverse up to find object with timestamp
          while (currentObject) {
            if (currentObject.userData.timestamp) {
              console.log('✅ Found object with timestamp:', currentObject.userData.timestamp);
              onObjectSelect(currentObject.userData.timestamp);
              return;
            }
            currentObject = currentObject.parent as any;
          }
        }
      }

      // Clicked on empty space or non-selectable object
      console.log('❌ No object selected - clicked on empty space');
      onObjectSelect(null);
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [onObjectSelect]);

  // Update selection box
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    // Remove previous selection box
    if (selectionBoxRef.current) {
      scene.remove(selectionBoxRef.current);
      selectionBoxRef.current = null;
    }

    // Add new selection box if object is selected
    if (selectedObjectId !== null) {
      const model = loadedModelsRef.current.get(selectedObjectId);
      if (model) {
        const boxHelper = new THREE.BoxHelper(model, 0x00aaff);
        boxHelper.name = 'selection-box';
        scene.add(boxHelper);
        selectionBoxRef.current = boxHelper;
      }
    }
  }, [selectedObjectId, addedObjects]);

  // Update grid
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    // Remove previous grid
    if (gridHelperRef.current) {
      scene.remove(gridHelperRef.current);
      gridHelperRef.current = null;
    }

    // Add new grid if showGrid is true
    if (showGrid) {
      const gridHelper = new THREE.GridHelper(20, 20, 0xbbbbbb, 0xdddddd);
      gridHelper.name = 'grid-helper';
      scene.add(gridHelper);
      gridHelperRef.current = gridHelper;
    }
  }, [showGrid]);

  // Handle camera view changes
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (cameraView) {
      case 'top':
        camera.position.set(0, 15, 0);
        controls.target.set(0, 0, 0);
        controls.enableRotate = false;
        break;
      case 'front':
        camera.position.set(0, 5, 15);
        controls.target.set(0, 0, 0);
        controls.enableRotate = false;
        break;
      case 'side':
        camera.position.set(15, 5, 0);
        controls.target.set(0, 0, 0);
        controls.enableRotate = false;
        break;
      case 'free':
      default:
        controls.enableRotate = true;
        // No fixed position for free mode
        break;
    }

    controls.update();
  }, [cameraView]);

  // Expose refs to parent component for screenshot
  useEffect(() => {
    if (externalSceneRef) externalSceneRef.current = sceneRef.current;
    if (externalCameraRef) externalCameraRef.current = cameraRef.current;
    if (externalRendererRef) externalRendererRef.current = rendererRef.current;
  }, [externalSceneRef, externalCameraRef, externalRendererRef]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}