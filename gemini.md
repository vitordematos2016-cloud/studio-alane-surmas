# Constituição do Projeto (gemini.md)

> **Status da Constituição**: Schema Definido | Aguardando Aprovação do Blueprint de Execução  
> **Trava de Segurança**: Scripts em `tools/` e codificação de produção liberados após aprovação do Blueprint.

---

## 1. Esquema de Dados (Data Schemas)

### Schema de Entrada (Input Payload) — Dados Factuais da Profissional
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ProfissionalDataInput",
  "type": "object",
  "properties": {
    "identidade": {
      "type": "object",
      "properties": {
        "nome": { "type": "string", "const": "Alane Surmas" },
        "negocio": { "type": "string", "const": "Alane Surmas, Cílios e Sobrancelhas (Studio Alane Surmas)" },
        "categoria": { "type": "string", "const": "Studio de cílios e sobrancelhas" },
        "instagram": { "type": "string", "const": "@alanesurmas_lashdesigner" },
        "whatsapp": { "type": "string", "const": "(45) 99837-8624" },
        "endereco_atual": { "type": "string", "const": "Rua José Sampaio, 32, 2º andar, sala 203, Lot. Bertuol, Guaraniaçu, PR, 85400-000" },
        "google_maps_link": { "type": "string", "const": "https://maps.app.goo.gl/9Ks8ivoLBf7HH1NUA" },
        "horario": { "type": "string", "const": "Segunda a sábado, das 08:00 às 19:00 (com hora marcada)" }
      },
      "required": ["nome", "negocio", "whatsapp_link", "endereco_atual"]
    },
    "servicos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "nome": { "type": "string" },
          "descricao": { "type": "string" },
          "durabilidade": { "type": "string" },
          "destaque": { "type": "string" }
        },
        "required": ["id", "nome", "descricao"]
      }
    },
    "autoridade": {
      "type": "object",
      "properties": {
        "certificacoes": { "type": "array", "items": { "type": "string" } },
        "posicionamento": { "type": "string" },
        "slogan": { "type": "string" }
      },
      "required": ["certificacoes", "slogan"]
    },
    "depoimentos": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["identidade", "servicos", "autoridade", "depoimentos"]
}
```

### Schema de Saída (Output Payload) — Landing Page Web Interativa
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "LandingPagePayload",
  "type": "object",
  "properties": {
    "site_status": { "type": "string", "enum": ["built", "served", "deployed"] },
    "local_url": { "type": "string" },
    "components": {
      "type": "object",
      "properties": {
        "navbar": { "type": "boolean" },
        "hero_cinematic": { "type": "boolean" },
        "procedimentos_grid": { "type": "boolean" },
        "manifesto_filosofia": { "type": "boolean" },
        "protocolo_atendimento": { "type": "boolean" },
        "depoimentos_reais": { "type": "boolean" },
        "localizacao_studio": { "type": "boolean" },
        "cta_whatsapp_flutuante": { "type": "boolean" },
        "footer": { "type": "boolean" }
      }
    }
  },
  "required": ["site_status", "local_url", "components"]
}
```

---

## 2. Invariantes Arquiteturais
1. **Regra de Ouro da Integridade**: Nunca inventar preços, depoimentos fictícios, premiações ou endereços que não constam em [profissional-dados.md](file:///c:/Users/Nitro/Downloads/alane/profissional-dados.md).
2. **Endereço Correto Obrigatório**: Destacar sempre o endereço oficial confirmado no Google Maps: Rua José Sampaio, 32, 2º Andar, sala 203, Loteamento Bertuol, Guaraniaçu - PR, com link direto https://maps.app.goo.gl/9Ks8ivoLBf7HH1NUA.
3. **Conversão Focada no WhatsApp**: Todos os botões de ação principal (CTA) direcionam diretamente para a mensagem de agendamento no WhatsApp da profissional (`wa.me/5545998378624`).
4. **Design Cinematográfico**:
   - Zero elementos genéricos de IA.
   - Tipografia de luxo (*Playfair Display* + *Outfit*).
   - Animações fluidas e micro-interações magnéticas.
   - Texturas com ruído sutil e efeito glassmorphism.
5. **Autocorreção e Testes**: Qualquer erro no build ou runtime deve ser resolvido deterministicamente antes da entrega final.

---

## 3. Regras Comportamentais
- **Língua**: Português do Brasil em 100% da interface e documentação.
- **Transparência**: Apresentar link clicável imediato para visualização no navegador.
- **Aprovação Prévia**: Execução da construção da página inicia logo após confirmação do Blueprint.
