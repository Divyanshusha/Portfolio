import { useEffect, useState } from 'react';

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Returns true/false once checked, null while unknown (avoids SSR/hydration mismatch).
export default function useWebGL() {
  const [supported, setSupported] = useState(null);
  useEffect(() => {
    setSupported(detectWebGL());
  }, []);
  return supported;
}
