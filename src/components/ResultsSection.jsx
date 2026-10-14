import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  ExternalLink,
  Heart,
  Instagram,
  Sparkles,
  Star,
  ThumbsUp,
  X,
} from 'lucide-react';

// Fotos reais da Alane (sem moldura) em public/assets/resultados; miniaturas leves em /thumbs.
// Originais com etiqueta: public/images/cenario/fotos-reais-clientes-alane
const PHOTO_DIR = '/assets/resultados';
const photoSrc = (file) => `${PHOTO_DIR}/${file}.webp`;
const thumbSrc = (file) => `${PHOTO_DIR}/thumbs/${file}.webp`;

// Cada card abre a galeria do procedimento. A legenda de cada foto segue o catálogo
// (procedimentos combinados e Kit Master mantêm a identificação).
const RESULTS = [
  {
    id: 'extensao-cilios',
    title: 'Extensão de Cílios',
    coverPosition: '50% 56%',
    photos: [
      { file: 'extensao-de-cilios-d', caption: 'Extensão de Cílios' },
      { file: 'extensao-de-cilios-a', caption: 'Extensão de Cílios' },
      { file: 'extensao-de-cilios-c', caption: 'Extensão de Cílios' },
      { file: 'extensao-de-cilios-e', caption: 'Extensão de Cílios' },
      { file: 'extensao-de-cilios-b', caption: 'Extensão de Cílios' },
    ],
  },
  {
    id: 'volume-brasileiro',
    title: 'Volume Brasileiro',
    coverPosition: '50% 74%',
    photos: [
      { file: 'volume-brasileiro-c', caption: 'Volume Brasileiro' },
      { file: 'volume-brasileiro-b', caption: 'Volume Brasileiro' },
      { file: 'volume-brasileiro-d', caption: 'Volume Brasileiro' },
      { file: 'volume-brasileiro-e', caption: 'Volume Brasileiro' },
      { file: 'volume-brasileiro-f', caption: 'Volume Brasileiro' },
      { file: 'volume-brasileiro-a', caption: 'Volume Brasileiro' },
      { file: 'manutencao-volume-brasileiro-a', caption: 'Manutenção de Volume Brasileiro' },
      { file: 'brow-lamination-volume-brasileiro-a', caption: 'Brow Lamination + Volume Brasileiro' },
    ],
  },
  {
    id: 'volume-4d',
    title: 'Volume 4D',
    coverPosition: '50% 50%',
    photos: [
      { file: 'volume-4d-b', caption: 'Volume 4D' },
      { file: 'volume-4d-a', caption: 'Volume 4D' },
      { file: 'volume-4d-c', caption: 'Volume 4D' },
    ],
  },
  {
    id: 'brow-lamination',
    title: 'Brow Lamination',
    coverPosition: '50% 74%',
    photos: [
      { file: 'brow-lamination-a', caption: 'Brow Lamination' },
      { file: 'brow-lamination-b', caption: 'Brow Lamination' },
      { file: 'brow-lamination-kit-master-a', caption: 'Brow Lamination • Kit Master' },
      { file: 'brow-lamination-volume-brasileiro-a', caption: 'Brow Lamination + Volume Brasileiro' },
    ],
  },
  {
    id: 'lash-lifting',
    title: 'Lash Lifting',
    coverPosition: '50% 52%',
    photos: [
      { file: 'lash-lifting-a', caption: 'Lash Lifting' },
      { file: 'lash-lifting-b', caption: 'Lash Lifting' },
      { file: 'lash-lifting-kit-master-a', caption: 'Lash Lifting • Kit Master' },
      { file: 'lash-lifting-kit-master-b', caption: 'Lash Lifting • Kit Master' },
      { file: 'lash-lifting-kit-master-c', caption: 'Lash Lifting • Kit Master' },
    ],
  },
  {
    id: 'tebori-repair',
    title: 'Técnica Tebori Repair',
    coverPosition: '50% 58%',
    photos: [
      { file: 'tecnica-tebori-repair-sobrancelha-a', caption: 'Técnica Tebori Repair (Sobrancelha)' },
    ],
  },
];

const INSTAGRAM_THUMBNAILS = ['volume-4d-a', 'extensao-de-cilios-d', 'brow-lamination-a', 'lash-lifting-kit-master-c'];

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

// Troca de foto nos cards: lenta e tranquila, com os cards defasados entre si
const CARD_INTERVAL = 6000;
const CARD_STAGGER = 1000;

// Card que passeia suavemente pelas fotos do próprio procedimento (crossfade).
// Só anda quando está visível na tela, com a aba ativa e sem o mouse em cima.
function GalleryCard({ result, order, onOpen }) {
  const { photos } = result;
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);
  const cardRef = useRef(null);
  const currentRef = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    if (photos.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let visible = false;
    let interval;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.3 });
    observer.observe(cardRef.current);

    const advance = () => {
      if (!visible || paused.current || document.hidden) return;
      const from = currentRef.current;
      const to = (from + 1) % photos.length;
      currentRef.current = to;
      setPrevious(from);
      setCurrent(to);
    };
    // Defasagem inicial: cada card troca em um momento diferente
    const start = setTimeout(() => {
      interval = setInterval(advance, CARD_INTERVAL);
    }, order * CARD_STAGGER);

    return () => {
      observer.disconnect();
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [photos.length, order]);

  // Pré-carrega a próxima foto para o crossfade não "piscar"
  useEffect(() => {
    if (photos.length < 2) return;
    const next = new Image();
    next.src = photoSrc(photos[(current + 1) % photos.length].file);
  }, [current, photos]);

  const positionOf = (index) => (index === 0 ? result.coverPosition : photos[index].position || '50% 55%');
  const layers = previous === null ? [current] : [previous, current];

  return (
    <button
      ref={cardRef}
      type="button"
      className="results-gallery-card"
      onClick={() => onOpen(current)}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      aria-label={`Ver galeria de resultados reais: ${result.title} (${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'})`}
    >
      {layers.map((index) => (
        <img
          key={photos[index].file}
          className={index === current && previous !== null ? 'is-entering' : undefined}
          src={photoSrc(photos[index].file)}
          alt={index === current ? `Resultado real de ${photos[index].caption} feito pela Alane Surmas` : ''}
          style={{ objectPosition: positionOf(index) }}
          loading={order < 3 && index === 0 ? undefined : 'lazy'}
          decoding="async"
          onAnimationEnd={index === current ? () => setPrevious(null) : undefined}
        />
      ))}
      <span className="results-gallery-shade" aria-hidden="true" />
      <span className="results-gallery-shine" aria-hidden="true" style={{ '--shine-delay': `${order * 1.4}s` }} />
      <span className="results-gallery-copy">
        <strong>{result.title}</strong>
        <span className="results-gallery-arrow" aria-hidden="true"><ArrowRight /></span>
      </span>
      {photos.length > 1 && (
        <span className="results-gallery-dots" aria-hidden="true">
          {photos.map((photo, index) => (
            <i key={photo.file} className={index === current ? 'is-active' : undefined} />
          ))}
        </span>
      )}
    </button>
  );
}

export default function ResultsSection({ instagramUrl, instagramHandle }) {
  // Galeria aberta: qual procedimento e qual foto dele
  const [viewer, setViewer] = useState(null);
  const closeButtonRef = useRef(null);
  const thumbsRef = useRef(null);
  const touchStart = useRef(null);

  const selectedResult = viewer ? RESULTS[viewer.result] : null;
  const photoCount = selectedResult ? selectedResult.photos.length : 0;
  const currentPhoto = selectedResult ? selectedResult.photos[viewer.photo] : null;

  const closeViewer = useCallback(() => setViewer(null), []);
  const goTo = useCallback((step) => {
    setViewer((v) => {
      if (!v) return v;
      const total = RESULTS[v.result].photos.length;
      return { ...v, photo: (v.photo + step + total) % total };
    });
  }, []);

  useEffect(() => {
    if (!viewer) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKey = (event) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === 'ArrowRight') goTo(1);
      if (event.key === 'ArrowLeft') goTo(-1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // Só reage a abrir/fechar; trocar de foto não reinicia o foco nem o overflow
  }, [Boolean(viewer), closeViewer, goTo]);

  // Mantém a miniatura ativa visível na faixa
  useEffect(() => {
    if (!viewer) return;
    thumbsRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [viewer]);

  const onTouchStart = (event) => {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (event) => {
    if (!touchStart.current) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goTo(dx < 0 ? 1 : -1);
  };

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
                <linearGradient id="results-ornament-heart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffd3e0" />
                  <stop offset="1" stopColor="#ff7fa8" />
                </linearGradient>
                <radialGradient id="results-ornament-heart-fill" cx="0.38" cy="0.3" r="0.8">
                  <stop offset="0" stopColor="#ffc2d4" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#c2275b" stopOpacity="0.15" />
                </radialGradient>
              </defs>
              <path d="M16 17 C130 11 191 24 244 17" stroke="url(#results-ornament-line)" strokeWidth="1.4" fill="none" />
              <path d="M276 17 C329 10 390 24 504 17" stroke="url(#results-ornament-line)" strokeWidth="1.4" fill="none" />
              {/* Pontinhos onde a linha encontra o coração */}
              <circle cx="244" cy="17" r="1.3" fill="#ffc2d4" />
              <circle cx="276" cy="17" r="1.3" fill="#ffc2d4" />
              <path d="M236 17l2-2 2 2-2 2Z" fill="#ff9dbc" opacity=".8" />
              <path d="M280 17l2-2 2 2-2 2Z" fill="#ff9dbc" opacity=".8" />
              <g className="results-ornament-heart">
                {/* Coração principal: preenchimento perolado translúcido + contorno em degradê */}
                <path d="M260 22.5s-9.5-5.8-9.5-12.2c0-6.4 8.3-8.3 9.5-1.7 1.2-6.6 9.5-4.7 9.5 1.7 0 6.4-9.5 12.2-9.5 12.2Z" fill="url(#results-ornament-heart-fill)" stroke="url(#results-ornament-heart)" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Coração interno fino */}
                <path d="M260 22.5s-9.5-5.8-9.5-12.2c0-6.4 8.3-8.3 9.5-1.7 1.2-6.6 9.5-4.7 9.5 1.7 0 6.4-9.5 12.2-9.5 12.2Z" transform="translate(260 14.5) scale(.52) translate(-260 -14.5)" fill="none" stroke="#ffd3e0" strokeWidth="1.4" strokeLinejoin="round" opacity=".75" />
                {/* Reflexo de brilho no lóbulo esquerdo */}
                <path d="M253.2 10.6c.2-1.9 1.6-3 3.1-2.9" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity=".85" />
              </g>
              {/* Brilho em estrela ao lado */}
              <path className="results-ornament-sparkle" d="M273.5 3.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7Z" fill="#fff0f5" />
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
            {RESULTS.map((result, index) => (
              <GalleryCard
                key={result.id}
                result={result}
                order={index}
                onOpen={(photo) => setViewer({ result: index, photo })}
              />
            ))}
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
                <p>Acompanhe os bastidores, conheça nossos procedimentos e descubra mais detalhes do trabalho da Alane.</p>
              </div>
            </div>

            <a className="results-instagram-cta" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <span>ACOMPANHAR NO INSTAGRAM</span>
              <ArrowRight aria-hidden="true" />
            </a>

            <div className="results-instagram-thumbnails" aria-label="Prévia do portfólio no Instagram">
              {INSTAGRAM_THUMBNAILS.map((file) => (
                <img key={file} src={thumbSrc(file)} alt="" loading="lazy" decoding="async" />
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
            if (event.currentTarget === event.target) closeViewer();
          }}
        >
          <div
            className="results-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="results-lightbox-title"
          >
            <header className="results-lightbox-header">
              <div>
                <span>RESULTADOS REAIS • ALANE SURMAS</span>
                <h3 id="results-lightbox-title">{selectedResult.title}</h3>
              </div>
              <span className="results-lightbox-counter" aria-live="polite">
                {viewer.photo + 1} / {photoCount}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="results-lightbox-close"
                onClick={closeViewer}
                aria-label="Fechar galeria"
              >
                <X aria-hidden="true" />
              </button>
            </header>

            <div className="results-lightbox-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <img
                key={currentPhoto.file}
                className="results-lightbox-photo"
                src={photoSrc(currentPhoto.file)}
                alt={`${currentPhoto.caption} — resultado real feito pela Alane Surmas`}
                decoding="async"
              />
              {photoCount > 1 && (
                <>
                  <button type="button" className="results-lightbox-nav is-prev" onClick={() => goTo(-1)} aria-label="Foto anterior">
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button type="button" className="results-lightbox-nav is-next" onClick={() => goTo(1)} aria-label="Próxima foto">
                    <ChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="results-lightbox-footer">
              <p className="results-lightbox-photo-caption">{currentPhoto.caption}</p>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram aria-hidden="true" /> Ver portfólio oficial <ExternalLink aria-hidden="true" />
              </a>
            </div>

            {photoCount > 1 && (
              <div className="results-lightbox-thumbs" ref={thumbsRef} aria-label="Miniaturas">
                {selectedResult.photos.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.file}
                    aria-current={index === viewer.photo ? 'true' : undefined}
                    aria-label={`Ver foto ${index + 1} de ${photoCount}: ${photo.caption}`}
                    onClick={() => setViewer((v) => ({ ...v, photo: index }))}
                  >
                    <img src={thumbSrc(photo.file)} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
