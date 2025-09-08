# 🗳️ ONPE UI

Librería completa de componentes de interfaz de usuario para aplicaciones de la Oficina Nacional de Procesos Electorales (ONPE) del Perú.

## ✨ Características

- 🎨 **Colores oficiales de ONPE** - Paleta de colores institucional
- ⚡ **Tailwind CSS v4** - Framework CSS moderno y eficiente
- 🔧 **TypeScript** - Tipado estático para mejor desarrollo
- 📱 **Responsive** - Diseño adaptable a todos los dispositivos
- 🎯 **Accesible** - Componentes que siguen estándares de accesibilidad
- 📦 **Tree-shakable** - Solo importa lo que necesitas

## 🚀 Instalación

### Instalación Completa de la Librería
```bash
npm install @onpe/ui
```

### Instalación Individual de Componentes (CLI)
```bash
# Instalar la CLI globalmente
npm install -g @onpe/ui

# O usar directamente con npx
npx onpe-ui add <componente>
```

## ⚠️ Importante sobre TailwindCSS

Esta librería **NO requiere** que instales TailwindCSS en tu proyecto. Los estilos ya están compilados y optimizados. Solo necesitas importar los estilos:

```css
@import "@onpe/ui/styles";
```

Si quieres extender los estilos con tus propias clases de TailwindCSS, entonces sí necesitarías instalar TailwindCSS en tu proyecto.

## 📖 Uso Básico

### Opción 1: Usar la Librería Completa

#### Importar estilos
```css
@import "@onpe/ui/styles";
```

#### Usar componentes
```tsx
import { Button } from '@onpe/ui/components';

function App() {
  return (
    <div>
      <Button color="primary" title="Votar Ahora" size="normal" />
      <Button color="skyblue" title="Ver Resultados" size="large" />
    </div>
  );
}
```

### Opción 2: Instalar Componentes Individualmente con CLI

#### Instalar un componente específico
```bash
# Instalar Button
npx onpe-ui add button

# Instalar Modal (instala automáticamente Portal y Overlay)
npx onpe-ui add modal

# Instalar Portal
npx onpe-ui add portal

# Instalar Overlay
npx onpe-ui add overlay

# Instalar Show
npx onpe-ui add show
```

#### Usar componentes instalados individualmente
```tsx
// Después de instalar con CLI
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Button color="primary" title="Abrir Modal" onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Contenido del Modal</h2>
      </Modal>
    </div>
  );
}
```

#### Configuración requerida para componentes individuales

**1. Instalar Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**2. Configurar tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'onpe-ui-blue': '#003770',
        'onpe-ui-skyblue': '#0073cf',
        'onpe-ui-skyblue-light': '#69b2e8',
        'onpe-ui-yellow': '#ffb81c',
        'onpe-ui-light-skyblue': '#aaeff6',
        'onpe-ui-gray': '#bcbcbc',
        'onpe-ui-gray-light': '#bdbdbd',
        'onpe-ui-gray-extra-light': '#f2f2f2',
        'onpe-ui-red': '#e3002b',
        'onpe-ui-dark-gray': '#4f4f4f',
        'onpe-ui-green': '#76bd43',
        'onpe-ui-yellow-light': '#FFF1D2',
      }
    },
  },
  plugins: [],
}
```

**3. Agregar estilos base en index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**4. Para componentes que usan Portal, agregar en public/index.html:**
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Mi App</title>
  </head>
  <body>
    <div id="root"></div>
    <div id="portal"></div>
  </body>
</html>
```

## 🎨 Paleta de Colores ONPE

### Colores Principales
- **Azul Principal**: `#003770` - Color institucional principal
- **Sky Blue**: `#0073cf` - Color secundario
- **Sky Blue Light**: `#69b2e8` - Color claro
- **Light Sky Blue**: `#aaeff6` - Color muy claro

### Colores de Acento
- **Amarillo**: `#ffb81c` - Para alertas y destacados
- **Verde**: `#76bd43` - Para éxito y confirmaciones
- **Rojo**: `#e3002b` - Para errores y advertencias

### Escala de Grises
- **Dark Gray**: `#4f4f4f` - Texto principal
- **Gray**: `#bcbcbc` - Texto secundario
- **Gray Light**: `#bdbdbd` - Texto terciario
- **Gray Extra Light**: `#f2f2f2` - Fondos suaves

## 🔗 Dependencias entre Componentes

### Mapa de Dependencias
```
Modal
├── Portal (requerido)
├── Overlay (requerido)
└── IconClose (requerido)

Portal
└── react-dom (createPortal)

Overlay
└── (sin dependencias externas)

Button
└── (sin dependencias externas)

Show
└── (sin dependencias externas)
```

### Instalación Automática de Dependencias

**Modal** - Instala automáticamente sus dependencias:
```bash
npx onpe-ui add modal
# Esto instalará automáticamente:
# - Portal.tsx
# - Overlay.tsx
# - IconClose.tsx (si está disponible)
```

**Otros componentes** - Instalación independiente:
```bash
npx onpe-ui add button    # Sin dependencias
npx onpe-ui add portal    # Sin dependencias
npx onpe-ui add overlay   # Sin dependencias
npx onpe-ui add show      # Sin dependencias
```

### Estructura de Archivos Después de la Instalación

```
src/
└── components/
    └── ui/
        ├── Button.tsx
        ├── Modal.tsx
        ├── Overlay.tsx
        ├── Portal.tsx
        └── Show.tsx
```

## 🧩 Componentes Disponibles

### Button

Botón versátil con múltiples colores y tamaños.

Botón versátil con múltiples variantes y tamaños.

```tsx
import { Button } from '@onpe/ui/components';

// Colores disponibles
<Button color="primary" title="Primario" />
<Button color="blue" title="Azul" />
<Button color="skyblue" title="Sky Blue" />
<Button color="green" title="Verde" />
<Button color="yellow" title="Amarillo" />
<Button color="red" title="Rojo" />

// Tamaños
<Button color="primary" title="Pequeño" size="small" />
<Button color="primary" title="Mediano" size="normal" />
<Button color="primary" title="Grande" size="large" />

// Estados
<Button color="primary" title="Deshabilitado" disabled />
```

### Props del Button

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `color` | `'primary' \| 'blue' \| 'skyblue' \| 'skyblue-light' \| 'yellow' \| 'light-skyblue' \| 'gray' \| 'gray-light' \| 'gray-extra-light' \| 'red' \| 'dark-gray' \| 'green' \| 'yellow-light'` | `'primary'` | Color del botón |
| `title` | `string` | - | Texto del botón (requerido) |
| `size` | `'small' \| 'normal' \| 'large'` | `'normal'` | Tamaño del botón |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `className` | `string` | - | Clases CSS adicionales |

### Modal

Componente modal para mostrar contenido en overlay.

```tsx
import { Modal } from '@onpe/ui/components';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2>Contenido del Modal</h2>
      <p>Este es el contenido del modal.</p>
    </Modal>
  );
}
```

### Overlay

Componente overlay para superponer contenido.

```tsx
import { Overlay } from '@onpe/ui/components';

function App() {
  return (
    <Overlay>
      <div>Contenido superpuesto</div>
    </Overlay>
  );
}
```

### Portal

Componente portal para renderizar fuera del DOM padre.

```tsx
import { Portal } from '@onpe/ui/components';

function App() {
  return (
    <Portal>
      <div>Contenido renderizado en portal</div>
    </Portal>
  );
}
```

### Show

Componente condicional para mostrar/ocultar contenido.

```tsx
import { Show } from '@onpe/ui/components';

function App() {
  const [visible, setVisible] = useState(true);
  
  return (
    <Show when={visible}>
      <div>Contenido visible</div>
    </Show>
  );
}
```

### ModalConfirm

Modal de confirmación para acciones importantes.

```tsx
import { ModalConfirm } from '@onpe/ui/components';

function App() {
  const [showConfirm, setShowConfirm] = useState(false);
  
  return (
    <ModalConfirm
      isOpen={showConfirm}
      onClose={() => setShowConfirm(false)}
      onConfirm={() => {
        // Acción a confirmar
        setShowConfirm(false);
      }}
      title="Confirmar acción"
      message="¿Estás seguro de realizar esta acción?"
    />
  );
}
```

### ModalLoading

Modal de carga para mostrar estados de procesamiento.

```tsx
import { ModalLoading } from '@onpe/ui/components';

function App() {
  const [loading, setLoading] = useState(false);
  
  return (
    <ModalLoading
      isOpen={loading}
      message="Procesando información..."
    />
  );
}
```

## 🎯 Hooks Disponibles

### useDebounce

Hook para retrasar la ejecución de funciones.

```tsx
import { useDebounce } from '@onpe/ui/hooks';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    // Buscar solo después de 500ms sin cambios
    searchAPI(debouncedQuery);
  }, [debouncedQuery]);
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

### useLocalStorage

Hook para manejar localStorage de forma reactiva.

```tsx
import { useLocalStorage } from '@onpe/ui/hooks';

function SettingsComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Claro</option>
      <option value="dark">Oscuro</option>
    </select>
  );
}
```

## 🎨 Iconos Disponibles

La librería incluye una colección completa de iconos organizados por categorías:

### Iconos de Acciones
- Iconos para acciones comunes (editar, eliminar, guardar, etc.)

### Iconos de Navegadores
- Iconos de navegadores web (Chrome, Firefox, Safari, Edge, etc.)

### Iconos de Sistemas Operativos
- Iconos de sistemas operativos (Windows, macOS, Linux, etc.)

### Iconos ONPE
- Iconos específicos de la institución ONPE

### Logos
- Logotipos oficiales y marcas

```tsx
import { 
  IconChrome, 
  IconFirefox, 
  IconSafari,
  IconWindows,
  IconMacOS 
} from '@onpe/ui/icons';

function App() {
  return (
    <div>
      <IconChrome className="w-6 h-6" />
      <IconFirefox className="w-6 h-6" />
      <IconSafari className="w-6 h-6" />
    </div>
  );
}
```

## 🛠️ Utilidades

### formatDate

Función para formatear fechas según estándares peruanos.

```tsx
import { formatDate } from '@onpe/ui/utils';

const fecha = new Date('2024-04-14');
const fechaFormateada = formatDate(fecha, 'dd/mm/yyyy');
console.log(fechaFormateada); // "14/04/2024"
```

### validateEmail

Función para validar direcciones de correo electrónico.

```tsx
import { validateEmail } from '@onpe/ui/utils';

const email = 'usuario@onpe.gob.pe';
const esValido = validateEmail(email);
console.log(esValido); // true
```

## 📱 Breakpoints Responsive

La librería incluye breakpoints personalizados para ONPE:

- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `2lg`: 1200px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1650px

```css
/* Ejemplo de uso */
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
  }
}
```

## 🎨 Clases de Utilidad

### Colores de Texto
```css
.text-onpe-ui-blue          /* Azul principal */
.text-onpe-ui-skyblue       /* Sky blue */
.text-onpe-ui-yellow        /* Amarillo */
.text-onpe-ui-green         /* Verde */
.text-onpe-ui-red           /* Rojo */
.text-onpe-ui-gray          /* Gris */
.text-onpe-ui-dark-gray     /* Gris oscuro */
```

### Colores de Fondo
```css
.bg-onpe-ui-blue            /* Fondo azul */
.bg-onpe-ui-skyblue         /* Fondo sky blue */
.bg-onpe-ui-yellow          /* Fondo amarillo */
.bg-onpe-ui-green           /* Fondo verde */
.bg-onpe-ui-red             /* Fondo rojo */
.bg-onpe-ui-gray            /* Fondo gris */
.bg-onpe-ui-gray-light      /* Fondo gris claro */
.bg-onpe-ui-gray-extra-light /* Fondo gris muy claro */
```

## 📋 Versiones

- **v1.0.4** - Versión actual
- Compatible con React 16.8+
- TailwindCSS v4
- TypeScript 5.3+

## 🔧 Desarrollo

### Requisitos
- Node.js 18+
- npm 9+

### Instalación para desarrollo
```bash
git clone https://github.com/ricardosv46/onpe-ui.git
cd onpe-ui
npm install
```

### Scripts disponibles
```bash
npm run build          # Construir para producción
npm run dev            # Desarrollo con watch mode
npm run storybook      # Ver componentes en Storybook
npm run lint           # Verificar código
npm run lint:fix       # Corregir problemas de linting
npm run type-check     # Verificar tipos TypeScript
```

## 📄 Licencia

MIT © ONPE - Oficina Nacional de Procesos Electorales

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 🐛 Solución de Problemas

### Problemas con la CLI

**Error: "Componente no encontrado"**
```bash
# Verificar componentes disponibles
npx onpe-ui add --help

# Componentes válidos:
# button, modal, overlay, portal, show
```

**Error: "No se pudo descargar el componente"**
```bash
# Verificar conexión a internet
ping github.com

# Verificar que el repositorio esté disponible
curl https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/components/Button/Button.tsx
```

**Los estilos no se aplican**
```bash
# Verificar que Tailwind esté instalado
npm list tailwindcss

# Verificar configuración
cat tailwind.config.js
```

**Portal no funciona**
```bash
# Verificar que tengas el elemento portal en HTML
grep -r "id=\"portal\"" public/
```

### Problemas con la Librería Completa

**Error: "Module not found"**
```bash
# Verificar instalación
npm list @onpe/ui

# Reinstalar si es necesario
npm uninstall @onpe/ui
npm install @onpe/ui
```

**Estilos no se cargan**
```css
/* Verificar que tengas la importación correcta */
@import "@onpe/ui/styles";
```

### Problemas con Storybook

**Error: "Failed to fetch dynamically imported module"**
- Verificar que el archivo `preview.ts` importe correctamente `../src/styles.css`
- Asegurar que Tailwind CSS esté configurado correctamente
- Verificar que PostCSS esté configurado

## 📞 Soporte

- 📧 Email: desarrollo@onpe.gob.pe
- 🐛 Issues: [GitHub Issues](https://github.com/ricardosv46/onpe-ui/issues)
- 📖 Documentación: [Storybook](https://onpe-ui-components.netlify.app)
- 🔗 Repositorio: [GitHub](https://github.com/ricardosv46/onpe-ui)
- 📦 NPM: [@onpe/ui](https://www.npmjs.com/package/@onpe/ui)

---

**Desarrollado con ❤️ para la democracia peruana** 🇵🇪