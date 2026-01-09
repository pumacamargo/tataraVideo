# Tatara Video Generator

**Sistema conversacional para crear videos AI profesionales**

Integración simple entre Claude Code CLI, n8n, y Obsidian.

## 🎬 Cómo Funciona

```
Tú hablas conmigo → Yo gestiono archivos y prompts → n8n genera media → Obsidian aprueba
```

### Los 3 Componentes

| Componente | Rol |
|-----------|-----|
| **Claude Code (Yo)** | Frontend + Orquestación. Tú me hablas, yo hago |
| **n8n (Tu VPS)** | Backend. Genera imágenes, videos, audio, música |
| **Obsidian** | Interfaz visual. Ves resultados y apruebas |

## ⚡ Quick Start

### 1. Configura n8n
```
Edita .env:
N8N_WEBHOOK_URL=https://tu-n8n-vps.com/webhook/generate-media
N8N_API_KEY=tu_api_key
```

### 2. Abre Obsidian
```
File → Open vault folder → Selecciona: tataraVideo/vault/
```

### 3. Crea Proyecto
```
Dime: "Crea un proyecto llamado 'Mi Video'"

Yo creo:
- vault/projects/mi-video/
- media/mi-video/
- Script.md + Direccion-Arte.md
```

### 4. Define los Shots
```
Dime: "Agrega 3 shots:
       1. Escena 1 (5s)
       2. Escena 2 (3s)
       3. Escena 3 (2s)"

Yo edito Script.md
```

### 5. Parsea
```
Dime: "Parsea los shots"

Yo creo shot-01.md, shot-02.md, shot-03.md
```

### 6. Define Dirección de Arte
```
En Obsidian editas: Direccion-Arte.md
- Estilo, mood, colores, referencias
```

### 7. Genera Media
```
Dime: "Genera first-frame para shot-01"

Yo:
- Construyo prompt inteligente
- Envío a n8n
- Guardo URL en shot-01.md

Tú ves en Obsidian y apruebas ✅
```

### 8. Iterar
```
Dime: "Muy oscuro, más luz"

Yo regenero con cambios
```

### 9. Export Final
```
Dime: "Export final"

Todo listo en media/proyecto/final/ para editar
```

## 📂 Estructura

```
tataraVideo/
├── vault/                   # Obsidian vault
│   ├── projects/           # Tus proyectos
│   │   └── mi-video/
│   │       ├── Script.md
│   │       ├── Direccion-Arte.md
│   │       └── shot-XX.md
│   └── templates/          # Templates (no tocar)
│
├── media/                  # Media generada
│   └── mi-video/
│       ├── shots/
│       │   └── shot-XX/
│       └── final/
│
└── docs/                   # Documentación
```

## 🔌 Integración n8n

### Request HTTP
```json
POST https://tu-n8n-vps.com/webhook/generate-media

{
  "type": "image|video|audio|music",
  "project": "mi-video",
  "shotId": "shot-01",
  "prompt": "...",
  "artDirection": { "style": "...", "mood": "...", "colors": [...] },
  "params": { "width": 1920, "height": 1080, "duration": 5, "fps": 24 }
}
```

### Response esperado
```json
{
  "success": true,
  "jobId": "abc123",
  "status": "completed",
  "result": {
    "url": "https://storage.com/media.mp4"
  }
}
```

## 🎯 Comandos Conversacionales

| Acción | Ejemplo |
|--------|---------|
| Crear proyecto | "Crea proyecto 'Mi Video'" |
| Agregar shots | "Agrega estos shots: [detalles]" |
| Parsear | "Parsea los shots" |
| Generar media | "Genera first-frame para shot-01" |
| Iterar | "Más luz, menos saturación" |
| Export | "Export final" |

## 📋 Workflow Típico

```
1. Crear proyecto
   ↓
2. Definir script (shots)
   ↓
3. Parsear shots
   ↓
4. Definir dirección de arte en Obsidian
   ↓
5. Generar first-frame de cada shot
   ↓
6. Aprobar en Obsidian ✅ o iterar ❌
   ↓
7. Generar last-frame
   ↓
8. Generar video, audio, música
   ↓
9. Aprobar y export final
   ↓
10. Editar en Adobe Premiere 🎬
```

## 💻 Obsidian Setup

### Abrir Vault
1. Abre Obsidian
2. Click en "Open vault folder"
3. Selecciona carpeta `vault/`

### Templates
Los templates están en `vault/templates/`:
- `01-Script.md` - Script general
- `02-Direccion-Arte.md` - Dirección visual
- `03-Shot.md` - Detalles de shot
- `04-Prompt.md` - Documentar prompts (opcional)
- `05-Feedback.md` - Feedback e iteraciones (opcional)

### Estructura en Obsidian
```
projects/
├── _example-project/          # Ejemplo (referencia)
│   ├── Script.md
│   ├── Direccion-Arte.md
│   ├── shot-01.md
│   ├── shot-02.md
│   └── shot-03.md
│
└── tu-proyecto/               # Tu proyecto nuevo
    ├── Script.md
    ├── Direccion-Arte.md
    └── shot-XX.md
```

## 🚀 Ejemplo Completo

### Proyecto: "Viaje Espacial"

**Paso 1: Crear**
```
"Crea proyecto 'Viaje Espacial'"
→ ✅ Creado
```

**Paso 2: Shots**
```
"Agrega shots:
 1. Astronauta en cohete (5s)
 2. Vuelo por galaxia (4s)
 3. Aterrizaje en luna (3s)"
→ ✅ Script actualizado
```

**Paso 3: Parsear**
```
"Parsea los shots"
→ ✅ shot-01.md, shot-02.md, shot-03.md creados
```

**Paso 4: Dirección de Arte**
```
En Obsidian editas:
- Estilo: Cinematográfico épico
- Mood: Asombro y contemplación
- Colores: Azul profundo, naranja cálido
- Referencias: [links visuales]
```

**Paso 5: Generar**
```
"Genera first-frame para shot-01"
→ ✅ Imagen generada
   📸 URL en Obsidian

Tú ves en Obsidian y apruebas ✅

"Genera last-frame para shot-01"
→ ✅ Generado

"Genera video, audio y música para shot-01"
→ ✅ 3 archivos generados en paralelo
```

**Paso 6: Repetir**
```
Repetir para shot-02 y shot-03
```

**Paso 7: Export**
```
"Export final"
→ ✅ Todo en media/viaje-espacial/final/
   Listo para Adobe Premiere
```

## ⚙️ Configuración

### .env
```env
# n8n Configuration
N8N_WEBHOOK_URL=https://tu-n8n-vps.com/webhook/generate-media
N8N_API_KEY=tu_api_key_aqui
N8N_TIMEOUT=300000

# Project Configuration
PROJECT_BASE_DIR=./projects
MEDIA_BASE_DIR=./media

# Logging
LOG_LEVEL=info
```

### Obsidian Settings
- **Tema:** Dark mode
- **Templates folder:** `templates/`
- **Line numbers:** Habilitados
- **Backlinks:** Habilitados

## 🆘 Troubleshooting

**P: No puedo conectar a n8n**
R: Verifica que `N8N_WEBHOOK_URL` sea correcto en `.env`

**P: Obsidian no muestra las imágenes**
R: Verifica que los paths en shot-XX.md sean absolutos o relativos correctamente

**P: Quiero cambiar un shot después de generar**
R: Puedo regenerar todo lo que quieras. Solo dime qué cambiar.

## 📚 Documentación

- **CLAUDE.md** - Explicación completa del sistema
- **vault/README.md** - Guía de Obsidian

## 🎬 Resultado Final

Cuando todo esté listo:

```
media/viaje-espacial/final/
├── shot-01-video.mp4
├── shot-01-audio.mp3
├── shot-01-music.mp3
├── shot-02-video.mp4
├── shot-02-audio.mp3
├── shot-02-music.mp3
├── shot-03-video.mp4
├── shot-03-audio.mp3
└── shot-03-music.mp3
```

Importas a Adobe Premiere y editas. **¡Listo!**

## 💡 Ventajas

✅ Conversacional - Me hablas naturalmente
✅ Sin instalación - No hay scripts locales
✅ Flexible - Cambias de opinión fácilmente
✅ Rápido - Generación paralela
✅ Visual - Todo en Obsidian
✅ Iterable - Regeneras sin límite

## 📞 ¿Lista?

Lee **CLAUDE.md** para entender completamente cómo funciona.

Luego configura `.env` con tu n8n y dime:

```
"Crea proyecto 'Mi Video'"
```

**Y empezamos a generar magia 🎬**

---

**Hecho con ❤️ para creadores de video**
