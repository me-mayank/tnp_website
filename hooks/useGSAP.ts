"use client";

import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";

export function useGSAP(
  callback: () => void,
  dependencies: DependencyList = [],
  scope: RefObject<Element> | null = null,
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback, scope?.current ?? undefined);
    return () => ctx.revert();
  }, dependencies);
}
