import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './premium-rose.css';

/*
 * Rosa premium: a cada 4 minutos, uma única rosa cor-de-rosa cai do topo do site
 * até o fim da última seção (percorre o documento inteiro, não só a tela).
 * Discreta, só com a aba visível e nunca bloqueia cliques.
 */

const FIRST_DELAY = 5000;
const INTERVAL = 4 * 60 * 1000;
// Velocidade de queda (px por segundo): a duração se ajusta à altura da página
const FALL_SPEED = 110;
const MIN_DURATION = 14;

export default function PremiumRose() {
  const [drop, setDrop] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const launch = () => {
      // Aba escondida: tenta de novo em instantes, para não "perder" a rosa
      if (document.hidden) {
        timer = setTimeout(launch, 5000);
        return;
      }
      const height = document.documentElement.scrollHeight;
      const side = () => (Math.random() > 0.5 ? 1 : -1);
      setDrop({
        id: Date.now(),
        height,
        duration: Math.max(MIN_DURATION, height / FALL_SPEED),
        left: 12 + Math.random() * 76,
        drift: side() * (40 + Math.random() * 60),
        spin: side() * (120 + Math.random() * 160),
      });
      timer = setTimeout(launch, INTERVAL);
    };
    timer = setTimeout(launch, FIRST_DELAY);
    return () => clearTimeout(timer);
  }, []);

  if (!drop) return null;

  return createPortal(
    <div className="premium-rose-layer" style={{ height: `${drop.height}px` }} aria-hidden="true">
      <div
        key={drop.id}
        className="premium-rose"
        style={{
          left: `${drop.left}%`,
          '--drift': `${drop.drift}px`,
          '--spin': `${drop.spin}deg`,
          animationDuration: `${drop.duration}s`,
        }}
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          setDrop(null);
        }}
      >
        <img src="/images/cenario/rosa-rosa-queda.webp" alt="" width="261" height="878" />
      </div>
    </div>,
    document.body
  );
}
