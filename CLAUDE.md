# CLAUDE.md - Sistema de Generación de Videos AI

## 🎯 Visión General

Este es un **sistema de producción de videos AI profesional** simplificado:

- **Claude Code (Yo)** = Frontend + Orquestación
  - Tú me das instrucciones conversacionalmente
  - Yo manejo archivos, construyo prompts, coordino todo

- **n8n (Tu VPS)** = Backend generativo
  - Recibe requests HTTP
  - Genera imágenes, videos, audio, música
  - Devuelve URLs

- **Obsidian** = Interfaz visual + Aprobaciones
  - Ves los resultados generados
  - Apruebas o rechazas
  - Das feedback

**NO hay scripts locales.** Todo funciona conversacionalmente entre tú y yo.

---

## 🔄 Flujo Completo

### Fase 1: Crear Proyecto

```
Tú: "Crea un proyecto llamado 'Space Adventure'"

Yo:
  1. Creo carpeta: vault/projects/space-adventure/
  2. Creo carpeta: media/space-adventure/
  3. Creo archivo: Script.md
  4. Creo archivo: Direccion-Arte.md
  5. Creo archivo: project.json (metadata)

Output: "✅ Proyecto creado. Puedes editar Script.md"
```

### Fase 2: Definir Script

```
Tú: "Agrega estos shots al Script.md:
     Shot 1: Astronauta en la cápsula (5s)
     Shot 2: Viaje galáctico (3s)
     Shot 3: Aterrizaje en luna (2s)"

Yo:
  - Edito vault/projects/space-adventure/Script.md
  - Formateo con estructura correcta:
    ### Shot 01
    - Duración: 5
    - Descripción: Astronauta en la cápsula

Output: "✅ Script actualizado con 3 shots"
```

### Fase 3: Parsear Shots

```
Tú: "Parsea los shots"

Yo:
  1. Leo Script.md
  2. Extraigo: ### Shot 01, ### Shot 02, etc.
  3. Por cada shot, creo un archivo:
     - shot-01.md (con checkboxes, template, etc.)
     - shot-02.md
     - shot-03.md
  4. Creo carpetas en media/space-adventure/shots/
  5. Actualizo project.json

Output: "✅ 3 shots creados. Están listos en Obsidian"
```

### Fase 4: Dirección de Arte

```
Tú: "Edita Direccion-Arte.md con:
     - Estilo: Cinematográfico realista
     - Mood: Épico
     - Colores: Azul, naranja, purpura"

Yo:
  - Edito vault/projects/space-adventure/Direccion-Arte.md
  - Agrego paleta, referencias, notas técnicas

Output: "✅ Dirección de arte definida"
```

### Fase 5: Generar Media

```
Tú: "Genera first-frame para shot-01"

Yo:
  1. Leo shot-01.md → "Astronauta en cápsula (5s)"
  2. Leo Direccion-Arte.md → "Cinematográfico, épico, azul"
  3. Construyo prompt profesional combinando TODO
  4. Hago POST request a n8n:
     {
       type: "image",
       project: "space-adventure",
       shotId: "shot-01",
       prompt: "...[prompt construido]",
       artDirection: { style, mood, colors }
     }
  5. Espero respuesta de n8n con URL
  6. Edito shot-01.md con:
     - Link a la imagen
     - Status: "Generado, pendiente aprobación"

Output: "✅ Image generada y guardada"
       "📸 URL: https://storage.com/..."
       "👉 Revisa en Obsidian y aprueba"
```

### Fase 6: Revisar y Aprobar en Obsidian

```
Tú: Abres Obsidian
    vault/projects/space-adventure/shot-01.md

VES:
  - Imagen previsuada
  - [ ] First frame aprobado
  - Campo para feedback

ACCIONES:
  ✅ "Perfecto, aprobado" → marcar checkbox
  ❌ "Muy oscuro, más luz" → escribir feedback
```

### Fase 7: Iterar si es Necesario

```
Tú: "First frame muy oscuro, regenera con más luz"

Yo:
  1. Leo shot-01.md y veo tu feedback
  2. Edito el prompt:
     Agrego: "Iluminación más brillante, más tonos cálidos"
  3. Envío request a n8n con prompt actualizado
  4. Guardo nueva URL en shot-01.md

Output: "✅ Regenerado. Nueva versión en Obsidian"
```

### Fase 8: Generar Video, Audio, Música (En Paralelo)

```
Tú: "Genera video, audio y música para shot-01"

Yo: Envío 3 requests simultáneamente a n8n
    - Video (5 segundos)
    - Audio (narración)
    - Música (fondo)

Mientras se generan:
  - Yo actualizo shot-01.md con status
  - Tú ves en Obsidian: "Generando..."

Output: "✅ Todo completado
         📽️  Video: https://...
         🎙️  Audio: https://...
         🎵 Música: https://..."
```

### Fase 9: Repetir para Todos los Shots

```
Repetir Fases 5-8 para shot-02, shot-03, etc.

Tracking en Obsidian:
  shot-01: ✅✅✅✅✅ (todos aprobados)
  shot-02: ✅✅⏳⏳⏳ (generando audio/música)
  shot-03: ⏳⏳⏳⏳⏳ (sin generar)
```

### Fase 10: Export Final

```
Tú: "Export final"

Yo:
  1. Copia todos los assets a media/space-adventure/final/
  2. Organizo por shot
  3. Creo manifest.json con metadata

Output: "✅ Todo listo en media/space-adventure/final/
         📦 Estructura:
            final/shot-01/video.mp4, audio.mp3, music.mp3
            final/shot-02/...
            final/shot-03/..."

Tú: Descargas y editas en Adobe Premiere 🎬
```

---

## 🛠️ Cómo Funciono

### Tracking Interno (WIP.md)

**Dato:** Mantengo un archivo `WIP.md` en la raíz del proyecto para:
- Registrar progress actual
- Documentar bloqueantes
- Listar próximas fases
- Guardar notas técnicas

**Uso:** Si la conexión se pierde, abre WIP.md para ver exactamente en qué estábamos y continuar.

```
tataraVideo/
└── WIP.md  ← Aquí está todo documentado (NO en vault)
```

### Creación de Proyecto

**Conversación:**
```
Tú: "Crea proyecto 'Mi Video'"
Yo: ✅ Creado

Tú: "Agrega 2 shots:
     1. Persona corriendo en playa
     2. Puesta de sol"
Yo: ✅ Script actualizado
```

**Detrás de escenas:**
- Creo `vault/00_projects/mi-video/` con estructura numerada (00_Status, 01_Concept, etc)
- Creo `media/mi-video/` con carpetas: art/, locations/, shots/, final/
- Creo archivo WIP.md en raíz para tracking interno

### Construcción de Prompts

**Dato:** Yo combino inteligentemente:
```javascript
prompt = baseDescription
         + artDirection (estilo, mood, colores)
         + technicalParams (resolución, duración, fps)
         + contextFromProject
```

**Ejemplo:**
```
Input: "Shot-01, first-frame, cinematográfico"
       Dirección: "Épico, azul/naranja, realista"

Output:
"Genera una imagen de ultra alta calidad:

Descripción: Persona corriendo en playa

Estilo: Cinematográfico realista
Atmósfera: Épico
Paleta: Azul océano, arena naranja

Técnico:
- 1920x1080 Ultra HD
- Composición cinematográfica
- Iluminación de 3 puntos
- Sin watermark"
```

### Comunicación con n8n

**Estructura de request:**
```json
POST https://tu-n8n-vps.com/webhook/generate-media

{
  "type": "image|video|audio|music",
  "project": "space-adventure",
  "shotId": "shot-01",
  "prompt": "...[prompt generado]",
  "artDirection": {
    "style": "Cinematográfico",
    "mood": "Épico",
    "colors": ["#0a1428", "#ff6b35"]
  },
  "params": {
    "width": 1920,
    "height": 1080,
    "duration": 5,
    "fps": 24
  }
}
```

**Response esperado:**
```json
{
  "success": true,
  "jobId": "abc123xyz",
  "status": "completed",
  "result": {
    "url": "https://storage.com/media.mp4",
    "metadata": {
      "model": "flux",
      "duration": "5s"
    }
  }
}
```

### Gestión de Archivos

**Estructura que mantengo:**
```
tataraVideo/
├── vault/
│   ├── 00_projects/
│   │   └── _youtube-example-project/
│   │       ├── 00_Status.md
│   │       ├── 01_Concept.md
│   │       ├── 02_Direccion-Arte.md
│   │       ├── 03_Shot-ideas.md
│   │       ├── 04_Script.md
│   │       ├── 05_Prompts.md
│   │       ├── 06_Music.md
│   │       └── 07_Youtube.md
│   ├── 01_guides/
│   └── 02_templates/
│
├── media/
│   └── _youtube-example-project/
│       ├── art/
│       │   └── characters/ (pomerania-police.jpg, pomerania-pajamas.jpg)
│       ├── locations/ (locaciones generadas)
│       ├── shots/
│       │   ├── shot-01/ (video.mp4, audio.mp3, music.mp3)
│       │   ├── shot-02/
│       │   └── ... (hasta shot-24)
│       └── final/ (export compilado)
│
└── WIP.md (tracking interno, NO en vault)
```

---

## 📋 Comandos Conversacionales

### Crear Proyecto
```
"Crea un proyecto llamado 'Nombre del Video'"
→ Yo creo estructura + archivos base
```

### Editar Script
```
"Agrega estos shots al script:
 1. Descripción shot 1 (duración)
 2. Descripción shot 2 (duración)"
→ Yo edito Script.md
```

### Parsear
```
"Parsea los shots"
→ Yo creo shot-01.md, shot-02.md, etc.
```

### Editar Dirección de Arte
```
"Dirección de arte:
 - Estilo: Cinematográfico
 - Mood: Épico
 - Colores: azul, naranja
 - Referencias: [links visuales]"
→ Yo edito Direccion-Arte.md e integro referencias locales
```

**Referencias de Personajes:**
```
"Coloca tus imágenes de referencia en:
 /media/proyecto/art/characters/

 Con nombres descriptivos:
 - personaje-pose1.jpg
 - personaje-pose2.jpg
 - personaje-outfit.jpg"
→ Yo las integro en Direccion-Arte.md
→ Las uso como base para generar media consistente
```

### Generar Media
```
"Genera first-frame para shot-01"
→ Yo construyo prompt + envío a n8n

"Genera video para shot-01"
→ Mismo proceso

"Genera video, audio y música para shot-01"
→ 3 requests simultáneamente
```

### Iterar
```
"Shot-01 first-frame muy oscuro, más luz"
→ Yo modifico prompt + regenero

"Cambia dirección de arte a más vibrante"
→ Yo actualizo + regenero afectados
```

### Export
```
"Export final"
→ Yo copies assets a media/proyecto/final/
```

---

## 🔄 Workflow Típico (Ejemplo Real)

### Día 1
```
Tú: "Quiero hacer un video corto sobre astronautas"

Yo: "¿Cuántos shots? ¿Cuál es la dirección visual?"

Tú: "3 shots, cinematográfico épico, azul y naranja"

Yo: "Perfecto. Creo el proyecto 'Astronautas'"
    ✅ Proyecto creado

Tú: "Agrega los shots:
     1. Astronauta en cápsula (5s)
     2. Viaje espacial (4s)
     3. Aterrizaje (3s)"

Yo: ✅ Script actualizado

Tú: "Parsea"

Yo: ✅ 3 shots creados en Obsidian
```

### Día 2
```
Tú: Abro Obsidian, edito Direccion-Arte.md
    - Agrego colores exactos
    - Agrego referencias visuales

Tú: "Genera first-frame para shot-01"

Yo: ✅ Generado, puedes ver en Obsidian
    [Muestra URL y status]

Tú: Ves imagen en Obsidian, apruebas ✅
    O das feedback ❌

Tú: "Genera last-frame para shot-01"

Yo: ✅ Generado

Tú: Apruebas en Obsidian ✅

Tú: "Genera video para shot-01"

Yo: ✅ Video generado, puedes previewear
```

### Día 3
```
Repetir para shot-02 y shot-03

Tú: Después de aprobar TODO:
    "Export final"

Yo: ✅ Todo en media/astronautas/final/
    Listo para editar en Adobe Premiere
```

---

## 📊 Estructura de Archivos

### Archivos de Proyecto (Vault)

Cada proyecto tiene archivos numerados para organización clara:

```markdown
00_Status.md          - Checklist general del proyecto
01_Concept.md         - Idea, selling pitch, parámetros
02_Direccion-Arte.md  - Estilo, paleta, referencias visuales
03_Shot-ideas.md      - Brainstorm de escenas
04_Script.md          - Descripción detallada de cada shot
05_Prompts.md         - Prompts listos para generar media
06_Music.md           - Notas sobre música/narración
07_Youtube.md         - Metadata para YouTube (si aplica)
```

### Estructura de Media

**art/characters/** - Referencias visuales del personaje
```
pomerania-police.jpg    ← Personaje con uniforme
pomerania-pajamas.jpg   ← Personaje con pijama
```

**locations/** - Escenarios generados
```
bedroom.jpg
kitchen.jpg
police-station.jpg
street.jpg
bathroom.jpg
```

**shots/shot-XX/** - Assets por shot
```
shot-01/
├── first-frame.jpg
├── last-frame.jpg
├── video.mp4
├── audio.mp3
└── music.mp3
```

**final/** - Compilado para edición
```
manifest.json
├── shot-01/
│   ├── video.mp4
│   ├── audio.mp3
│   └── music.mp3
└── ... (resto de shots)
```

### Convención de Nombres para Referencias

Las imágenes de personajes y locaciones se diferencian por nombres descriptivos:

```
art/characters/
├── pomerania-police.jpg     (con uniforme policía)
├── pomerania-pajamas.jpg    (con pijama)

locations/
├── bedroom.jpg              (habitación/dormitorio)
├── kitchen.jpg              (cocina)
├── police-station-interior.jpg
├── police-station-exterior.jpg
├── street.jpg
└── bathroom.jpg
```

**Ventaja:** No hay necesidad de carpetas anidadas, todo es claro con nombres.

---

## ✅ Flujo de Aprobación

```
Generar → Obsidian Preview → ✅ Aprobado ✅
                            ↓
                        ❌ Feedback
                            ↓
                        Yo regenero
                            ↓
                        Obsidian Preview
                            ↓
                        ✅ Aprobado ✅
```

---

## 🔌 Configuración n8n

**Lo que tienes que hacer:**

1. Crear webhook en n8n que reciba:
   ```json
   POST /webhook/generate-media

   {
     "type": "image|video|audio|music",
     "prompt": "...",
     "params": { width, height, duration, fps },
     ...
   }
   ```

2. Procesar según tipo:
   - `image` → Llamar DALL-E, Flux, Midjourney
   - `video` → Llamar Runway, Gen-2, etc.
   - `audio` → Llamar Elevenlabs, TTS
   - `music` → Llamar Mubert, MusicGen

3. Responder con:
   ```json
   {
     "success": true,
     "jobId": "id",
     "status": "completed",
     "result": { "url": "https://..." }
   }
   ```

4. Actualizar `.env`:
   ```env
   N8N_WEBHOOK_URL=https://tu-n8n-vps.com/webhook/generate-media
   N8N_API_KEY=tu_api_key
   ```

---

## 💡 Ventajas de Este Flujo

✅ **Sin instalación local** - No hay scripts que instalar
✅ **Conversacional** - Me hablas en lenguaje natural
✅ **Flexible** - Cambias de opinión fácilmente
✅ **Rápido** - Generación en paralelo
✅ **Visual** - Revisas todo en Obsidian
✅ **Iterable** - Regeneras sin perder historial

---

## 🚀 Empezamos?

**Ejemplo completado:** `_youtube-example-project`
- Script expandido con 24 shots
- Dirección de arte definida
- Estructura de media lista
- Tracking en WIP.md

**Para tu próximo proyecto:**

1. Dime el nombre del proyecto
2. Proporciona referencias (imágenes en `/media/proyecto/art/characters/`)
3. Configura tu `.env` con n8n URL
4. Me dices: "Crea proyecto [nombre]"

**Workflow:**
1. Expandimos script → 04_Script.md
2. Definimos dirección de arte → 02_Direccion-Arte.md
3. Generamos prompts → 05_Prompts.md
4. Generamos media via n8n → media/shots/
5. Apruebas en Obsidian
6. Export final

**Y listo, empezamos a hacer magia 🎬**

---

## 📌 Notas Importantes

- **WIP.md:** Archivo de tracking INTERNO (no en vault)
- **Nombres simples:** Usa nombres descriptivos para diferenciar (no carpetas complejas)
- **Obsidian:** Es tu interfaz visual para revisar y aprobar
- **n8n:** Hace toda la generación (tú controlas desde aquí, yo orquesto)

