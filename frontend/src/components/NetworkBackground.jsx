import React, { useEffect, useRef } from 'react';

/**
 * Animated "spider-net" background that tracks the mouse cursor.
 * - Particles drift slowly and connect with fading lines when close.
 * - Mouse pushes nearby particles outward and draws strong lines to cursor.
 * - A small gold cursor-node follows the mouse.
 */
export default function NetworkBackground({
  density = 0.00016,
  maxDist = 150,
  mouseRadius = 240,
  color = 'rgba(194,152,76,',   // gold rgba prefix
  dotColor = 'rgba(245,239,224,',
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(width * height * density);
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.4 + 0.6,
        });
      }
      particlesRef.current = arr;
    };

    resize();
    window.addEventListener('resize', resize);

    // Listen on window so cursor is tracked even over overlay elements
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseRef.current.tx = x;
        mouseRef.current.ty = y;
        mouseRef.current.active = true;
      } else {
        mouseRef.current.active = false;
      }
    };
    const onLeave = () => { mouseRef.current.active = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    const tick = () => {
      const particles = particlesRef.current;
      const m = mouseRef.current;

      // Smoothly follow target cursor for cursor-node
      if (m.active) {
        m.x += (m.tx - m.x) * 0.18;
        m.y += (m.ty - m.y) * 0.18;
      }

      ctx.clearRect(0, 0, width, height);

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse repulsion (push outward) + slight swirl
        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseRadius * mouseRadius) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / mouseRadius) * 0.9;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        // Damping
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Keep a minimum drift so field stays alive
        if (Math.abs(p.vx) < 0.15 && Math.abs(p.vy) < 0.15) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }
        // Clamp max speed
        p.vx = Math.max(-2.5, Math.min(2.5, p.vx));
        p.vy = Math.max(-2.5, Math.min(2.5, p.vy));
      }

      // Draw particle-particle lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / maxDist) * 0.55;
            ctx.strokeStyle = `${color}${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particle-to-cursor lines (stronger)
      if (m.active) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          const dx = a.x - m.x;
          const dy = a.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseRadius * mouseRadius) {
            const d = Math.sqrt(d2);
            const alpha = Math.max(0, (1 - d / mouseRadius)) * 0.95;
            ctx.strokeStyle = `${color}${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `${dotColor}0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw cursor node (gold glowing dot)
      if (m.active) {
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 36);
        grad.addColorStop(0, `${color}0.55)`);
        grad.addColorStop(1, `${color}0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 36, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${color}1)`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [density, maxDist, mouseRadius, color, dotColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
