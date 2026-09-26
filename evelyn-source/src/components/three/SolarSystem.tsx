/**
 * src/components/three/SolarSystem.tsx — WebGL Solar System.
 */
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
export function SolarSystem(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    ref.current.appendChild(renderer.domElement);
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2),
      new THREE.MeshBasicMaterial({ color: 0xffcc00 })
    );
    scene.add(sun);
    camera.position.z = 10;
    const animate = () => {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
    return () => { ref.current?.removeChild(renderer.domElement); };
  }, []);
  return <div ref={ref} className="solar-system" />;
}
