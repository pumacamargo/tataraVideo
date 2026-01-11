# 🚧 WIP - Trabajo en Progreso
## Proyecto: Pomeranian tries to be a Police

**Última actualización:** 2026-01-11 - 16:20
**Estado del proyecto:** En construcción
**Ubicación:** Solo para uso interno (NO en Obsidian vault)

---

## 📊 PROGRESO ACTUAL

### ✅ COMPLETADO

1. **Concept** (01_Concept.md)
   - Idea: Pomerania intenta ser policía
   - Duración: 2 minutos (120s)
   - 24 shots de 5 segundos cada uno

2. **Script Expandido** (04_Script.md)
   - 4 Actos completos
   - 24 shots descritos en detalle
   - Narrativa, diálogos, movimientos de cámara definidos
   - SFX y narrador script completado

3. **Dirección de Arte Base** (02_Direccion-Arte.md)
   - Paleta de colores definida
   - Estilo visual descrito
   - Mood/atmósfera establecida
   - Notas de composición

4. **Estructura de Carpetas (Media)**
   - `/art/characters/` - Listos para recibir imágenes
   - `/locations/` - Para locaciones generadas
   - `/shots/shot-01` hasta `/shots/shot-24/` - Estructura lista
   - `/final/` - Para export final

---

## ⏳ EN PROGRESO

### Fase Actual: Integración de Referencias

**✅ COMPLETADO:**
1. **Imágenes de Referencia del Personaje** ✅
   - `pomerania-police.jpg` → Pomerania con uniforme policía (1.1 MB)
   - `pomerania-pajamas.jpg` → Pomerania con pijama rosa (1.1 MB)
   - Ubicación: `/media/_youtube-example-project/art/characters/`

**Próximo paso inmediato (AHORA):**
- Generar prompts detallados para cada shot (05_Prompts.md)
- Crear payloads n8n para locaciones
- Preparar webhooks para generar media

---

## 🔄 PRÓXIMAS FASES (Por orden)

### ✅ Fase 2: Integración de Referencias (COMPLETADA)
- ✅ Actualizar `02_Direccion-Arte.md` con referencias de imágenes
- ✅ Agregar información de locaciones a generar (6 locaciones definidas)
- ✅ Definir paleta de colores extendida
- ✅ Establecer estilo visual (Adorable épico, tipo Zootopia/Pixar)

### Fase 3: Generar Prompts Detallados (05_Prompts.md)
- Para cada shot: startImagePrompt, endImagePrompt, videoPrompt
- Combinar descripción de script + dirección de arte
- Crear estructura JSON lista para n8n

### Fase 4: Generar Locaciones vía n8n Webhooks
- Webhooks para generar:
  - Habitación (dormitorio)
  - Cocina
  - Estación de policía (interior y exterior)
  - Calle/ciudad
  - Baño
- Guardar en `/media/_youtube-example-project/locations/`

### Fase 5: Generar Media para cada Shot
- 24 requests a n8n (1 por shot)
- Cada shot: firstFrame + lastFrame + video + audio + música
- Guardadas en `/media/_youtube-example-project/shots/shot-XX/`

### Fase 6: Revisión y Aprobación en Obsidian
- Ver previsualizaciones en Obsidian
- Dar feedback y regenerar si es necesario
- Marcar aprobaciones en shot-XX.md

### Fase 7: Export Final
- Compilar todo en `/media/_youtube-example-project/final/`
- Crear manifest.json
- Listo para editar en Adobe Premiere

---

## 📝 ARCHIVOS DEL PROYECTO

```
vault/00_projects/_youtube-example-project/
├── 00_Status.md              ✅ (checklist de fases)
├── 01_Concept.md             ✅ (idea del video)
├── 02_Direccion-Arte.md      ⏳ (falta agregar referencias)
├── 03_Shot-ideas.md          (plantilla)
├── 04_Script.md              ✅ (24 shots expandidos)
├── 05_Prompts.md             ⏳ (por generar)
├── 06_Music.md               (por definir)
└── 07_Youtube.md             (por definir)

media/_youtube-example-project/
├── art/
│   └── characters/           ⏳ (esperando 2 imágenes)
├── locations/                (vacío, a generar)
├── shots/
│   ├── shot-01/
│   ├── shot-02/
│   ... (hasta shot-24)        (vacíos, a llenar)
└── final/                     (vacío, para export)
```

---

## 🎯 ACCIONES SIGUIENTES

**Para el usuario:**
1. Proporciona 2 imágenes:
   - Pomerania con uniforme de policía
   - Pomerania con pijama
2. Colócalas en `/media/_youtube-example-project/art/characters/` con nombres:
   - `pomerania-police.jpg`
   - `pomerania-pajamas.jpg`

**Para Claude (cuando reciba imágenes):**
1. Actualizar `Direccion-Arte.md` con referencias
2. Generar `05_Prompts.md` completo (24 shots)
3. Crear payloads n8n para locaciones
4. Documentar webhooks listos para usar

---

## 💾 NOTAS TÉCNICAS

- **Estructura n8n esperada:** POST a `/webhook/generate-media`
- **Tipos de generación:** image, video, audio, music
- **Duración por shot:** 5 segundos
- **Resolución:** 1920x1080 (HD)
- **FPS:** 24

---

**✅ STATUS:** Listo para generar prompts y crear payloads n8n

**Última actualización:** 2026-01-11 16:45 - Imágenes integradas, dirección de arte completa
