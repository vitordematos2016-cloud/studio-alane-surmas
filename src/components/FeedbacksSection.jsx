import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './feedbacks.css';

// O three.js só é baixado quando a seção se aproxima da tela
const FeedbackGlassRibbon = lazy(() => import('./FeedbackGlassRibbon'));

// Trecho de cada depoimento exibido na tipografia manuscrita (o texto não muda)
const DESTAQUES = ['e da naturalidade!', 'pelas mãos da melhor 👑', 'super indico sempre!'];

// Mensagens de WhatsApp que já estavam publicadas no site
const MENSAGENS_WHATSAPP = [
  {
    avatar: '/images/secao-resultados/instagram/thumb-insta-01.jpg',
    linhas: ['Alane, simplesmente apaixonada! 😍', 'Meus cílios ficaram perfeitos, super naturais e todo mundo está elogiando.', 'Você é incrível! 💕'],
    horario: '10:24',
  },
  {
    avatar: '/images/secao-resultados/instagram/thumb-insta-02.jpg',
    linhas: ['Meu olhar mudou completamente! 😍', 'A naturalidade que eu sempre quis.', 'Obrigada por todo o cuidado e profissionalismo! 💕'],
    horario: '14:37',
  },
];

// Posições das pétalas em unidades da referência (1145 × 785)
const PETALAS = [
  { src: 'petala-individual-4.webp', x: -100, y: 18, w: 104, r: -18, blur: 0, d: 0 },
  { src: 'petala-individual-8.webp', x: 66, y: 74, w: 44, r: 24, blur: 0, d: -3 },
  { src: 'petala-individual-5.webp', x: -48, y: 440, w: 66, r: 8, blur: 0, d: -6 },
  { src: 'petala-individual-3.webp', x: -112, y: 640, w: 150, r: -12, blur: 3, d: -2 },
  { src: 'petala-individual-8.webp', x: 1036, y: 14, w: 44, r: 30, blur: 0, d: -4 },
  { src: 'petala-individual-4.webp', x: 1210, y: 150, w: 50, r: -20, blur: 0, d: -7 },
  { src: 'petala-individual-5.webp', x: 1110, y: 450, w: 120, r: 16, blur: 3.5, d: -1 },
  { src: 'petala-individual-4.webp', x: 1080, y: 715, w: 70, r: -26, blur: 0.5, d: -5 },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-1.111-.067-.281-.09-.646-.227-1.107-.427-1.939-.838-3.21-2.775-3.307-2.905-.098-.13-1.002-1.332-1.002-2.54 0-1.209.635-1.804.861-2.049.227-.246.495-.308.66-.308.165 0 .331.002.476.01.155.007.362-.058.566.432.213.513.727 1.77.79 1.9.064.13.107.283.021.453-.086.17-.129.277-.255.424-.127.147-.267.329-.381.442-.127.126-.26.263-.112.518.148.254.657 1.082 1.408 1.751.966.861 1.78 1.127 2.035 1.254.254.127.404.106.554-.067.151-.173.645-.75 1.018-.75.372 0 .614.086.826.173.213.086 1.348.636 1.579.75.231.114.385.17.442.268.058.098.058.568-.086.973z"
      />
    </svg>
  );
}

function HeartIcon({ outline = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.6s-7.6-4.6-9.4-9.3C1.4 8.1 3.4 4.6 6.9 4.6c2 0 3.7 1.1 5.1 3 1.4-1.9 3.1-3 5.1-3 3.5 0 5.5 3.5 4.3 6.7-1.8 4.7-9.4 9.3-9.4 9.3z"
        fill={outline ? 'none' : 'currentColor'}
        stroke={outline ? 'currentColor' : 'none'}
        strokeWidth={outline ? 1.6 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrnamentLine() {
  return (
    <svg className="fb-ornament" viewBox="0 0 260 18" aria-hidden="true">
      <defs>
        <linearGradient id="fbOrnamentLeft" x1="0" x2="1">
          <stop offset="0" stopColor="#ec5b8b" stopOpacity="0" />
          <stop offset="1" stopColor="#ec5b8b" stopOpacity=".9" />
        </linearGradient>
        <linearGradient id="fbOrnamentRight" x1="1" x2="0">
          <stop offset="0" stopColor="#ec5b8b" stopOpacity="0" />
          <stop offset="1" stopColor="#ec5b8b" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <path d="M2 9.6 C40 9 80 8.6 116 9" stroke="url(#fbOrnamentLeft)" strokeWidth="1.1" fill="none" />
      <path d="M144 9 C180 8.6 220 9 258 9.6" stroke="url(#fbOrnamentRight)" strokeWidth="1.1" fill="none" />
      <path
        d="M130 15.2s-5.6-3.4-6.9-6.8c-.9-2.3.6-4.9 3.1-4.9 1.5 0 2.7.8 3.8 2.2 1.1-1.4 2.3-2.2 3.8-2.2 2.5 0 4 2.6 3.1 4.9-1.3 3.4-6.9 6.8-6.9 6.8z"
        fill="none"
        stroke="#ec5b8b"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteText({ citacao, destaque }) {
  const index = destaque ? citacao.lastIndexOf(destaque) : -1;
  if (index < 0) return <>"{citacao}"</>;
  return (
    <>
      "{citacao.slice(0, index)}
      <span className="fb-quote-script">{destaque}"</span>
      {citacao.slice(index + destaque.length)}
    </>
  );
}

export default function FeedbacksSection({ depoimentos }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const touchStart = useRef(null);
  const total = depoimentos.length;

  const go = useCallback((step) => setActive((prev) => (prev + step + total) % total), [total]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Avança sozinho a cada 5s (só com a seção na tela e sem o mouse/dedo sobre ela).
  // Depende de "active": uma troca manual reinicia a contagem.
  useEffect(() => {
    if (paused || !onScreen || reduceMotion) return undefined;
    const id = setTimeout(() => go(1), 5000);
    return () => clearTimeout(id);
  }, [active, paused, onScreen, reduceMotion, go]);

  // Entrada uma única vez; o 3D carrega antes de a seção aparecer e pausa fora da tela
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNearViewport(true);
      setOnScreen(entry.isIntersecting);
    }, { rootMargin: '400px 0px' });
    const reveal = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        reveal.disconnect();
      }
    }, { threshold: 0.18 });
    near.observe(node);
    reveal.observe(node);
    return () => {
      near.disconnect();
      reveal.disconnect();
    };
  }, []);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (event) => {
    // Arrastar uma pétala não deve trocar o depoimento
    if (event.target.closest?.('img[src*="/petala"]')) return;
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 1 : -1);
  };

  const current = depoimentos[active];

  return (
    <section
      id="feedbacks"
      ref={sectionRef}
      className={`fb-section scroll-mt-28 seam-in${visible ? ' is-visible' : ''}`}
      aria-labelledby="fb-title"
    >
        <div className="seam-spacer" aria-hidden="true" />
      <span id="depoimentos" className="fb-anchor" />

      <div className="fb-backdrop" aria-hidden="true">
        <span className="fb-glow fb-glow-left" />
        <span className="fb-glow fb-glow-right" />
        <span className="fb-sparkles" />
        <img loading="lazy" decoding="async" src="/images/cenario/fita-vidro3-transparente.webp" alt="" className="fb-side-ribbon fb-side-ribbon-left" />
        <img loading="lazy" decoding="async" src="/images/cenario/fita-vidro3-transparente.webp" alt="" className="fb-side-ribbon fb-side-ribbon-right" />
      </div>

      <div className="fb-wrap">
        <div
          className="fb-stage"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Feedbacks de clientes"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={(e) => {
            setPaused(true);
            onTouchStart(e);
          }}
          onTouchEnd={(e) => {
            onTouchEnd(e);
            setTimeout(() => setPaused(false), 4000);
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {PETALAS.map((p, i) => (
            <img loading="lazy" decoding="async"
              key={i}
              src={`/images/cenario/${p.src}`}
              alt=""
              aria-hidden="true"
              className={`fb-petal fb-petal-${i + 1}`}
              style={{
                '--x': p.x,
                '--y': p.y,
                '--w': p.w,
                '--r': `${p.r}deg`,
                '--blur': `${p.blur}px`,
                '--delay': `${p.d}s`,
              }}
            />
          ))}

          <header className="fb-heading fb-reveal fb-reveal-1">
            <span className="fb-kicker">
              FEEDBACKS REAIS <HeartIcon />
            </span>
            <h2 id="fb-title">
              <span>Histórias reais que</span>
              <strong>iluminam o meu trabalho.</strong>
            </h2>
            <OrnamentLine />
            <p>
              Cada feedback representa mais que um resultado, é a confiança
              <br className="fb-desktop-break" /> de quem escolheu realçar a sua <b>beleza</b> com <b>cuidado</b> e
              profissionalismo.
            </p>
          </header>

          <div className="fb-portrait fb-reveal fb-reveal-3">
            {nearViewport && (
              <Suspense fallback={null}>
                <FeedbackGlassRibbon side="back" animate={!reduceMotion} active={onScreen} />
              </Suspense>
            )}
            <div className="fb-portrait-glass">
              <div className="fb-portrait-photo">
                <img loading="lazy" decoding="async"
                  src="/images/feedbacks/alane-feedbacks-coracao.webp"
                  alt="Alane Surmas sorrindo segurando um balão de coração escrito Feedbacks"
                  width="1000"
                  height="1487"
                />
              </div>
            </div>
            {nearViewport && (
              <Suspense fallback={null}>
                <FeedbackGlassRibbon side="front" animate={!reduceMotion} active={onScreen} />
              </Suspense>
            )}
          </div>

          <article className="fb-main-card fb-reveal fb-reveal-4" aria-live="polite">
            <span className="fb-quote-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10.2 6.2C6.5 7.4 4.3 10 4.3 13.7c0 2.4 1.4 4 3.4 4 1.7 0 3-1.2 3-2.9 0-1.6-1.1-2.7-2.6-2.8.3-1.6 1.5-2.9 3.3-3.6l-1.2-2.2zm8.6 0c-3.7 1.2-5.9 3.8-5.9 7.5 0 2.4 1.4 4 3.4 4 1.7 0 3-1.2 3-2.9 0-1.6-1.1-2.7-2.6-2.8.3-1.6 1.5-2.9 3.3-3.6l-1.2-2.2z"
                />
              </svg>
            </span>
            <svg className="fb-card-sparkle" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 1.5c.6 5.3 4.7 9.9 10.5 10.5-5.8.6-9.9 5.2-10.5 10.5C11.4 17.2 7.3 12.6 1.5 12 7.3 11.4 11.4 6.8 12 1.5z" />
            </svg>

            <div key={active} className="fb-main-content">
              <span className="fb-card-kicker">
                FEEDBACKS REAIS <HeartIcon />
              </span>
              <blockquote className="fb-quote">
                <QuoteText citacao={current.citacao} destaque={DESTAQUES[active]} />
              </blockquote>
              <p className="fb-detail">{current.detalhe}</p>
              <footer className="fb-author">
                <span className="fb-author-avatar" aria-hidden="true">AS</span>
                <span>
                  <strong>{current.autora.toUpperCase()}</strong>
                  <small>{current.cargo}</small>
                </span>
              </footer>
            </div>
          </article>

          {MENSAGENS_WHATSAPP.map((msg, i) => (
            <div key={msg.horario} className={`fb-wa-card fb-wa-card-${i + 1} fb-reveal fb-reveal-5`}>
              <div className="fb-wa-header">
                <img src={msg.avatar} alt="" className="fb-wa-avatar" loading="lazy" />
                <span className="fb-wa-name">
                  <strong>Cliente do Studio</strong>
                  <small>online</small>
                </span>
                <span className="fb-wa-icon"><WhatsAppIcon /></span>
              </div>
              <p className="fb-wa-message">
                {msg.linhas.map((linha) => (
                  <span key={linha}>{linha} </span>
                ))}
              </p>
              <time className="fb-wa-time">{msg.horario}</time>
              <span className="fb-wa-heart" aria-hidden="true"><HeartIcon /></span>
            </div>
          ))}

          <button type="button" className="fb-arrow fb-arrow-prev fb-reveal fb-reveal-6" onClick={() => go(-1)} aria-label="Depoimento anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="fb-arrow fb-arrow-next fb-reveal fb-reveal-6" onClick={() => go(1)} aria-label="Próximo depoimento">
            <ChevronRight aria-hidden="true" />
          </button>

          <div className="fb-dots fb-reveal fb-reveal-6">
            {depoimentos.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === active ? 'is-active' : ''}
                onClick={() => setActive(i)}
                aria-label={`Depoimento ${i + 1} de ${total}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="seam-spacer" aria-hidden="true" />
    </section>
  );
}
