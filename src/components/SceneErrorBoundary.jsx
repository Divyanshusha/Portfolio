import { Component } from 'react';

// Isolates Three.js/WebGL failures so a crash in a 3D scene can never take
// down the rest of the portfolio — it just falls back to `fallback`.
export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('3D scene failed, falling back to static visual:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
