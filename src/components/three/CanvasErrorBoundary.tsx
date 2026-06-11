"use client";

import React from "react";

/**
 * Catches render-phase errors from the 3D canvas (e.g. WebGL unavailable, a
 * failed asset, or a driver issue) so a hardware/asset problem degrades to a
 * nice gradient fallback instead of crashing the whole page.
 */
export default class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.warn("3D hero failed to render, showing fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="absolute inset-0 bg-luxury-gradient">
            <div className="pointer-events-none absolute inset-0 bg-spice-radial" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-saffron/30 blur-[100px]" />
          </div>
        )
      );
    }
    return this.props.children;
  }
}
