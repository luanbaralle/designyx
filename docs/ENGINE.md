# Designyx — Engine (Motor)

Documentação da organização do **motor** da aplicação, alinhada ao [MASTER-SPEC](./MASTER-SPEC.md). O frontend (Next.js UI) não é descrito aqui.

---

## Estrutura do core

```
core/
├── templates/          §4 Template Engine (presets)
│   ├── types.ts
│   ├── presets.ts     # default presets (professional_headshot, gamer_thumbnail, etc.)
│   └── index.ts
│
├── subject-lock/       §5 Character Consistency (Subject Lock)
│   ├── types.ts       # SubjectAnchor, SubjectLockInput
│   ├── identity.ts    # buildSubjectContext, validateSubjectUrl
│   └── index.ts
│
├── prompt-library/     §6 Prompt Library (blocos modulares)
│   ├── blocks/
│   │   ├── subject.ts
│   │   ├── lighting.ts
│   │   ├── composition.ts
│   │   ├── style.ts
│   │   └── background.ts
│   ├── compiler.ts    # compilePrompt(input) → string, getNegativePrompt
│   ├── styles.ts      # getStylePrompt (legado)
│   ├── compositions.ts
│   ├── lighting.ts
│   └── index.ts
│
├── style-matrix/       §7 Style Matrix (0–100 → corporate | balanced | vibrant)
│   └── index.ts       # getStyleMatrixSuffix(styleScore), clampStyleScore
│
├── critic/             §8 Critic Loop
│   ├── types.ts       # CriticResult, CriticLoopOptions
│   ├── critic.ts      # refinePrompt (rule-based), visionCritic (stub)
│   ├── loop.ts        # runCriticLoop({ initialPrompt }, { maxIterations })
│   └── index.ts
│
├── engine/             Orquestração (pipeline de geração)
│   ├── director.ts    # buildPrompt(DirectorInput) → usa compiler + style-matrix
│   ├── renderer.ts    # renderImage(prompt, subjectImageUrl) → Replicate/placeholder
│   └── pipeline.ts   # runPipeline(input) → Director → Critic Loop → Renderer
│
└── face-lock/          Legado; preferir subject-lock
    └── identity.ts
```

---

## Fluxo de geração

1. **API** `POST /api/generate` recebe body (subjectUrl, style, composition, lighting, templateId?, styleScore?, …).
2. **Pipeline** (`core/engine/pipeline.ts`):
   - **Director:** monta o prompt com `compilePrompt` (blocos + template) e `getStyleMatrixSuffix(styleScore)`.
   - **Critic:** `runCriticLoop({ initialPrompt }, { maxIterations: 2 })` → prompt refinado.
   - **Renderer:** `renderImage({ prompt, subjectImageUrl })` → URL da imagem (Replicate ou placeholder).
3. Resultado é salvo em `generations` e devolvido ao cliente.

---

## Banco de dados (engine)

- **Schema:** `db/schema.sql` (Master Spec §11 + §10).
- Tabelas principais para o motor: `users`, `credit_transactions`, `subjects`, `style_refs`, `generations`, `templates`, `uploads`.
- RLS e trigger de usuário novo estão no mesmo arquivo.

---

## Integração com o frontend

- O frontend **não** foi alterado; continua chamando:
  - `POST /api/uploads` (file, type)
  - `POST /api/generate` (subjectUrl, style, composition, lighting, headline, cta, …)
  - `GET /api/credits`
- O motor aceita ainda `templateId` e `styleScore` no body de `/api/generate` para alinhamento futuro com o spec (templates e Style Matrix).

---

## Próximos passos (spec)

- Carregar templates da tabela `templates` (hoje só presets em código).
- Implementar Gemini Vision no Critic (`visionCritic`) e usar imagem gerada no loop.
- Registrar `credit_transactions` em toda dedução de crédito.
- Opcional: dual-write em `subjects` / `style_refs` ao fazer upload (hoje só `uploads`).
