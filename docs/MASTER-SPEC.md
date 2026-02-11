# Designyx — Full Blueprint v1 (MASTER SPEC)

> Documento definitivo de engenharia para construir um gerador de imagens cinematográficas estilo **Design Builder**, com consistência facial, templates, pipeline crítico, edição pós-geração e infraestrutura completa.

---

## 1. Visão do Produto

O **Designyx** é uma plataforma web que permite:

- Upload de sujeito (rosto/pessoa)
- Upload de referências de estilo (Pinterest/Behance)
- Seleção de formato (Story, Feed, Retrato)
- Escolha de composição (busto, close-up, corpo inteiro)
- Aplicação de atributos estéticos via sliders e presets
- Geração de imagens premium com consistência facial
- Refinamento automático via Critic Loop
- Pós-edição (remove fundo, trocar cenário, props)

**Foco:** resultado cinematográfico, zero engenharia de prompt manual, output pronto para anúncio, perfil ou branding.

---

## 2. Stack Recomendada

| Camada   | Tecnologia                          |
|----------|-------------------------------------|
| Frontend | Next.js 15 (App Router), Tailwind, shadcn/ui, Zustand, React Query |
| Backend  | Supabase (Auth, Postgres, Storage, Edge Functions) |
| AI       | Google Vertex AI Imagen / Gemini Image, Gemini Vision (critic) |
| Infra    | Vercel (frontend), Supabase, Cloud Run (opcional) |

---

## 3. Arquitetura Geral

```
User → Next.js UI → Generation API → Subject Anchor Engine
                                        ↓
                    Prompt Compiler ← Template + Style Matrix
                                        ↓
                    Imagen Generate → Gemini Vision Critic → Refinement Loop
                                        ↓
                    Supabase Storage → User Gallery
```

---

## 4. Template Engine (Preset System)

- **Objetivo:** Presets prontos (foto profissional, gamer thumbnail, influencer lifestyle, branding corporativo).
- **Estrutura:** `basePrompt`, `negativePrompt`, `defaultStyle`.
- **Implementação:** `core/templates/` + tabela `templates` no banco; dropdown no frontend injeta prompt base.

---

## 5. Character Consistency (Subject Lock)

- **Core:** Rosto enviado = âncora rígida.
- **Pipeline:** Upload → Face crop + embedding → Reference injection na chamada Imagen.
- **Storage:** `subject_id`, `embedding_hash`.
- **API:** `{ subjectImage, prompt, lockFace: true }`.
- **Implementação:** `core/subject-lock/`.

---

## 6. Prompt Library (Blocos Modulares)

- **Blocos:** Lighting, Composition, Style, Background, Subject.
- **Compiler:** Junta blocos em prompt final.
- **Exemplo:** `subjectBlock, lightingBlock, compositionBlock, templateBlock, styleBlock` → string final.
- **Implementação:** `core/prompt-library/blocks/` + `compiler.ts`.

---

## 7. Style Matrix (Sobriedade → Criatividade)

| Valor  | Resultado         |
|--------|-------------------|
| 0–30   | Corporate clean   |
| 30–70  | Balanced          |
| 70–100 | Vibrant cinematic |

- **Implementação:** `core/style-matrix/` — injeta sufixo no prompt conforme score.

---

## 8. Critic Loop

- **Fluxo:** Generate Image → Gemini Vision Critic → Prompt Fix Suggestions → Re-generate (max 2–3 iterações).
- **Critic output:** `{ issues: string[], fix: string }`.
- **Implementação:** `core/critic/` (refinement rule-based atual; stub para Vision).

---

## 9. Pós-Geração Editor (MVP3)

- Remove background, change scenery, add props, upscale.
- API: Imagen Edit Mode com `baseImage`, `mask`, `editPrompt`.

---

## 10. Sistema de Créditos

- **users:** `id`, `credits` (balance).
- **credit_transactions:** `user_id`, `amount`, `type` (purchase | use | refund).
- **Dedução:** 1 geração = X créditos; Critic Loop pode contar como múltiplas gerações.

---

## 11. Banco de Dados

| Tabela               | Principais campos                    |
|----------------------|-------------------------------------|
| users                | id, email, credits                  |
| credit_transactions  | user_id, amount, type               |
| subjects             | id, user_id, image_url              |
| style_refs           | id, user_id, image_url              |
| generations          | id, user_id, prompt, image_url, status |
| templates            | id, base_prompt, negative_prompt, default_style |

---

## 12. Endpoints API

### POST /api/generate

**Payload (spec):**
```json
{
  "subjectId": "123",
  "template": "professional_headshot",
  "styleScore": 70,
  "format": "portrait",
  "environment": "modern office"
}
```

**Response:** `{ generationId, status }` ou `{ imageUrl, status, log }`.

### GET /api/generation/:id

Retorna imagem final (ou status).

---

## 13. Deploy

- Vercel (Next.js) + Supabase + Vertex AI (ou Replicate) API key.
- Env: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `VERTEX_API_KEY` / `REPLICATE_API_TOKEN`, `IMAGEN_MODEL_ID`.

---

## 14. Roadmap

| Sprint | Foco                          |
|--------|-------------------------------|
| 1      | Auth, upload sujeito, prompt compiler, generate 1-shot |
| 2      | Template system, subject lock, gallery |
| 3      | Critic Loop, Style Matrix     |
| 4      | Post-edit, credits + Stripe   |

---

## Definição de Pronto (Design Builder level)

- Gera 5 variações consistentes
- Rosto travado em 90%+
- Critic melhora resultado automaticamente
- Output 2752×1536
