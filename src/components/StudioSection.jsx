import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Calendar, CalendarDays, Clock, Crown, ExternalLink, Gem, Heart, Info, MapPin, Navigation, Sparkles,
} from 'lucide-react';
import './studio.css';

// Maquete 3D da cidade: o three.js só é baixado quando a seção é carregada
const RegionCity3D = lazy(() => import('./RegionCity3D'));

const ENDERECO = 'Rua José Sampaio, 32 - 2º Andar, Sala 203 - Loteamento Bertuol, Guaraniaçu - PR, CEP 85400-000';

const PETALAS = [
  { src: 'petala-individual-4.png', left: '9%', top: '5%', w: 74, r: -14, blur: 0, d: 0 },
  { src: 'petala-individual-8.png', left: '5.5%', top: '33%', w: 40, r: 26, blur: 0, d: -3 },
  { src: 'petala-individual-5.png', left: '2%', top: '62%', w: 66, r: 10, blur: 1.5, d: -6 },
  { src: 'petala-individual-3.png', left: '3%', top: '86%', w: 84, r: -18, blur: 2, d: -2 },
  { src: 'petala-individual-8.png', right: '9%', top: '3%', w: 44, r: 30, blur: 0, d: -4 },
  { src: 'petala-individual-4.png', right: '8%', top: '12%', w: 62, r: -22, blur: 0, d: -7 },
  { src: 'petala-individual-5.png', right: '6%', top: '70%', w: 58, r: 16, blur: 0.5, d: -1 },
  { src: 'petala-individual-3.png', right: '4%', top: '91%', w: 60, r: -10, blur: 1, d: -5 },
];

// Marcador de localização em "vidro" rosa com coração, em SVG (nítido em qualquer tamanho)
function GlassPin({ className, idPrefix }) {
  const id = (name) => `${idPrefix}-${name}`;
  return (
    <svg className={className} viewBox="0 0 120 150" aria-hidden="true">
      <defs>
        <radialGradient id={id('body')} cx="38%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffd3e2" />
          <stop offset=".45" stopColor="#f2629a" />
          <stop offset="1" stopColor="#c4195a" />
        </radialGradient>
        <linearGradient id={id('rim')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".5" stopColor="#ffc2d6" stopOpacity=".4" />
          <stop offset="1" stopColor="#fff" stopOpacity=".8" />
        </linearGradient>
        <radialGradient id={id('shadow')} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#c4195a" stopOpacity=".35" />
          <stop offset="1" stopColor="#c4195a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="140" rx="30" ry="7" fill={`url(#${id('shadow')})`} />
      <path
        d="M60 6C34 6 14 26 14 51c0 30 33 62 42 79a4.6 4.6 0 0 0 8 0c9-17 42-49 42-79C106 26 86 6 60 6z"
        fill={`url(#${id('body')})`}
        stroke={`url(#${id('rim')})`}
        strokeWidth="3"
      />
      <circle cx="60" cy="50" r="22" fill="#fff" fillOpacity=".9" />
      <path
        d="M60 62s-11-6.6-13.4-13c-1.6-4.3 1.2-9 5.6-9 2.9 0 5.4 1.7 7.8 4.6 2.4-2.9 4.9-4.6 7.8-4.6 4.4 0 7.2 4.7 5.6 9C71 55.4 60 62 60 62z"
        fill="#e2387a"
      />
      <path d="M30 34c5-11 15-18 28-19" stroke="#fff" strokeOpacity=".85" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="88" cy="70" rx="4" ry="9" fill="#fff" fillOpacity=".35" transform="rotate(25 88 70)" />
    </svg>
  );
}

function TitleHeart() {
  return (
    <svg className="st-title-heart" viewBox="0 0 70 40" aria-hidden="true">
      <path
        d="M2 30c9 1 17 0 24-2.4M26 27.6c-5.6-3.9-10-8.6-10.6-13.5-.7-5 2.6-8.6 7-8.6 3.4 0 5.9 2.2 7.5 5.4 1.6-3.2 4.2-5.4 7.5-5.4 4.4 0 7.7 3.6 7 8.6-.7 5.2-7 10-14.4 14.6 6 1 12.5-.4 18-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StudioSection({ onSchedule, mapsUrl, mapsEmbed }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const reveal = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        reveal.disconnect();
      }
    }, { threshold: 0.12 });
    reveal.observe(node);
    return () => reveal.disconnect();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className={`st-section scroll-mt-28 seam-in${visible ? ' is-visible' : ''}`}
      aria-labelledby="st-title"
    >
        <div className="seam-spacer" aria-hidden="true" />
      <span id="localizacao" className="st-anchor" />

      <div className="st-backdrop" aria-hidden="true">
        <span className="st-sparkles" />
        <img src="/images/cenario/fita-vidro3-transparente.png" alt="" className="st-side-ribbon st-side-ribbon-left" />
        <img src="/images/cenario/fita-vidro3-transparente.png" alt="" className="st-side-ribbon st-side-ribbon-right" />
        {PETALAS.map((p, i) => (
          <img
            key={i}
            src={`/images/cenario/${p.src}`}
            alt=""
            className="st-petal"
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

      <div className="st-wrap">
        <header className="st-heading st-reveal">
          <span className="st-kicker">
            <MapPin aria-hidden="true" /> ONDE ATENDEMOS
          </span>
          <h2 id="st-title">
            <span>Seu momento de beleza</span>
            <strong>
              começa aqui.
              <TitleHeart />
            </strong>
          </h2>
          <svg className="st-mini-heart" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 20.6s-7.6-4.6-9.4-9.3C1.4 8.1 3.4 4.6 6.9 4.6c2 0 3.7 1.1 5.1 3 1.4-1.9 3.1-3 5.1-3 3.5 0 5.5 3.5 4.3 6.7-1.8 4.7-9.4 9.3-9.4 9.3z" />
          </svg>
          <p>
            Conheça nosso espaço em Guaraniaçu e saiba como agendar seu atendimento especial em
            <br className="st-desktop-break" /> Diamante do Sul.
          </p>
          <GlassPin className="st-heading-pin" idPrefix="stPinTop" />
        </header>

        <div className="st-cards">
          {/* GUARANIAÇU */}
          <article className="st-card st-card-main st-reveal st-reveal-2">
            <div className="st-card-top">
              <span className="st-chip"><Crown className="st-chip-gold" aria-hidden="true" /> STUDIO PRINCIPAL</span>
              <span className="st-open"><i aria-hidden="true" /> Segunda a Sábado</span>
            </div>

            <div className="st-main-body">
              <div className="st-main-info">
                <h3>Guaraniaçu, PR</h3>
                <ul className="st-info-list">
                  <li>
                    <MapPin aria-hidden="true" />
                    <span><b>Endereço Oficial:</b> {ENDERECO}</span>
                  </li>
                  <li>
                    <Clock aria-hidden="true" />
                    <span>08:00 às 19:00 (Com hora marcada)</span>
                  </li>
                  <li>
                    <Sparkles aria-hidden="true" />
                    <span>Ambiente climatizado, poltrona de luxo e privacidade</span>
                  </li>
                </ul>
              </div>
              <figure className="st-photo">
                <img
                  src="/images/studio/studio-recepcao-logo-a.webp"
                  alt="Recepção do Studio Alane Surmas em Guaraniaçu"
                  width="952"
                  height="808"
                  loading="lazy"
                />
              </figure>
            </div>

            <div className="st-main-actions">
              <button
                type="button"
                className="st-btn st-btn-primary"
                onClick={() => onSchedule('Olá Alane! Gostaria de agendar meu horário no Studio em Guaraniaçu.')}
              >
                <Calendar aria-hidden="true" /> AGENDAR EM GUARANIAÇU <ArrowRight className="st-btn-arrow" aria-hidden="true" />
              </button>
              <a className="st-btn st-btn-secondary" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation aria-hidden="true" /> TRAÇAR ROTA
              </a>
            </div>
          </article>

          {/* DIAMANTE DO SUL */}
          <article className="st-card st-card-region st-reveal st-reveal-3">
            <div className="st-region-art" aria-hidden="true">
              <Suspense fallback={null}>
                <RegionCity3D className="st-region-3d" />
              </Suspense>
            </div>

            <div className="st-card-top">
              <span className="st-chip"><CalendarDays aria-hidden="true" /> ATENDIMENTO REGIONAL</span>
              <span className="st-dates"><Calendar aria-hidden="true" /> Datas Especiais</span>
            </div>

            <div className="st-region-body">
              <h3>Diamante do Sul, PR</h3>
              <p className="st-region-sub">Atendimento especial com agendamento prévio.</p>
              <p className="st-region-text">
                Atendimento com toda a excelência e técnica do Studio Alane Surmas para as clientes de Diamante do Sul.
              </p>

              <div className="st-callout">
                <span className="st-callout-icon" aria-hidden="true"><Info /></span>
                <div>
                  <h4>Como funciona em Diamante do Sul?</h4>
                  <p>
                    Os atendimentos acontecem através de agendamento prévio com vagas limitadas. Fale diretamente no
                    WhatsApp para verificar os próximos dias e garantir seu horário.
                  </p>
                </div>
              </div>

              <ul className="st-region-list">
                <li><Heart aria-hidden="true" /> Extensão de Cílios, Lifting, Brow e Dermaplaning</li>
                <li><Gem aria-hidden="true" /> Atendimento exclusivo e individualizado</li>
              </ul>
            </div>

            <button
              type="button"
              className="st-btn st-btn-primary st-btn-wide"
              onClick={() => onSchedule('Olá Alane! Gostaria de saber as próximas datas e agendar em Diamante do Sul.')}
            >
              <Calendar aria-hidden="true" /> AGENDAR EM DIAMANTE DO SUL <ArrowRight className="st-btn-arrow" aria-hidden="true" />
            </button>
          </article>
        </div>

        {/* MAPA */}
        <div className="st-map-panel st-reveal st-reveal-4">
          <div className="st-map-head">
            <span className="st-map-icon" aria-hidden="true"><MapPin /></span>
            <div className="st-map-title">
              <h3>
                Encontre nosso Studio <span className="st-verified">VERIFICADO</span>
              </h3>
              <p>{ENDERECO}</p>
            </div>
            <a className="st-btn st-btn-primary st-btn-maps" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              ABRIR NO APLICATIVO DO GOOGLE MAPS <ExternalLink aria-hidden="true" />
            </a>
          </div>
          <div className="st-map">
            <iframe
              src={mapsEmbed}
              title="Mapa do Studio Alane Surmas em Guaraniaçu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <div className="seam-spacer" aria-hidden="true" />
    </section>
  );
}
