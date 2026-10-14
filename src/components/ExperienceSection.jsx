import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Check, Clock, Crown, Feather, Heart, Sparkles, Star } from 'lucide-react';
import './experience.css';


const DIFERENCIAIS = [
  { Icon: Feather, titulo: 'PESO ZERO REAL', texto: 'Preservação total da saúde e crescimento dos fios naturais.' },
  { Icon: Clock, titulo: 'ALTA RETENÇÃO', texto: 'Durabilidade de 20 a 30 dias com técnicas de isolamento de ponta.' },
  { Icon: Heart, titulo: 'VISAGISMO ÚNICO', texto: 'Estudo anatômico exclusivo para valorizar o formato dos seus olhos.' },
];

// Pétalas nas extremidades da seção, fora do conteúdo (posições em % da seção)
const PETALAS = [
  { src: 'petala-individual-4.png', left: '2%', top: '7%', w: 78, r: -16, blur: 0, d: 0 },
  { src: 'petala-individual-8.png', left: '1.5%', top: '42%', w: 46, r: 22, blur: 0, d: -3 },
  { src: 'petala-individual-5.png', left: '5%', top: '86%', w: 70, r: 8, blur: 1, d: -6 },
  { src: 'petala-individual-3.png', right: '2.5%', top: '4%', w: 58, r: 28, blur: 0, d: -2 },
  { src: 'petala-individual-4.png', right: '1.5%', top: '36%', w: 50, r: -24, blur: 0, d: -5 },
  { src: 'petala-individual-5.png', right: '3%', top: '84%', w: 104, r: 14, blur: 2.5, d: -1 },
];

function OrnamentHeart() {
  return (
    <svg className="xp-title-heart" viewBox="0 0 64 40" aria-hidden="true">
      <path
        d="M2 30c8 1 15 .5 21-1.5M23 28.5c-5-3.6-9-8-9.6-12.6-.6-4.6 2.4-8 6.4-8 3.1 0 5.4 2 6.8 4.9 1.4-2.9 3.8-4.9 6.8-4.9 4 0 7 3.4 6.4 8C39 20.5 33.2 25 26.6 29.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrnamentLine() {
  return (
    <svg className="xp-ornament" viewBox="0 0 488 16" aria-hidden="true">
      <defs>
        {/* userSpaceOnUse: em linha horizontal a caixa tem altura zero e o gradiente padrão some */}
        <linearGradient id="xpLineLeft" gradientUnits="userSpaceOnUse" x1="0" y1="8" x2="230" y2="8">
          <stop offset="0" stopColor="#e94383" stopOpacity=".15" />
          <stop offset="1" stopColor="#e94383" stopOpacity=".75" />
        </linearGradient>
        <linearGradient id="xpLineRight" gradientUnits="userSpaceOnUse" x1="488" y1="8" x2="258" y2="8">
          <stop offset="0" stopColor="#e94383" stopOpacity=".15" />
          <stop offset="1" stopColor="#e94383" stopOpacity=".75" />
        </linearGradient>
      </defs>
      <line x1="0" y1="8" x2="230" y2="8" stroke="url(#xpLineLeft)" strokeWidth="1" />
      <line x1="258" y1="8" x2="488" y2="8" stroke="url(#xpLineRight)" strokeWidth="1" />
      {/* Luzes que correm das pontas até o coração */}
      <line className="xp-ornament-light" x1="0" y1="8" x2="230" y2="8" pathLength="100" />
      <line className="xp-ornament-light" x1="488" y1="8" x2="258" y2="8" pathLength="100" />
      <path
        className="xp-ornament-heart"
        d="M244 13.4s-5.2-3.1-6.3-6.2c-.8-2.1.6-4.4 2.8-4.4 1.4 0 2.6.8 3.5 2 .9-1.2 2.1-2 3.5-2 2.2 0 3.6 2.3 2.8 4.4-1.1 3.1-6.3 6.2-6.3 6.2z"
        fill="none"
        stroke="#e94383"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ExperienceSection({ onSchedule }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Entrada uma única vez
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const reveal = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        reveal.disconnect();
      }
    }, { threshold: 0.18 });
    reveal.observe(node);
    return () => reveal.disconnect();
  }, []);

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className={`xp-section scroll-mt-28 seam-in${visible ? ' is-visible' : ''}`}
      aria-labelledby="xp-title"
    >
        <div className="seam-spacer" aria-hidden="true" />
      <div className="xp-backdrop" aria-hidden="true">
        <span className="xp-sparkles" />
        <img src="/images/cenario/fita-vidro3-transparente.png" alt="" className="xp-side-ribbon xp-side-ribbon-left" />
        <img src="/images/cenario/fita-vidro3-transparente.png" alt="" className="xp-side-ribbon xp-side-ribbon-right" />
        {PETALAS.map((p, i) => (
          <img
            key={i}
            src={`/images/cenario/${p.src}`}
            alt=""
            className="xp-petal"
            style={{
              left: p.left,
              right: p.right,
              top: p.top,
              '--w': p.w,
              '--r': `${p.r}deg`,
              '--blur': `${p.blur}px`,
              '--delay': `${p.d}s`,
            }}
          />
        ))}
      </div>

      <div className="xp-wrap">
        <div className="xp-panel">
          <svg className="xp-panel-sparkle" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 1.5c.6 5.3 4.7 9.9 10.5 10.5-5.8.6-9.9 5.2-10.5 10.5C11.4 17.2 7.3 12.6 1.5 12 7.3 11.4 11.4 6.8 12 1.5z" />
          </svg>

          <div className="xp-copy">
            <span className="xp-kicker xp-reveal xp-reveal-1">
              <Sparkles aria-hidden="true" />
              EXPERIÊNCIA EXCLUSIVA • STUDIO ALANE SURMAS
            </span>

            <h2 id="xp-title" className="xp-title xp-reveal xp-reveal-1">
              <span className="xp-title-serif">
                A sua beleza não precisa
                <br className="xp-desktop-break" /> de esforço.
                <br /> Você merece acordar com{' '}um
              </span>
              <span className="xp-title-script">
                olhar extraordinário.
                <OrnamentHeart />
              </span>
            </h2>

            <OrnamentLine />

            <p className="xp-description xp-reveal xp-reveal-2">
              Acorde pronta todos os dias com a elegância e a leveza que você merece.
              <br className="xp-desktop-break" /> No Studio Alane Surmas, cada aplicação é desenhada sob medida com visagismo
              anatômico para harmonizar com o seu rosto, trazendo praticidade real para a sua rotina e elevando a sua
              confiança.
            </p>

            <div className="xp-cards">
              {DIFERENCIAIS.map(({ Icon, titulo, texto }, i) => (
                <article key={titulo} className={`xp-card xp-card-${i + 1} xp-reveal xp-reveal-${3 + i}`}>
                  <span className="xp-card-icon" aria-hidden="true"><Icon /></span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </article>
              ))}
            </div>

            <div className="xp-actions xp-reveal xp-reveal-6">
              <button
                type="button"
                className="xp-cta"
                onClick={() => onSchedule('Olá Alane! Gostaria de agendar meu horário exclusivo no Studio')}
              >
                <Calendar className="xp-cta-calendar" aria-hidden="true" />
                <span className="xp-cta-text">
                  AGENDAR MEU HORÁRIO
                  <br />
                  EXCLUSIVO
                </span>
                <span className="xp-cta-arrow" aria-hidden="true"><ArrowRight /></span>
              </button>

              <p className="xp-rating">
                <span className="xp-stars" aria-label="5 estrelas">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden="true" />)}
                </span>
                5.0 • Atendimento com Hora Marcada
              </p>
            </div>
          </div>

          <div className="xp-visual xp-reveal xp-reveal-3">
            <span className="xp-visual-glow" aria-hidden="true" />
            <div className="xp-frame">
              <div className="xp-photo">
                <img
                  src="/images/cenario/lash-macro-procedure.jpg"
                  alt="Extensão de cílios com olho fechado, cílios volumosos e curvatura natural"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
            </div>

            <span className="xp-badge-result">
              <Sparkles aria-hidden="true" /> RESULTADO REAL • STUDIO ALANE
            </span>
            <span className="xp-badge-excellence">
              <Crown aria-hidden="true" /> EXCELÊNCIA
            </span>
            <p className="xp-photo-quote">
              “Beleza natural para iluminar
              <br />
              a sua expressão.”
            </p>
            <div className="xp-badge-isolation">
              <span className="xp-check" aria-hidden="true"><Check /></span>
              <span>
                <strong>ISOLAMENTO PERFEITO</strong>
                <small>Sem dor, sem ardência</small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="seam-spacer" aria-hidden="true" />
    </section>
  );
}
