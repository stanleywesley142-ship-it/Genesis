/**
 * src/components/three/ArcReactor.tsx — WebGL Arc Reactor.
 */
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
export function ArcReactor(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(200, 200);
    ref.current.appendChild(renderer.domElement);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true })
    );
    scene.add(core);
    camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      core.rotation.x += 0.02;
      core.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    animate();
    return () => { ref.current?.removeChild(renderer.domElement); };
  }, []);
  return <div ref={ref} className="arc-reactor" />;
}
