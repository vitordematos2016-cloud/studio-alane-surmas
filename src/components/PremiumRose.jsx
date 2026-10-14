import { useEffect, useRef, useState } from 'react';
import './premium-rose.css';

/*
 * Rosa premium: muito de vez em quando, uma rosa vermelha pequena cai pela tela inteira.
 * Discreta (sem brilhos), só uma por vez, só com a aba visível e nunca bloqueia cliques.
 */

// Rara de propósito: um "achado" para quem fica um tempo no site
const FIRST_DELAY = 75000;
const MIN_GAP = 150000;
const MAX_GAP = 270000;

export default function PremiumRose() {
  const [drop, setDrop] = useState(null);
  const scheduleNext = useRef(() => {});

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const schedule = (wait) => {
      timer = setTimeout(() => {
        // Aba escondida: tenta de novo mais tarde, para não "perder" a rosa
        if (document.hidden) return schedule(5000);
        setDrop({
          id: Date.now(),
          left: 12 + Math.random() * 70,
          drift: (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 50),
          spin: (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 80),
        });
        return undefined;
      }, wait);
    };
    schedule(FIRST_DELAY);
    scheduleNext.current = () => schedule(MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP));
    return () => {
      clearTimeout(timer);
      scheduleNext.current = () => {};
    };
  }, []);

  if (!drop) return null;

  return (
    <div className="premium-rose-layer" aria-hidden="true">
      <div
        key={drop.id}
        className="premium-rose"
        style={{ left: `${drop.left}%`, '--drift': `${drop.drift}px`, '--spin': `${drop.spin}deg` }}
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          setDrop(null);
          scheduleNext.current();
        }}
      >
        <img src="/images/cenario/rosa-vermelha-queda.webp" alt="" width="300" height="502" />
      </div>
    </div>
  );
}
