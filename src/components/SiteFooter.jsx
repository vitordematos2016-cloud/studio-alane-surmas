import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarDays, Instagram, MapPin } from 'lucide-react';
import './footer.css';

const NAV_ROWS = [
  [['inicio', 'INÍCIO'], ['sobre', 'SOBRE'], ['procedimentos', 'PROCEDIMENTOS']],
  [['resultados', 'RESULTADOS'], ['feedbacks', 'FEEDBACKS'], ['studio', 'STUDIO']],
];

const DEVELOPER_URL =
  import.meta.env.VITE_DEVELOPER_URL ||
  'https://wa.me/5545998378795?text=Ol%C3%A1%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20Sites!';

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M4.2 19.8l1.1-4A8.3 8.3 0 1 1 8.6 19z"
      />
      <path
        fill="currentColor"
        d="M9.2 8.1c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2.1.4 0 .5l-.4.6c-.1.2-.2.3 0 .5.5.8 1.1 1.4 1.9 1.9.2.1.4.1.5-.1l.5-.6c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.8 1.5-.6.3-1.4.4-2.6-.1-1.6-.6-2.9-1.8-3.8-3.3-.7-1.2-.6-2.1-.3-2.8z"
      />
    </svg>
  );
}

// Coração vazado ligado a uma linha curva, como assinatura no fim das frases
function HeartFlourish({ className }) {
  return (
    <svg className={className} viewBox="0 0 62 34" aria-hidden="true">
      {/* Linha que chega na ponta do coração e o desenha simétrico (lobos iguais em torno de x = 44) */}
      <path
        d="M2 29C14 31 30 31 44 30C36 24 30 18.5 30 12.8C30 8.8 32.9 6 36.6 6C40 6 42.6 8.4 44 11.6C45.4 8.4 48 6 51.4 6C55.1 6 58 8.8 58 12.8C58 18.5 52 24 44 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteFooter({ onNavigate, onSchedule, instagramUrl, mapsUrl }) {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(false);

  // Animações decorativas só rodam com o rodapé na tela
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: '120px 0px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <footer id="rodape" ref={ref} className={`ft seam-in${onScreen ? '' : ' is-paused'}`}>
      <div className="ft-bg" aria-hidden="true">
        <span className="ft-top-line" />
        <span className="ft-sparkles" />
        <img loading="lazy" decoding="async" src="/images/cenario/fita-vidro3-transparente.webp" alt="" className="ft-ribbon ft-ribbon-left" />
        <img loading="lazy" decoding="async" src="/images/cenario/fita-vidro3-transparente.webp" alt="" className="ft-ribbon ft-ribbon-right" />
      </div>

      <div className="ft-inner">
        <div className="ft-main">
          {/* Identidade */}
          <div className="ft-brand">
            <div className="ft-brand-row">
              <span className="ft-logo">
                <img loading="lazy" decoding="async" src="/images/brand/alane-surmas-logo-mark.webp" alt="Logo Alane Surmas" width="391" height="391" />
              </span>
              <span className="ft-name">
                <strong>ALANE SURMAS</strong>
                <small>CÍLIOS &amp; SOBRANCELHAS</small>
              </span>
            </div>
            <p className="ft-tagline">
              Realçando a beleza que existe em cada olhar.
              <HeartFlourish className="ft-flourish" />
            </p>
          </div>

          <span className="ft-divider" aria-hidden="true" />

          {/* Navegação */}
          <nav className="ft-nav" aria-label="Navegação do rodapé">
            {NAV_ROWS.map((row, r) => (
              <ul key={r}>
                {row.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={(e) => onNavigate(e, id)}>{label}</a>
                  </li>
                ))}
              </ul>
            ))}
          </nav>

          <span className="ft-divider" aria-hidden="true" />

          {/* Localidades, redes e agendamento */}
          <div className="ft-contact">
            <ul className="ft-places">
              <li>
                <span className="ft-orb ft-orb-sm" aria-hidden="true"><MapPin /></span>
                <span>
                  <strong>Guaraniaçu, PR</strong>
                  <small>Studio principal.</small>
                </span>
              </li>
              <li>
                <span className="ft-orb ft-orb-sm" aria-hidden="true"><MapPin /></span>
                <span>
                  <strong>Diamante do Sul, PR</strong>
                  <small>Atendimento mediante agendamento.</small>
                </span>
              </li>
            </ul>

            <div className="ft-social">
              <a className="ft-orb" href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram oficial da Alane Surmas">
                <Instagram aria-hidden="true" />
              </a>
              <button
                type="button"
                className="ft-orb"
                onClick={() => onSchedule('Olá Alane! Gostaria de conversar com você sobre os procedimentos.')}
                aria-label="Conversar no WhatsApp"
              >
                <WhatsAppGlyph />
              </button>
              <a className="ft-orb" href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir localização no Google Maps">
                <MapPin aria-hidden="true" />
              </a>
            </div>

            <button type="button" className="ft-cta" onClick={() => onSchedule('Olá Alane! Gostaria de agendar meu horário.')}>
              <CalendarDays className="ft-cta-icon" aria-hidden="true" />
              <span>AGENDAR MEU HORÁRIO</span>
              <ArrowRight className="ft-cta-arrow" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Linha que atravessa a tela e se curva no coração central */}
      <div className="ft-heart-line" aria-hidden="true">
        <span className="ft-heart-line-side" />
        <svg viewBox="0 0 120 46" className="ft-heart-svg" preserveAspectRatio="none">
          <path
            d="M0 46C22 46 36 46 47 41.5 34 33 28 24 29 16.5 30 9.5 36 5.5 42.5 5.5 50 5.5 56 10.5 60 17 64 10.5 70 5.5 77.5 5.5 84 5.5 90 9.5 91 16.5 92 24 86 33 73 41.5 84 46 98 46 120 46"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Luz que contorna o coração, continuando a que vem pela linha */}
          <path
            className="ft-heart-light"
            d="M0 46C22 46 36 46 47 41.5 34 33 28 24 29 16.5 30 9.5 36 5.5 42.5 5.5 50 5.5 56 10.5 60 17 64 10.5 70 5.5 77.5 5.5 84 5.5 90 9.5 91 16.5 92 24 86 33 73 41.5 84 46 98 46 120 46"
            pathLength="100"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="ft-heart-line-side" />
      </div>

      <div className="ft-bottom">
        <div className="ft-copy">
          <p>© 2026 Studio Alane Surmas • Guaraniaçu &amp; Diamante do Sul.</p>
          <p>Todos os direitos reservados.</p>
        </div>
        <span className="ft-divider ft-divider-sm" aria-hidden="true" />
        <p className="ft-motto">
          Desperte o extraordinário que vive em você.
          <HeartFlourish className="ft-flourish" />
        </p>
        <span className="ft-divider ft-divider-sm" aria-hidden="true" />
        <div className="ft-dev">
          <span>DESENVOLVIDO POR</span>
          <a href={DEVELOPER_URL} target="_blank" rel="noopener noreferrer" title="Falar com Matos Soluções no WhatsApp">
            <img loading="lazy" decoding="async" src="/images/brand/logo-matos-solucoes-transparent.webp" alt="Matos Soluções" />
          </a>
        </div>
      </div>
    </footer>
  );
}
