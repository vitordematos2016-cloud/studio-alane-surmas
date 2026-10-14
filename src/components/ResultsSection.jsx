import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  Crown,
  ExternalLink,
  Heart,
  Instagram,
  Leaf,
  Sparkle,
  Sparkles,
  Star,
  ThumbsUp,
  X,
} from 'lucide-react';

const RESULTS = [
  {
    id: 'extensao-cilios',
    title: 'Extensão de Cílios',
    subtitle: 'Volume Brasileiro & Volume 4D',
    badge: 'O MAIS PEDIDO',
    image: '/images/secao-resultados/procedimentos/resultado-volume-brasileiro.jpg',
    imagePosition: '50% 48%',
    icon: Crown,
  },
  {
    id: 'spa-labial',
    title: 'SPA Labial',
    subtitle: 'Hidratação & Renovação Celular',
    badge: 'CUIDADO PROFUNDO',
    image: '/images/secao-resultados/procedimentos/procedimento-spa-labial.jpg',
    imagePosition: '50% 54%',
    icon: Heart,
  },
  {
    id: 'designer-sobrancelhas',
    title: 'Designer de Sobrancelhas',
    subtitle: 'Mapeamento Anatômico & Henna / Tintura',
    badge: 'VISAGISMO ÚNICO',
    image: '/images/secao-resultados/procedimentos/procedimento-designer.jpg',
    imagePosition: '75% 64%',
    icon: Sparkles,
  },
  {
    id: 'brow-lamination',
    title: 'Brow Lamination',
    subtitle: 'Alinhamento & Encorpamento',
    badge: 'TENDÊNCIA DE LUXO',
    image: '/images/secao-resultados/procedimentos/resultado-brow-lamination.jpg',
    imagePosition: '62% 48%',
    icon: Award,
  },
  {
    id: 'lash-lifting',
    title: 'Lash Lifting Nutritivo',
    subtitle: 'Curvatura dos Cílios Naturais',
    badge: 'NATURALIDADE PURA',
    image: '/images/secao-resultados/procedimentos/resultado-lash-lifting.jpg',
    imagePosition: '43% 50%',
    icon: Leaf,
  },
  {
    id: 'dermaplaning',
    title: 'Dermaplaning Facial',
    subtitle: 'Esfoliação Mecânica & Pele de Seda',
    badge: 'VIÇO IMEDIATO',
    image: '/images/secao-resultados/procedimentos/procedimento-dermaplaning.png',
    imagePosition: '50% 48%',
    icon: Sparkle,
  },
];

const INSTAGRAM_THUMBNAILS = ['01', '04', '05', '03'];

// Reações que sobem do painel do Instagram: posição (x %), atraso, duração, tamanho e desvio lateral.
const INSTAGRAM_REACTIONS = [
  { type: 'heart', x: 76, delay: 0, duration: 4.2, size: 11, drift: -10 },
  { type: 'like', x: 82, delay: 1.1, duration: 4.8, size: 10, drift: 8 },
  { type: 'heart', x: 88, delay: 2.3, duration: 4.4, size: 13, drift: -6 },
  { type: 'heart', x: 93, delay: .6, duration: 5, size: 9, drift: 9 },
  { type: 'like', x: 79, delay: 3.2, duration: 4.6, size: 9, drift: -8 },
  { type: 'heart', x: 85, delay: 4, duration: 4.3, size: 10, drift: 6 },
  { type: 'heart', x: 96, delay: 2.8, duration: 4.9, size: 11, drift: -9 },
  { type: 'like', x: 90, delay: 5.1, duration: 4.5, size: 10, drift: 7 },
  { type: 'heart', x: 64, delay: 1.8, duration: 5.2, size: 8, drift: 6 },
  { type: 'heart', x: 70, delay: 4.6, duration: 4.7, size: 9, drift: -7 },
];

export default function ResultsSection({ instagramUrl, instagramHandle }) {
  const [selectedResult, setSelectedResult] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!selectedResult) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedResult(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedResult]);

  return (
    <>
      <section id="resultados" className="results-showcase scroll-mt-28 seam-in" aria-labelledby="results-title">
        <div className="seam-spacer" aria-hidden="true" />
        <div className="results-showcase-scene" aria-hidden="true">
          <div className="results-showcase-bokeh results-showcase-bokeh-left" />
          <div className="results-showcase-bokeh results-showcase-bokeh-right" />
          <img
            src="/images/cenario/rosa3-transparente.png"
            alt=""
            className="results-showcase-side-art results-showcase-comp"
          />
          <img
            src="/images/cenario/rosa3-transparente.png"
            alt=""
            className="results-showcase-side-art results-showcase-rose"
          />
          <img
            src="/images/cenario/petala-individual-3.png"
            alt=""
            className="results-showcase-petal results-showcase-petal-one"
          />
          <img
            src="/images/cenario/petala-individual-8.png"
            alt=""
            className="results-showcase-petal results-showcase-petal-two"
          />
          <img
            src="/images/cenario/petala-individual-5.png"
            alt=""
            className="results-showcase-petal results-showcase-petal-three"
          />
          <div className="results-showcase-floor" />
        </div>

        <div className="results-showcase-inner">
          <header className="results-showcase-header results-reveal">
            <div className="results-showcase-kicker">
              <Star aria-hidden="true" />
              <span>PORTFÓLIO OFICIAL • {instagramHandle}</span>
            </div>

            <h2 id="results-title">
              <span>A beleza está nos</span>
              <strong>detalhes do seu olhar.</strong>
            </h2>

            <svg className="results-showcase-ornament" viewBox="0 0 520 34" aria-hidden="true">
              <defs>
                <linearGradient id="results-ornament-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff7fa8" stopOpacity="0" />
                  <stop offset="0.2" stopColor="#ff9dbc" stopOpacity="0.9" />
                  <stop offset="0.8" stopColor="#ff9dbc" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#ff7fa8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M16 17 C130 11 191 24 244 17" stroke="url(#results-ornament-line)" strokeWidth="1.4" fill="none" />
              <path d="M276 17 C329 10 390 24 504 17" stroke="url(#results-ornament-line)" strokeWidth="1.4" fill="none" />
              <path d="M260 22.5s-9.5-5.8-9.5-12.2c0-6.4 8.3-8.3 9.5-1.7 1.2-6.6 9.5-4.7 9.5 1.7 0 6.4-9.5 12.2-9.5 12.2Z" stroke="#ff9dbc" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            </svg>
          </header>

          <div className="results-benefits results-reveal" aria-label="Diferenciais do atendimento">
            <article className="results-benefit-card" tabIndex={0}>
              <span className="results-benefit-icon"><Sparkles aria-hidden="true" /></span>
              <div>
                <h3>Beleza personalizada</h3>
                <p>Cada procedimento é pensado para valorizar seus traços naturais.</p>
              </div>
            </article>
            <article className="results-benefit-card" tabIndex={0}>
              <span className="results-benefit-icon"><Heart aria-hidden="true" /></span>
              <div>
                <h3>Leveza em cada fio</h3>
                <p>Técnica cuidadosa, resultado natural e sofisticado.</p>
              </div>
            </article>
            <article className="results-benefit-card" tabIndex={0}>
              <span className="results-benefit-icon"><Crown aria-hidden="true" /></span>
              <div>
                <h3>Seu olhar, sua essência</h3>
                <p>Resultados que respeitam sua individualidade.</p>
              </div>
            </article>
          </div>

          <div className="results-gallery-heading results-reveal">
            <div>
              <span>GALERIA DE RESULTADOS REAIS</span>
              <h3>Resultados de Clientes Reais</h3>
            </div>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram aria-hidden="true" />
              <span>VER +70 POSTS NO INSTAGRAM</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="results-gallery-grid results-reveal">
            {RESULTS.map((result) => {
              const BadgeIcon = result.icon;
              return (
                <button
                  type="button"
                  key={result.id}
                  className="results-gallery-card"
                  onClick={() => setSelectedResult(result)}
                  aria-label={`Ampliar resultado: ${result.title}`}
                >
                  <img
                    src={result.image}
                    alt={`${result.title} — ${result.subtitle}`}
                    style={{ objectPosition: result.imagePosition }}
                    loading="lazy"
                  />
                  <span className="results-gallery-shade" aria-hidden="true" />
                  <span className="results-gallery-badge"><BadgeIcon aria-hidden="true" />{result.badge}</span>
                  <span className="results-gallery-copy">
                    <span>
                      <strong>{result.title}</strong>
                      <small>{result.subtitle}</small>
                    </span>
                    <span className="results-gallery-arrow" aria-hidden="true"><ArrowRight /></span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="results-instagram-panel results-reveal">
            <div className="results-instagram-reactions" aria-hidden="true">
              {INSTAGRAM_REACTIONS.map((reaction, index) => (
                <span
                  key={index}
                  className={`results-instagram-reaction results-instagram-reaction-${reaction.type}`}
                  style={{
                    '--reaction-x': `${reaction.x}%`,
                    '--reaction-delay': `${reaction.delay}s`,
                    '--reaction-duration': `${reaction.duration}s`,
                    '--reaction-size': `${reaction.size}px`,
                    '--reaction-drift': `${reaction.drift}px`,
                  }}
                >
                  {reaction.type === 'heart' ? <Heart /> : <ThumbsUp />}
                </span>
              ))}
            </div>
            <div className="results-instagram-intro">
              <span className="results-instagram-icon">
                <img src="/images/secao-resultados/instagram/icone-instagram-flores.png" alt="" aria-hidden="true" />
              </span>
              <div>
                <h3>SUA PRÓXIMA INSPIRAÇÃO ESTÁ AQUI.</h3>
                <p>Acompanhe os bastidores, conheça novos procedimentos e descubra mais detalhes do trabalho da Alane.</p>
              </div>
            </div>

            <a className="results-instagram-cta" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <span>ACOMPANHAR NO INSTAGRAM</span>
              <ArrowRight aria-hidden="true" />
            </a>

            <div className="results-instagram-thumbnails" aria-label="Prévia do portfólio no Instagram">
              {INSTAGRAM_THUMBNAILS.map((number) => (
                <img
                  key={number}
                  src={`/images/secao-resultados/instagram/thumb-insta-${number}.jpg`}
                  alt=""
                  loading="lazy"
                />
              ))}
              <span className="results-instagram-count"><strong>+70</strong><small>POSTS</small></span>
            </div>
          </div>
        </div>
        <div className="seam-spacer" aria-hidden="true" />
      </section>

      {selectedResult && (
        <div
          className="results-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedResult(null);
          }}
        >
          <div
            className="results-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="results-lightbox-title"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="results-lightbox-close"
              onClick={() => setSelectedResult(null)}
              aria-label="Fechar visualização ampliada"
            >
              <X aria-hidden="true" />
            </button>
            <img
              src={selectedResult.image}
              alt={`${selectedResult.title} — ${selectedResult.subtitle}`}
              style={{ objectPosition: selectedResult.imagePosition }}
            />
            <div className="results-lightbox-caption">
              <span>{selectedResult.badge}</span>
              <h3 id="results-lightbox-title">{selectedResult.title}</h3>
              <p>{selectedResult.subtitle}</p>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram aria-hidden="true" /> Ver portfólio oficial <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
