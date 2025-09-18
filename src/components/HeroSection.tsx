// HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    locations: number[];
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: []
  });

  // Initialize Three.js
  useEffect(() => {
    const initThree = (): void => {
      const { current: refs } = threeRefs;
      
      if (!canvasRef.current) return;

      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing
      try {
        refs.composer = new EffectComposer(refs.renderer);
        const renderPass = new RenderPass(refs.scene, refs.camera);
        refs.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.8,
          0.4,
          0.85
        );
        refs.composer.addPass(bloomPass);
      } catch (error) {
        console.warn('Post-processing failed, using basic renderer:', error);
        refs.composer = null;
      }

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      // Start animation
      animate();
      
      setIsReady(true);
    };

    // [Keep all your Three.js creation functions exactly the same as before - createStarField, createNebula, etc.]
    const createStarField = (): void => {
      const { current: refs } = threeRefs;
      const starCount: number = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius: number = 200 + Math.random() * 800;
          const theta: number = Math.random() * Math.PI * 2;
          const phi: number = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice: number = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene!.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = (): void => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x2563eb) },
          color2: { value: new THREE.Color(0x7c3aed) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = (): void => {
      const { current: refs } = threeRefs;
      
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points: THREE.Vector2[] = [];
        const segments: number = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x: number = (i / segments - 0.5) * 1000;
          const y: number = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = (): void => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene!.add(atmosphere);
    };

    const getLocation = (): void => {
      const { current: refs } = threeRefs;
      const locations: number[] = [];
      refs.mountains.forEach((mountain, i) => {
        locations[i] = mountain.position.z;
      });
      refs.locations = locations;
    };

    const animate = (): void => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      
      const time: number = Date.now() * 0.001;

      refs.stars.forEach((starField) => {
        if ((starField.material as THREE.ShaderMaterial).uniforms) {
          (starField.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      if (refs.nebula && (refs.nebula.material as THREE.ShaderMaterial).uniforms) {
        (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5;
      }

      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor: number = 0.05;
        
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor;
        
        const floatX: number = Math.sin(time * 0.1) * 2;
        const floatY: number = Math.cos(time * 0.15) * 1;
        
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor: number = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
      });

      if (refs.composer) {
        refs.composer.render();
      } else if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
    };

    initThree();

    const handleResize = (): void => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        if (refs.composer) {
          refs.composer.setSize(window.innerWidth, window.innerHeight);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return (): void => {
      const { current: refs } = threeRefs;
      
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        (starField.material as THREE.Material).dispose();
      });

      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        (mountain.material as THREE.Material).dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isReady) return;
    
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current, ctaRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    if (titleRef.current) {
      const titleChars = titleRef.current.querySelectorAll('.title-char');
      tl.from(titleChars, {
        y: 200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out"
      }, "-=0.5");
    }

    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(subtitleLines, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8");
    }

    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.6");
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }

    return (): void => {
      tl.kill();
    };
  }, [isReady]);

  // Modified scroll handling - only for hero section
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY: number = window.scrollY;
      const heroHeight: number = window.innerHeight * 3; // Hero section height
      const progress: number = Math.min(scrollY / heroHeight, 1);
      
      setScrollProgress(progress);
      
      // Hide hero when scrolled past
      if (containerRef.current) {
        containerRef.current.style.opacity = progress >= 1 ? '0' : '1';
        containerRef.current.style.pointerEvents = progress >= 1 ? 'none' : 'auto';
      }
      
      // Only update camera if within hero bounds
      if (progress < 1) {
        const sectionIndex = Math.floor(progress * 3);
        const newSection = Math.min(sectionIndex, 2);
        setCurrentSection(newSection);

        const { current: refs } = threeRefs;
        
        const sectionProgress = (progress * 3) % 1;
        
        const cameraPositions = [
          { x: 0, y: 30, z: 300 },
          { x: 0, y: 40, z: -50 },
          { x: 0, y: 50, z: -700 }
        ];
        
        const currentPos = cameraPositions[newSection];
        const nextPos = cameraPositions[Math.min(newSection + 1, 2)];
        
        refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
        refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
        refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

        // Mountain parallax
        refs.mountains.forEach((mountain, i) => {
          const speed: number = 1 + i * 0.9;
          const targetZ: number = mountain.userData.baseZ + scrollY * speed * 0.5;
          
          if (progress > 0.7) {
            mountain.position.z = 600000;
          } else {
            mountain.position.z = refs.locations[i];
          }
        });

        if (refs.nebula) {
          refs.nebula.position.z = refs.mountains[3] ? refs.mountains[3].position.z : -1050;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  const splitTitle = (text: string): React.ReactNode[] => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char">
        {char}
      </span>
    ));
  };

  const scrollToGenerator = (): void => {
    const heroHeight = window.innerHeight * 3;
    window.scrollTo({ 
      top: heroHeight, 
      behavior: 'smooth' 
    });
  };

  // Content based on current section
  const sectionContent = [
    {
      title: 'README',
      subtitle: {
        line1: 'Professional documentation that stands out,',
        line2: 'crafted with precision and style'
      }
    },
    {
      title: 'GENERATOR',
      subtitle: {
        line1: 'Create stunning READMEs in minutes,',
        line2: 'with advanced templates and formatting'
      }
    },
    {
      title: 'ReadMeGen',
      subtitle: {
    line1: 'Explore limitless README templates,',
    line2: 'crafted for developers across the galaxy'
      }
    }
  ];

  const content = sectionContent[currentSection];

  return (
    <div ref={containerRef} className="hero-section-container">
      {/* Fixed canvas background */}
      <canvas ref={canvasRef} className="hero-canvas-fixed" />
      
      {/* Side menu */}
      <div ref={menuRef} className="side-menu-fixed" style={{ visibility: 'hidden' }}>
        <div className="menu-icon">
        
        </div>
 
      </div>

      {/* Content sections */}
      <div className="hero-sections-container">
        {/* Section 1 - README */}
        <div className="hero-section">
          <div className="hero-content-centered">
            <h1 ref={titleRef} className="hero-title-main" style={{ visibility: 'hidden' }}>
              {splitTitle('README')}
            </h1>
            
            <div ref={subtitleRef} className="hero-subtitle-main" style={{ visibility: 'hidden' }}>
              <p className="subtitle-line">
                Professional documentation that stands out,
              </p>
              <p className="subtitle-line">
                crafted with precision and style
              </p>
            </div>

            <div ref={ctaRef} className="hero-cta-main" style={{ visibility: 'hidden' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  onClick={scrollToGenerator}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl border-0 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Create README
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                  className="border-2 border-gray-400 text-black hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  <a href="https://github.com/AmanMishra107" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View GitHub
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Section 2 - GENERATOR */}
        <div className="hero-section">
          <div className="hero-content-centered">
            <h1 className="hero-title-main">
              {splitTitle('GENERATOR')}
            </h1>
            
            <div className="hero-subtitle-main">
              <p className="subtitle-line">
                Create stunning READMEs in minutes,
              </p>
              <p className="subtitle-line">
                with advanced templates and formatting
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 -  */}
        <div className="hero-section">
          <div className="hero-content-centered">
            <h1 className="hero-title-main">
              {splitTitle('ReadMeGen')}
            </h1>
            
            <div className="hero-subtitle-main">
              <p className="subtitle-line">
                Beyond ordinary documentation,
              </p>
              <p className="subtitle-line">
                lies infinite creative possibilities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div ref={scrollProgressRef} className="scroll-progress-fixed" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter">
          {String(currentSection + 1).padStart(2, '0')} / 03
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
