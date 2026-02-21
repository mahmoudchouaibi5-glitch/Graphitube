import * as THREE from 'three';

export type ObjectType = 
  | 'fridge'
  | 'oven'
  | 'cabinet-base'
  | 'cabinet-wall'
  | 'sink'
  | 'countertop'
  | 'dishwasher'
  | 'stove';

export function create3DObject(type: ObjectType): THREE.Group {
  const group = new THREE.Group();

  switch (type) {
    case 'fridge':
      return createFridge();
    case 'oven':
      return createOven();
    case 'cabinet-base':
      return createBaseCabinet();
    case 'cabinet-wall':
      return createWallCabinet();
    case 'sink':
      return createSink();
    case 'countertop':
      return createCountertop();
    case 'dishwasher':
      return createDishwasher();
    case 'stove':
      return createStove();
    default:
      return createPlaceholder();
  }
}

// Helper function to apply color to main surfaces of an object
export function applyColorToObject(group: THREE.Group, colorHex: string) {
  const color = new THREE.Color(colorHex);
  
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material;
      
      // Only apply to main body materials (not screws, LEDs, etc)
      if (material instanceof THREE.MeshStandardMaterial) {
        // Don't change emissive materials (LEDs, displays)
        if (material.emissiveIntensity && material.emissiveIntensity > 0.3) {
          return;
        }
        
        // Don't change very small objects (screws, details)
        const geometry = child.geometry;
        if (geometry instanceof THREE.BufferGeometry) {
          geometry.computeBoundingBox();
          const box = geometry.boundingBox;
          if (box) {
            const size = new THREE.Vector3();
            box.getSize(size);
            const volume = size.x * size.y * size.z;
            // Skip very small objects (< 0.001 volume)
            if (volume < 0.001) return;
          }
        }
        
        // Apply color while preserving material properties
        const newMaterial = material.clone();
        newMaterial.color.copy(color);
        child.material = newMaterial;
      }
    }
  });
}

// Helper function to create realistic wood texture with grain
function createWoodMaterial(baseColor: number = 0x8b6f47): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.65, // Lighter for better visibility
    metalness: 0.05,
    envMapIntensity: 0.6, // Increased for better reflections
  });
}

// Helper function to create brushed metal material
function createMetalMaterial(color: number = 0xc0c0c0): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.18, // Smoother surface
    metalness: 0.95,
    envMapIntensity: 1.3, // More reflective
  });
}

// Helper function to create stainless steel material with reflections
function createStainlessSteelMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0xf2f2f2, // Much lighter stainless steel
    roughness: 0.22, // Smoother
    metalness: 0.92,
    envMapIntensity: 1.5, // More reflective
  });
}

// Helper function to create glass material
function createGlassMaterial(color: number = 0x88ccff, opacity: number = 0.3): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.04, // Smoother glass
    metalness: 0.08,
    transparent: true,
    opacity: opacity,
    envMapIntensity: 2.0, // More reflective glass
  });
}

// Helper function to create plastic material
function createPlasticMaterial(color: number = 0x1a1a1a): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.42, // Slightly smoother
    metalness: 0.08,
  });
}

// Helper to create screw/bolt
function createScrew(x: number, y: number, z: number): THREE.Group {
  const screwGroup = new THREE.Group();
  
  // Screw head
  const headGeometry = new THREE.CylinderGeometry(0.006, 0.006, 0.003, 8);
  const screwMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.4,
    metalness: 0.8
  });
  const head = new THREE.Mesh(headGeometry, screwMaterial);
  head.position.set(x, y, z);
  screwGroup.add(head);
  
  // Cross indent on screw head
  const indentGeometry = new THREE.BoxGeometry(0.004, 0.001, 0.001);
  const indentMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const indent1 = new THREE.Mesh(indentGeometry, indentMaterial);
  indent1.position.set(x, y + 0.002, z);
  screwGroup.add(indent1);
  
  const indent2 = new THREE.Mesh(indentGeometry, indentMaterial);
  indent2.rotation.y = Math.PI / 2;
  indent2.position.set(x, y + 0.002, z);
  screwGroup.add(indent2);
  
  return screwGroup;
}

function createFridge(): THREE.Group {
  const group = new THREE.Group();

  // Main body with realistic proportions (70cm x 180cm x 70cm)
  const bodyGeometry = new THREE.BoxGeometry(0.7, 1.8, 0.7);
  const bodyMaterial = createStainlessSteelMaterial();
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.9;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Freezer door with subtle rounded edge simulation
  const freezerGeometry = new THREE.BoxGeometry(0.68, 0.7, 0.03);
  const doorMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8f8f8,
    roughness: 0.15,
    metalness: 0.88,
    envMapIntensity: 1.3
  });
  const freezer = new THREE.Mesh(freezerGeometry, doorMaterial);
  freezer.position.set(0, 1.45, 0.365);
  freezer.castShadow = true;
  group.add(freezer);

  // Fridge door
  const fridgeGeometry = new THREE.BoxGeometry(0.68, 1.0, 0.03);
  const fridge = new THREE.Mesh(fridgeGeometry, doorMaterial);
  fridge.position.set(0, 0.5, 0.365);
  fridge.castShadow = true;
  group.add(fridge);

  // Vertical handle (freezer) - more realistic design with rounded caps
  const handleGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 16);
  const handleMaterial = createMetalMaterial(0x444444);
  const handle1 = new THREE.Mesh(handleGeometry, handleMaterial);
  handle1.position.set(0.28, 1.45, 0.4);
  handle1.castShadow = true;
  group.add(handle1);

  // Handle bar ends (top freezer) - spherical caps
  const endCapGeometry = new THREE.SphereGeometry(0.02, 16, 16);
  const endCap1 = new THREE.Mesh(endCapGeometry, handleMaterial);
  endCap1.position.set(0.28, 1.625, 0.4);
  group.add(endCap1);
  const endCap2 = new THREE.Mesh(endCapGeometry, handleMaterial);
  endCap2.position.set(0.28, 1.275, 0.4);
  group.add(endCap2);

  // Vertical handle (fridge door) - longer
  const handle2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.55, 16), handleMaterial);
  handle2.position.set(0.28, 0.5, 0.4);
  handle2.castShadow = true;
  group.add(handle2);

  // Handle bar ends (fridge door)
  const endCap3 = new THREE.Mesh(endCapGeometry, handleMaterial);
  endCap3.position.set(0.28, 0.775, 0.4);
  group.add(endCap3);
  const endCap4 = new THREE.Mesh(endCapGeometry, handleMaterial);
  endCap4.position.set(0.28, 0.225, 0.4);
  group.add(endCap4);

  // Door seal/gasket (rubber)
  const sealGeometry = new THREE.BoxGeometry(0.66, 0.68, 0.008);
  const sealMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.8,
    metalness: 0.1
  });
  const seal1 = new THREE.Mesh(sealGeometry, sealMaterial);
  seal1.position.set(0, 1.45, 0.378);
  group.add(seal1);

  const seal2 = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.98, 0.008), sealMaterial);
  seal2.position.set(0, 0.5, 0.378);
  group.add(seal2);

  // Ice/water dispenser on freezer door
  const dispenserGeometry = new THREE.BoxGeometry(0.15, 0.25, 0.02);
  const dispenserMaterial = createPlasticMaterial(0x1a1a1a);
  const dispenser = new THREE.Mesh(dispenserGeometry, dispenserMaterial);
  dispenser.position.set(0, 1.45, 0.395);
  group.add(dispenser);

  // Dispenser buttons (3 buttons)
  const buttonGeometry = new THREE.BoxGeometry(0.02, 0.02, 0.005);
  const buttonMaterial = createPlasticMaterial(0x333333);
  
  for (let i = 0; i < 3; i++) {
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(0, 1.52 - i * 0.035, 0.405);
    group.add(button);
  }

  // Dispenser icons (water droplet, ice cube)
  const iconMaterial = new THREE.MeshStandardMaterial({
    color: 0x66ccff,
    emissive: 0x0066cc,
    emissiveIntensity: 0.2
  });
  const waterIcon = new THREE.Mesh(
    new THREE.CircleGeometry(0.006, 8),
    iconMaterial
  );
  waterIcon.rotation.y = Math.PI;
  waterIcon.position.set(0.025, 1.52, 0.406);
  group.add(waterIcon);

  const iceIcon = new THREE.Mesh(
    new THREE.BoxGeometry(0.008, 0.008, 0.001),
    new THREE.MeshStandardMaterial({ color: 0xccffff })
  );
  iceIcon.position.set(0.025, 1.485, 0.406);
  group.add(iceIcon);

  // Dispenser cup area
  const cupAreaGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.01);
  const cupAreaMaterial = createPlasticMaterial(0x2a2a2a);
  const cupArea = new THREE.Mesh(cupAreaGeometry, cupAreaMaterial);
  cupArea.position.set(0, 1.38, 0.402);
  group.add(cupArea);

  // Vent grille at bottom (detailed)
  const ventGeometry = new THREE.BoxGeometry(0.6, 0.08, 0.02);
  const ventMaterial = createPlasticMaterial(0x2a2a2a);
  const vent = new THREE.Mesh(ventGeometry, ventMaterial);
  vent.position.set(0, 0.05, 0.36);
  group.add(vent);

  // Vent slits
  for (let i = 0; i < 20; i++) {
    const slitGeometry = new THREE.BoxGeometry(0.025, 0.003, 0.015);
    const slit = new THREE.Mesh(slitGeometry, new THREE.MeshStandardMaterial({ color: 0x0a0a0a }));
    slit.position.set(-0.27 + i * 0.028, 0.05, 0.365);
    group.add(slit);
  }

  // Temperature display (LED panel on freezer door)
  const displayGeometry = new THREE.BoxGeometry(0.08, 0.04, 0.005);
  const displayMaterial = new THREE.MeshStandardMaterial({
    color: 0x001100,
    emissive: 0x00ff00,
    emissiveIntensity: 0.6,
    roughness: 0.2
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(-0.15, 1.65, 0.395);
  group.add(display);

  // LED segments simulation (showing "5°C")
  const ledSegmentMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x00ff00,
    emissiveIntensity: 1.0
  });
  
  // Digit segments (simplified 7-segment display)
  const segmentPositions = [
    [-0.165, 1.655], [-0.155, 1.655], [-0.145, 1.655], // Top segments
    [-0.165, 1.645], [-0.145, 1.645] // Bottom segments
  ];
  
  segmentPositions.forEach(([x, y]) => {
    const segment = new THREE.Mesh(
      new THREE.BoxGeometry(0.003, 0.008, 0.001),
      ledSegmentMaterial
    );
    segment.position.set(x, y, 0.398);
    group.add(segment);
  });

  // Brand logo (subtle embossed)
  const logoGeometry = new THREE.BoxGeometry(0.12, 0.025, 0.002);
  const logoMaterial = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    roughness: 0.25,
    metalness: 0.85
  });
  const logo = new THREE.Mesh(logoGeometry, logoMaterial);
  logo.position.set(0, 0.15, 0.387);
  group.add(logo);

  // Energy rating label
  const labelGeometry = new THREE.BoxGeometry(0.08, 0.12, 0.001);
  const labelMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    roughness: 0.6
  });
  const energyLabel = new THREE.Mesh(labelGeometry, labelMaterial);
  energyLabel.position.set(-0.25, 0.3, 0.387);
  group.add(energyLabel);

  // Green stripe on energy label (A+++)
  const greenStripe = new THREE.Mesh(
    new THREE.BoxGeometry(0.075, 0.025, 0.001),
    new THREE.MeshStandardMaterial({ color: 0x00aa00 })
  );
  greenStripe.position.set(-0.25, 0.34, 0.388);
  group.add(greenStripe);

  // Hinges (visible on side)
  const hingeGeometry = new THREE.BoxGeometry(0.04, 0.1, 0.02);
  const hingeMaterial = createMetalMaterial(0x666666);
  
  const hinge1 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge1.position.set(-0.35, 1.6, 0.35);
  group.add(hinge1);
  
  const hinge2 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge2.position.set(-0.35, 1.3, 0.35);
  group.add(hinge2);

  const hinge3 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge3.position.set(-0.35, 0.7, 0.35);
  group.add(hinge3);

  const hinge4 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge4.position.set(-0.35, 0.3, 0.35);
  group.add(hinge4);

  // Screws on hinges
  hinge1.add(createScrew(0, 0.04, 0.01));
  hinge1.add(createScrew(0, -0.04, 0.01));
  hinge2.add(createScrew(0, 0.04, 0.01));
  hinge2.add(createScrew(0, -0.04, 0.01));

  // Bottom feet (adjustable)
  const footGeometry = new THREE.CylinderGeometry(0.018, 0.022, 0.04, 16);
  const footMaterial = createPlasticMaterial(0x1a1a1a);
  
  const footPositions = [
    [-0.28, 0.02, -0.28],
    [0.28, 0.02, -0.28],
    [-0.28, 0.02, 0.28],
    [0.28, 0.02, 0.28]
  ];

  footPositions.forEach(([x, y, z]) => {
    const foot = new THREE.Mesh(footGeometry, footMaterial);
    foot.position.set(x, y, z);
    group.add(foot);
  });

  return group;
}

function createOven(): THREE.Group {
  const group = new THREE.Group();

  // Main body (60cm x 60cm x 60cm built-in oven)
  const bodyGeometry = new THREE.BoxGeometry(0.6, 0.65, 0.6);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.35,
    metalness: 0.65,
    envMapIntensity: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.325;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Outer door frame (stainless steel)
  const frameGeometry = new THREE.BoxGeometry(0.58, 0.6, 0.025);
  const frameMaterial = createStainlessSteelMaterial();
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.set(0, 0.325, 0.3125);
  frame.castShadow = true;
  group.add(frame);

  // Glass door (triple glazed look - multiple layers)
  const glassGeometry = new THREE.BoxGeometry(0.5, 0.52, 0.015);
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.02,
    metalness: 0.98,
    transparent: true,
    opacity: 0.6,
    envMapIntensity: 2.0
  });
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.set(0, 0.325, 0.325);
  group.add(glass);

  // Inner glass layer (darker, simulating heat)
  const innerGlass = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.5, 0.01),
    new THREE.MeshStandardMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.8,
      emissive: 0x331100,
      emissiveIntensity: 0.1
    })
  );
  innerGlass.position.set(0, 0.325, 0.32);
  group.add(innerGlass);

  // Oven light glow inside (subtle orange)
  const lightGlow = new THREE.Mesh(
    new THREE.CircleGeometry(0.015, 16),
    new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.4
    })
  );
  lightGlow.position.set(-0.2, 0.45, 0.315);
  group.add(lightGlow);

  // Handle bar (horizontal) - professional grade
  const handleGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.45, 16);
  const handleMaterial = createMetalMaterial(0x555555);
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0, 0.6, 0.34);
  handle.castShadow = true;
  group.add(handle);

  // Handle end caps (rounded)
  const endCapGeometry = new THREE.SphereGeometry(0.02, 16, 16);
  const endCap1 = new THREE.Mesh(endCapGeometry, handleMaterial);
  endCap1.position.set(-0.225, 0.6, 0.34);
  group.add(endCap1);
  const endCap2 = new THREE.Mesh(endCapGeometry, handleMaterial);
  endCap2.position.set(0.225, 0.6, 0.34);
  group.add(endCap2);

  // Handle mounting screws
  group.add(createScrew(-0.225, 0.6, 0.355));
  group.add(createScrew(0.225, 0.6, 0.355));

  // Control panel at top
  const panelGeometry = new THREE.BoxGeometry(0.58, 0.08, 0.02);
  const panelMaterial = createPlasticMaterial(0x2a2a2a); // Lighter
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.set(0, 0.645, 0.31);
  group.add(panel);

  // Digital display
  const displayGeometry = new THREE.BoxGeometry(0.12, 0.04, 0.005);
  const displayMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0xff3300,
    emissiveIntensity: 0.8,
    roughness: 0.15
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(0, 0.645, 0.325);
  group.add(display);

  // LED digits showing "180°C"
  const digitMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3300,
    emissive: 0xff3300,
    emissiveIntensity: 1.2
  });
  
  const digitSegments = [
    [-0.04, 0.65], [-0.03, 0.65], [-0.02, 0.65], // 1
    [-0.01, 0.65], [0.0, 0.65], [0.01, 0.65], // 8
    [0.02, 0.65], [0.03, 0.65], [0.04, 0.65] // 0
  ];
  
  digitSegments.forEach(([x, y]) => {
    const segment = new THREE.Mesh(
      new THREE.BoxGeometry(0.003, 0.01, 0.001),
      digitMaterial
    );
    segment.position.set(x, y, 0.328);
    group.add(segment);
  });

  // Control knobs (4 knobs) - more detailed
  const knobGeometry = new THREE.CylinderGeometry(0.022, 0.026, 0.018, 16);
  const knobMaterial = createPlasticMaterial(0x3a3a3a); // Lighter knobs

  for (let i = 0; i < 4; i++) {
    const knob = new THREE.Mesh(knobGeometry, knobMaterial);
    knob.rotation.x = Math.PI / 2;
    const xPos = -0.2 + i * 0.133;
    knob.position.set(xPos, 0.645, 0.325);
    group.add(knob);

    // Knob grip lines (texture detail)
    for (let j = 0; j < 8; j++) {
      const gripLine = new THREE.Mesh(
        new THREE.BoxGeometry(0.002, 0.015, 0.001),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
      );
      const angle = (j / 8) * Math.PI * 2;
      gripLine.position.set(
        xPos + Math.cos(angle) * 0.018,
        0.645,
        0.33 + Math.sin(angle) * 0.018
      );
      gripLine.rotation.y = angle;
      group.add(gripLine);
    }

    // Knob indicator (white dot)
    const indicator = new THREE.Mesh(
      new THREE.CircleGeometry(0.003, 8),
      new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.3
      })
    );
    indicator.position.set(xPos, 0.645, 0.345);
    group.add(indicator);

    // Icon labels below knobs
    const iconMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xaaaaaa,
      roughness: 0.4
    });
    const iconLabels = ['🔥', '♨', '🌡', '⏰']; // Simplified as geometry
    const icon = new THREE.Mesh(
      new THREE.CircleGeometry(0.008, 8),
      iconMaterial
    );
    icon.position.set(xPos, 0.61, 0.322);
    group.add(icon);
  }

  // Function selector icons (printed on panel)
  const iconPositions = [
    { x: -0.25, symbol: 'conventional' },
    { x: -0.15, symbol: 'fan' },
    { x: -0.05, symbol: 'grill' },
    { x: 0.05, symbol: 'defrost' },
    { x: 0.15, symbol: 'light' },
  ];

  iconPositions.forEach(({ x, symbol }) => {
    const iconGeom = new THREE.CircleGeometry(0.012, 16);
    const iconMat = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.5
    });
    const icon = new THREE.Mesh(iconGeom, iconMat);
    icon.position.set(x, 0.675, 0.322);
    group.add(icon);
  });

  // Vent slits (realistic detail) - bottom
  const ventSlitGeometry = new THREE.BoxGeometry(0.4, 0.004, 0.015);
  const ventMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.8
  });
  
  for (let i = 0; i < 10; i++) {
    const slit = new THREE.Mesh(ventSlitGeometry, ventMaterial);
    slit.position.set(0, 0.03 + i * 0.008, 0.305);
    group.add(slit);
  }

  // Cooling fan vent (back/bottom)
  for (let i = 0; i < 12; i++) {
    const backVent = new THREE.Mesh(
      new THREE.BoxGeometry(0.003, 0.004, 0.01),
      ventMaterial
    );
    backVent.position.set(-0.25 + i * 0.042, 0.65, -0.305);
    group.add(backVent);
  }

  // Brand name (embossed)
  const brandGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.002);
  const brandMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.2,
    metalness: 0.8
  });
  const brand = new THREE.Mesh(brandGeometry, brandMaterial);
  brand.position.set(0.18, 0.645, 0.322);
  group.add(brand);

  return group;
}

function createBaseCabinet(): THREE.Group {
  const group = new THREE.Group();

  // Cabinet body (60cm x 85cm x 60cm)
  const bodyGeometry = new THREE.BoxGeometry(0.6, 0.85, 0.6);
  const woodColor = 0x8b6f47; // Medium wood tone - more visible
  const bodyMaterial = createWoodMaterial(woodColor);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.425;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Door (slightly lighter wood with grain variation)
  const doorGeometry = new THREE.BoxGeometry(0.58, 0.72, 0.025);
  const doorMaterial = createWoodMaterial(0xa67c52); // Lighter wood
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 0.425, 0.3125);
  door.castShadow = true;
  group.add(door);

  // Door frame (raised edge detail)
  const frameGeometry = new THREE.BoxGeometry(0.56, 0.7, 0.018);
  const frameMaterial = createWoodMaterial(0x9a7045); // Medium tone
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.set(0, 0.425, 0.327);
  group.add(frame);

  // Door panel inset (decorative with depth)
  const panelGeometry = new THREE.BoxGeometry(0.48, 0.6, 0.012);
  const panelMaterial = createWoodMaterial(0x7a5a35); // Darker but still visible
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.set(0, 0.425, 0.333);
  group.add(panel);

  // Wood grain lines (subtle texture detail)
  for (let i = 0; i < 15; i++) {
    const grainGeometry = new THREE.BoxGeometry(0.45, 0.002, 0.001);
    const grainMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a4a2f, // Lighter grain for visibility
      roughness: 0.85,
      metalness: 0.0
    });
    const grain = new THREE.Mesh(grainGeometry, grainMaterial);
    grain.position.set(0, 0.25 + i * 0.035, 0.338);
    group.add(grain);
  }

  // Modern handle (horizontal bar) - brushed aluminum
  const handleGeometry = new THREE.CylinderGeometry(0.009, 0.009, 0.28, 20);
  const handleMaterial = createMetalMaterial(0xa8a8a8);
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0, 0.72, 0.345);
  handle.castShadow = true;
  group.add(handle);

  // Handle mounting brackets (more detailed)
  const bracketGeometry = new THREE.CylinderGeometry(0.014, 0.014, 0.025, 8);
  const bracket1 = new THREE.Mesh(bracketGeometry, handleMaterial);
  bracket1.rotation.x = Math.PI / 2;
  bracket1.position.set(-0.14, 0.72, 0.338);
  group.add(bracket1);
  const bracket2 = new THREE.Mesh(bracketGeometry, handleMaterial);
  bracket2.rotation.x = Math.PI / 2;
  bracket2.position.set(0.14, 0.72, 0.338);
  group.add(bracket2);

  // Screws for handle brackets
  group.add(createScrew(-0.14, 0.72, 0.352));
  group.add(createScrew(0.14, 0.72, 0.352));

  // Hinge details (European-style concealed hinges)
  const hingeGeometry = new THREE.BoxGeometry(0.03, 0.1, 0.018);
  const hingeMaterial = createMetalMaterial(0x777777);
  
  const hinge1 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge1.position.set(-0.29, 0.68, 0.325);
  hinge1.castShadow = true;
  group.add(hinge1);
  
  const hinge2 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge2.position.set(-0.29, 0.17, 0.325);
  hinge2.castShadow = true;
  group.add(hinge2);

  // Hinge mounting plates
  const plateGeometry = new THREE.BoxGeometry(0.025, 0.06, 0.012);
  const plateMaterial = createMetalMaterial(0x666666);
  
  const plate1 = new THREE.Mesh(plateGeometry, plateMaterial);
  plate1.position.set(-0.275, 0.68, 0.33);
  group.add(plate1);
  
  const plate2 = new THREE.Mesh(plateGeometry, plateMaterial);
  plate2.position.set(-0.275, 0.17, 0.33);
  group.add(plate2);

  // Screws on hinges (4 per hinge)
  group.add(createScrew(-0.285, 0.7, 0.335));
  group.add(createScrew(-0.285, 0.66, 0.335));
  group.add(createScrew(-0.285, 0.19, 0.335));
  group.add(createScrew(-0.285, 0.15, 0.335));

  // Adjustable feet/legs (realistic kitchen cabinet feet)
  const footGeometry = new THREE.CylinderGeometry(0.018, 0.024, 0.04, 20);
  const footMaterial = createPlasticMaterial(0x1a1a1a);

  const footPositions = [
    [-0.24, 0.02, -0.24],
    [0.24, 0.02, -0.24],
    [-0.24, 0.02, 0.24],
    [0.24, 0.02, 0.24]
  ];

  footPositions.forEach(([x, y, z]) => {
    const foot = new THREE.Mesh(footGeometry, footMaterial);
    foot.position.set(x, y, z);
    foot.castShadow = true;
    group.add(foot);

    // Adjustment thread detail
    const threadGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.015, 16);
    const threadMaterial = createMetalMaterial(0x999999);
    const thread = new THREE.Mesh(threadGeometry, threadMaterial);
    thread.position.set(x, y + 0.025, z);
    group.add(thread);
  });

  // Base trim/kick plate
  const kickPlateGeometry = new THREE.BoxGeometry(0.58, 0.12, 0.015);
  const kickPlateMaterial = createWoodMaterial(0x7a5a3f); // Lighter
  const kickPlate = new THREE.Mesh(kickPlateGeometry, kickPlateMaterial);
  kickPlate.position.set(0, 0.06, 0.3);
  group.add(kickPlate);

  // Internal shelf indicators (visible through gap)
  const shelfEdgeGeometry = new THREE.BoxGeometry(0.58, 0.018, 0.005);
  const shelfMaterial = createWoodMaterial(0x8b6f47); // Lighter
  const shelf = new THREE.Mesh(shelfEdgeGeometry, shelfMaterial);
  shelf.position.set(0, 0.5, 0.295);
  group.add(shelf);

  // Soft-close damper (visible on hinge)
  const damperGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.035, 12);
  const damperMaterial = createPlasticMaterial(0x333333);
  const damper = new THREE.Mesh(damperGeometry, damperMaterial);
  damper.rotation.z = Math.PI / 2;
  damper.position.set(-0.29, 0.68, 0.31);
  group.add(damper);

  return group;
}

function createWallCabinet(): THREE.Group {
  const group = new THREE.Group();

  // Cabinet body (60cm x 70cm x 35cm)
  const bodyGeometry = new THREE.BoxGeometry(0.6, 0.7, 0.35);
  const woodColor = 0x8b6f47; // Match base cabinet - lighter
  const bodyMaterial = createWoodMaterial(woodColor);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 1.5;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Door (lighter wood)
  const doorGeometry = new THREE.BoxGeometry(0.58, 0.66, 0.025);
  const doorMaterial = createWoodMaterial(0xa67c52); // Lighter
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 1.5, 0.1875);
  door.castShadow = true;
  group.add(door);

  // Door frame
  const frameGeometry = new THREE.BoxGeometry(0.56, 0.64, 0.018);
  const frameMaterial = createWoodMaterial(0x9a7045); // Medium tone
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.set(0, 1.5, 0.202);
  group.add(frame);

  // Glass insert (frosted/clear option)
  const glassGeometry = new THREE.BoxGeometry(0.5, 0.28, 0.015);
  const glassMaterial = createGlassMaterial(0x99ddff, 0.35);
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.set(0, 1.63, 0.21);
  group.add(glass);

  // Glass frame/mullion
  const mullionGeometry = new THREE.BoxGeometry(0.505, 0.006, 0.012);
  const mullionMaterial = createWoodMaterial(0x8b6f47); // Lighter
  const mullionH = new THREE.Mesh(mullionGeometry, mullionMaterial);
  mullionH.position.set(0, 1.63, 0.212);
  group.add(mullionH);

  const mullionV = new THREE.Mesh(
    new THREE.BoxGeometry(0.006, 0.285, 0.012),
    mullionMaterial
  );
  mullionV.position.set(0, 1.63, 0.212);
  group.add(mullionV);

  // Lower panel (solid wood)
  const lowerPanelGeometry = new THREE.BoxGeometry(0.48, 0.3, 0.012);
  const lowerPanelMaterial = createWoodMaterial(0x7a5a35); // Lighter
  const lowerPanel = new THREE.Mesh(lowerPanelGeometry, lowerPanelMaterial);
  lowerPanel.position.set(0, 1.35, 0.208);
  group.add(lowerPanel);

  // Wood grain on lower panel
  for (let i = 0; i < 8; i++) {
    const grainGeometry = new THREE.BoxGeometry(0.45, 0.002, 0.001);
    const grainMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a4a2f, // Lighter grain
      roughness: 0.85
    });
    const grain = new THREE.Mesh(grainGeometry, grainMaterial);
    grain.position.set(0, 1.28 + i * 0.022, 0.213);
    group.add(grain);
  }

  // Modern round knob
  const knobGeometry = new THREE.CylinderGeometry(0.016, 0.022, 0.035, 20);
  const knobMaterial = createMetalMaterial(0xb0b0b0);
  const knob = new THREE.Mesh(knobGeometry, knobMaterial);
  knob.rotation.x = Math.PI / 2;
  knob.position.set(0.23, 1.5, 0.22);
  knob.castShadow = true;
  group.add(knob);

  // Knob decorative ring
  const ringGeometry = new THREE.TorusGeometry(0.018, 0.003, 12, 24);
  const ring = new THREE.Mesh(ringGeometry, knobMaterial);
  ring.rotation.y = Math.PI / 2;
  ring.position.set(0.23, 1.5, 0.225);
  group.add(ring);

  // Mounting screw for knob
  group.add(createScrew(0.23, 1.5, 0.24));

  // Hinge details (European style)
  const hingeGeometry = new THREE.BoxGeometry(0.03, 0.1, 0.018);
  const hingeMaterial = createMetalMaterial(0x777777);
  
  const hinge1 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge1.position.set(-0.29, 1.63, 0.2);
  hinge1.castShadow = true;
  group.add(hinge1);
  
  const hinge2 = new THREE.Mesh(hingeGeometry, hingeMaterial);
  hinge2.position.set(-0.29, 1.37, 0.2);
  hinge2.castShadow = true;
  group.add(hinge2);

  // Hinge screws
  group.add(createScrew(-0.285, 1.65, 0.208));
  group.add(createScrew(-0.285, 1.61, 0.208));
  group.add(createScrew(-0.285, 1.39, 0.208));
  group.add(createScrew(-0.285, 1.35, 0.208));

  // Mounting rail (heavy-duty wall mounting)
  const railGeometry = new THREE.BoxGeometry(0.58, 0.04, 0.025);
  const railMaterial = createMetalMaterial(0x888888);
  const rail = new THREE.Mesh(railGeometry, railMaterial);
  rail.position.set(0, 1.86, -0.1625);
  rail.castShadow = true;
  group.add(rail);

  // Rail mounting holes
  const holePositions = [-0.22, -0.11, 0, 0.11, 0.22];
  holePositions.forEach((x) => {
    const holeGeometry = new THREE.CylinderGeometry(0.004, 0.004, 0.03, 12);
    const holeMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const hole = new THREE.Mesh(holeGeometry, holeMaterial);
    hole.rotation.x = Math.PI / 2;
    hole.position.set(x, 1.86, -0.16);
    group.add(hole);
  });

  // Shelf support pins (visible inside if glass door)
  const pinGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.01, 8);
  const pinMaterial = createMetalMaterial(0x999999);
  
  const pinPositions = [
    [-0.27, 1.6, -0.14],
    [0.27, 1.6, -0.14],
    [-0.27, 1.4, -0.14],
    [0.27, 1.4, -0.14]
  ];

  pinPositions.forEach(([x, y, z]) => {
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(x, y, z);
    group.add(pin);
  });

  // Soft-close mechanism
  const softCloseGeometry = new THREE.BoxGeometry(0.015, 0.025, 0.015);
  const softCloseMaterial = createPlasticMaterial(0x2a2a2a);
  const softClose = new THREE.Mesh(softCloseGeometry, softCloseMaterial);
  softClose.position.set(-0.28, 1.63, 0.19);
  group.add(softClose);

  return group;
}

function createSink(): THREE.Group {
  const group = new THREE.Group();

  // Base/Counter slab (granite/marble)
  const baseGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.6);
  const counterMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a, // Medium gray granite - more visible
    roughness: 0.25,
    metalness: 0.25,
    envMapIntensity: 0.7
  });
  const base = new THREE.Mesh(baseGeometry, counterMaterial);
  base.position.set(0, 0.875, 0);
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // Granite speckles/texture
  for (let i = 0; i < 30; i++) {
    const speckleGeometry = new THREE.BoxGeometry(0.003, 0.001, 0.003);
    const speckleMaterial = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0x707070 : 0x585858, // Lighter speckles
      roughness: 0.3
    });
    const speckle = new THREE.Mesh(speckleGeometry, speckleMaterial);
    speckle.position.set(
      Math.random() * 0.5 - 0.25,
      0.901,
      Math.random() * 0.5 - 0.25
    );
    group.add(speckle);
  }

  // Sink basin (undermount style)
  const basinGeometry = new THREE.BoxGeometry(0.46, 0.2, 0.4);
  const basinMaterial = createStainlessSteelMaterial();
  const basin = new THREE.Mesh(basinGeometry, basinMaterial);
  basin.position.set(0, 0.8, 0.02);
  basin.castShadow = true;
  basin.receiveShadow = true;
  group.add(basin);

  // Basin rim/lip
  const rimGeometry = new THREE.BoxGeometry(0.48, 0.01, 0.42);
  const rimMaterial = createStainlessSteelMaterial();
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.set(0, 0.905, 0.02);
  group.add(rim);

  // Drain assembly
  const drainGeometry = new THREE.CylinderGeometry(0.038, 0.038, 0.025, 24);
  const drainMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    roughness: 0.5,
    metalness: 0.75
  });
  const drain = new THREE.Mesh(drainGeometry, drainMaterial);
  drain.position.set(0, 0.7, 0.02);
  group.add(drain);

  // Drain grate/strainer
  const grateGeometry = new THREE.CylinderGeometry(0.032, 0.032, 0.008, 24);
  const grateMaterial = createStainlessSteelMaterial();
  const grate = new THREE.Mesh(grateGeometry, grateMaterial);
  grate.position.set(0, 0.716, 0.02);
  group.add(grate);

  // Grate holes
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const holeGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.01, 8);
    const holeMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });
    const hole = new THREE.Mesh(holeGeometry, holeMaterial);
    hole.position.set(
      Math.cos(angle) * 0.02,
      0.716,
      0.02 + Math.sin(angle) * 0.02
    );
    group.add(hole);
  }

  // Faucet base plate (chrome)
  const faucetBaseGeometry = new THREE.CylinderGeometry(0.028, 0.035, 0.008, 24);
  const faucetMaterial = createMetalMaterial(0xc8c8c8);
  const faucetBase = new THREE.Mesh(faucetBaseGeometry, faucetMaterial);
  faucetBase.position.set(0, 0.904, -0.22);
  group.add(faucetBase);

  // Mounting screws (visible from top)
  group.add(createScrew(-0.02, 0.908, -0.22));
  group.add(createScrew(0.02, 0.908, -0.22));

  // Faucet body base
  const bodyBaseGeometry = new THREE.CylinderGeometry(0.02, 0.025, 0.06, 20);
  const bodyBase = new THREE.Mesh(bodyBaseGeometry, faucetMaterial);
  bodyBase.position.set(0, 0.938, -0.22);
  bodyBase.castShadow = true;
  group.add(bodyBase);

  // Faucet neck (curved - simulated with segments for modern look)
  const neckGeometry = new THREE.CylinderGeometry(0.016, 0.016, 0.28, 20);
  const faucetNeck = new THREE.Mesh(neckGeometry, faucetMaterial);
  faucetNeck.position.set(0, 1.11, -0.22);
  faucetNeck.castShadow = true;
  group.add(faucetNeck);

  // Faucet arc connector
  const arcGeometry = new THREE.TorusGeometry(0.06, 0.014, 12, 24, Math.PI / 2);
  const arc = new THREE.Mesh(arcGeometry, faucetMaterial);
  arc.rotation.y = -Math.PI / 2;
  arc.rotation.z = Math.PI;
  arc.position.set(0.06, 1.25, -0.22);
  arc.castShadow = true;
  group.add(arc);

  // Faucet spout (horizontal part - pull-down design)
  const spoutGeometry = new THREE.CylinderGeometry(0.014, 0.018, 0.14, 20);
  const spout = new THREE.Mesh(spoutGeometry, faucetMaterial);
  spout.rotation.z = Math.PI / 2;
  spout.position.set(0.13, 1.19, -0.22);
  spout.castShadow = true;
  group.add(spout);

  // Spray head/spout tip (pull-down feature)
  const sprayHeadGeometry = new THREE.CylinderGeometry(0.018, 0.022, 0.045, 16);
  const sprayHead = new THREE.Mesh(sprayHeadGeometry, faucetMaterial);
  sprayHead.position.set(0.205, 1.175, -0.22);
  sprayHead.castShadow = true;
  group.add(sprayHead);

  // Spray nozzle detail
  const nozzleGeometry = new THREE.CylinderGeometry(0.012, 0.015, 0.02, 16);
  const nozzle = new THREE.Mesh(nozzleGeometry, new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.4,
    metalness: 0.6
  }));
  nozzle.position.set(0.205, 1.148, -0.22);
  group.add(nozzle);

  // Single lever handle (modern design)
  const handleBaseGeometry = new THREE.CylinderGeometry(0.012, 0.015, 0.025, 12);
  const handleBase = new THREE.Mesh(handleBaseGeometry, faucetMaterial);
  handleBase.rotation.x = Math.PI / 6;
  handleBase.position.set(0.04, 0.985, -0.2);
  handleBase.castShadow = true;
  group.add(handleBase);

  // Handle lever
  const leverGeometry = new THREE.BoxGeometry(0.015, 0.08, 0.025);
  const lever = new THREE.Mesh(leverGeometry, faucetMaterial);
  lever.rotation.x = -Math.PI / 8;
  lever.position.set(0.04, 1.025, -0.185);
  lever.castShadow = true;
  group.add(lever);

  // Handle grip
  const gripGeometry = new THREE.BoxGeometry(0.012, 0.05, 0.022);
  const gripMaterial = createPlasticMaterial(0x2a2a2a);
  const grip = new THREE.Mesh(gripGeometry, gripMaterial);
  grip.rotation.x = -Math.PI / 8;
  grip.position.set(0.04, 1.045, -0.175);
  group.add(grip);

  // Temperature indicator dot (red/blue)
  const tempIndicatorGeometry = new THREE.CircleGeometry(0.003, 12);
  const redDot = new THREE.Mesh(
    tempIndicatorGeometry,
    new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.3 })
  );
  redDot.position.set(0.048, 1.05, -0.17);
  redDot.rotation.y = -Math.PI / 2;
  group.add(redDot);

  const blueDot = new THREE.Mesh(
    tempIndicatorGeometry,
    new THREE.MeshStandardMaterial({ color: 0x0000ff, emissive: 0x0000ff, emissiveIntensity: 0.3 })
  );
  blueDot.position.set(0.032, 1.05, -0.17);
  blueDot.rotation.y = -Math.PI / 2;
  group.add(blueDot);

  // Soap dispenser (optional accessory)
  const soapBaseGeometry = new THREE.CylinderGeometry(0.018, 0.022, 0.012, 20);
  const soapBaseMaterial = createStainlessSteelMaterial();
  const soapBase = new THREE.Mesh(soapBaseGeometry, soapBaseMaterial);
  soapBase.position.set(-0.18, 0.906, -0.22);
  group.add(soapBase);

  const soapPumpGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.035, 16);
  const soapPump = new THREE.Mesh(soapPumpGeometry, soapBaseMaterial);
  soapPump.position.set(-0.18, 0.93, -0.22);
  group.add(soapPump);

  const soapTopGeometry = new THREE.CylinderGeometry(0.015, 0.012, 0.012, 16);
  const soapTop = new THREE.Mesh(soapTopGeometry, createPlasticMaterial(0x1a1a1a));
  soapTop.position.set(-0.18, 0.953, -0.22);
  group.add(soapTop);

  return group;
}

function createCountertop(): THREE.Group {
  const group = new THREE.Group();

  // Countertop slab (120cm x 5cm x 60cm) - premium quartz/granite
  const topGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.6);
  const topMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a, // Medium dark gray - more visible
    roughness: 0.2,
    metalness: 0.4,
    envMapIntensity: 1.0
  });
  const top = new THREE.Mesh(topGeometry, topMaterial);
  top.position.y = 0.9;
  top.castShadow = true;
  top.receiveShadow = true;
  group.add(top);

  // Polished edge profile (Ogee/Bullnose style)
  const frontEdgeGeometry = new THREE.BoxGeometry(1.2, 0.038, 0.025);
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x353535, // Lighter edge
    roughness: 0.15,
    metalness: 0.45,
    envMapIntensity: 1.2
  });
  const frontEdge = new THREE.Mesh(frontEdgeGeometry, edgeMaterial);
  frontEdge.position.set(0, 0.881, 0.3125);
  group.add(frontEdge);

  // Back splash preparation edge
  const backEdgeGeometry = new THREE.BoxGeometry(1.2, 0.038, 0.025);
  const backEdge = new THREE.Mesh(backEdgeGeometry, edgeMaterial);
  backEdge.position.set(0, 0.881, -0.3125);
  group.add(backEdge);

  // Side edges
  const sideEdgeGeometry = new THREE.BoxGeometry(0.025, 0.038, 0.6);
  const leftEdge = new THREE.Mesh(sideEdgeGeometry, edgeMaterial);
  leftEdge.position.set(-0.5875, 0.881, 0);
  group.add(leftEdge);

  const rightEdge = new THREE.Mesh(sideEdgeGeometry, edgeMaterial);
  rightEdge.position.set(0.5875, 0.881, 0);
  group.add(rightEdge);

  // Natural stone veining (realistic marble/granite effect)
  const veinMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555, // Lighter veins
    roughness: 0.18,
    metalness: 0.35,
    transparent: true,
    opacity: 0.7
  });

  // Main veins (flowing pattern)
  for (let i = 0; i < 12; i++) {
    const veinLength = Math.random() * 0.4 + 0.3;
    const veinGeometry = new THREE.BoxGeometry(0.002, 0.001, veinLength);
    const vein = new THREE.Mesh(veinGeometry, veinMaterial);
    vein.position.set(
      Math.random() * 1.1 - 0.55,
      0.9255,
      Math.random() * 0.5 - 0.25
    );
    vein.rotation.y = Math.random() * Math.PI;
    group.add(vein);
  }

  // Secondary veins (branching effect)
  for (let i = 0; i < 18; i++) {
    const branchLength = Math.random() * 0.15 + 0.08;
    const branchGeometry = new THREE.BoxGeometry(0.001, 0.0005, branchLength);
    const branch = new THREE.Mesh(branchGeometry, new THREE.MeshStandardMaterial({
      color: 0x606060, // Lighter branches
      roughness: 0.2,
      transparent: true,
      opacity: 0.5
    }));
    branch.position.set(
      Math.random() * 1.0 - 0.5,
      0.9253,
      Math.random() * 0.4 - 0.2
    );
    branch.rotation.y = Math.random() * Math.PI;
    group.add(branch);
  }

  // Mineral speckles (quartz crystals effect)
  const speckleMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.1, metalness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.15, metalness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.2, metalness: 0.3 })
  ];

  for (let i = 0; i < 50; i++) {
    const speckleSize = Math.random() * 0.004 + 0.002;
    const speckleGeometry = new THREE.BoxGeometry(speckleSize, 0.0005, speckleSize);
    const speckle = new THREE.Mesh(
      speckleGeometry,
      speckleMaterials[Math.floor(Math.random() * speckleMaterials.length)]
    );
    speckle.position.set(
      Math.random() * 1.1 - 0.55,
      0.9252,
      Math.random() * 0.55 - 0.275
    );
    speckle.rotation.y = Math.random() * Math.PI * 2;
    group.add(speckle);
  }

  // Seam detail (if large countertop - where two slabs meet)
  const seamGeometry = new THREE.BoxGeometry(0.001, 0.052, 0.6);
  const seamMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a, // Lighter seam
    roughness: 0.7
  });
  const seam = new THREE.Mesh(seamGeometry, seamMaterial);
  seam.position.set(0.3, 0.9, 0);
  group.add(seam);

  // Corner support brackets (visible underneath)
  const bracketGeometry = new THREE.BoxGeometry(0.08, 0.04, 0.08);
  const bracketMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.4,
    metalness: 0.7
  });

  const bracketPositions = [
    [-0.55, 0.855, -0.26],
    [0.55, 0.855, -0.26],
    [-0.55, 0.855, 0.26],
    [0.55, 0.855, 0.26]
  ];

  bracketPositions.forEach(([x, y, z]) => {
    const bracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
    bracket.position.set(x, y, z);
    group.add(bracket);

    // Mounting screws for brackets
    group.add(createScrew(x - 0.02, y + 0.025, z));
    group.add(createScrew(x + 0.02, y + 0.025, z));
  });

  return group;
}

function createDishwasher(): THREE.Group {
  const group = new THREE.Group();

  // Main body (60cm x 85cm x 60cm) - integrated dishwasher
  const bodyGeometry = new THREE.BoxGeometry(0.6, 0.85, 0.6);
  const bodyMaterial = createStainlessSteelMaterial();
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.425;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Door panel (stainless steel finish)
  const doorGeometry = new THREE.BoxGeometry(0.58, 0.83, 0.028);
  const doorMaterial = new THREE.MeshStandardMaterial({
    color: 0xececec,
    roughness: 0.25,
    metalness: 0.82,
    envMapIntensity: 1.1
  });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 0.425, 0.314);
  door.castShadow = true;
  group.add(door);

  // Brushed steel texture lines (horizontal)
  for (let i = 0; i < 25; i++) {
    const brushLineGeometry = new THREE.BoxGeometry(0.56, 0.001, 0.0005);
    const brushLineMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      roughness: 0.3,
      metalness: 0.8
    });
    const brushLine = new THREE.Mesh(brushLineGeometry, brushLineMaterial);
    brushLine.position.set(0, 0.025 + i * 0.033, 0.329);
    group.add(brushLine);
  }

  // Edge trim (stainless frame)
  const trimGeometry = new THREE.BoxGeometry(0.585, 0.835, 0.002);
  const trimMaterial = createMetalMaterial(0xb0b0b0);
  const trim = new THREE.Mesh(trimGeometry, trimMaterial);
  trim.position.set(0, 0.425, 0.329);
  group.add(trim);

  // Control panel (top edge - pocket handle design)
  const panelGeometry = new THREE.BoxGeometry(0.54, 0.055, 0.018);
  const panelMaterial = createPlasticMaterial(0x2a2a2a); // Lighter plastic
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.set(0, 0.8175, 0.327);
  group.add(panel);

  // LED status indicators (cycle/wash/dry)
  const ledPositions = [
    { x: -0.2, label: 'Wash', color: 0x00ff00 },
    { x: -0.12, label: 'Rinse', color: 0x0088ff },
    { x: -0.04, label: 'Dry', color: 0xffaa00 },
    { x: 0.04, label: 'Clean', color: 0x00ff00 }
  ];

  ledPositions.forEach(({ x, color }) => {
    const ledGeometry = new THREE.CircleGeometry(0.004, 12);
    const ledMaterial = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.rotation.x = Math.PI / 2;
    led.position.set(x, 0.818, 0.337);
    group.add(led);

    // LED bezel
    const bezelGeometry = new THREE.CircleGeometry(0.006, 12);
    const bezelMaterial = createMetalMaterial(0x888888);
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    bezel.rotation.x = Math.PI / 2;
    bezel.position.set(x, 0.818, 0.336);
    group.add(bezel);
  });

  // Digital display (time remaining)
  const displayGeometry = new THREE.BoxGeometry(0.09, 0.035, 0.005);
  const displayMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0x00ff88,
    emissiveIntensity: 0.7,
    roughness: 0.15
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(0.15, 0.8175, 0.336);
  group.add(display);

  // Seven-segment digits (showing "1:45")
  const digitSegments = [
    [0.13, 0.823], [0.14, 0.823], [0.15, 0.823], // 1
    [0.16, 0.823], [0.17, 0.823] // 45
  ];

  digitSegments.forEach(([x, y]) => {
    const segmentGeometry = new THREE.BoxGeometry(0.003, 0.012, 0.001);
    const segmentMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 1.2
    });
    const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
    segment.position.set(x, y, 0.338);
    group.add(segment);
  });

  // Touch buttons (capacitive)
  const buttonLabels = ['Power', 'Start', 'Options', 'Delay'];
  for (let i = 0; i < 4; i++) {
    const buttonGeometry = new THREE.BoxGeometry(0.035, 0.035, 0.002);
    const buttonMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.4,
      metalness: 0.5
    });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(-0.24 + i * 0.065, 0.755, 0.329);
    group.add(button);

    // Button icon (simplified)
    const iconGeometry = new THREE.CircleGeometry(0.008, 12);
    const iconMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      roughness: 0.3
    });
    const icon = new THREE.Mesh(iconGeometry, iconMaterial);
    icon.position.set(-0.24 + i * 0.065, 0.755, 0.331);
    group.add(icon);
  }

  // Recessed pocket handle (integrated into door)
  const pocketHandleGeometry = new THREE.BoxGeometry(0.5, 0.04, 0.015);
  const pocketHandleMaterial = createPlasticMaterial(0x353535); // Lighter
  const pocketHandle = new THREE.Mesh(pocketHandleGeometry, pocketHandleMaterial);
  pocketHandle.position.set(0, 0.845, 0.321);
  group.add(pocketHandle);

  // Handle grip area (rubber/soft-touch)
  const gripGeometry = new THREE.BoxGeometry(0.48, 0.025, 0.01);
  const gripMaterial = createPlasticMaterial(0x2a2a2a);
  const grip = new THREE.Mesh(gripGeometry, gripMaterial);
  grip.position.set(0, 0.845, 0.325);
  group.add(grip);

  // Vent grille (bottom for steam exhaust)
  const grilleGeometry = new THREE.BoxGeometry(0.52, 0.08, 0.02);
  const grilleMaterial = createPlasticMaterial(0x353535); // Lighter
  const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
  grille.position.set(0, 0.05, 0.31);
  group.add(grille);

  // Vent slots (individual slits)
  for (let i = 0; i < 16; i++) {
    const slitGeometry = new THREE.BoxGeometry(0.028, 0.004, 0.015);
    const slitMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, // Lighter slits
      roughness: 0.85
    });
    const slit = new THREE.Mesh(slitGeometry, slitMaterial);
    slit.position.set(-0.245 + i * 0.033, 0.05, 0.315);
    group.add(slit);
  }

  // Brand logo (embossed)
  const logoGeometry = new THREE.BoxGeometry(0.14, 0.025, 0.002);
  const logoMaterial = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    roughness: 0.15,
    metalness: 0.85
  });
  const logo = new THREE.Mesh(logoGeometry, logoMaterial);
  logo.position.set(0, 0.7, 0.33);
  group.add(logo);

  // Energy rating label (EU energy label)
  const energyLabelGeometry = new THREE.BoxGeometry(0.05, 0.08, 0.001);
  const energyLabelMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    roughness: 0.6
  });
  const energyLabel = new THREE.Mesh(energyLabelGeometry, energyLabelMaterial);
  energyLabel.position.set(0.26, 0.65, 0.33);
  group.add(energyLabel);

  // Green A+++ stripe
  const greenBandGeometry = new THREE.BoxGeometry(0.048, 0.018, 0.001);
  const greenBand = new THREE.Mesh(
    greenBandGeometry,
    new THREE.MeshStandardMaterial({ color: 0x00aa00 })
  );
  greenBand.position.set(0.26, 0.68, 0.331);
  group.add(greenBand);

  // Adjustable feet (visible at bottom)
  const footGeometry = new THREE.CylinderGeometry(0.016, 0.02, 0.035, 16);
  const footMaterial = createPlasticMaterial(0x1a1a1a);

  const footPositions = [
    [-0.24, 0.0175, -0.24],
    [0.24, 0.0175, -0.24],
    [-0.24, 0.0175, 0.24],
    [0.24, 0.0175, 0.24]
  ];

  footPositions.forEach(([x, y, z]) => {
    const foot = new THREE.Mesh(footGeometry, footMaterial);
    foot.position.set(x, y, z);
    group.add(foot);
  });

  return group;
}

function createStove(): THREE.Group {
  const group = new THREE.Group();

  // Main cooktop surface (60cm x 10cm x 60cm) - ceramic glass/induction
  const bodyGeometry = new THREE.BoxGeometry(0.6, 0.08, 0.6);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a, // Lighter black glass ceramic - more visible
    roughness: 0.08,
    metalness: 0.92,
    envMapIntensity: 2.2
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.9;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Beveled edge (premium finish)
  const bevelGeometry = new THREE.BoxGeometry(0.595, 0.012, 0.595);
  const bevelMaterial = new THREE.MeshStandardMaterial({
    color: 0x252525, // Lighter bevel
    roughness: 0.1,
    metalness: 0.9
  });
  const bevel = new THREE.Mesh(bevelGeometry, bevelMaterial);
  bevel.position.set(0, 0.946, 0);
  group.add(bevel);

  // Stainless steel trim/edge frame
  const trimGeometry = new THREE.BoxGeometry(0.625, 0.025, 0.625);
  const trimMaterial = createStainlessSteelMaterial();
  const trim = new THREE.Mesh(trimGeometry, trimMaterial);
  trim.position.y = 0.8875;
  group.add(trim);

  // Inner trim details
  const innerTrimGeometry = new THREE.BoxGeometry(0.605, 0.015, 0.605);
  const innerTrim = new THREE.Mesh(innerTrimGeometry, createMetalMaterial(0xb8b8b8));
  innerTrim.position.y = 0.893;
  group.add(innerTrim);

  // Burner/Induction zones (4 zones - different sizes)
  const burnerConfigs = [
    { x: -0.16, z: -0.16, size: 0.095, power: '1800W' }, // Back left
    { x: 0.16, z: -0.16, size: 0.11, power: '2200W' },  // Back right (larger)
    { x: -0.16, z: 0.16, size: 0.085, power: '1400W' }, // Front left (small)
    { x: 0.16, z: 0.16, size: 0.095, power: '1800W' }   // Front right
  ];

  burnerConfigs.forEach(({ x, z, size, power }, index) => {
    // Outer ring (etched on glass)
    const outerRingGeometry = new THREE.RingGeometry(size - 0.002, size, 48);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.3,
      metalness: 0.7,
      side: THREE.DoubleSide
    });
    const outerRing = new THREE.Mesh(outerRingGeometry, ringMaterial);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.set(x, 0.9415, z);
    group.add(outerRing);

    // Middle zone ring
    const middleRingGeometry = new THREE.RingGeometry(size * 0.7 - 0.002, size * 0.7, 48);
    const middleRing = new THREE.Mesh(middleRingGeometry, ringMaterial);
    middleRing.rotation.x = -Math.PI / 2;
    middleRing.position.set(x, 0.9415, z);
    group.add(middleRing);

    // Inner heating zone (glowing when active)
    const innerGeometry = new THREE.CircleGeometry(size * 0.5, 48);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.25,
      metalness: 0.75,
      emissive: index === 1 ? 0xff3300 : 0x000000, // Simulate one burner on
      emissiveIntensity: index === 1 ? 0.4 : 0
    });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    inner.rotation.x = -Math.PI / 2;
    inner.position.set(x, 0.9416, z);
    group.add(inner);

    // Center dot (power indicator)
    const centerDotGeometry = new THREE.CircleGeometry(0.008, 16);
    const centerDotMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.4,
      metalness: 0.6
    });
    const centerDot = new THREE.Mesh(centerDotGeometry, centerDotMaterial);
    centerDot.rotation.x = -Math.PI / 2;
    centerDot.position.set(x, 0.9417, z);
    group.add(centerDot);

    // Power level indicator (subtle text-like marking)
    const powerTextGeometry = new THREE.CircleGeometry(0.015, 16);
    const powerText = new THREE.Mesh(powerTextGeometry, new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.3
    }));
    powerText.rotation.x = -Math.PI / 2;
    powerText.position.set(x, 0.9417, z - size - 0.035);
    group.add(powerText);
  });

  // Touch control panel (front edge - flush design)
  const controlPanelGeometry = new THREE.BoxGeometry(0.54, 0.055, 0.028);
  const controlMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.12,
    metalness: 0.88,
    envMapIntensity: 1.8
  });
  const controlPanel = new THREE.Mesh(controlPanelGeometry, controlMaterial);
  controlPanel.position.set(0, 0.9145, 0.3);
  group.add(controlPanel);

  // Power button (center)
  const powerButtonGeometry = new THREE.CircleGeometry(0.012, 20);
  const powerButtonMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0.6,
    roughness: 0.2
  });
  const powerButton = new THREE.Mesh(powerButtonGeometry, powerButtonMaterial);
  powerButton.rotation.x = -Math.PI / 2;
  powerButton.position.set(0, 0.9425, 0.29);
  group.add(powerButton);

  // Power icon (circle with line - universal power symbol)
  const powerIconRing = new THREE.Mesh(
    new THREE.RingGeometry(0.008, 0.01, 20),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.4,
      roughness: 0.1
    })
  );
  powerIconRing.rotation.x = -Math.PI / 2;
  powerIconRing.position.set(0, 0.9426, 0.29);
  group.add(powerIconRing);

  // Zone controls (+ / - buttons for each burner)
  burnerConfigs.forEach(({ x, z }, index) => {
    // Plus button
    const plusGeometry = new THREE.BoxGeometry(0.015, 0.003, 0.003);
    const buttonMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      emissive: 0x888888,
      emissiveIntensity: 0.2,
      roughness: 0.3
    });
    const plusH = new THREE.Mesh(plusGeometry, buttonMaterial);
    plusH.position.set(x - 0.035, 0.9425, 0.285);
    group.add(plusH);
    const plusV = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.003, 0.015), buttonMaterial);
    plusV.position.set(x - 0.035, 0.9425, 0.285);
    group.add(plusV);

    // Minus button
    const minusGeometry = new THREE.BoxGeometry(0.015, 0.003, 0.003);
    const minus = new THREE.Mesh(minusGeometry, buttonMaterial);
    minus.position.set(x + 0.035, 0.9425, 0.285);
    group.add(minus);

    // Power level display (LED segments showing 0-9)
    const levelDisplayGeometry = new THREE.BoxGeometry(0.025, 0.003, 0.035);
    const levelDisplayMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: index === 1 ? 0xff3300 : 0x330000,
      emissiveIntensity: index === 1 ? 0.8 : 0.1,
      roughness: 0.15
    });
    const levelDisplay = new THREE.Mesh(levelDisplayGeometry, levelDisplayMaterial);
    levelDisplay.position.set(x, 0.9425, 0.27);
    group.add(levelDisplay);

    // Show "6" on the active burner (index 1)
    if (index === 1) {
      const digitSegments = [
        [x - 0.006, 0.9426, 0.275],
        [x, 0.9426, 0.275],
        [x + 0.006, 0.9426, 0.275],
        [x - 0.006, 0.9426, 0.265],
        [x, 0.9426, 0.265]
      ];
      digitSegments.forEach(([sx, sy, sz]) => {
        const segmentGeometry = new THREE.BoxGeometry(0.003, 0.001, 0.006);
        const segmentMaterial = new THREE.MeshStandardMaterial({
          color: 0xff3300,
          emissive: 0xff3300,
          emissiveIntensity: 1.2
        });
        const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
        segment.position.set(sx, sy, sz);
        group.add(segment);
      });
    }
  });

  // Lock button (child safety lock)
  const lockButtonGeometry = new THREE.CircleGeometry(0.01, 16);
  const lockButtonMaterial = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    emissive: 0xff8800,
    emissiveIntensity: 0.3,
    roughness: 0.25
  });
  const lockButton = new THREE.Mesh(lockButtonGeometry, lockButtonMaterial);
  lockButton.rotation.x = -Math.PI / 2;
  lockButton.position.set(-0.24, 0.9425, 0.29);
  group.add(lockButton);

  // Timer button
  const timerButton = new THREE.Mesh(
    new THREE.CircleGeometry(0.01, 16),
    new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      emissive: 0x0088cc,
      emissiveIntensity: 0.3,
      roughness: 0.25
    })
  );
  timerButton.rotation.x = -Math.PI / 2;
  timerButton.position.set(0.24, 0.9425, 0.29);
  group.add(timerButton);

  // Brand name (laser-etched on glass)
  const brandTextGeometry = new THREE.BoxGeometry(0.12, 0.001, 0.018);
  const brandTextMaterial = new THREE.MeshStandardMaterial({
    color: 0x666666,
    roughness: 0.25,
    metalness: 0.75
  });
  const brandText = new THREE.Mesh(brandTextGeometry, brandTextMaterial);
  brandText.position.set(0, 0.9418, -0.28);
  group.add(brandText);

  // Model number / features text
  const modelTextGeometry = new THREE.BoxGeometry(0.08, 0.001, 0.012);
  const modelText = new THREE.Mesh(modelTextGeometry, new THREE.MeshStandardMaterial({
    color: 0x555555,
    roughness: 0.3
  }));
  modelText.position.set(0, 0.9418, -0.265);
  group.add(modelText);

  return group;
}

function createPlaceholder(): THREE.Group {
  const group = new THREE.Group();

  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.5,
    metalness: 0.3
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 0.25;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  return group;
}