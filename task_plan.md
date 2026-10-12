# Plano de Tarefas (task_plan.md) — Protocolo V.L.A.E.G.

## Visão Geral do Projeto
- **Projeto**: Landing Page Cinematográfica de Alto Luxo — Studio Alane Surmas
- **Protocolo**: V.L.A.E.G. (Visão, Link, Arquitetura, Estilo, Gatilho)
- **Status Atual**: Fase 4 Concluída (Aplicação construída, estilizada e servida localmente)

---

## Fases do Projeto

### Fase 0: Inicialização do Protocolo
- [x] Inicialização da memória do projeto ([task_plan.md](file:///c:/Users/Nitro/Downloads/alane/task_plan.md), [findings.md](file:///c:/Users/Nitro/Downloads/alane/findings.md), [progress.md](file:///c:/Users/Nitro/Downloads/alane/progress.md))
- [x] Definição da constituição do projeto ([gemini.md](file:///c:/Users/Nitro/Downloads/alane/gemini.md))

### Fase 1: V — Visão (e Lógica)
- [x] Extração e validação estrita dos dados em [profissional-dados.md](file:///c:/Users/Nitro/Downloads/alane/profissional-dados.md)
- [x] Coleta das 4 perguntas estratégicas com o usuário
- [x] Seleção e adaptação do design de referência de alto luxo (blush acetinado, orbe carmim radiante, tipografia editorial)

### Fase 2: L — Link (Conectividade)
- [x] Links de conversão integrados para o WhatsApp oficial (`wa.me/5545998378624`)
- [x] Link do perfil oficial do Instagram (`@alanesurmas_lashdesigner`)
- [x] Endereço físico oficial confirmado no Google Maps: Rua José Sampaio, 32, sala 203, Lot. Bertuol (https://maps.app.goo.gl/9Ks8ivoLBf7HH1NUA)

### Fase 3: A — Arquitetura (Construção Técnica)
- [x] Setup do Vite com React 19, Tailwind CSS e GSAP
- [x] Componentização em [App.jsx](file:///c:/Users/Nitro/Downloads/alane/src/App.jsx)
- [x] Criação de micro-interações (Shuffler, Typewriter, Agenda)

### Fase 4: E — Estilo (Refinamento Cinematográfico)
- [x] Implementação fiel do design de referência enviado pelo usuário:
  - Orbe carmim profundo radiante e halos de luz
  - Brilhos de 4 pontas (*sparkles*) e glassmorphism suave
  - Botões em pílula com efeito magnético e sombras suaves
  - Tipografia de luxo (*Playfair Display*, *Cormorant Garamond*, *Plus Jakarta Sans*)
- [x] Validação do build de produção (`npm run build`)
- [x] Servidor local ativo em `http://127.0.0.1:5173/`

### Fase 5: G — Gatilho (Próximos Passos Opcionais)
- [ ] Deploy na nuvem / VPS via Coolify caso solicitado pelo usuário
