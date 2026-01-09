# Tatara Video Generator

Sistema completo de generación de videos AI que integra Claude Code CLI + n8n para crear videos profesionales con aprobaciones paso a paso.

## Características

- 🎬 **Pipeline de producción**: Script → Shots → Dirección de Arte → Media → Aprobación
- 📝 **Generación de prompts inteligentes**: Basados en dirección de arte y contenido
- 🖼️ **Generación paralela de media**: Imágenes, videos, audio y música vía n8n
- ✅ **Sistema de aprobaciones**: Checklists en Obsidian para cada fase
- 📊 **Gestión de múltiples proyectos**: Estructura escalable y organizada
- 🔄 **Iteraciones ágiles**: Regenera media sin perder historial

## Requisitos

- Node.js 18+
- npm
- Obsidian (recomendado)
- n8n VPS configurado

## Instalación

```bash
cd tataraVideo
npm install
cp .env.example .env
```

Edita `.env` con tu configuración de n8n:

```env
N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/generate-media
N8N_API_KEY=tu_api_key_aqui
```

## Estructura del Proyecto

```
tataraVideo/
├── vault/                    # Obsidian vault
│   ├── templates/           # Templates reutilizables
│   └── projects/            # Proyectos de video
├── src/                     # Código Node.js
│   ├── cli/                # Scripts CLI
│   ├── utils/              # Utilidades
│   └── generators/         # Generadores
├── media/                  # Media generada
├── config/                 # Configuraciones
└── README.md
```

## Uso Rápido

### 1. Crear Proyecto

```bash
npm run new-project "Mi Video Increíble"
```

Esto crea:
- Carpeta del proyecto en `vault/projects/`
- `Script.md` para documentar los shots
- `Direccion-Arte.md` para la dirección visual
- Carpeta de media en `media/`

### 2. Editar Script

Abre `vault/projects/[proyecto]/Script.md` y define tus shots:

```markdown
### Shot 01
- **Duración:** 5
- **Descripción:** Un astronauta flotando en el espacio

### Shot 02
- **Duración:** 3
- **Descripción:** Vista panorámica de la galaxia
```

### 3. Parsear Script en Shots

```bash
npm run parse-script "mi-video-increible"
```

Genera archivos `shot-01.md`, `shot-02.md`, etc.

### 4. Definir Dirección de Arte

Abre Obsidian y edita `vault/projects/[proyecto]/Direccion-Arte.md`:
- Paleta de colores
- Estilo visual
- Mood/Atmósfera
- Referencias visuales

### 5. Generar Media

Genera imágenes (frames) para cada shot:

```bash
# First frame
npm run generate "mi-video-increible" "shot-01" "first-frame" --dry-run

# Last frame
npm run generate "mi-video-increible" "shot-01" "last-frame"

# Video
npm run generate "mi-video-increible" "shot-01" "video"

# Audio
npm run generate "mi-video-increible" "shot-01" "audio"

# Música
npm run generate "mi-video-increible" "shot-01" "music"
```

### 6. Revisar y Aprobar en Obsidian

Abre cada `shot-XX.md` en Obsidian:
- Marca los checkboxes según aprobaciones
- Agrega feedback si es necesario
- Regenera si es necesario

### 7. Exportar Final

Todos los assets aprobados se guardan en `media/[proyecto]/final/`

## Opciones de Comandos

### new-project
```bash
npm run new-project "Nombre Proyecto" \
  --description "Descripción del video" \
  --minutes 10
```

### parse-script
```bash
npm run parse-script "nombre-proyecto"
```

### generate
```bash
npm run generate "proyecto" "shot-id" "tipo" [opciones]

# Opciones:
# --prompt "tu prompt personalizado"
# --dry-run (solo muestra el prompt sin enviar)
```

## Workflow Completo

```
1. new-project "Video"
   ↓
2. Editar Script.md con shots numerados
   ↓
3. parse-script "video"
   ↓
4. Editar Direccion-Arte.md en Obsidian
   ↓
5. Generar first-frame de cada shot
   ↓
6. Revisar y aprobar en Obsidian
   ↓
7. Generar last-frame
   ↓
8. Revisar y aprobar
   ↓
9. Generar video
   ↓
10. Generar audio
   ↓
11. Generar música
   ↓
12. Revisar y aprobar
   ↓
13. Exportar final → listo para editar
```

## Integración n8n

El sistema envía requests HTTP POST a tu webhook n8n con esta estructura:

```json
{
  "type": "image|video|audio|music",
  "project": "nombre-proyecto",
  "shotId": "shot-01",
  "prompt": "prompt generado...",
  "artDirection": {
    "style": "cinematico realista",
    "mood": "epico",
    "colors": "#1a2b3c, #ff6b35"
  },
  "params": {
    "width": 1920,
    "height": 1080,
    "duration": 5,
    "fps": 24
  }
}
```

Tu webhook debe responder con:

```json
{
  "success": true,
  "jobId": "abc123",
  "status": "completed|processing|failed",
  "result": {
    "url": "https://url-a-media.com/file"
  }
}
```

## Obsidian Setup

1. Abre Obsidian y selecciona `vault/` como vault
2. Los templates están en `vault/templates/`
3. Los proyectos se crean en `vault/projects/`
4. Usa los templates para documentar cada fase

### Templates Disponibles

- `01-Script.md` - Script general del proyecto
- `02-Direccion-Arte.md` - Dirección visual y referencias
- `03-Shot.md` - Detalles de cada shot con checklists
- `04-Prompt.md` - Documentar prompts específicos
- `05-Feedback.md` - Registrar feedback e iteraciones

## Troubleshooting

### Error: "Script.md no encontrado"
```bash
# Asegúrate de haber creado el proyecto primero
npm run new-project "nombre"
```

### Error: "No se encontraron shots en el script"
```markdown
# El formato debe ser exactamente:
### Shot 01
- **Duración:** 5
- **Descripción:** Descripción del shot
```

### Error al conectar con n8n
- Verifica que `N8N_WEBHOOK_URL` sea correcto en `.env`
- Comprueba que n8n está corriendo
- Usa `--dry-run` para ver el prompt sin enviar

## Desarrollo

### Agregar nuevo tipo de generación

1. Agregar método en `src/utils/prompt-builder.js`
2. Agregar endpoint en `config/n8n.config.js`
3. Actualizar `generate-media.js`

### Personalizar templates

Edita los archivos en `vault/templates/` - se usan en la creación de proyectos

## Próximas Mejoras

- [ ] Batch generation (múltiples shots en paralelo)
- [ ] Retry logic y manejo de errores mejorado
- [ ] Descarga automática de media desde n8n
- [ ] Historial de versiones completo
- [ ] Export a video editado
- [ ] Integración con Adobe Premiere

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue o pull request.

---

**Hecho con ❤️ para creadores de video**
