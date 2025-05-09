
"use client";

import React, { useEffect, useRef } from 'react';
import type p5 from 'p5';

interface Wave {
  color: [number, number, number, number]; // R, G, B, Alpha
  amplitude: number;
  frequency: number;
  phase: number;
  phaseSpeed: number;
  strokeWeight: number;
}

const SoundwaveCanvas: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    let p5Sketch: p5;
    // Ensure p5 is only loaded on the client side
    import('p5').then(p5Module => {
      const P5 = p5Module.default;

      const sketch = (p: p5) => {
        let waves: Wave[] = [];
        const numWaves = 5;

        p.setup = () => {
          if (sketchRef.current) {
            const parentSize = sketchRef.current.getBoundingClientRect();
            p.createCanvas(parentSize.width, parentSize.height).parent(sketchRef.current!);
            p.frameRate(30);

            // Define wave colors (Orange, Red, Blue themes with variations)
            const baseColors: [number, number, number][] = [
              [255, 100, 0], // Orange variant
              [255, 165, 0], // Orange
              [255, 0, 0],   // Red
              [0, 0, 255],   // Blue
              [70, 0, 200],  // Blue/Purple variant
            ];

            for (let i = 0; i < numWaves; i++) {
              const baseColor = baseColors[i % baseColors.length];
              waves.push({
                color: [baseColor[0], baseColor[1], baseColor[2], p.random(100, 200)], // RGBA with random alpha
                amplitude: p.random(parentSize.height / 8, parentSize.height / 4),
                frequency: p.random(0.005, 0.02),
                phase: p.random(p.TWO_PI),
                phaseSpeed: p.random(0.01, 0.03) * (Math.random() > 0.5 ? 1 : -1),
                strokeWeight: p.random(1.5, 4),
              });
            }
          }
        };

        p.draw = () => {
          if (!sketchRef.current) return;
          p.clear(); // Clears the canvas, making it transparent
          
          waves.forEach(wave => {
            p.noFill();
            p.stroke(wave.color[0], wave.color[1], wave.color[2], wave.color[3]);
            p.strokeWeight(wave.strokeWeight);
            p.beginShape();
            for (let x = 0; x <= p.width; x += 5) {
              const yOffset = p.sin(x * wave.frequency + wave.phase) * wave.amplitude;
              p.vertex(x, p.height / 2 + yOffset);
            }
            p.endShape();
            wave.phase += wave.phaseSpeed;
          });
        };

        p.windowResized = () => {
          if (sketchRef.current) {
            const parentSize = sketchRef.current.getBoundingClientRect();
            p.resizeCanvas(parentSize.width, parentSize.height);
            // Re-initialize wave amplitudes based on new height
            waves.forEach(wave => {
                 wave.amplitude = p.random(parentSize.height / 8, parentSize.height / 4);
            });
          }
        };
        
        p5InstanceRef.current = p;
      };

      p5Sketch = new P5(sketch);
    });

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={sketchRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default SoundwaveCanvas;
