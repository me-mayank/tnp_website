"use client";

import { useEffect, useRef } from "react";

type ContrastMarqueeTextProps = {
  text: string;
  heroRef: React.RefObject<HTMLElement>;
  imageSrc: string;
  objectPosition?: string;
  className?: string;
};

const LUMINANCE_THRESHOLD = 180;
const LUMINANCE_BAND = 44;
const SMOOTHING_FACTOR = 0.14;
const LIGHT_TEXT = "#ffffff";
const DARK_TEXT = "#081225";

type Position = {
  x: number;
  y: number;
};

function parseObjectPosition(value: string | undefined): Position {
  const [xRaw = "50%", yRaw = "50%"] = (value ?? "50% 50%").split(/\s+/);
  return {
    x: parsePositionValue(xRaw),
    y: parsePositionValue(yRaw),
  };
}

function parsePositionValue(value: string): number {
  if (value === "left" || value === "top") return 0;
  if (value === "center") return 0.5;
  if (value === "right" || value === "bottom") return 1;
  if (value.endsWith("%")) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed / 100 : 0.5;
  }
  return 0.5;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / Math.max(edge1 - edge0, 0.0001));
  return t * t * (3 - 2 * t);
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((part) => part + part).join("")
    : normalized;

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function mixColor(from: string, to: string, amount: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const t = clamp01(amount);

  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const blue = Math.round(a.b + (b.b - a.b) * t);

  return `rgb(${r}, ${g}, ${blue})`;
}

export default function ContrastMarqueeText({
  text,
  heroRef,
  imageSrc,
  objectPosition = "50% 50%",
  className,
}: ContrastMarqueeTextProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const textNode = textRef.current;
    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!wrapper || !textNode || !canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const objectPos = parseObjectPosition(objectPosition);
    const image = new window.Image();
    image.decoding = "async";
    image.src = imageSrc;

    let frameId = 0;
    let disposed = false;
    let smoothedBlend = 0;

    const syncCanvasSize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (disposed) return;

      const rect = wrapper.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const textRect = textNode.getBoundingClientRect();

      if (!rect.width || !rect.height || !image.naturalWidth || !image.naturalHeight) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      const style = window.getComputedStyle(textNode);
      const font = [
        style.fontStyle,
        style.fontVariant,
        style.fontWeight,
        style.fontSize,
        style.fontFamily,
      ].join(" ");

      ctx.clearRect(0, 0, rect.width, rect.height);

      const scale = Math.max(heroRect.width / image.naturalWidth, heroRect.height / image.naturalHeight);
      const renderedWidth = image.naturalWidth * scale;
      const renderedHeight = image.naturalHeight * scale;
      const offsetX = (heroRect.width - renderedWidth) * objectPos.x;
      const offsetY = (heroRect.height - renderedHeight) * objectPos.y;

      const localLeft = rect.left - heroRect.left;
      const localTop = rect.top - heroRect.top;
      const sx = Math.max(0, (localLeft - offsetX) / scale);
      const sy = Math.max(0, (localTop - offsetY) / scale);
      const sw = Math.min(image.naturalWidth - sx, rect.width / scale);
      const sh = Math.min(image.naturalHeight - sy, rect.height / scale);

      if (sw > 0 && sh > 0) {
        ctx.drawImage(image, sx, sy, sw, sh, 0, 0, rect.width, rect.height);
      }

      ctx.globalCompositeOperation = "difference";
      ctx.fillStyle = "#ffffff";
      ctx.font = font;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";

      const letterSpacing = Number.parseFloat(style.letterSpacing || "0");
      const x = Math.max(0, textRect.left - rect.left);
      const y = rect.height / 2;

      let averageLuminance = 0;
      try {
        const imageData = ctx.getImageData(0, 0, Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
        const pixels = imageData.data;
        let total = 0;
        const sampleCount = pixels.length / 4;

        for (let index = 0; index < pixels.length; index += 4) {
          total += pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;
        }

        averageLuminance = sampleCount > 0 ? total / sampleCount : 0;
      } catch {
        averageLuminance = 0;
      }

      const targetBlend = smoothstep(
        LUMINANCE_THRESHOLD - LUMINANCE_BAND * 0.5,
        LUMINANCE_THRESHOLD + LUMINANCE_BAND * 0.5,
        averageLuminance,
      );
      smoothedBlend += (targetBlend - smoothedBlend) * SMOOTHING_FACTOR;

      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = mixColor(LIGHT_TEXT, DARK_TEXT, smoothedBlend);
      ctx.strokeStyle = `rgba(${Math.round(255 - 247 * smoothedBlend)}, ${Math.round(255 - 237 * smoothedBlend)}, ${Math.round(255 - 218 * smoothedBlend)}, ${0.1 + smoothedBlend * 0.12})`;
      ctx.lineWidth = 0.35 + smoothedBlend * 0.25;
      ctx.lineJoin = "round";

      if (Number.isFinite(letterSpacing) && letterSpacing !== 0) {
        let cursor = x;
        for (const character of text) {
          ctx.strokeText(character, cursor, y);
          ctx.fillText(character, cursor, y);
          cursor += ctx.measureText(character).width + letterSpacing;
        }
      } else {
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
      }

      ctx.globalCompositeOperation = "source-over";
      frameId = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(syncCanvasSize);
    resizeObserver.observe(wrapper);
    resizeObserver.observe(textNode);
    resizeObserver.observe(hero);

    image.addEventListener("load", syncCanvasSize);
    image.addEventListener("load", draw);

    syncCanvasSize();
    frameId = window.requestAnimationFrame(draw);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [heroRef, imageSrc, objectPosition, text]);

  return (
    <span ref={wrapperRef} className="relative inline-grid place-items-center">
      <span ref={textRef} className={className} style={{ opacity: 0 }}>
        {text}
      </span>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
    </span>
  );
}
