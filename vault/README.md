# TataraVideo - Obsidian Vault

Bienvenido al vault de Obsidian para **TataraVideo**. Este es tu espacio de trabajo para gestionar y aprobar la generación de videos AI.

## 📂 Estructura

```
vault/
├── templates/              # Templates para nuevos documentos
│   ├── 01-Script.md
│   ├── 02-Direccion-Arte.md
│   ├── 03-Shot.md
│   ├── 04-Prompt.md
│   └── 05-Feedback.md
│
└── projects/               # Proyectos activos
    ├── _example-project/   # Ejemplo (puedes usarlo como referencia)
    │   ├── Script.md
    │   ├── Direccion-Arte.md
    │   └── shot-XX.md
    │
    └── tu-nuevo-proyecto/  # Tus proyectos nuevos
        ├── Script.md
        ├── Direccion-Arte.md
        └── shot-XX.md
```

## 🚀 Cómo Empezar

### 1. Abrir Vault en Obsidian
- Abre Obsidian
- Selecciona "Open vault folder"
- Elige esta carpeta `vault/`

### 2. Crear Nuevo Proyecto
Dos opciones:

**Opción A: Vía CLI (Automático)**
```bash
npm run new-project "Mi Video Nuevo"
```
Esto crea automáticamente:
- `projects/mi-video-nuevo/Script.md`
- `projects/mi-video-nuevo/Direccion-Arte.md`

**Opción B: Manual (En Obsidian)**
1. Crear carpeta en `projects/nombre-proyecto/`
2. Usar template `01-Script.md` para crear `Script.md`
3. Usar template `02-Direccion-Arte.md` para crear `Direccion-Arte.md`

### 3. Definir el Script
Edita `Script.md`:
```markdown
### Shot 01
- **Duración:** 5
- **Descripción:** Descripción del shot

### Shot 02
- **Duración:** 3
- **Descripción:** Otro shot
```

### 4. Parsear Shots
```bash
npm run parse-script "mi-video-nuevo"
```

Esto crea `shot-01.md`, `shot-02.md`, etc.

### 5. Definir Dirección de Arte
Edita `Direccion-Arte.md`:
- Paleta de colores
- Estilo visual
- Mood
- Referencias

### 6. Generar Media
Desde CLI:
```bash
npm run generate "proyecto" "shot-01" "first-frame"
```

Obsidian muestra:
- La imagen generada
- Checkboxes para aprobación
- Campo de feedback

### 7. Aprobar o Rechazar
En Obsidian, abre `shot-01.md`:
- ✅ Checkbox aprobado
- ❌ Agrega feedback
- Regenera si es necesario

## 📝 Templates

### 01-Script.md
Documento principal del proyecto. Define todos los shots numerados.

### 02-Direccion-Arte.md
Guía visual y técnica. Paleta de colores, estilo, mood, referencias.

### 03-Shot.md
Creado automáticamente por `parse-script` para cada shot.
Contiene:
- Checkboxes de aprobación
- Links a media (imágenes, videos, audio)
- Campo de feedback

### 04-Prompt.md
Para documentar prompts específicos (opcional).

### 05-Feedback.md
Para registrar feedback e iteraciones (opcional).

## 🔗 Links Útiles

- Links entre shots: `[[shot-01]]`
- Links a archivos: `[[media/shot-01/first-frame.png]]`
- Links a secciones: `[[Direccion-Arte#Paleta de Colores]]`

## 💡 Tips

1. **Usa tags**: `#pending`, `#approved`, `#rejected` para filtrar
2. **Backlinks**: Haz click en links para ver relaciones
3. **Graph view**: Visualiza estructura de proyecto
4. **Search**: Busca términos en todos los shots
5. **Templates**: Usa `Ctrl+T` en nuevos documentos para insertar templates

## ⚙️ Configuración

- **Tema:** Dark mode
- **Templates folder:** `/templates`
- **Font size:** 16px
- **Line numbers:** Habilitados

## 📌 Ejemplo de Flujo Completo

Ver `_example-project/` para un ejemplo completo con:
- Script.md definido
- Dirección-Arte.md completa
- Shots con checkboxes

**Copia esta estructura para nuevos proyectos.**

## ❓ Preguntas?

Consulta `CLAUDE.md` en la raíz del proyecto para más información sobre cómo funciona el sistema completo.

---

**Happy video creation! 🎬**
