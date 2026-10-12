import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  MessageCircle, 
  Instagram, 
  ArrowRight, 
  Heart, 
  Crown, 
  Sparkle, 
  Check, 
  AlertCircle,
  Award,
  CheckCircle2,
  Calendar,
  Eye,
  Wand2,
  Compass,
  Box,
  Image as ImageIcon,
  Navigation,
  ExternalLink,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Feather,
  Leaf
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dados Factuais Validados de Alane Surmas
const WHATSAPP_URL = "https://wa.me/5545998378624";
const WHATSAPP_DISPLAY = "(45) 99837-8624";
const INSTAGRAM_URL = "https://instagram.com/alanesurmas_lashdesigner";
const INSTAGRAM_HANDLE = "@alanesurmas_lashdesigner";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/9Ks8ivoLBf7HH1NUA";
const GOOGLE_MAPS_EMBED = "https://maps.google.com/maps?q=-25.0996104,-52.8704132&hl=pt-BR&z=17&output=embed";
const ENDERECO_GUARANIACU = "Rua José Sampaio, 32 - 2º Andar, Sala 203 - Loteamento Bertuol, Guaraniaçu - PR, CEP 85400-000";
const ENDERECO_CURTO = "Rua José Sampaio, 32 • Sala 203";
const BAIRRO_GUARANIACU = "Lot. Bertuol • Guaraniaçu, PR";

export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedHeroProcedure, setSelectedHeroProcedure] = useState(0);
  const [isPlayingProcedure, setIsPlayingProcedure] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);

  // Showcase Interativo de Procedimentos (Card Lateral Estilo NutriVa / Nickelfox)
  const heroProcedures = [
    {
      id: "volume-brasileiro",
      nome: "Volume Brasileiro",
      tag: "O Mais Pedido 💖",
      sub: "Fios em Y com Curvatura Elegante",
      detalhe: "Proporciona volume sutil e delineado com peso zero sobre o fio natural.",
      retencao: "15 a 21 dias",
      img: "/resultado-volume-brasileiro.jpg"
    },
    {
      id: "volume-4d",
      nome: "Volume 4D",
      tag: "O Queridinho ✨",
      sub: "Densidade com Toque Aveludado",
      detalhe: "Fans ultrafinos para quem busca olhar expressivo, marcante e sedutor.",
      retencao: "15 a 21 dias",
      img: "/resultado-volume-4d.jpg"
    },
    {
      id: "lash-lifting",
      nome: "Lash Lifting",
      tag: "Naturalidade Pura 🌿",
      sub: "Alongamento e Curvatura dos Próprios Fios",
      detalhe: "Eleva e curva os próprios cílios naturais sem fios postiços, trazendo praticidade diária.",
      retencao: "5 a 7 semanas",
      img: "/resultado-lash-lifting.jpg"
    },
    {
      id: "brow-lamination",
      nome: "Brow Lamination",
      tag: "Design & Alinhamento 👑",
      sub: "Sobrancelhas Cheias e Nutridas",
      detalhe: "Fios penteados para cima com fixação disciplinada e nutrição celular profunda.",
      retencao: "5 a 8 semanas",
      img: "/resultado-brow-lamination.jpg"
    }
  ];

  // Auto-rotação do player interativo
  useEffect(() => {
    if (!isPlayingProcedure) return;
    const interval = setInterval(() => {
      setSelectedHeroProcedure((prev) => (prev + 1) % heroProcedures.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingProcedure, heroProcedures.length]);

  // Lista de Atalhos com IDs 100% correspondentes
  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'procedimentos', label: 'Procedimentos' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'feedbacks', label: 'Feedbacks' },
    { id: 'studio', label: 'Studio' },
  ];

  // Catálogo Oficial Completo dos 6 Procedimentos de Alane Surmas
  const procedimentosCompletos = [
    {
      id: "extensao",
      nome: "Extensão de Cílios",
      subtitulo: "Volume Brasileiro & Volume 4D",
      tag: "O Mais Pedido 💖",
      icone: Crown,
      descricao: "Fios tecnológicos ultrafinos em formato Y (Brasileiro) ou fans aveludados (4D). Personalizados para efeito Natural, Levemente Delineado ou Gatinho, com leveza absoluta e isolamento perfeito.",
      durabilidade: "Manutenção a cada 15-21 dias",
      waMsg: "Olá Alane! Gostaria de agendar meu horário para Extensão de Cílios 💕"
    },
    {
      id: "lifting",
      nome: "Lash Lifting Nutritivo",
      subtitulo: "Curvatura dos Cílios Naturais",
      tag: "Naturalidade Pura 🌿",
      icone: Eye,
      descricao: "Curva, levanta, alinha e tinge os seus próprios cílios biológicos desde a raiz. Cria um efeito de curvex permanente com hidratação e nutrição profunda dos fios.",
      durabilidade: "Duração prolongada de 5 a 7 semanas",
      waMsg: "Olá Alane! Gostaria de saber mais e agendar o Lash Lifting 🌿"
    },
    {
      id: "brow_lamination",
      nome: "Brow Lamination",
      subtitulo: "Alinhamento & Encorpamento",
      tag: "Tendência de Luxo ✨",
      icone: Sparkles,
      descricao: "Técnica que reposiciona os fios das sobrancelhas para cobrir falhas e criar espessura harmônica e encorpada. Nutre a fibra capilar e deixa o visual moderno e alinhado.",
      durabilidade: "Duração de 5 a 8 semanas nos fios",
      waMsg: "Olá Alane! Gostaria de agendar minha Brow Lamination ✨"
    },
    {
      id: "designer",
      nome: "Designer de Sobrancelhas",
      subtitulo: "Mapeamento Anatômico & Henna / Tintura",
      tag: "Visagismo Único 👑",
      icone: Compass,
      descricao: "Estudo individual das proporções e simetria do seu rosto. Limpeza precisa na pinça ou linha, com aplicação personalizada de Henna (cobre falhas) ou Tintura (cobre fios brancos e define).",
      durabilidade: "Henna dura 3 a 5 dias na pele e até 15 dias no pelo",
      waMsg: "Olá Alane! Gostaria de agendar o Design Personalizado de Sobrancelhas 👑"
    },
    {
      id: "spa_duplo",
      nome: "SPA Labial & SPA Sobrancelhas",
      subtitulo: "Hidratação & Renovação Celular",
      tag: "Cuidado Profundo 💋",
      icone: Heart,
      descricao: "Protocolo duplo revitalizante: esfoliação suave, remoção de células mortas, máscara nutritiva e hidratação celular intensa para lábios aveludados e sobrancelhas brilhantes e macias.",
      durabilidade: "Efeito imediato de viço e rejuvenescimento",
      waMsg: "Olá Alane! Gostaria de incluir o SPA Labial e SPA Sobrancelhas no meu agendamento 💋"
    },
    {
      id: "dermaplaning",
      nome: "Dermaplaning Facial",
      subtitulo: "Esfoliação Mecânica & Pele de Seda",
      tag: "Viço Imediato 💎",
      icone: Wand2,
      descricao: "Procedimento estético refinado que utiliza lâmina cirúrgica para remover suavemente as células mortas e a penugem facial superficial. Devolve a luminosidade natural, uniformiza a textura e potencializa a absorção de cosméticos.",
      durabilidade: "Renovação celular instantânea",
      waMsg: "Olá Alane! Gostaria de agendar uma sessão de Dermaplaning Facial 💎"
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
    const text = encodeURIComponent(msg || "Olá Alane! Vim pelo site e gostaria de agendar um horário exclusivo com você 💕");
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  // Rolagem suave com compensação da barra fixa
  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -90;
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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroEls = document.querySelectorAll('.hero-anim');
      if (heroEls.length > 0) {
        gsap.from(".hero-anim", {
          opacity: 0,
          y: 25,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out"
        });
      }

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

      {/* ========================================================
          1. HEADER / NAVBAR FIXA FLUTUANTE GRUDADA NO TOPO (DESKTOP E MOBILE)
      ======================================================== */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#F8EFEA]/95 backdrop-blur-md py-2.5 sm:py-3 shadow-md border-b border-velvet-800/10" 
          : "bg-[#F8EFEA]/90 backdrop-blur-md py-2.5 sm:py-4 border-b border-velvet-800/5 shadow-xs"
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
          
          {/* LINHA 1: LOGO ALANE SURMAS + BOTÃO AGENDAR */}
          <div className="flex items-center justify-between gap-3">
            {/* LOGO ALANE SURMAS */}
            <a 
              href="#inicio" 
              onClick={(e) => scrollToSection(e, 'inicio')}
              className="flex items-center gap-2.5 sm:gap-3 group select-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-velvet-800 via-velvet-900 to-velvet-950 flex items-center justify-center text-champagne-200 font-brand font-bold text-xs sm:text-sm tracking-widest shadow-md group-hover:scale-105 transition-transform border border-champagne-300/30">
                AS
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="font-brand font-bold text-sm sm:text-base md:text-lg tracking-[0.22em] text-[#1D1416] group-hover:text-velvet-800 transition-colors leading-none">
                  ALANE SURMAS
                </span>
                <div className="flex items-center gap-1 mt-1 sm:mt-1.5">
                  <span className="h-[1px] w-2.5 sm:w-3 bg-velvet-700/40" />
                  <span className="text-[7.5px] sm:text-[8.5px] font-sans font-bold tracking-[0.32em] sm:tracking-[0.38em] text-velvet-800 uppercase leading-none">
                    Cílios & Sobrancelhas
                  </span>
                  <span className="h-[1px] w-2.5 sm:w-3 bg-velvet-700/40" />
                </div>
              </div>
            </a>

            {/* ATALHOS CENTRAIS PARA DESKTOP (BORDA GIRANDO EM LOOP CONTÍNUO) */}
            <nav className="hidden lg:flex items-center justify-center">
              <div className="rotating-border-wrapper">
                <div className="rotating-border-beam" />
                
                <div className="rotating-border-inner px-2 py-1.5 flex items-center gap-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => scrollToSection(e, link.id)}
                        className={`relative px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          isActive 
                            ? "bg-gradient-to-r from-velvet-800 to-velvet-900 text-white shadow-sm scale-100" 
                            : "text-[#3A2428]/80 hover:text-velvet-800 hover:bg-velvet-800/5"
                        }`}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 shadow-[0_0_6px_rgba(255,230,180,0.9)] inline-block shrink-0" />
                        )}
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* BOTÃO AGENDAR (DESKTOP E MOBILE) */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => openWhatsApp("Olá Alane! Gostaria de agendar um atendimento exclusivo.")}
                className="btn-pill-velvet px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] flex items-center gap-1.5 sm:gap-2 group cursor-pointer shadow-sm"
              >
                <span>Agendar</span>
                <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* LINHA 2 (EXCLUSIVA MOBILE): BARRA DE ATALHOS GRUDADA EM CIMA COM DESIGN LUXUOSO E DISCRETO */}
          <div className="lg:hidden w-full pt-1.5 pb-1 flex justify-center">
            <div className="rotating-border-wrapper shadow-sm max-w-full">
              <div className="rotating-border-beam" />
              <div 
                className="rotating-border-inner px-1.5 py-1 flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[94vw] scroll-smooth select-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className={`relative px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        isActive 
                          ? "bg-gradient-to-r from-velvet-800 to-velvet-900 text-[#FAF3EF] shadow-xs" 
                          : "text-[#4A2E33]/80 hover:text-velvet-800 hover:bg-velvet-800/5"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 shadow-[0_0_6px_rgba(255,230,180,0.9)] inline-block shrink-0" />
                      )}
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================
          2. HERO SECTION EXPANSIVA (TELA CHEIA, SEM CARD FECHADO & ORGANIZAÇÃO PANORÂMICA)
      ======================================================== */}
      <section id="inicio" className="relative w-full min-h-[92vh] sm:min-h-screen pt-32 sm:pt-36 pb-12 px-4 sm:px-8 md:px-12 overflow-hidden bg-gradient-to-b from-[#FBF5F0] via-[#F6ECE4] to-[#F8EFEA] scroll-mt-32 flex flex-col justify-between">
        
        {/* Efeitos de Luz e Partículas Quentes Fluindo na Tela Inteira */}
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] bg-champagne-300/35 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] bg-rose-200/25 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* ----------------------------------------------------
            HEADER EDITORIAL PANORÂMICO E ESPAÇOSO (ELIMINA O AMONTOADO NA ESQUERDA)
        ---------------------------------------------------- */}
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12 relative z-10 px-4">
          
          {/* Tag Superior Minimalista */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-velvet-800/10 shadow-xs mb-3.5">
            <span className="w-2 h-2 rounded-full bg-velvet-800 animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-velvet-950">
              Visagismo Anatômico & Biossegurança • 2026
            </span>
          </div>

          {/* Título Monumental & Fluido com Respiração */}
          <h1 className="font-brand font-black text-4xl sm:text-6xl lg:text-[4.4rem] text-[#1D1416] leading-[1.04] tracking-tight uppercase">
            O Olhar Que Transforma <span className="text-velvet-950 font-serif italic font-normal lowercase block sm:inline">sua</span> Beleza
          </h1>

          {/* Subtítulo Elegante e Informativo */}
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-[#523A3E] max-w-2xl mx-auto font-medium leading-relaxed">
            Extensão de Cílios com isolamento fio a fio e Designer de Sobrancelhas personalizado. Realce sua identidade com leveza, peso zero e retenção prolongada.
          </p>
        </div>

        {/* ----------------------------------------------------
            PALCO VISUAL TRIPLO EM HARMONIA PERFEITA (3 COLUNAS BALANCEADAS)
        ---------------------------------------------------- */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10 my-auto">
          
          {/* COLUNA ESQUERDA: CARD COM O VÍDEO REAL DO PROCEDIMENTO (ALANE EM AÇÃO) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="w-full max-w-[325px] rounded-3xl bg-white/90 backdrop-blur-md p-3.5 border border-white shadow-xl hover:shadow-2xl transition-all group">
              
              {/* Header do Card com Status e Autoridade */}
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse inline-block" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-velvet-950">
                    Alane em Ação
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-velvet-900 text-champagne-200 border border-champagne-300/30 shadow-xs">
                  ★ Master Brow
                </span>
              </div>

              {/* Container do Vídeo na Proporção Exata do Arquivo (528/752) — 100% Visível */}
              <div className="relative w-full aspect-[528/752] rounded-2xl overflow-hidden mb-2.5 bg-[#FAF4F0] shadow-inner border border-velvet-800/10">
                <video 
                  src="/video-alane-arrumando-sombrancelha-gigante.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Informações Editoriais e Lema Oficial Abaixo do Vídeo */}
              <div className="px-1 pt-0.5">
                <div className="flex items-center justify-between text-[10.5px] font-bold text-velvet-950 mb-1">
                  <span>Design & Alinhamento de Fios</span>
                  <span className="text-velvet-800 font-semibold text-[9px] uppercase tracking-wider">Guaraniaçu, PR</span>
                </div>
                <p className="font-script text-base text-velvet-900 leading-snug">
                  “Permita-se a viver a beleza que existe em você através do seu olhar”
                </p>
              </div>
            </div>
          </div>

          {/* COLUNA CENTRAL: O ELEMENTO CENTRAL FLUTUANTE COM 3 PILLS ORBITAIS */}
          <div className="lg:col-span-4 relative flex justify-center items-center py-6 select-none min-h-[380px]">
            
            {/* Sombra Suave no Piso Virtual */}
            <div className="absolute bottom-2 w-64 sm:w-72 h-10 bg-velvet-950/10 blur-2xl rounded-full pointer-events-none -z-0" />

            {/* O ELEMENTO CENTRAL 3D FLUTUANTE LIVRE NO AR */}
            <div 
              className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] cursor-grab active:cursor-grabbing transition-transform duration-300"
              onMouseMove={handle3dMouseMove}
              onMouseLeave={handle3dMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y * 0.6}deg) rotateY(${tilt.x * 0.6}deg)`,
                filter: 'drop-shadow(0 25px 35px rgba(120, 24, 36, 0.20))'
              }}
            >
              <img 
                src="/lash-tweezers-transparent.png" 
                alt="Pinça de precisão cirúrgica e cílios de luxo Studio Alane Surmas" 
                className="w-full h-auto object-contain pointer-events-none select-none animate-float-3d"
              />
            </div>

            {/* PILL 1 FLUTUANTE (SUPERIOR ESQUERDA) */}
            <div className="absolute top-4 left-1 sm:-left-4 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-velvet-800/10 shadow-lg animate-float-slow hover:scale-105 transition-transform select-none">
              <div className="w-5 h-5 rounded-full bg-velvet-800 text-champagne-200 flex items-center justify-center shrink-0">
                <Feather className="w-3 h-3" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-[#1D1416] leading-none">Peso Zero</p>
                <p className="text-[8.5px] text-[#7A555D] mt-0.5 font-semibold">Isolamento Fio a Fio</p>
              </div>
            </div>

            {/* PILL 2 FLUTUANTE (CENTRO DIREITA) */}
            <div 
              className="absolute top-1/2 right-1 sm:-right-6 -translate-y-1/2 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-800/15 shadow-lg animate-float-slow hover:scale-105 transition-transform select-none"
              style={{ animationDelay: '1.6s' }}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Leaf className="w-3 h-3" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-[#1D1416] leading-none">Biossegurança</p>
                <p className="text-[8.5px] text-emerald-800 mt-0.5 font-semibold">Saúde dos Seus Fios</p>
              </div>
            </div>

            {/* PILL 3 FLUTUANTE (INFERIOR DIREITA) */}
            <div 
              className="absolute bottom-4 right-1 sm:-right-3 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-champagne-500/20 shadow-lg animate-float-slow hover:scale-105 transition-transform select-none"
              style={{ animationDelay: '3.2s' }}
            >
              <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Crown className="w-3 h-3" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-[#1D1416] leading-none">15 a 21 Dias</p>
                <p className="text-[8.5px] text-amber-800 mt-0.5 font-semibold">Retenção Prolongada</p>
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA: CARD SHOWCASE INTERATIVO (PROCEDIMENTOS) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-3xl bg-white/85 backdrop-blur-md p-5 border border-white shadow-xl flex flex-col justify-between">
              
              {/* Header do Card */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-velvet-800">
                    VISAGISMO & ESTILO
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-velvet-800/10 text-velvet-900 text-[9px] font-bold uppercase tracking-wider">
                    {heroProcedures[selectedHeroProcedure].tag}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1D1416] leading-tight">
                  {heroProcedures[selectedHeroProcedure].nome}
                </h3>
                <p className="text-xs text-[#523A3E] mt-1 line-clamp-2">
                  {heroProcedures[selectedHeroProcedure].detalhe}
                </p>
              </div>

              {/* Imagem Macro do Procedimento */}
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 border border-velvet-800/10 shadow-inner group">
                <img 
                  src={heroProcedures[selectedHeroProcedure].img} 
                  alt={heroProcedures[selectedHeroProcedure].nome} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[9.5px] font-bold uppercase tracking-wider">
                  {heroProcedures[selectedHeroProcedure].retencao}
                </div>
              </div>

              {/* Controles Estilo Player (Previous, Play/Pause, Next, Shuffle) */}
              <div className="flex items-center justify-between px-2 pt-2 border-t border-velvet-800/10">
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setSelectedHeroProcedure((prev) => (prev - 1 + heroProcedures.length) % heroProcedures.length)}
                    className="w-8 h-8 rounded-full hover:bg-velvet-800/10 text-[#4A3236] hover:text-velvet-900 flex items-center justify-center transition-colors cursor-pointer"
                    title="Procedimento anterior"
                    aria-label="Procedimento anterior"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setIsPlayingProcedure(!isPlayingProcedure)}
                    className="w-9 h-9 rounded-full bg-velvet-800 hover:bg-velvet-900 text-white flex items-center justify-center shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    title={isPlayingProcedure ? "Pausar alternância" : "Iniciar alternância"}
                    aria-label={isPlayingProcedure ? "Pausar alternância" : "Iniciar alternância"}
                  >
                    {isPlayingProcedure ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button 
                    onClick={() => setSelectedHeroProcedure((prev) => (prev + 1) % heroProcedures.length)}
                    className="w-8 h-8 rounded-full hover:bg-velvet-800/10 text-[#4A3236] hover:text-velvet-900 flex items-center justify-center transition-colors cursor-pointer"
                    title="Próximo procedimento"
                    aria-label="Próximo procedimento"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    let next;
                    do {
                      next = Math.floor(Math.random() * heroProcedures.length);
                    } while (next === selectedHeroProcedure && heroProcedures.length > 1);
                    setSelectedHeroProcedure(next);
                  }}
                  className="w-8 h-8 rounded-full hover:bg-velvet-800/10 text-[#4A3236] hover:text-velvet-900 flex items-center justify-center transition-colors cursor-pointer"
                  title="Alternar aleatório"
                  aria-label="Alternar aleatório"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

              </div>

            </div>
          </div>

        </div>

        {/* ----------------------------------------------------
            FAIXA INFERIOR DE AGENDAMENTO VIP E ENDEREÇO OFICIAL
        ---------------------------------------------------- */}
        <div className="max-w-7xl mx-auto w-full mt-10 sm:mt-14 pt-6 border-t border-velvet-800/10 flex flex-col md:flex-row items-center justify-between gap-4 px-4 relative z-10 text-center md:text-left">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-xs text-[#523A3E] text-center sm:text-left">
            <span className="font-bold text-[#1D1416] flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-velvet-800" />
              Guaraniaçu (Seg. a Sáb.) & Diamante do Sul
            </span>
            <span className="hidden sm:inline text-velvet-800/30">•</span>
            <span>Rua José Sampaio, 32 • Sala 203 • Lot. Bertuol</span>
          </div>

          <button 
            onClick={() => openWhatsApp("Olá Alane! Quero agendar meu atendimento exclusivo e transformar meu olhar 💕")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-pill-velvet text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 group cursor-pointer shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <span>Agendar Horário Exclusivo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

        </div>

      </section>

      {/* ========================================================
          3. SEÇÃO SOBRE A ALANE & AUTORIDADE (#sobre)
      ======================================================== */}
      <section id="sobre" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#220308] via-[#38060F] to-[#4A0A14] text-white border-t border-velvet-800/30 scroll-mt-28 overflow-hidden">
        
        {/* Luzes Suaves & Efeitos Teatrais de Fundo */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-velvet-700/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="star-flare-4 top-16 right-20 opacity-70">
          <Sparkle className="w-5 h-5 text-champagne-200 fill-champagne-200" />
        </div>
        <div className="star-flare-4 bottom-24 left-16 opacity-50">
          <Sparkle className="w-4 h-4 text-champagne-300 fill-champagne-300" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center reveal-section relative z-10">
          
          {/* COLUNA ESQUERDA: AUTORIDADE, HISTÓRIA & FORMAÇÃO (CENTRALIZADO NO MOBILE, EDITORIAL NO DESKTOP) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-champagne-300/30 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-champagne-200 mb-3.5 shadow-sm mx-auto lg:mx-0">
                <Sparkles className="w-3 h-3 text-champagne-300" />
                <span>Autoridade & Essência • 2026</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                Conheça a <span className="font-script text-5xl sm:text-6xl text-champagne-300 font-normal block sm:inline drop-shadow-[0_2px_15px_rgba(229,211,176,0.35)]">Alane Surmas</span>
              </h2>
            </div>

            <p className="font-serif text-base sm:text-lg italic text-champagne-200 border-y lg:border-y-0 lg:border-l-2 border-champagne-400/30 lg:border-champagne-400/70 py-2.5 lg:py-1 pl-0 lg:pl-4 leading-relaxed max-w-xl">
              “Desperte o Extraordinário que vive em você. Cada olhar tem uma história, em cada aplicação um olhar único e individual.”
            </p>

            <p className="text-sm sm:text-base text-champagne-100/80 leading-relaxed font-sans max-w-xl">
              Perfeccionista e detalhista, Alane avalia cada pele e cada estrutura ocular antes de qualquer procedimento. Seu foco absoluto é a saúde dos fios e o visagismo anatômico que valoriza a singularidade de cada mulher com leveza, biossegurança e acolhimento humano.
            </p>

            {/* CARDS DE FORMAÇÃO E CERTIFICAÇÕES EM GLASSMORPHISM DE LUXO */}
            <div className="space-y-3 pt-2 w-full max-w-md lg:max-w-none text-left">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-champagne-300/20 hover:border-champagne-300/40 shadow-xl flex items-start gap-3.5 sm:gap-4 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velvet-800 to-velvet-950 border border-champagne-300/30 text-champagne-200 flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <Award className="w-4 h-4 text-champagne-300" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-champagne-200">Instituto Ale Schwarz (2026)</h4>
                  <p className="text-xs text-champagne-100/75 mt-0.5 leading-relaxed">Aperfeiçoamento de excelência nas técnicas de isolamento e aplicação com peso zero para os fios naturais.</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-champagne-300/20 hover:border-champagne-300/40 shadow-xl flex items-start gap-3.5 sm:gap-4 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velvet-800 to-velvet-950 border border-champagne-300/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-champagne-200">Master Class Designer 5⭐ com Ester Pazzini (2025)</h4>
                  <p className="text-xs text-champagne-100/75 mt-0.5 leading-relaxed">Formação avançada em alinhamento de sobrancelhas, Brow Lamination e visagismo facial proporcional.</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-champagne-300/20 hover:border-champagne-300/40 shadow-xl flex items-start gap-3.5 sm:gap-4 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velvet-800 to-velvet-950 border border-champagne-300/30 text-champagne-300 flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4 text-champagne-300" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-champagne-200">Meus Nãos na Brow Lamination</h4>
                  <p className="text-xs text-champagne-100/75 mt-0.5 leading-relaxed">Compromisso ético inegociável: dominar a técnica para cuidar da pele e dos fios, sem agressões ou processos químicos invasivos.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => openWhatsApp("Olá Alane! Gostaria de conversar com você e agendar um horário 💕")}
                className="btn-pill-velvet border border-champagne-300/40 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 cursor-pointer shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-white w-full sm:w-auto"
              >
                <span>Falar com Alane</span>
                <ArrowRight className="w-3.5 h-3.5 text-champagne-300" />
              </button>
            </div>
          </div>

          {/* COLUNA DIREITA: RETRATO EDITORIAL DE ALTO LUXO DA ALANE */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Aura de Luxo de Fundo */}
            <div className="absolute -inset-6 bg-gradient-to-br from-velvet-700/30 via-champagne-400/15 to-transparent rounded-[3.5rem] blur-3xl pointer-events-none -z-0" />

            {/* MOLDURA EDITORIAL DE ALTO LUXO */}
            <div className="relative z-10 w-full max-w-md rounded-[2.8rem] bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-3 sm:p-4 border border-champagne-300/35 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] group">
              
              {/* Badge de Autoridade Flutuante Superior */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-champagne-200 shadow-xl border border-champagne-300/30">
                <Crown className="w-3.5 h-3.5 text-champagne-400" />
                <span>Master Lash & Brow</span>
              </div>

              {/* FOTO EDITORIAL DA ALANE SURMAS (COM ESPAÇO AMPLIADO NO TOPO E CABELO NATURAL) */}
              <div className="relative rounded-[2.2rem] overflow-hidden shadow-2xl bg-[#1A0306]">
                <img 
                  src="/alane-editorial-carmim.jpg?v=2" 
                  alt="Alane Surmas - Fundadora & Master Lash Designer" 
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 select-none"
                />
              </div>

              {/* CARD DE VALORES INEGOCIÁVEIS NA BASE */}
              <div className="mt-3.5 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-champagne-300/25 shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-champagne-300 flex items-center gap-1.5">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    Valores Inegociáveis
                  </span>
                  <span className="text-[9px] font-bold text-champagne-200/80 uppercase tracking-wider">
                    Guaraniaçu, PR
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base italic text-champagne-100/90 leading-snug">
                  “Fé, gratidão, cuidado e carinho. Atendimento acolhedor onde amo rir e ouvir cada uma de vocês.”
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          4. SEÇÃO PROCEDIMENTOS OFICIAIS COMPLETOS (#procedimentos)
      ======================================================== */}
      <section id="procedimentos" className="py-24 md:py-28 px-6 md:px-12 bg-gradient-to-b from-[#781824] via-[#66121D] to-[#540C15] text-white relative overflow-hidden scroll-mt-28">
        
        <div className="star-flare-4 top-12 left-16">
          <Sparkle className="w-6 h-6 text-white fill-white opacity-80" />
        </div>
        <div className="star-flare-4 bottom-16 right-16">
          <Sparkle className="w-8 h-8 text-[#FAF6EE] fill-[#FAF6EE] opacity-90" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 reveal-section">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E5D3B0] block mb-2">
              CATÁLOGO DE SERVIÇOS EXCLUSIVOS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-3">
              Procedimentos de Assinatura <br />
              <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#F2E8D3] font-normal">
                & Cuidados Faciais
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-blush-200/80 leading-relaxed max-w-lg mx-auto">
              Atendimento com hora marcada em Guaraniaçu e agendamento especial para Diamante do Sul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {procedimentosCompletos.map((proc) => {
              const IconeComponent = proc.icone;
              return (
                <div 
                  key={proc.id}
                  className="card-pearl-lux rounded-3xl p-8 text-[#1E1214] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-velvet-800 to-velvet-950 flex items-center justify-center text-[#F2E8D3] shadow-md group-hover:scale-105 transition-transform">
                        <IconeComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-velvet-800/10 text-velvet-900 border border-velvet-800/15">
                        {proc.tag}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1E1214] mb-1">
                      {proc.nome}
                    </h3>
                    <p className="text-xs font-bold text-[#8A1F2C] mb-3">
                      {proc.subtitulo}
                    </p>

                    <p className="text-xs text-[#523A3E] leading-relaxed mb-5">
                      {proc.descricao}
                    </p>

                    <div className="py-2.5 px-3 rounded-xl bg-[#F8EFEA] text-[11px] text-[#3D2529] font-medium flex items-center gap-2 mb-6">
                      <Clock className="w-3.5 h-3.5 text-velvet-800 shrink-0" />
                      <span>{proc.durabilidade}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => openWhatsApp(proc.waMsg)}
                    className="w-full py-3 rounded-full btn-pill-velvet text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-glow-velvet transition-all"
                  >
                    <span>Agendar Este Serviço</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. SEÇÃO RESULTADOS & MÉTRICAS (#resultados)
      ======================================================== */}
      <section id="resultados" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#F3E5DD]/60 via-[#F8EFEA] to-[#F3E5DD]/40 border-t border-velvet-800/10 scroll-mt-28">
        <div className="max-w-7xl mx-auto space-y-16 reveal-section">
          
          {/* TOPO: TÍTULO EDITORIAL & INTRODUÇÃO */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velvet-800/10 border border-velvet-800/20 text-velvet-800 text-[10.5px] font-bold uppercase tracking-[0.25em] mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-velvet-700" />
              <span>Portfólio Oficial • @alanesurmas_lashdesigner</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1214] font-normal leading-tight mb-4">
              Transformação Real. <br />
              <span className="font-script text-5xl sm:text-6xl text-velvet-800 font-normal">Resultados Reais.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4A3236] leading-relaxed">
              Procedimentos executados com excelência no Studio Alane Surmas em Guaraniaçu. Veja como a técnica correta de visagismo, o isolamento fio a fio e a biossegurança proporcionam um olhar marcante com saúde biológica preservada.
            </p>
          </div>

          {/* AS 3 MÉTRICAS DE AUTORIDADE & PILARES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#FAF3EF]/80 backdrop-blur-xs border border-[#E8D4C8] rounded-2xl p-6 text-center flex flex-col items-center shadow-xs hover:border-velvet-800/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F3E5DD] border border-[#E8D4C8] shadow-xs flex items-center justify-center text-velvet-800 mb-3">
                <Sparkles className="w-5 h-5 text-velvet-700" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1214] mb-1">
                Volume Brasileiro & 4D
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-velvet-800 mb-2">
                O MAIS PEDIDO
              </span>
              <p className="text-xs text-[#5C3F45] leading-relaxed">
                Efeito leve, delineado e marcante sem sobrecarregar ou danificar os fios naturais.
              </p>
            </div>

            <div className="bg-[#FAF3EF]/80 backdrop-blur-xs border border-[#E8D4C8] rounded-2xl p-6 text-center flex flex-col items-center shadow-xs hover:border-velvet-800/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F3E5DD] border border-[#E8D4C8] shadow-xs flex items-center justify-center text-velvet-800 mb-3">
                <Clock className="w-5 h-5 text-velvet-700" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1214] mb-1">
                5 a 8 Semanas
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-velvet-800 mb-2">
                DURABILIDADE SUPERIOR
              </span>
              <p className="text-xs text-[#5C3F45] leading-relaxed">
                Lash Lifting e Brow Lamination com fixação prolongada e nutrição ativa contínua.
              </p>
            </div>

            <div className="bg-[#FAF3EF]/80 backdrop-blur-xs border border-[#E8D4C8] rounded-2xl p-6 text-center flex flex-col items-center shadow-xs hover:border-velvet-800/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F3E5DD] border border-[#E8D4C8] shadow-xs flex items-center justify-center text-velvet-800 mb-3">
                <ShieldCheck className="w-5 h-5 text-velvet-700" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1214] mb-1">
                Avaliação Individual
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-velvet-800 mb-2">
                SAÚDE BIOLÓGICA
              </span>
              <p className="text-xs text-[#5C3F45] leading-relaxed">
                Mapeamento visagista exclusivo. "Meus Nãos na Brow Lamination" protegem sua pele e fios.
              </p>
            </div>
          </div>

          {/* VITRINE VISUAL DE RESULTADOS REAIS */}
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-velvet-800 block">
                  Galeria de Procedimentos
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1214] font-medium">
                  Resultados Feitos por Alane Surmas
                </h3>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-velvet-800/20 bg-white/80 hover:bg-velvet-800 hover:text-white text-velvet-800 text-xs font-bold uppercase tracking-wider transition-all shadow-xs group"
              >
                <Instagram className="w-4 h-4 text-velvet-700 group-hover:text-white transition-colors" />
                <span>Ver +170 Posts no Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* CARD 1: VOLUME BRASILEIRO */}
              <div className="group bg-[#FAF3EF] border border-[#E8D4C8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-velvet-800/40 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img 
                    src="/resultado-volume-brasileiro.jpg" 
                    alt="Resultado Volume Brasileiro feito por Alane Surmas" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1D1416]/80 backdrop-blur-xs text-champagne-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-champagne-300/20">
                    O Mais Pedido 💖
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-velvet-800 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    Manutenção: 15-21 dias
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1E1214] group-hover:text-velvet-800 transition-colors">
                      Volume Brasileiro
                    </h4>
                    <p className="text-xs text-[#5C3F45] mt-1 leading-relaxed">
                      Fios em formato Y aplicados com isolamento milimétrico. Efeito delineado elegante com peso zero.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E8D4C8]/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-velvet-800 uppercase tracking-wider">
                      Fios Y Leves
                    </span>
                    <button
                      onClick={() => openWhatsApp("Olá Alane! Amei o resultado do Volume Brasileiro e gostaria de agendar um horário!")}
                      className="text-xs font-bold text-velvet-800 hover:text-velvet-950 flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>Agendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2: BROW LAMINATION */}
              <div className="group bg-[#FAF3EF] border border-[#E8D4C8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-velvet-800/40 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img 
                    src="/resultado-brow-lamination.jpg" 
                    alt="Resultado Brow Lamination feito por Alane Surmas" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1D1416]/80 backdrop-blur-xs text-champagne-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-champagne-300/20">
                    Design & Visagismo 👑
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-velvet-800 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    Dura: 5 a 8 semanas
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1E1214] group-hover:text-velvet-800 transition-colors">
                      Brow Lamination
                    </h4>
                    <p className="text-xs text-[#5C3F45] mt-1 leading-relaxed">
                      Alinhamento estratégico dos fios para cima, disfarçando falhas e encorpando o arco com nutrição ativa.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E8D4C8]/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-velvet-800 uppercase tracking-wider">
                      Fios Alinhados
                    </span>
                    <button
                      onClick={() => openWhatsApp("Olá Alane! Amei o resultado da Brow Lamination e gostaria de agendar!")}
                      className="text-xs font-bold text-velvet-800 hover:text-velvet-950 flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>Agendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 3: LASH LIFTING */}
              <div className="group bg-[#FAF3EF] border border-[#E8D4C8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-velvet-800/40 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img 
                    src="/resultado-lash-lifting.jpg" 
                    alt="Resultado Lash Lifting feito por Alane Surmas" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1D1416]/80 backdrop-blur-xs text-champagne-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-champagne-300/20">
                    Naturalidade Pura 🌿
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-velvet-800 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    Dura: 5 a 7 semanas
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1E1214] group-hover:text-velvet-800 transition-colors">
                      Lash Lifting & Botox
                    </h4>
                    <p className="text-xs text-[#5C3F45] mt-1 leading-relaxed">
                      Elevação e curvatura dos seus próprios cílios com hidratação e tintura preta. Efeito curvex diário sem fios postiços.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E8D4C8]/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-velvet-800 uppercase tracking-wider">
                      Cílios Naturais
                    </span>
                    <button
                      onClick={() => openWhatsApp("Olá Alane! Gostaria de agendar o procedimento de Lash Lifting!")}
                      className="text-xs font-bold text-velvet-800 hover:text-velvet-950 flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>Agendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 4: VOLUME 4D */}
              <div className="group bg-[#FAF3EF] border border-[#E8D4C8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-velvet-800/40 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img 
                    src="/resultado-volume-4d.jpg" 
                    alt="Resultado Volume 4D feito por Alane Surmas" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1D1416]/80 backdrop-blur-xs text-champagne-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-champagne-300/20">
                    O Queridinho ✨
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-velvet-800 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    Manutenção: 15-21 dias
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1E1214] group-hover:text-velvet-800 transition-colors">
                      Volume 4D Aveludado
                    </h4>
                    <p className="text-xs text-[#5C3F45] mt-1 leading-relaxed">
                      Fans artesanais ultrafinos para um olhar denso, aberto e glamouroso, mantendo o toque macio e arejado.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E8D4C8]/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-velvet-800 uppercase tracking-wider">
                      Olhar Marcante
                    </span>
                    <button
                      onClick={() => openWhatsApp("Olá Alane! Amei o Volume 4D e gostaria de agendar meu atendimento!")}
                      className="text-xs font-bold text-velvet-800 hover:text-velvet-950 flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>Agendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BANNER DE INTEGRAÇÃO COM INSTAGRAM REAL */}
          <div className="rounded-2xl bg-gradient-to-r from-velvet-950 via-velvet-900 to-[#1D1416] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-velvet-800/30">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Instagram className="w-7 h-7" />
              </div>
              <div>
                <span className="text-champagne-300 text-[10.5px] font-bold uppercase tracking-[0.22em] block mb-0.5">
                  Atualizado Semanalmente
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">
                  Siga @alanesurmas_lashdesigner no Instagram
                </h4>
                <p className="text-xs text-rose-100/70 mt-1 max-w-xl">
                  Acompanhe stories diários, bastidores dos procedimentos, vídeos em macro e depoimentos reais de quem transforma o olhar em Guaraniaçu.
                </p>
              </div>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-velvet bg-white hover:bg-champagne-100 text-velvet-950 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0 cursor-pointer transition-all hover:scale-102"
            >
              <span>Acessar Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. SEÇÃO FEEDBACKS & PROVA SOCIAL (#feedbacks e #depoimentos)
      ======================================================== */}
      <section id="feedbacks" className="py-24 md:py-28 px-6 md:px-12 bg-[#F8EFEA] relative scroll-mt-28">
        <span id="depoimentos" className="absolute -top-28" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center reveal-section">
          
          {/* COLUNA ESQUERDA: VÍDEO REAL DE FEEDBACKS EM LOOP CONTÍNUO */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Anéis de Luz Suaves de Fundo */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full concentric-ring-1 pointer-events-none" />
            <div className="absolute w-84 sm:w-96 h-84 sm:h-96 rounded-full concentric-ring-2 pointer-events-none" />

            {/* Botão Anterior */}
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + depoimentos.length) % depoimentos.length)}
              className="absolute -left-3 sm:-left-6 z-20 w-11 h-11 rounded-full bg-velvet-800 hover:bg-velvet-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Depoimento Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Container do Vídeo Real com Proporção Nativa (560/688) */}
            <div className="w-56 sm:w-64 aspect-[560/688] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-8 ring-velvet-800/5 bg-[#FAF4F0] z-10 relative group">
              <video 
                src="/video-feedbacks.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />

              {/* Badge Flutuante no Topo do Vídeo */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-bold text-velvet-950 uppercase tracking-wider shadow-sm flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse inline-block" />
                <span>Feedbacks do Studio</span>
              </div>
            </div>

            {/* Botão Próximo */}
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % depoimentos.length)}
              className="absolute -right-3 sm:-right-6 z-20 w-11 h-11 rounded-full bg-velvet-800 hover:bg-velvet-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Próximo Depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-velvet-800 block mb-2 mx-auto lg:mx-0">
              FEEDBACKS REAIS 💝
            </span>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1E1214] font-normal leading-snug mb-5">
              "{depoimentos[activeTestimonial].citacao}"
            </p>
            <p className="text-xs sm:text-sm text-[#523A3E] leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              {depoimentos[activeTestimonial].detalhe}
            </p>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-9 h-9 rounded-full bg-velvet-800 text-[#FAF6EE] flex items-center justify-center font-bold text-xs shrink-0">
                AS
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#1E1214]">
                  {depoimentos[activeTestimonial].autora}
                </h4>
                <p className="text-[10px] text-velvet-800 font-semibold tracking-wider">
                  {depoimentos[activeTestimonial].cargo}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6 justify-center lg:justify-start">
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === i ? "w-6 bg-velvet-800" : "w-1.5 bg-velvet-800/25"
                  }`}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          7. BANNER DE FECHAMENTO ILUMINADO & VITRINE DE TRANSFORMAÇÃO
      ======================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative banner-glass-glow rounded-3xl md:rounded-[3.5rem] p-6 sm:p-10 md:p-16 overflow-hidden reveal-section border-2 border-white/90 shadow-[0_30px_70px_-20px_rgba(84,12,21,0.22)]">
          
          {/* Luzes de Fundo & Atmosfera */}
          <div className="absolute -right-24 -bottom-24 w-[28rem] h-[28rem] rounded-full orb-glow-radiant opacity-70 pointer-events-none" />
          <div className="absolute top-10 left-1/3 w-72 h-72 rounded-full bg-champagne-300/20 blur-3xl pointer-events-none" />
          
          {/* Anéis Concêntricos Sutis de Fundo */}
          <div className="absolute -right-28 -bottom-28 w-[38rem] h-[38rem] rounded-full border border-velvet-800/10 pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-[30rem] h-[30rem] rounded-full border border-champagne-400/20 pointer-events-none" />

          {/* Sparkles de Alta Joalheria */}
          <div className="star-flare-4 top-8 right-16 opacity-80">
            <Sparkle className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="star-flare-4 bottom-12 left-12 opacity-60">
            <Sparkle className="w-4 h-4 text-velvet-800 fill-velvet-800" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* COLUNA ESQUERDA: PROPOSTA DE VALOR & MINI-CARDS DE DIFERENCIAIS (CENTRALIZADO NO MOBILE) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velvet-800/10 border border-velvet-800/15 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-velvet-900 mb-3.5 shadow-xs mx-auto lg:mx-0">
                  <Sparkles className="w-3.5 h-3.5 text-velvet-800" />
                  <span>Experiência Exclusiva • Studio Alane Surmas</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1214] font-normal leading-[1.18]">
                  A sua beleza não precisa de esforço. <br />
                  Você merece acordar com um <br />
                  <span className="font-script text-5xl sm:text-6xl md:text-7xl text-velvet-800 font-normal block sm:inline drop-shadow-[0_2px_12px_rgba(120,24,36,0.18)]">
                    olhar extraordinário.
                  </span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#4A3236] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Acorde pronta todos os dias com a elegância e a leveza que você merece. No Studio Alane Surmas, cada aplicação é desenhada sob medida com visagismo anatômico para harmonizar com o seu rosto, trazendo praticidade real para a sua rotina e elevando a sua confiança.
              </p>

              {/* 3 DIFERENCIAIS VIP EM MINI-CARDS DE DETALHES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 w-full max-w-lg lg:max-w-none text-left">
                <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-xl bg-velvet-800/10 text-velvet-800 flex items-center justify-center mb-2 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-velvet-800" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#1E1214] uppercase tracking-wider">Peso Zero Real</h4>
                  <p className="text-[10.5px] text-[#523A3E] mt-0.5 leading-snug">Preservação total da saúde e crescimento dos fios naturais.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center mb-2 shadow-2xs">
                    <Clock className="w-4 h-4 text-amber-700" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#1E1214] uppercase tracking-wider">Alta Retenção</h4>
                  <p className="text-[10.5px] text-[#523A3E] mt-0.5 leading-snug">Durabilidade de 20 a 30 dias com técnicas de isolamento de ponta.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-700 flex items-center justify-center mb-2 shadow-2xs">
                    <Heart className="w-4 h-4 text-rose-700 fill-rose-700/30" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#1E1214] uppercase tracking-wider">Visagismo Único</h4>
                  <p className="text-[10.5px] text-[#523A3E] mt-0.5 leading-snug">Estudo anatômico exclusivo para valorizar o formato dos seus olhos.</p>
                </div>
              </div>

              {/* BOTÃO DE AÇÃO & PROVA SOCIAL */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                <button 
                  onClick={() => openWhatsApp("Olá Alane! Quero agendar meu horário e garantir minha vaga no Studio 💕")}
                  className="btn-pill-velvet px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 cursor-pointer group shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                >
                  <span>Agendar Horário Exclusivo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-[#523A3E]">
                  <div className="flex -space-x-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1E1214]">
                    5.0 • Atendimento com Hora Marcada
                  </span>
                </div>
              </div>

            </div>

            {/* COLUNA DIREITA: VITRINE FOTOGRÁFICA DE TRANSFORMAÇÃO & BADGES FLUTUANTES */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Moldura Principal de Luxo */}
              <div className="relative z-10 w-full max-w-sm sm:max-w-md rounded-[2.5rem] bg-white/90 backdrop-blur-2xl p-3 sm:p-4 border-2 border-white shadow-2xl group">
                
                {/* Imagem Macro de Alta Fidelidade */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/4.2] bg-[#1E0408] shadow-inner">
                  <img 
                    src="/lash-macro-procedure.jpg" 
                    alt="Resultado Perfeito de Extensão de Cílios e Sobrancelhas no Studio Alane Surmas" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badge no Topo da Imagem */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-champagne-300" />
                    <span>Resultado Real • Studio Alane</span>
                  </div>

                  {/* Legenda na Base da Imagem */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-serif text-sm font-normal italic drop-shadow-md">
                      “A curvatura ideal para iluminar a sua expressão.”
                    </p>
                  </div>
                </div>

                {/* Badge Flutuante 1: Biossegurança & Isolamento */}
                <div className="absolute -bottom-4 -left-3 sm:-left-6 z-20 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-velvet-800/10 shadow-xl flex items-center gap-2.5 animate-float-3d">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#1E1214] uppercase tracking-wider">
                      Isolamento Perfeito
                    </span>
                    <span className="block text-[9px] text-[#523A3E]">
                      Sem dor, sem ardência
                    </span>
                  </div>
                </div>

                {/* Badge Flutuante 2: Selo Master VIP */}
                <div className="absolute -top-3 -right-2 sm:-right-4 z-20 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-velvet-800 to-velvet-950 text-champagne-200 border border-champagne-300/30 shadow-xl flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-wider">
                  <Crown className="w-3 h-3 text-champagne-400" />
                  <span>Excelência 2026</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          8. LOCALIZAÇÃO E ESPAÇO FÍSICO — GUARANIAÇU & DIAMANTE DO SUL (#studio)
      ======================================================== */}
      <section id="studio" className="py-20 px-6 md:px-12 bg-[#F3E5DD]/40 border-t border-velvet-800/10 scroll-mt-28 relative">
        <span id="localizacao" className="absolute -top-28" />

        <div className="max-w-6xl mx-auto reveal-section">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-velvet-800 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>ONDE ATENDEMOS</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1214] font-normal mb-3">
              Espaço Físico & Atendimento Regional
            </h3>
            <p className="text-xs sm:text-sm text-[#523A3E]">
              Studio fixo completo em Guaraniaçu e atendimento exclusivo mediante agendamento em Diamante do Sul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* UNIDADE GUARANIAÇU */}
            <div className="card-pearl-lux rounded-3xl p-8 border border-white/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-velvet-800/10 text-velvet-900 text-[10px] font-bold uppercase tracking-wider">
                    Studio Principal
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Segunda a Sábado</span>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-2xl text-[#1E1214] mb-2">
                  Guaraniaçu, PR
                </h4>
                <p className="text-xs sm:text-sm text-[#523A3E] leading-relaxed mb-4">
                  <strong>Endereço Oficial:</strong> {ENDERECO_GUARANIACU}
                </p>


                <div className="space-y-2 text-xs text-[#523A3E] mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-velvet-800" />
                    <span>08:00 às 19:00 (Com hora marcada)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-velvet-800" />
                    <span>Ambiente climatizado, poltrona de luxo e privacidade</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button 
                  onClick={() => openWhatsApp("Olá Alane! Gostaria de agendar meu horário em Guaraniaçu.")}
                  className="w-full sm:flex-1 py-3.5 rounded-full btn-pill-velvet text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Agendar em Guaraniaçu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a 
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white border border-velvet-800/20 hover:bg-velvet-50 text-velvet-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-velvet-700" />
                  <span>Traçar Rota</span>
                </a>
              </div>
            </div>

            {/* UNIDADE DIAMANTE DO SUL */}
            <div className="card-pearl-lux rounded-3xl p-8 border border-white/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-champagne-500/20 text-[#6B4B17] text-[10px] font-bold uppercase tracking-wider">
                    Atendimento Regional
                  </span>
                  <div className="flex items-center gap-1.5 text-velvet-800 text-[10px] font-bold">
                    <Calendar className="w-3.5 h-3.5 text-velvet-800" />
                    <span>Datas Especiais</span>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-2xl text-[#1E1214] mb-2">
                  Diamante do Sul, PR
                </h4>
                <p className="text-xs sm:text-sm text-[#523A3E] leading-relaxed mb-4">
                  Atendimento com toda a excelência e técnica do Studio Alane Surmas para as clientes de Diamante do Sul.
                </p>

                <div className="p-4 rounded-2xl bg-[#F8EFEA] border border-velvet-800/10 text-xs text-[#523A3E] leading-relaxed mb-6">
                  <p className="font-bold text-[#1E1214] mb-1">Como funciona em Diamante do Sul?</p>
                  <p>Os atendimentos acontecem <strong>através de agendamento prévio</strong> com vagas limitadas. Fale diretamente no WhatsApp para verificar os próximos dias e garantir seu horário.</p>
                </div>

                <div className="space-y-2 text-xs text-[#523A3E] mb-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-velvet-800" />
                    <span>Extensão de Cílios, Lifting, Brow e Dermaplaning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-velvet-800" />
                    <span>Atendimento exclusivo e individualizado</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => openWhatsApp("Olá Alane! Gostaria de saber as próximas datas e agendar em Diamante do Sul.")}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D6BB88] to-[#C5A059] hover:from-[#C5A059] hover:to-[#B59048] text-[#2B050A] text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>Agendar em Diamante do Sul</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* MAPA INTERATIVO OFICIAL DO GOOGLE MAPS */}
          <div className="card-pearl-lux rounded-3xl p-6 md:p-8 border border-white/95 shadow-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-velvet-800/10 text-velvet-800 flex items-center justify-center shrink-0 shadow-xs">
                  <Navigation className="w-5 h-5 text-velvet-800" />
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-serif font-bold text-xl text-[#1E1214] leading-tight">
                      Localização Oficial no Google Maps
                    </h4>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9.5px] font-bold uppercase tracking-wider">
                      Verificado
                    </span>
                  </div>
                  <p className="text-xs text-[#633B42] mt-0.5">
                    {ENDERECO_GUARANIACU}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-start">
                <a 
                  href={GOOGLE_MAPS_URL} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full sm:w-auto px-6 py-3 rounded-full btn-pill-velvet text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir no Aplicativo do Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Visualizador do Mapa Embutido */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-velvet-800/15 shadow-inner bg-[#F1E5DD]">
              <iframe 
                src={GOOGLE_MAPS_EMBED} 
                title="Mapa Oficial Studio Alane Surmas em Guaraniaçu" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          9. FOOTER (100% RESPONSIVO, SEM CORTES E COM RESPIRO INFERIOR)
      ======================================================== */}
      <footer className="bg-[#540C15] text-[#FAF6EE] pt-14 sm:pt-16 pb-28 sm:pb-14 px-4 sm:px-8 md:px-12 border-t border-[#781824] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-brand font-semibold text-xl tracking-[0.28em] uppercase text-white mb-1">
              ALANE SURMAS
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5D3B0] font-bold">
              Cílios & Sobrancelhas
            </span>
            <p className="text-xs text-blush-200/70 mt-2 font-script text-base">
              “Permita-se a viver a beleza que existe em você através do seu olhar”
            </p>
          </div>

          {/* ATALHOS COM FLEX-WRAP PARA NUNCA MAIS CORTAR TEXTO EM TELAS MENORES */}
          <nav aria-label="Navegação do Rodapé" className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2.5 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#E5D3B0] max-w-xl mx-auto md:mx-0">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)}
                className="hover:text-white transition-colors py-1 px-1.5 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href={GOOGLE_MAPS_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-velvet-700 flex items-center justify-center transition-colors text-white shadow-xs"
              aria-label="Localização no Google Maps da Alane Surmas"
              title="Abrir no Google Maps"
            >
              <MapPin className="w-4 h-4" />
            </a>
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-velvet-700 flex items-center justify-center transition-colors text-white shadow-xs"
              aria-label="Instagram da Alane Surmas"
              title="Instagram Oficial"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button 
              onClick={() => openWhatsApp("Olá Alane! Gostaria de conversar com você.")}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-velvet-700 flex items-center justify-center transition-colors text-white cursor-pointer shadow-xs"
              aria-label="WhatsApp da Alane Surmas"
              title="Falar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col lg:flex-row items-center justify-between text-[11px] text-[#D1B4A0]/80 gap-5 text-center">
          <p className="order-1">
            © {new Date().getFullYear()} Studio Alane Surmas • Guaraniaçu & Diamante do Sul.
          </p>
          
          <p className="order-2 flex items-center gap-1.5 justify-center">
            <span>"Desperte o extraordinário que vive em você"</span>
            <Heart className="w-3.5 h-3.5 text-champagne-400 fill-champagne-400" />
          </p>

          {/* CRÉDITOS: DESENVOLVIDO POR MATOS SOLUÇÕES COM LINK DIRETO PARA WHATSAPP */}
          <div className="order-3 flex items-center justify-center">
            <a
              href="https://wa.me/5545998378795?text=Ol%C3%A1%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20Sites!"
              target="_blank"
              rel="noopener noreferrer"
              title="Falar com Matos Soluções no WhatsApp"
              className="inline-flex items-center gap-2.5 group cursor-pointer transition-all duration-300"
            >
              <span className="text-[10px] text-[#E5D3B0]/75 group-hover:text-[#E5D3B0] uppercase tracking-widest font-semibold transition-colors">
                Desenvolvido por
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 shadow-xs group-hover:scale-105">
                <img 
                  src="/logo-matos-solucoes-transparent.png" 
                  alt="Matos Soluções" 
                  className="h-6 sm:h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.30)] group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.60)] transition-all" 
                />
              </div>
            </a>
          </div>
        </div>
      </footer>

      {/* ========================================================
          10. BOTÃO FLUTUANTE DE WHATSAPP PERSISTENTE
      ======================================================== */}
      <aside aria-label="Atendimento rápido no WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-full shadow-lg border border-velvet-800/15 text-[11px] font-bold text-velvet-950">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Falar com Alane</span>
        </div>
        <button
          onClick={() => openWhatsApp("Olá Alane! Gostaria de tirar uma dúvida e agendar meu atendimento 💖")}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-white/60"
          aria-label="Agendar no WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white/20" />
        </button>
      </aside>

    </div>
  );
}
