# CLAUDE.md - Sistema de Generación de Videos AI

## 🎯 Visión General

Este es un **sistema de producción de videos AI profesional** que integra:
- **Claude Code CLI** (tú, interactuando conmigo)
- **n8n** (servidor que genera imágenes, videos, audio, música)
- **Obsidian** (donde revisas y apruebas cada elemento)
- **Node.js scripts** (automatización y orquestación)

El objetivo es crear un **flujo ágil y profesional** donde:
1. Defines qué quieres (script + dirección de arte)
2. Yo genero los prompts inteligentemente
3. n8n genera la media en paralelo
4. Tú apruebas o pides cambios en Obsidian
5. Iteramos hasta perfeccionar
6. Exportas todo listo para editar

---

## 🔄 Flujo Completo (De Principio a Fin)

### Fase 1: Setup del Proyecto
```
Usuario: "Crea un proyecto nuevo"
         ↓
yo ejecuto: npm run new-project "Nombre"
         ↓
Se crean:
  - vault/projects/nombre/
  - media/nombre/
  - Script.md
  - Direccion-Arte.md
```

### Fase 2: Definición del Script
```
Usuario: Edita Script.md (define los shots)

Script.md:
# Mi Video
### Shot 01
- Duración: 5
- Descripción: Un astronauta flotando en el espacio

### Shot 02
- Duración: 3
- Descripción: Vista de la galaxia
```

### Fase 3: Parsear Script
```
Usuario: "Parsea los shots"
         ↓
yo ejecuto: npm run parse-script "nombre"
         ↓
Se crean:
  - shot-01.md
  - shot-02.md
  - etc.

Cada shot tiene checkboxes para:
  □ First frame
  □ Last frame
  □ Video
  □ Audio
  □ Música
```

### Fase 4: Dirección de Arte
```
Usuario: Edita Direccion-Arte.md en Obsidian

Define:
- Paleta de colores
- Estilo visual
- Mood/atmósfera
- Referencias visuales
```

### Fase 5: Generar Media (El Corazón del Sistema)
```
Usuario: "Genera first-frame para shot-01"
         ↓
yo:
  1. Leo shot-01.md (enunciado, duración)
  2. Leo Direccion-Arte.md (estilo, mood, colores)
  3. Construyo prompt inteligente combinando todo
  4. Envío a n8n vía HTTP
  5. n8n genera imagen
  6. Guardo URL en shot-01.md
         ↓
Obsidian muestra:
  [x] First frame generado

  Archivo: first-frame.png
  Status: Pendiente de aprobación
```

### Fase 6: Revisión y Aprobación en Obsidian
```
Usuario: Abre Obsidian → shot-01.md

VE:
- Imagen del first-frame
- Checkbox para aprobar
- Campo de feedback

ACCIONES:
  ☑ Aprobado! → checkbox a ✅
  O
  ☐ Necesita cambios → agrega feedback
```

### Fase 7: Iterar si es Necesario
```
Usuario: "Last frame necesita cambios, más épico"
         ↓
Usuario: Edita el prompt en shot-01.md
         ↓
Usuario: "Regenera last-frame"
         ↓
yo: Tomo el nuevo prompt y envío a n8n
         ↓
Se actualiza el archivo
```

### Fase 8: Generar Video, Audio, Música (En Paralelo)
```
Usuario: "Genera video, audio y música para shot-01"
         ↓
yo: Envío 3 requests en paralelo a n8n
         ↓
Mientras se generan:
  - Video (5-30 seg)
  - Audio (narración)
  - Música (fondo)
         ↓
Se guardan todas las URLs
         ↓
Obsidian actualiza mostrando todas
```

### Fase 9: Repetir para Todos los Shots
```
Haces esto para cada shot:
  shot-01 ✅ (completo)
  shot-02 🔄 (generando)
  shot-03 ⏳ (pendiente)
  etc.
```

### Fase 10: Export Final
```
Usuario: "Export final"
         ↓
yo: Copia todos los assets a media/nombre/final/
         ↓
Tienes todo organizado para editar en:
  - Adobe Premiere
  - DaVinci
  - Final Cut Pro
  - etc.
```

---

## 🛠️ Cómo Funciona Cada Componente

### 1. Node.js Scripts (Automatización)

**new-project.js**
```
Crea la estructura para un nuevo proyecto
npm run new-project "Mi Video"
→ Crea carpetas + templates
```

**parse-script.js**
```
Lee Script.md y crea un archivo .md por cada shot
npm run parse-script "mi-video"
→ Extrae "### Shot 01", "### Shot 02", etc.
→ Crea shot-01.md, shot-02.md, etc.
```

**generate-media.js**
```
Toma un enunciado + dirección de arte
Construye el prompt perfecto
Lo envía a n8n
npm run generate "proyecto" "shot-01" "first-frame"
→ Construye prompt
→ Envía a n8n
→ Guarda resultado
```

### 2. Prompt Builder (El Cerebro)

Cuando ejecutas `generate`, internamente:

```javascript
// 1. Leo el shot
enunciado = "Un astronauta flotando en el espacio"
duracion = "5"

// 2. Leo la dirección de arte
estilo = "Cinematográfico realista"
mood = "Épico y contemplativo"
colores = ["#1a2b3c", "#ff6b35"]

// 3. Construyo el prompt combinando TODO:
prompt = `
Genera una imagen de ultra alta calidad:

Descripción: Un astronauta flotando en el espacio

Estilo: Cinematográfico realista
Atmósfera: Épico y contemplativo
Paleta: Azul oscuro, naranja cálido

Técnico:
- 1920x1080
- Ultra HD
- Composición profesional
- Iluminación artística
- Sin watermark
`

// 4. Lo envío a n8n
```

**Por qué esto es poderoso:**
- Los prompts son **contextuales** (saben sobre el proyecto)
- Son **consistentes** (mismo estilo para todos los shots)
- Son **profesionales** (tienen parámetros técnicos)
- Son **iterables** (puedo modificarlos basado en feedback)

### 3. Cliente n8n (La Conexión)

```javascript
// Envía requests HTTP a tu webhook n8n
POST https://tu-n8n.com/webhook/generate-media

Body:
{
  type: "image",
  project: "mi-video",
  shotId: "shot-01",
  prompt: "...",
  artDirection: { style, mood, colors },
  params: { width: 1920, height: 1080, ... }
}

Response:
{
  success: true,
  jobId: "abc123",
  status: "completed",
  result: { url: "https://..." }
}
```

### 4. Obsidian (La Interfaz de Control)

**¿Por qué Obsidian?**
- ✅ Ver imágenes inline (preview de media)
- ✅ Checklists para aprobaciones
- ✅ Notas de feedback
- ✅ Links entre shots
- ✅ Búsqueda poderosa
- ✅ Sin dependencias externas

**Estructura en Obsidian:**
```
vault/
├── projects/
│   └── mi-video/
│       ├── Script.md (masterfile)
│       ├── Direccion-Arte.md (referencia visual)
│       ├── shot-01.md (AQUÍ VES LAS IMÁGENES)
│       │   ├── first-frame.png ✅
│       │   ├── last-frame.png ⏳
│       │   ├── video.mp4 ⏳
│       │   └── [checklists + feedback]
│       ├── shot-02.md
│       └── ...
```

**En Obsidian ves algo así:**

```markdown
# Shot 01

## Componentes
- [x] First frame aprobado ✅
  Archivo: [[first-frame.png]]
  Feedback: Perfecto, épico

- [ ] Last frame generado ⏳
  Archivo: [[last-frame.png]]
  Feedback: Muy oscuro, más luz
  Nuevo prompt: "...cambios aquí..."

- [ ] Video aprobado
  ...
```

**¿Cómo fluye?**
1. Yo genero media
2. Guardo URLs en los archivos .md
3. Tú ves las imágenes en Obsidian
4. Pones checkboxes
5. Escribes feedback
6. Me lo comunicas
7. Regenero con los cambios

---

## 📋 Workflow Típico (Paso a Paso)

### Ejemplo: Video de 3 Shots, 30 segundos total

**Día 1: Setup**
```
Tú: "Crea proyecto 'Space Adventure'"

Yo:
  npm run new-project "Space Adventure"
  → Se crea toda la estructura

Tú: Edita Script.md
### Shot 01 - Intro
- Duración: 10
- Descripción: Astronauta en cápsula, mirando el espacio

### Shot 02 - Space
- Duración: 12
- Descripción: Viaje a través de la galaxia

### Shot 03 - Landing
- Duración: 8
- Descripción: Aterrizaje en planeta

Yo: npm run parse-script "space-adventure"
→ Crea shot-01.md, shot-02.md, shot-03.md

Tú: Edita Direccion-Arte.md en Obsidian
- Estilo: Cinematográfico futurista
- Mood: Épico y aventurero
- Colores: Azul, morado, naranja
- Referencias: Interstellar, 2001: Space Odyssey
```

**Día 2: Generar Frames**
```
Tú: "Genera first-frame para shot-01"

Yo:
  1. Leo: "Astronauta en cápsula mirando espacio" (10s)
  2. Leo: "Cinematográfico futurista, épico, azul-morado"
  3. Construyo prompt profesional
  4. Envío a n8n
  5. Guardo imagen en media/space-adventure/shots/shot-01/

Tú: Ves en Obsidian → shot-01.md
    [Ve la imagen previsuada]
    Feedback: "Perfecto ✅"

Tú: "Genera last-frame para shot-01"
Yo: [Mismo proceso]

Tú: "Genera first-frame para shot-02"
Yo: [Mismo proceso]
... (repites para todos)
```

**Día 3: Generación de Video, Audio, Música**
```
Tú: "Genera todo para shot-01: video, audio, música"

Yo: [Envío 3 requests a n8n en paralelo]
    Video: 10 segundos
    Audio: "Narración del astronauta..."
    Música: "Tema épico futurista"

Mientras se generan (5-30 min):
    Yo actualizo shot-01.md con links

Tú: Ves en Obsidian todo listo
    [x] Video ✅
    [x] Audio ✅
    [x] Música ✅

    Feedback: "Todo perfecto!"

Tú: "Repite para shot-02 y shot-03"
Yo: [Mismo proceso]
```

**Día 4: Revisión Final e Iteraciones**
```
Tú: Revisa todo en Obsidian

Feedback:
  shot-01: Perfecto ✅
  shot-02: Video muy lento, más dinámico ⚠️
  shot-03: Perfecto ✅

Tú: "shot-02 necesita ser más dinámico"

Yo: Edito el prompt en shot-02.md
    "...añadir movimiento de cámara rápido..."

Yo: npm run generate "space-adventure" "shot-02" "video"
    → Regenera el video

Tú: Ves versión nueva en Obsidian
    Feedback: "Mucho mejor ✅"
```

**Día 5: Export Final**
```
Tú: "Export final"

Yo: Copia todos los assets a media/space-adventure/final/
    Estructura:
    final/
    ├── shot-01/
    │   ├── video.mp4
    │   ├── audio.mp3
    │   └── music.mp3
    ├── shot-02/
    │   ├── video.mp4
    │   ├── audio.mp3
    │   └── music.mp3
    └── shot-03/
        ├── video.mp4
        ├── audio.mp3
        └── music.mp3

Tú: Importas a Adobe Premiere y editas 🎬
```

---

## 🔌 Integración con n8n (Tu VPS)

### Lo que Tienes que Configurar en n8n

**Necesitas un webhook que reciba:**

```json
{
  "type": "image" | "video" | "audio" | "music",
  "project": "space-adventure",
  "shotId": "shot-01",
  "prompt": "...",
  "artDirection": { "style": "...", "mood": "...", "colors": [...] },
  "params": { "width": 1920, "height": 1080, "duration": 5, "fps": 24 }
}
```

**El webhook debe:**

1. **Recibir** el request
2. **Validar** que el prompt sea válido
3. **Llamar** al servicio de generación (Flux, DALL-E, etc.)
4. **Esperar** o guardar job ID
5. **Responder** con:

```json
{
  "success": true,
  "jobId": "abc123",
  "status": "completed" | "processing" | "failed",
  "result": {
    "url": "https://storage.com/media.png",
    "metadata": {
      "model": "flux",
      "duration": "5s"
    }
  }
}
```

### Flujo en n8n (Conceptual)

```
n8n Webhook
    ↓
    ├→ Extract: type, project, shotId, prompt
    ├→ Validate: prompt no vacío
    ├→ Switch: por tipo
    │   ├→ "image": Call API (DALL-E/Flux)
    │   ├→ "video": Call API (Runway/Gen-2)
    │   ├→ "audio": Call API (Elevenlabs/TTS)
    │   └→ "music": Call API (Mubert/MusicGen)
    ├→ Wait: por resultado
    ├→ Upload: a almacenamiento
    └→ Respond: con URL
```

### Variables de Entorno

Edita `.env`:
```env
N8N_WEBHOOK_URL=https://tu-n8n-vps.com/webhook/generate-media
N8N_API_KEY=tu_api_key_secret
N8N_TIMEOUT=300000  # 5 minutos
```

---

## 📊 Estructura de Datos

### Project Metadata (project.json)
```json
{
  "name": "space-adventure",
  "createdAt": "2025-01-09T12:00:00Z",
  "status": "in-progress",
  "shots": [
    "shot-01",
    "shot-02",
    "shot-03"
  ],
  "description": "...",
  "durationMinutes": 2
}
```

### Shot File (shot-01.md)
```markdown
# Shot 01
- ID: shot-01
- Duración: 10s
- Enunciado: Astronauta en cápsula

## Aprobaciones
- [x] First frame → media/shot-01/first-frame.png
- [x] Last frame → media/shot-01/last-frame.png
- [ ] Video → generando...
- [ ] Audio
- [ ] Música

## Feedback
"Necesita más luz en los ojos del astronauta"
```

### Media Organization
```
media/
└── space-adventure/
    ├── art-direction/
    │   └── references/
    ├── shots/
    │   ├── shot-01/
    │   │   ├── first-frame.png
    │   │   ├── last-frame.png
    │   │   ├── video.mp4
    │   │   ├── audio.mp3
    │   │   └── music.mp3
    │   ├── shot-02/
    │   └── shot-03/
    └── final/
        ├── shot-01-all-files/
        ├── shot-02-all-files/
        └── shot-03-all-files/
```

---

## 🚀 Comandos Disponibles

### Crear Proyecto
```bash
npm run new-project "Nombre Proyecto"
# Opciones:
#   --description "Descripción"
#   --minutes 5

# Crea:
# - vault/projects/nombre-proyecto/
# - media/nombre-proyecto/
# - Script.md + Direccion-Arte.md
```

### Parsear Script
```bash
npm run parse-script "nombre-proyecto"

# Lee: vault/projects/nombre-proyecto/Script.md
# Busca: ### Shot 01, ### Shot 02, etc.
# Crea: shot-01.md, shot-02.md, etc.
```

### Generar Media
```bash
npm run generate "proyecto" "shot-id" "tipo" [opciones]

# Tipo: first-frame | last-frame | video | audio | music

# Opciones:
#   --prompt "Tu prompt personalizado"
#   --dry-run (solo muestra prompt sin enviar)

# Ejemplos:
npm run generate "space-adventure" "shot-01" "first-frame"
npm run generate "space-adventure" "shot-01" "video" --dry-run
npm run generate "space-adventure" "shot-02" "audio" --prompt "Voz epica, grave"
```

---

## 🔄 Iteración y Feedback

### Flujo de Cambios

**Caso 1: Regenerar Por Cambios**
```
Tú: "shot-01 last-frame necesita ser más oscuro"

Yo: [Edito el prompt en shot-01.md]
    "...añadir más oscuridad, iluminación dramática..."

Yo: npm run generate "space" "shot-01" "last-frame"

Tú: Ves nueva versión en Obsidian
```

**Caso 2: Cambiar Dirección de Arte Global**
```
Tú: "Quiero que todos los shots sean más vibrantes"

Yo: [Edito Direccion-Arte.md]
    Paleta: Colores más saturados

Yo: [Regenero todos los shots afectados]
    npm run generate "space" "shot-01" "first-frame"
    npm run generate "space" "shot-02" "first-frame"
    ...
```

**Caso 3: Cambiar Enunciado**
```
Tú: "El astronauta debería estar usando jetpack"

Yo: [Edito shot-01.md]
    "Astronauta volando con jetpack en el espacio"

Yo: npm run generate "space" "shot-01" "first-frame"
    npm run generate "space" "shot-01" "video"
```

---

## ✅ Workflow Completo de Aprobación

```
┌─────────────────────────────────────────────┐
│ CREACIÓN DE PROYECTO                        │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ DEFINIR SCRIPT (shots numerados)            │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ PARSEAR SCRIPT → shot-XX.md                 │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ DEFINIR DIRECCIÓN DE ARTE                   │
└────────────┬────────────────────────────────┘
             ↓
        ┌────┴────┐
        ↓         ↓
    ╔═══════╗  ╔═══════╗
    ║ LOOP  ║  ║ PARA  ║
    ║ CADA  ║  ║ CADA  ║
    ║ SHOT  ║  ║ SHOT  ║
    ╚═══╤═══╝  ╚═══════╝
        ↓
┌─────────────────────────────────────────────┐
│ GENERAR FIRST-FRAME                         │
└────────────┬────────────────────────────────┘
             ↓
        ┌────────────────┐
        ↓                ↓
    [Aprobado]      [Rechazado]
        │                │
        ↓                ↓
       ✅         [Editar prompt]
               ↓
        [Regenerar]
            ↓
         [Repetir]

(Mismo para last-frame, video, audio, música)
             ↓
┌─────────────────────────────────────────────┐
│ TODOS LOS SHOTS APROBADOS                   │
└────────────┬────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────┐
│ EXPORT FINAL                                │
│ media/proyecto/final/ LISTO PARA EDITAR     │
└─────────────────────────────────────────────┘
```

---

## 💡 Consejos y Mejores Prácticas

1. **Dirección de Arte Clara**: Cuanto mejor la definas, mejores los prompts
2. **Prompts Específicos**: "Cinematográfico realista" es mejor que "bonito"
3. **Iteración Rápida**: Regenera rapidamente si algo no te gusta
4. **Aprovechar Obsidian**: Los checklists son tu amigo para tracking
5. **Batch Generation**: Genera múltiples shots en paralelo para ahorrar tiempo

---

## 🎬 Próximas Fases (Post-MVP)

- [ ] Descarga automática de media desde n8n
- [ ] Batch generation (múltiples shots simultáneamente)
- [ ] Retry logic mejorado
- [ ] Historial de versiones completo
- [ ] Export directo a Adobe Premiere
- [ ] Integración con Claude para generación de scripts

---

## 📞 Cómo Trabajamos Juntos

**Yo (Claude Code):**
- Ejecuto los scripts
- Construyo prompts inteligentes
- Me comunico con n8n
- Gestiono archivos y metadata
- Actualizo Obsidian notes

**Tú:**
- Defines el concepto (script + dirección de arte)
- Revises en Obsidian
- Das feedback
- Apruebas elementos
- Exportas final para editar

**n8n:**
- Recibe requests
- Genera media
- Devuelve URLs

**Obsidian:**
- Muestra todo visualmente
- Facilita aprobaciones
- Guarda feedback

---

## 🎯 Empezamos?

Cuando leas este archivo, me avisas y podemos:

1. **Instalar dependencias** (npm install)
2. **Configurar .env** con tu n8n
3. **Crear primer proyecto de prueba**
4. **Hacer test end-to-end** del sistema completo

¿Listo?

