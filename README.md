# @votodigital-onpeui/react

Librería de componentes de interfaz de usuario para aplicaciones de la Oficina Nacional de Procesos Electorales (ONPE) del Perú, construida con React, TypeScript y Tailwind CSS v4.

## Características

- **Colores oficiales ONPE** — Paleta de colores institucional completa
- **Tailwind CSS v4** — Framework CSS moderno, sin conflictos con proyectos existentes
- **TypeScript** — Tipado completo en todos los componentes e iconos
- **Responsive** — Diseño adaptable a todos los dispositivos
- **Accesible** — Componentes con soporte de focus trap, ARIA y navegación por teclado
- **Tree-shakable** — Solo se incluye en el bundle lo que se importa
- **Sin framer-motion** — Animaciones con CSS transitions nativas, sin dependencias pesadas

---

## Instalación

```bash
npm install @votodigital-onpeui/react
```

---

## Configuración inicial

Importar los estilos **una sola vez** en el entry point de tu aplicación:

```tsx
// main.tsx o index.tsx
import "@votodigital-onpeui/react/styles.css";
```

Para componentes que usan `Portal` (Modal y derivados), agregar el elemento `#portal` en el HTML:

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <div id="portal"></div>
</body>
```

---

## Imports

Todo se importa desde el paquete. Hay tres entradas disponibles:

```tsx
// Todo junto
import { Button, ModalConfirm, IconLogoONPE } from "@votodigital-onpeui/react";

// Solo componentes
import { Button, ModalConfirm } from "@votodigital-onpeui/react/components";

// Solo iconos
import { IconLogoONPE, IconChrome } from "@votodigital-onpeui/react/icons";
```

---

## Componentes

### Button

Botón con múltiples colores y tamaños.

```tsx
import { Button } from "@votodigital-onpeui/react";

// Colores
<Button color="primary" title="Primario" />
<Button color="blue" title="Azul" />
<Button color="skyblue" title="Sky Blue" />
<Button color="red" title="Rojo" />
<Button color="green" title="Verde" />
<Button color="yellow" title="Amarillo" />

// Tamaños
<Button color="primary" title="Pequeño" size="small" />
<Button color="primary" title="Normal" size="normal" />
<Button color="primary" title="Grande" size="large" />

// Estado deshabilitado
<Button color="primary" title="Deshabilitado" disabled />
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | — | Texto del botón **(requerido)** |
| `color` | `'primary' \| 'blue' \| 'skyblue' \| 'skyblue-light' \| 'yellow' \| 'light-skyblue' \| 'gray' \| 'gray-light' \| 'gray-extra-light' \| 'red' \| 'dark-gray' \| 'green' \| 'yellow-light'` | `'primary'` | Color del botón |
| `size` | `'small' \| 'normal' \| 'large'` | `'normal'` | Tamaño del botón |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `className` | `string` | — | Clases adicionales |
| `onClick` | `() => void` | — | Handler de click |

---

### Modal

Modal base con animación de entrada/salida, focus trap, scroll lock y soporte de navegación por teclado.

```tsx
import { Modal } from "@votodigital-onpeui/react";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Abrir Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} closeButton>
        <h2>Título del Modal</h2>
        <p>Contenido del modal.</p>
      </Modal>
    </>
  );
}
```

#### Props principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Estado de apertura **(requerido)** |
| `onClose` | `() => void` | — | Función para cerrar **(requerida)** |
| `children` | `ReactNode` | — | Contenido del modal **(requerido)** |
| `closeButton` | `boolean` | `false` | Muestra botón X para cerrar |
| `closeDisabled` | `boolean` | `false` | Deshabilita el cierre por click fuera y Escape |
| `escapeToClose` | `boolean` | `true` | Permite cerrar con tecla Escape |
| `whitoutBackground` | `boolean` | `false` | Modal sin fondo blanco (transparente) |
| `zIndexLevel` | `number` | `100` | Nivel de z-index del modal |
| `onCloseComplete` | `() => void` | — | Callback que se ejecuta cuando termina la animación de salida |
| `className` | `string` | — | Clases adicionales para el contenedor del contenido |

> **Nota sobre estado global:** El Modal cachea internamente el último contenido mientras realiza la animación de salida. Si usás Zustand, Redux u otro estado global y limpiás los datos al cerrar, el modal seguirá mostrando el contenido durante la animación de salida sin que se vea en blanco.

---

### ModalConfirm

Modal de confirmación con icono, título, mensaje y botones de acción.

```tsx
import { ModalConfirm } from "@votodigital-onpeui/react";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Eliminar</button>

      <ModalConfirm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="¿Estás seguro?"
        message="Esta acción no se puede deshacer."
        icon="warning"
        color="red"
        textButtonConfirm="Eliminar"
        textButtonCancel="Cancelar"
        onConfirm={() => console.log("confirmado")}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | **(requerido)** |
| `onClose` | `() => void` | — | **(requerido)** |
| `title` | `string` | — | Título del modal **(requerido)** |
| `message` | `ReactNode` | — | Mensaje descriptivo **(requerido)** |
| `icon` | `'warning' \| 'success'` | `'warning'` | Icono a mostrar |
| `color` | `'blue' \| 'red'` | `'blue'` | Color del icono y título |
| `twoButtons` | `boolean` | `true` | Muestra dos botones (confirmar + cancelar) |
| `textButtonConfirm` | `string` | `'Confirmar'` | Texto del botón de confirmación |
| `textButtonCancel` | `string` | `'Cancelar'` | Texto del botón de cancelación |
| `onConfirm` | `() => void` | — | Acción al confirmar |
| `onCancel` | `() => void` | — | Acción al cancelar |
| `withoutAutoClose` | `boolean` | `false` | Evita que el modal se cierre automáticamente al confirmar/cancelar |
| `zIndexLevel` | `number` | `100` | Nivel de z-index |

---

### ModalLoading

Modal de carga con spinner animado y mensaje.

```tsx
import { ModalLoading } from "@votodigital-onpeui/react";

<ModalLoading
  isOpen={loading}
  message="Procesando información..."
/>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | **(requerido)** |
| `message` | `string` | `'Cargando...'` | Mensaje de carga |
| `zIndexLevel` | `number` | `100` | Nivel de z-index |

---

### ModalBrowserIncompatible

Modal que informa al usuario que está usando un navegador no recomendado.

```tsx
import { ModalBrowserIncompatible } from "@votodigital-onpeui/react";

<ModalBrowserIncompatible
  isOpen={showBrowserModal}
  onClose={() => setShowBrowserModal(false)}
/>
```

---

### ModalSystemIncompatible

Modal que informa al usuario que su sistema operativo no es compatible con ONPE ID.

```tsx
import { ModalSystemIncompatible } from "@votodigital-onpeui/react";

<ModalSystemIncompatible
  isOpen={showSystemModal}
  onClose={() => setShowSystemModal(false)}
/>
```

---

### ModalDnieVersions

Modal informativo sobre las versiones del DNI electrónico. Recibe las imágenes de cada versión como props (ReactNode).

```tsx
import { ModalDnieVersions } from "@votodigital-onpeui/react";

<ModalDnieVersions
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  iconDnie1={<img src="/dnie-v1.png" alt="DNIe versión 1" />}
  iconDnie2={<img src="/dnie-v2.png" alt="DNIe versión 2" />}
  iconDnie3={<img src="/dnie-v3.png" alt="DNIe versión 3" />}
/>
```

---

### ModalNfc

Modal informativo sobre cómo usar NFC para leer el DNIe. Recibe las imágenes de ejemplo como props (ReactNode).

```tsx
import { ModalNfc } from "@votodigital-onpeui/react";

<ModalNfc
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  iconNfc1={<img src="/nfc-android.png" alt="NFC Android" />}
  iconNfc2={<img src="/nfc-iphone.png" alt="NFC iPhone" />}
/>
```

---

### NotRecommended

Widget flotante que advierte sobre navegador o sistema operativo no recomendado. Se puede minimizar/maximizar.

```tsx
import { NotRecommended } from "@votodigital-onpeui/react";

// Advertencia de navegador
<NotRecommended isOpenBrowserError={true} />

// Advertencia de sistema operativo
<NotRecommended isOpenDeviceError={true} />

// Posición personalizada
<NotRecommended
  isOpenBrowserError={true}
  bottom={40}
  right={20}
/>
```

---

### Footer

Footer institucional ONPE con información de contacto y navegadores recomendados.

```tsx
import { Footer } from "@votodigital-onpeui/react";

<Footer
  showBrowserInfo={true}
  showContactInfo={true}
  isDevelopment={false}
/>
```

---

### BrowserRecommended

Banner que muestra los navegadores recomendados (Chrome, Safari, Edge).

```tsx
import { BrowserRecommended } from "@votodigital-onpeui/react";

<BrowserRecommended />
```

---

### Show

Componente de renderizado condicional. Muestra un componente de carga mientras `condition` es `true`, y el contenido cuando es `false`.

```tsx
import { Show } from "@votodigital-onpeui/react";

<Show
  condition={isLoading}
  loadingComponent={<div>Cargando...</div>}
>
  <div>Contenido cargado</div>
</Show>
```

---

### Overlay

Overlay de fondo para superposiciones personalizadas.

```tsx
import { Overlay } from "@votodigital-onpeui/react";

<div className="relative">
  <Overlay show={isOpen} color="blue" onClick={() => setIsOpen(false)} />
</div>
```

---

### Portal

Renderiza contenido fuera del árbol DOM del componente padre, usando `document.querySelector('#portal')` o `document.body` como fallback.

```tsx
import { Portal } from "@votodigital-onpeui/react";

<Portal>
  <div>Contenido renderizado fuera del árbol DOM</div>
</Portal>
```

---

## Iconos

Los iconos son componentes SVG que aceptan `className` y demás props de `<svg>`.

### Acciones

```tsx
import {
  IconCheck,
  IconClose,
  IconCloseRadius,
  IconHome,
  IconInfo,
  IconPhone,
  IconSpinnerDesktop,
  IconSpinnerMobile,
  IconWarning,
  IconWarningNotRecommended,
} from "@votodigital-onpeui/react/icons";

<IconCheck className="w-6 h-6 text-onpe-green" />
<IconWarning className="w-8 h-8 text-onpe-yellow" />
<IconSpinnerDesktop className="w-12 h-12 text-white animate-spin" />
```

### Navegadores

```tsx
import {
  IconChrome, IconChromeColor,
  IconEdge, IconEdgeColor,
  IconSafari, IconSafariColor,
  IconMozilla, IconMozillaColor,
} from "@votodigital-onpeui/react/icons";

// Monocromos (color via className)
<IconChrome className="w-6 h-6 text-onpe-blue" />

// A color (colores fijos propios del ícono)
<IconChromeColor className="w-8 h-8" />
```

### Sistemas Operativos

```tsx
import {
  IconAndroid,
  IconApple,
  IconHuawei,
  IconWindow,
} from "@votodigital-onpeui/react/icons";

<IconAndroid className="w-6 h-6 text-onpe-skyblue" />
<IconApple className="w-6 h-6 text-onpe-skyblue" />
```

### Redes Sociales

```tsx
import {
  FaceBookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "@votodigital-onpeui/react/icons";

<FaceBookIcon className="w-6 h-6 text-onpe-blue" />
<YoutubeIcon className="w-6 h-6 text-onpe-red" />
```

### ONPE

```tsx
import {
  IconLogoONPE,
  IconVotoDigital,
  IconElectionsGeneral,
  IconElectionsRegionalesYMunicipales,
} from "@votodigital-onpeui/react/icons";

<IconLogoONPE className="w-24 h-24 text-onpe-blue" />
<IconVotoDigital className="w-16 h-16 text-onpe-skyblue" />
```

---

## Paleta de colores ONPE

Los colores se acceden via clases Tailwind con el prefijo `onpe-`:

| Token | Clase Tailwind | Hex |
|-------|---------------|-----|
| Azul principal | `text-onpe-blue` / `bg-onpe-blue` | `#003770` |
| Sky Blue | `text-onpe-skyblue` / `bg-onpe-skyblue` | `#0073cf` |
| Sky Blue Light | `text-onpe-skyblue-light` / `bg-onpe-skyblue-light` | `#69b2e8` |
| Light Sky Blue | `text-onpe-light-skyblue` / `bg-onpe-light-skyblue` | `#aaeff6` |
| Amarillo | `text-onpe-yellow` / `bg-onpe-yellow` | `#ffb81c` |
| Amarillo Light | `text-onpe-yellow-light` / `bg-onpe-yellow-light` | `#fff1d2` |
| Verde | `text-onpe-green` / `bg-onpe-green` | `#76bd43` |
| Rojo | `text-onpe-red` / `bg-onpe-red` | `#e3002b` |
| Dark Gray | `text-onpe-dark-gray` / `bg-onpe-dark-gray` | `#4f4f4f` |
| Gray | `text-onpe-gray` / `bg-onpe-gray` | `#bcbcbc` |
| Gray Light | `text-onpe-gray-light` / `bg-onpe-gray-light` | `#bdbdbd` |
| Gray Extra Light | `text-onpe-gray-extra-light` / `bg-onpe-gray-extra-light` | `#f2f2f2` |

---

## Dependencias de componentes

```
Modal
├── Portal
└── IconCloseRadius

ModalConfirm → Modal
ModalLoading → Modal
ModalBrowserIncompatible → Modal + IconWarning + IconChromeColor + IconSafariColor + IconEdgeColor
ModalSystemIncompatible  → Modal + IconWarning + IconWindow + IconAndroid + IconApple
ModalDnieVersions → Modal
ModalNfc → Modal + IconAndroid + IconApple

Footer → BrowserRecommended + iconos de redes sociales
NotRecommended → IconWarningNotRecommended + IconCloseRadius
```

---

## Desarrollo

### Requisitos

- Node.js 18+
- npm 9+

### Scripts

```bash
npm run build        # Build para producción
npm run dev          # Build en modo watch
npm run storybook    # Servidor de Storybook en localhost:6006
npm run lint         # Verificar código con ESLint
```

### Build

El build genera tres entradas en `dist/`:

```
dist/
├── index.js / index.mjs / index.d.ts      → @votodigital-onpeui/react
├── components.js / components.mjs / ...   → @votodigital-onpeui/react/components
├── icons.js / icons.mjs / icons.d.ts      → @votodigital-onpeui/react/icons
└── styles.css                             → @votodigital-onpeui/react/styles.css
```

---

## Licencia

MIT © ONPE — Oficina Nacional de Procesos Electorales
