import React, { useEffect, useRef } from 'react';

// Pinça do hero interativa: inclina em 3D seguindo o cursor e pode ser
// arrastada (puxada) — ao soltar, volta ao lugar com efeito de mola.
export default function HeroTweezer() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = wrap?.parentElement;
    if (!wrap || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const MAX_TILT = 14;
    const MAX_DRAG = 90;
    const target = { rx: 0, ry: 0, x: 0, y: 0 };
    const current = { rx: 0, ry: 0, x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let dragging = false;
    let dragStart = { x: 0, y: 0 };
    let raf = 0;

    const tiltFromPointer = (e) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target.ry = Math.max(-1, Math.min(1, px * 2)) * MAX_TILT;
      target.rx = -Math.max(-1, Math.min(1, py * 2)) * MAX_TILT;
    };

    const onStageMove = (e) => {
      if (e.pointerType === 'touch' && !dragging) return;
      tiltFromPointer(e);
      if (dragging) {
        // Resistência elástica: quanto mais longe, mais difícil puxar
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        target.x = MAX_DRAG * Math.tanh(dx / (MAX_DRAG * 2));
        target.y = MAX_DRAG * Math.tanh(dy / (MAX_DRAG * 2));
      }
    };

    const onStageLeave = () => {
      if (dragging) return;
      target.rx = 0;
      target.ry = 0;
    };

    const onDown = (e) => {
      dragging = true;
      dragStart = { x: e.clientX, y: e.clientY };
      wrap.setPointerCapture(e.pointerId);
      wrap.classList.add('is-dragging');
    };

    const onUp = (e) => {
      if (!dragging) return;
      dragging = false;
      target.x = 0;
      target.y = 0;
      if (e.pointerType === 'touch') {
        target.rx = 0;
        target.ry = 0;
      }
      wrap.classList.remove('is-dragging');
    };

    const tick = () => {
      // Rotação: suavização simples
      current.rx += (target.rx - current.rx) * 0.1;
      current.ry += (target.ry - current.ry) * 0.1;
      // Posição: mola amortecida (dá o "balanço" ao soltar)
      velocity.x = (velocity.x + (target.x - current.x) * 0.12) * 0.78;
      velocity.y = (velocity.y + (target.y - current.y) * 0.12) * 0.78;
      current.x += velocity.x;
      current.y += velocity.y;

      wrap.style.setProperty('--tw-rx', `${current.rx.toFixed(2)}deg`);
      wrap.style.setProperty('--tw-ry', `${current.ry.toFixed(2)}deg`);
      wrap.style.setProperty('--tw-x', `${current.x.toFixed(2)}px`);
      wrap.style.setProperty('--tw-y', `${current.y.toFixed(2)}px`);
      wrap.style.setProperty('--tw-rz', `${(current.x * 0.08).toFixed(2)}deg`);
      wrap.style.setProperty('--tw-sx', `${(-current.ry * 1.2).toFixed(2)}px`);
      wrap.style.setProperty('--tw-sy', `${(22 + current.rx * 1.2 + Math.max(0, -current.y) * 0.2).toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    stage.addEventListener('pointermove', onStageMove);
    stage.addEventListener('pointerleave', onStageLeave);
    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('pointerup', onUp);
    wrap.addEventListener('pointercancel', onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointermove', onStageMove);
      stage.removeEventListener('pointerleave', onStageLeave);
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('pointerup', onUp);
      wrap.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-tweezer">
      <img
        src="/images/hero/pinca-alane.webp"
        alt="Pinça rosé gravada Alane Surmas segurando um leque de cílios"
        className="hero-stage-art"
        width="1200"
        height="762"
        draggable="false"
      />
    </div>
  );
}
