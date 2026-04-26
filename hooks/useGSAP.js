"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * A custom hook to handle GSAP animations with proper cleanup.
 * @param {Function} callback - The animation logic.
 * @param {Array} dependencies - Dependency array for useLayoutEffect.
 * @param {React.RefObject} scope - The scope for selector scoping.
 */
export function useGSAP(callback, dependencies = [], scope = null) {
  useLayoutEffect(() => {
    let ctx = gsap.context(callback, scope);
    return () => ctx.revert();
  }, dependencies);
}
