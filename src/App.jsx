import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  MapPin,   
  Star, 
  MessageCircle, 
  Instagram, 
  ArrowRight, 
  Heart, 
  Crown,   
  Calendar,
  Eye,
  Wand2,
  Compass,
  GraduationCap,
  EllipsisVertical,
  X
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResultsSection from './components/ResultsSection';
import FeedbacksSection from './components/FeedbacksSection';
import ExperienceSection from './components/ExperienceSection';
import StudioSection from './components/StudioSection';
import SiteFooter from './components/SiteFooter';
import PremiumRose from './components/PremiumRose';
import HeroTweezer from './components/HeroTweezer';

import { setupInteractivePetals } from './petals';

gsap.registerPlugin(ScrollTrigger);

// Dados Factuais Validados de Alane Surmas
// Links de contato: vêm do .env (VITE_*) e usam os valores oficiais como padrão
const env = import.meta.env;
const WHATSAPP_URL = env.VITE_WHATSAPP_URL || "https://wa.me/5545998378624";
const INSTAGRAM_URL = env.VITE_INSTAGRAM_URL || "https://instagram.com/alanesurmas_lashdesigner";
const INSTAGRAM_HANDLE = env.VITE_INSTAGRAM_HANDLE || "@alanesurmas_lashdesigner";
const GOOGLE_MAPS_URL = env.VITE_GOOGLE_MAPS_URL || "https://maps.app.goo.gl/9Ks8ivoLBf7HH1NUA";
const GOOGLE_MAPS_EMBED = env.VITE_GOOGLE_MAPS_EMBED || "https://maps.google.com/maps?q=-25.0996104,-52.8704132&hl=pt-BR&z=17&output=embed";

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);

  // Menu do celular: fecha ao tocar fora ou apertar Esc
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const onDown = (e) => {
      if (!mobileMenuRef.current?.contains(e.target)) setMobileMenuOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setMobileMenuOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  // Pétalas do site inteiro: balanço suave e arrastáveis
  useEffect(() => setupInteractivePetals(), []);


  // Lista de Atalhos com IDs 100% correspondentes
  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'procedimentos', label: 'Procedimentos' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'feedbacks', label: 'Feedbacks' },
    { id: 'studio', label: 'Localização' },
  ];

  // Catálogo Oficial Completo dos 6 Procedimentos de Alane Surmas
  const procedimentosCompletos = [
    {
      id: "extensao",
      nome: "Extensão de Cílios",
      subtitulo: "Volume Brasileiro & Volume 4D",
      tag: "O MAIS PEDIDO ❤️",
      icone: Crown,
      imagem: "/assets/procedimentos/capas/extensao-cilios.webp",
      imagemPosicao: "50% 44%",
      descricao: "Fios tecnológicos ultrafinos em formato Y (Brasileiro) ou fans aveludados (4D). Personalizados para efeito Natural, Levemente Delineado ou Gatinho, com leveza absoluta e isolamento perfeito.",
      durabilidade: "Manutenção a cada 15 - 21 dias",
      waMsg: "Olá Alane! Gostaria de agendar meu horário para Extensão de Cílios"
    },
    {
      id: "lifting",
      nome: "Lash Lifting Nutritivo",
      subtitulo: "Curvatura dos Cílios Naturais",
      tag: "NATURALIDADE PURA 🌿",
      icone: Eye,
      imagem: "/assets/procedimentos/capas/lash-lifting.webp",
      imagemPosicao: "50% 54%",
      descricao: "Curva, levanta, alinha e tinge os seus próprios cílios biológicos desde a raiz. Cria um efeito de curvex permanente com hidratação e nutrição profunda dos fios.",
      durabilidade: "Duração prolongada de 5 a 7 semanas",
      waMsg: "Olá Alane! Gostaria de saber mais e agendar o Lash Lifting"
    },
    {
      id: "brow_lamination",
      nome: "Brow Lamination",
      subtitulo: "Alinhamento & Encorpamento",
      tag: "TENDÊNCIA DE LUXO ✨",
      icone: Sparkles,
      imagem: "/assets/procedimentos/capas/brow-lamination.webp",
      imagemPosicao: "50% 36%",
      descricao: "Técnica que reposiciona os fios das sobrancelhas para cobrir falhas e criar espessura harmônica e encorpada. Nutre a fibra capilar e deixa o visual moderno e alinhado.",
      durabilidade: "Duração de 5 a 8 semanas nos fios",
      waMsg: "Olá Alane! Gostaria de agendar minha Brow Lamination"
    },
    {
      id: "designer",
      nome: "Designer de Sobrancelhas",
      subtitulo: "Mapeamento Anatômico & Henna / Tintura",
      tag: "VISAGISMO ÚNICO 🌸",
      icone: Compass,
      imagem: "/assets/procedimentos/capas/designer-sobrancelhas.webp",
      imagemPosicao: "50% 50%",
      descricao: "Estudo individual das proporções e simetria do seu rosto. Limpeza precisa na pinça ou linha, com aplicação personalizada de Henna (cobre falhas) ou Tintura (cobre fios brancos e define).",
      durabilidade: "Henna dura 3 a 5 dias na pele e até 15 dias no pelo",
      waMsg: "Olá Alane! Gostaria de agendar o Design Personalizado de Sobrancelhas"
    },
    {
      id: "spa_duplo",
      nome: "SPA Labial & SPA Sobrancelhas",
      subtitulo: "Hidratação & Renovação Celular",
      tag: "CUIDADO PROFUNDO 💋",
      icone: Heart,
      imagem: "/assets/procedimentos/capas/spa-labial.webp",
      imagemPosicao: "50% 62%",
      descricao: "Protocolo duplo revitalizante: esfoliação suave, remoção de células mortas, máscara nutritiva e hidratação celular intensa para lábios aveludados e sobrancelhas brilhantes e macias.",
      durabilidade: "Efeito imediato de viço e rejuvenescimento",
      waMsg: "Olá Alane! Gostaria de incluir o SPA Labial e SPA Sobrancelhas no meu agendamento"
    },
    {
      id: "dermaplaning",
      nome: "Dermaplaning Facial",
      subtitulo: "Esfoliação Mecânica & Pele de Seda",
      tag: "VIÇO IMEDIATO 💎",
      icone: Wand2,
      imagem: "/assets/procedimentos/capas/dermaplaning.webp",
      imagemPosicao: "50% 46%",
      descricao: "Procedimento estético refinado que utiliza lâmina cirúrgica para remover suavemente as células mortas e a penugem facial superficial. Devolve a luminosidade natural, uniformiza a textura e potencializa a absorção de cosméticos.",
      durabilidade: "Renovação celular instantânea",
      waMsg: "Olá Alane! Gostaria de agendar uma sessão de Dermaplaning Facial"
    }
  ];

  // Depoimentos 100% Reais do WhatsApp (profissional-dados.md)
  const depoimentos = [
    {
      citacao: "Alanee do céu, todo mundo falando dos meus cílios, do quanto ficou bonito e da naturalidade!",
      detalhe: "Eu que agradeço pela atenção, pelo carinho e cuidado! Sempre muito bom ir ao studio pelo atendimento humanizado e pelos procedimentos impecáveis.",
      autora: "Cliente do Studio",
      cargo: "FEEDBACK RECEBIDO NO WHATSAPP"
    },
    {
      citacao: "Amei Alane. Ficaram perfeitas! Minha sobrancelha linda pelas mãos da melhor 👑",
      detalhe: "Você que é muito especial, um serviço humano incrível, tenho certeza que foi Deus que te colocou no meu caminho 🙏",
      autora: "Cliente do Studio",
      cargo: "FEEDBACK RECEBIDO NO WHATSAPP"
    },
    {
      citacao: "Ai Alane sempre muito bom ir aí pelo atendimento, a conversa com você e pelos procedimentos, super indico sempre!",
      detalhe: "Obrigada eu que agradeço, amei o resultado, parabéns pelo trabalho impecável 🥰",
      autora: "Cliente do Studio",
      cargo: "FEEDBACK RECEBIDO NO WHATSAPP"
    }
  ];

  const openWhatsApp = (msg) => {
    const text = encodeURIComponent(msg || "Olá Alane! Vim pelo site e gostaria de agendar um horário exclusivo com você");
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  // Rolagem suave com compensação da barra fixa
  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // A faixa de transição no topo da seção é só fundo: rola até onde o conteúdo começa
      const seam = element.querySelector(':scope > .seam-spacer')?.offsetHeight || 0;
      const yOffset = -90 + (element.classList.contains('seam-in') ? seam : 0);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  // Efeito interativo 3D no mouse
  const handle3dMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  const handle3dMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // ScrollSpy e Cálculo de Progresso da Página
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScrollHeight > 0 ? (scrollY / totalScrollHeight) * 100 : 0;
      setScrollProgress(progress);

      const scrollPosition = scrollY + 160;
      const sectionIds = ['studio', 'feedbacks', 'resultados', 'procedimentos', 'sobre', 'inicio'];

      for (const sId of sectionIds) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sId);
            break;
          }
        }
      }

      if (scrollY < 120) {
        setActiveSection('inicio');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Suporte a rolagem automática para âncoras na URL (como #rodape)
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const timer = setTimeout(handleInitialHash, 250);
    window.addEventListener('hashchange', handleInitialHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleInitialHash);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-section').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 0,
          y: 35,
          duration: 0.9,
          ease: "power2.out"
        });
      });

      const aboutElements = gsap.utils.toArray('.about-reveal');
      if (aboutElements.length > 0) {
        gsap.fromTo(aboutElements,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: '#sobre',
              start: 'top 72%',
              toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.09,
            ease: 'power2.out',
            clearProps: 'opacity,transform'
          }
        );

        gsap.fromTo('.about-visual-stage',
          { opacity: 0, x: 34 },
          {
            scrollTrigger: {
              trigger: '#sobre',
              start: 'top 72%',
              toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'opacity,transform'
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#F8EFEA] text-[#1D1416] font-sans overflow-x-hidden selection:bg-velvet-800 selection:text-white">
      
      {/* ========================================================
          BARRA DE PROGRESSO ULTRAFINA DE ROLAGEM NO TOPO ABSOLUTO
      ======================================================== */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-velvet-900 via-rose-500 to-amber-300 z-50 transition-all duration-100 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cabeçalho e hero reproduzidos a partir da referência fornecida. */}
      <header className={`hero-site-header ${isScrolled ? 'is-scrolled' : ''} ${activeSection === 'sobre' ? 'is-dark-context' : ''}`}>
        <div className="hero-nav-shell">
          <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="hero-brand" aria-label="Alane Surmas — início">
            <img 
              src="/images/brand/alane-surmas-logo-mark.png" 
              alt="Alane Surmas" 
              className="hero-brand-mark-img" 
            />
            <span className="hero-brand-copy">
              <strong>ALANE SURMAS</strong>
              <small>CÍLIOS E SOBRANCELHAS</small>
            </span>
          </a>

          <nav className="hero-desktop-nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={activeSection === link.id ? 'is-active' : ''}
              >
                {activeSection === link.id && <span className="hero-nav-dot" />}
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hero-header-actions">
            {/* Atalhos rápidos: WhatsApp, Instagram e Google Maps */}
            <div className="hero-header-social">
              <button
                type="button"
                onClick={() => openWhatsApp("Olá Alane! Vim pelo site e gostaria de falar com você")}
                aria-label="Conversar no WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle aria-hidden="true" />
              </button>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Alane Surmas" title="Instagram">
                <Instagram aria-hidden="true" />
              </a>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir localização no Google Maps" title="Google Maps">
                <MapPin aria-hidden="true" />
              </a>
            </div>
            <button className="hero-header-cta" onClick={() => openWhatsApp("Olá Alane! Gostaria de agendar um atendimento exclusivo.")}>
              <Calendar aria-hidden="true" />
              <span>AGENDAR</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>

          {/* Celular: atalho para as seções (substitui a barra de links rolável) */}
          <div className="hero-menu" ref={mobileMenuRef}>
            <button
              type="button"
              className="hero-menu-toggle"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de seções'}
              aria-expanded={mobileMenuOpen}
              aria-controls="hero-menu-panel"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <EllipsisVertical aria-hidden="true" />}
            </button>
            {mobileMenuOpen && (
              <nav id="hero-menu-panel" className="hero-menu-panel" aria-label="Seções do site">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      scrollToSection(e, link.id);
                    }}
                    className={activeSection === link.id ? 'is-active' : ''}
                  >
                    <span className="hero-menu-dot" aria-hidden="true" />
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>

        <nav className="hero-mobile-nav no-scrollbar" aria-label="Navegação principal para celular">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={activeSection === link.id ? 'is-active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="inicio" className="hero-reference scroll-mt-28">
        <div className="hero-ambient hero-ambient-left" />
        <div className="hero-ambient hero-ambient-right" />
        <div className="hero-light-ray hero-light-ray-one" />
        <div className="hero-light-ray hero-light-ray-two" />

        {/* Cenário de Pétalas Realistas em Camada de Profundidade */}
        <div className="hero-petals-layer" aria-hidden="true">
          <img src="/images/cenario/petala-individual-3.png" alt="" className="hero-real-petal hero-petal-1" />
          <img src="/images/cenario/petala-individual-4.png" alt="" className="hero-real-petal hero-petal-2" />
          <img src="/images/cenario/petala-individual-5.png" alt="" className="hero-real-petal hero-petal-3" />
          <img src="/images/cenario/petala-individual-8.png" alt="" className="hero-real-petal hero-petal-4" />
          <img src="/images/cenario/petala-individual-3.png" alt="" className="hero-real-petal hero-petal-5" />
          <img src="/images/cenario/petala-individual-8.png" alt="" className="hero-real-petal hero-petal-6" />
          <img src="/images/cenario/petala-individual-4.png" alt="" className="hero-real-petal hero-petal-7" />
          <img src="/images/cenario/petala-individual-5.png" alt="" className="hero-real-petal hero-petal-8" />
        </div>

        <div className="hero-copy hero-anim">
          <div className="hero-kicker">VISAGISMO ANATÔMICO &amp; BIOSSEGURANÇA • 2026</div>
          <h1>
            <span>O OLHAR QUE</span>
            <span>TRANSFORMA <em>sua</em> BELEZA</span>
          </h1>
          <p>
            Extensão de Cílios com isolamento fio a fio e Designer de Sobrancelhas personalizado.<br />
            Realce sua identidade com leveza, peso zero e retenção prolongada.
          </p>
          <div className="hero-primary-actions">
            <button onClick={() => openWhatsApp("Olá Alane! Quero agendar meu horário e transformar meu olhar")} className="hero-book-button">
              <Calendar aria-hidden="true" />
              <span>AGENDAR MEU HORÁRIO</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hero-showcase">
          <div className="hero-center-stage hero-anim">
            <img src="/images/cenario/petala-individual-4.png" alt="" className="stage-real-petal stage-petal-one" />
            <img src="/images/cenario/petala-individual-5.png" alt="" className="stage-real-petal stage-petal-two" />
            <img src="/images/cenario/petala-individual-8.png" alt="" className="stage-real-petal stage-petal-three" />
            <img src="/images/cenario/petala-individual-3.png" alt="" className="stage-real-petal stage-petal-four" />
            {/* Pinça Alane Surmas em destaque sobre o pedestal */}
            <HeroTweezer />
          </div>
        </div>
        <div className="seam-spacer" aria-hidden="true" />
      </section>

      {/* ========================================================
          3. SEÇÃO SOBRE A ALANE & AUTORIDADE (#sobre)
      ======================================================== */}
      <section id="sobre" className="about-reference scroll-mt-28 seam-in">
        <div className="seam-spacer" aria-hidden="true" />
        <div className="about-backlight about-backlight-left" />
        <div className="about-backlight about-backlight-right" />
        <div className="about-floor" />
        <div className="about-bokeh about-bokeh-one" />
        <div className="about-bokeh about-bokeh-two" />
        <div className="about-bokeh about-bokeh-three" />
        <img src="/images/cenario/petala-individual-3.png" alt="" className="about-edge-petal about-edge-petal-a" aria-hidden="true" />
        <img src="/images/cenario/petala-individual-1.png" alt="" className="about-edge-petal about-edge-petal-b" aria-hidden="true" />
        <img src="/images/cenario/petala-individual-8.png" alt="" className="about-edge-petal about-edge-petal-c" aria-hidden="true" />
        <img src="/images/cenario/petala-individual-6.png" alt="" className="about-edge-petal about-edge-petal-d" aria-hidden="true" />

        <div className="about-layout">
          <div className="about-left">
            <div className="about-kicker about-reveal">
              <Sparkles aria-hidden="true" />
              <span>AUTORIDADE &amp; ESSÊNCIA • 2026</span>
            </div>

            <h2 className="about-title about-reveal">
              <span>Conheça a</span>
              <strong><span className="about-name">Alane Surmas</span> <Heart aria-hidden="true" /><i /></strong>
            </h2>

            <p className="about-inspiration about-reveal">“Desperte o Extraordinário que vive em você. Cada olhar tem uma história, em cada aplicação um olhar único e individual.”</p>

            <p className="about-introduction about-reveal">Perfeccionista e detalhista, Alane avalia cada pele e cada estrutura ocular antes de qualquer procedimento. Seu foco absoluto é a saúde dos fios e o visagismo anatômico que valoriza a singularidade de cada mulher com leveza, biossegurança e acolhimento humano.</p>

            <div className="about-qualifications">
              <article className="about-qualification about-reveal">
                <span className="about-qualification-icon"><GraduationCap aria-hidden="true" /></span>
                <div>
                  <h3>INSTITUTO ALE SCHWARZ (2026)</h3>
                  <p>Aperfeiçoamento de excelência nas técnicas de isolamento e aplicação com peso zero para os fios naturais.</p>
                </div>
              </article>

              <article className="about-qualification about-reveal">
                <span className="about-qualification-icon is-gold"><Star aria-hidden="true" /></span>
                <div>
                  <h3>MASTER CLASS DESIGNER 5 ⭐ COM ESTER PAZZINI (2025)</h3>
                  <p>Formação avançada em alinhamento de sobrancelhas, Brow Lamination e visagismo facial proporcional.</p>
                </div>
              </article>

              <article className="about-qualification about-reveal">
                <span className="about-qualification-icon"><ShieldCheck aria-hidden="true" /></span>
                <div>
                  <h3>MEUS NÃOS NA BROW LAMINATION</h3>
                  <p>Compromisso ético inegociável: dominar a técnica para cuidar da pele e dos fios, sem agressões ou processos químicos invasivos.</p>
                </div>
              </article>
            </div>

            <button className="about-contact about-reveal" onClick={() => openWhatsApp("Olá Alane! Gostaria de conversar com você e agendar um horário")}>
              <MessageCircle aria-hidden="true" />
              <span>FALAR COM ALANE</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>

          <div className="about-visual-stage">
            <div className="about-photo-aura" />
            <div className="about-ribbon about-ribbon-back"><span /></div>

            {/* Pétalas Reais Fotográficas 3D ao redor do Card */}
            <img src="/images/cenario/petala-individual-3.png" alt="" className="about-real-petal about-petal-one" aria-hidden="true" />
            <img src="/images/cenario/petala-individual-2.png" alt="" className="about-real-petal about-petal-two" aria-hidden="true" />
            <img src="/images/cenario/petala-individual-7.png" alt="" className="about-real-petal about-petal-three" aria-hidden="true" />
            <img src="/images/cenario/petala-individual-8.png" alt="" className="about-real-petal about-petal-four" aria-hidden="true" />
            <img src="/images/cenario/petala-individual-5.png" alt="" className="about-real-petal about-petal-five" aria-hidden="true" />
            <img src="/images/cenario/petala-individual-1.png" alt="" className="about-real-petal about-petal-six" aria-hidden="true" />

            <div
              className="about-photo-frame"
              onMouseMove={handle3dMouseMove}
              onMouseLeave={handle3dMouseLeave}
              style={{ transform: `perspective(1200px) rotateX(${tilt.y * 0.22}deg) rotateY(${tilt.x * 0.22}deg)` }}
            >
              <div className="about-frame-shine" />
              <div className="about-frame-light" aria-hidden="true" />
              <img src="/images/editorial/alane-editorial-carmim.jpg" alt="Alane Surmas - Fundadora & Master Lash Designer" />

              <div className="about-master-badge"><Crown aria-hidden="true" /><span>MASTER LASH &amp; BROW</span></div>

              <div className="about-handwritten">
                <span>Mais que beleza,</span>
                <strong>confiança</strong>
                <Heart aria-hidden="true" />
              </div>

              <div className="about-values-card">
                <div>
                  <span><Heart aria-hidden="true" /> VALORES INEGOCIÁVEIS</span>
                  <span>GUARANIAÇU, PR</span>
                </div>
                <p>“Fé, gratidão, cuidado e carinho. Atendimento acolhedor onde amo rir e ouvir cada uma de vocês.”</p>
              </div>
            </div>

            <div className="about-ribbon about-ribbon-front"><span /></div>
          </div>
        </div>
        <div className="seam-spacer" aria-hidden="true" />
      </section>

      {/* ========================================================
          4. SEÇÃO PROCEDIMENTOS OFICIAIS COMPLETOS (#procedimentos)
      ======================================================== */}
      <section id="procedimentos" className="procedures-reference scroll-mt-28 seam-in">
        <div className="seam-spacer" aria-hidden="true" />
        <div className="procedures-ambient" aria-hidden="true">
          <div className="procedures-aura procedures-aura-left" />
          <div className="procedures-aura procedures-aura-right" />
          
          {/* Cenário Lateral — Fitas de Vidro 3D e Bokeh Cristalino */}
          <div className="procedures-decor-left">
            <img
              src="/images/cenario/fita-vidro3-transparente.png"
              alt=""
              className="procedures-ribbon-image procedures-ribbon-image-left"
            />
          </div>
          <div className="procedures-decor-right">
            <img
              src="/images/cenario/fita-vidro3-transparente.png"
              alt=""
              className="procedures-ribbon-image procedures-ribbon-image-right"
            />
          </div>
        </div>

        <div className="procedures-content reveal-section">
          <header className="procedures-heading">
            <span className="procedures-kicker">✦ CATÁLOGO DE SERVIÇOS EXCLUSIVOS ✦</span>
            <h2>
              <span>Procedimentos de Assinatura</span>
              <strong>&amp; Cuidados Faciais</strong>
            </h2>
            <div className="procedures-heading-line" aria-hidden="true">
              <Heart />
            </div>
            <p>Atendimento com hora marcada em Guaraniaçu e agendamento especial para Diamante do Sul.</p>
          </header>

          <div className="procedures-grid">
            {procedimentosCompletos.map((proc) => {
              const IconeComponent = proc.icone;
              return (
                <article key={proc.id} className={`procedure-card procedure-card-${proc.id}`}>
                  <div className="procedure-card-inner">
                    <div className="procedure-media">
                      <img
                        src={proc.imagem}
                        alt={`Capa publicitária do procedimento ${proc.nome}`}
                        loading="lazy"
                        style={{ objectPosition: proc.imagemPosicao }}
                      />
                      <div className="procedure-media-tint" />
                      <div className="procedure-icon" aria-hidden="true">
                        <IconeComponent />
                      </div>
                      <span className="procedure-tag">{proc.tag}</span>
                    </div>

                    <div className="procedure-copy">
                      <h3>{proc.nome}</h3>
                      <h4>{proc.subtitulo}</h4>
                      <p>{proc.descricao}</p>
                      <div className="procedure-duration">
                        <Clock aria-hidden="true" />
                        <span>{proc.durabilidade}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openWhatsApp(proc.waMsg)}
                      className="procedure-cta"
                      aria-label={`Agendar ${proc.nome} pelo WhatsApp`}
                    >
                      <span>AGENDAR ESTE SERVIÇO</span>
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="seam-spacer" aria-hidden="true" />
      </section>

      <ResultsSection instagramUrl={INSTAGRAM_URL} instagramHandle={INSTAGRAM_HANDLE} />


      {/* ========================================================
          6. SEÇÃO FEEDBACKS & PROVA SOCIAL (#feedbacks e #depoimentos)
      ======================================================== */}
      <FeedbacksSection depoimentos={depoimentos} />

      {/* ========================================================
          7. SEÇÃO EXPERIÊNCIA EXCLUSIVA (#experiencia)
      ======================================================== */}
      <ExperienceSection onSchedule={openWhatsApp} />

      {/* ========================================================
          8. LOCALIZAÇÃO E ESPAÇO FÍSICO — GUARANIAÇU & DIAMANTE DO SUL (#studio)
      ======================================================== */}
      <StudioSection onSchedule={openWhatsApp} mapsUrl={GOOGLE_MAPS_URL} mapsEmbed={GOOGLE_MAPS_EMBED} />
      {/* ========================================================
          9. FOOTER (100% RESPONSIVO, SEM CORTES E COM RESPIRO INFERIOR)
      ======================================================== */}
      <SiteFooter
        onNavigate={scrollToSection}
        onSchedule={openWhatsApp}
        instagramUrl={INSTAGRAM_URL}
        mapsUrl={GOOGLE_MAPS_URL}
      />

      {/* ========================================================
          10. BOTÃO FLUTUANTE DE WHATSAPP PERSISTENTE
      ======================================================== */}
      {/* Rosa premium que cai pela tela de tempos em tempos */}
      <PremiumRose />

      <aside aria-label="Atendimento rápido no WhatsApp" className="wa-float">
        <div className="wa-float-label">
          <span className="wa-float-dot" aria-hidden="true" />
          <span>Falar com Alane</span>
        </div>
        <button
          type="button"
          onClick={() => openWhatsApp("Olá Alane! Gostaria de tirar uma dúvida e agendar meu atendimento")}
          className="wa-float-btn"
          aria-label="Agendar no WhatsApp"
        >
          <MessageCircle aria-hidden="true" />
        </button>
      </aside>

    </div>
  );
}
