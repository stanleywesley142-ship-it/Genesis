/**
 * src/components/three/Workshop.tsx — WebGL Workshop.
 */
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
export function Workshop(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(200, 200);
    ref.current.appendChild(renderer.domElement);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({ color: 0x7c5cff })
    );
    scene.add(cube);
    camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    return () => { ref.current?.removeChild(renderer.domElement); };
  }, []);
  return <div ref={ref} className="workshop-canvas" />;
}
