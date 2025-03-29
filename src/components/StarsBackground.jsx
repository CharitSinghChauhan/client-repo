import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

// Memory-efficient stars background with reduced particle count
function StarsBackground({ color }) {
  const starsRef = useRef();
  const smallStarsRef = useRef();
  const { size, gl } = useThree();
  const [isVisible, setIsVisible] = useState(true);
  
  // Monitor visibility to reduce load when off-screen
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Adjust render based on device performance
  useEffect(() => {
    // Skip stars animation if device has low memory
    const isLowMemoryDevice = navigator.deviceMemory && navigator.deviceMemory < 4;
    if (isLowMemoryDevice && smallStarsRef.current) {
      smallStarsRef.current.visible = false;
    }
  }, []);
  
  // Optimize animation frame rate
  useFrame(({ clock }) => {
    if (!isVisible) return; // Skip animation when tab not visible
    
    const time = clock.getElapsedTime();
    
    // Main stars rotation - very slow and subtle
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.02; // Further reduced speed
    }
    
    // Small background stars rotation
    if (smallStarsRef.current) {
      smallStarsRef.current.rotation.y = -time * 0.01; // Further reduced speed
    }
  });

  return (
    <group>
      {/* Main layer of stars - significantly reduced count */}
      <group ref={starsRef}>
        <Stars radius={100} depth={50} count={750} factor={4} saturation={0.5} fade speed={0.5} />
      </group>
      
      {/* Small background stars - significantly reduced count */}
      <group ref={smallStarsRef}>
        <Stars radius={150} depth={50} count={500} factor={4} saturation={0.2} fade speed={0.3} />
      </group>
    </group>
  );
}

export default StarsBackground; 