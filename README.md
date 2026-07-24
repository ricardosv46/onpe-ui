# @votodigital-onpeui/react

Librería de componentes de interfaz de usuario para aplicaciones de la Oficina Nacional de Procesos Electorales (ONPE) del Perú, construida con React, TypeScript y Tailwind CSS v4.


## Características

- **Colores oficiales ONPE** — Paleta de colores institucional completa
- **CSS autocontenido** — Estilos compilados en el paquete; el host solo importa un `.css`
- **Sin choques con Tailwind del host** — Utilidades con prefijo `oui:` y **sin Preflight**
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
// main.tsx, index.tsx o _app.tsx (Next.js)
import "@votodigital-onpeui/react/styles.css";
```

**No necesitas** configurar Tailwind del host para esta librería (ni `@source`, ni replicar tokens `onpe-*` en el tema del proyecto). El CSS publicado ya trae las utilidades y colores que usan los componentes.

Para componentes que usan `Portal` (Modal y derivados), agregar el elemento `#portal` en el HTML:

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <div id="portal"></div>
</body>
```

---

## Estilos aislados (`oui:`) — por qué no chocan con el host

La librería usa **Tailwind CSS v4 solo en su build**. El CSS publicado:

1. **Prefijo `oui:`** en todas las utilidades (`oui:flex`, `oui:bg-onpe-blue`, `oui:md:hidden`, …).  
   Así no existen clases globales `.flex` / `.p-4` de la librería que pisen las del host.
2. **Sin Preflight** — no resetea botones, bordes ni tipografía del proyecto consumidor.
3. **Tokens propios** — variables CSS con prefijo (`--oui-color-onpe-blue`, etc.).

| En la librería (interno) | En tu app (host) |
|--------------------------|------------------|
| `oui:flex`, `oui:bg-onpe-red` | `flex`, `bg-blue-500` (tu Tailwind normal) |
| Importas `styles.css` | Tu `globals.css` / config Tailwind sigue igual |

### `className` adicional desde el host

Si pasas `className` a un componente de la librería y quieres usar **utilidades del CSS de ONPE UI**, debes usar el prefijo `oui:`:

```tsx
// ✅ Estilos de la librería
<Modal className="oui:bg-white" ... />
<IconLogoONPE className="oui:w-24 oui:h-24 oui:text-onpe-blue" />

// ✅ Estilos de TU Tailwind (si el host genera esas clases)
<div className="flex gap-4 p-4">...</div>

// ❌ No aplicará estilos de ONPE UI (falta el prefijo)
<Modal className="bg-white" ... />
```

Las props de API (`color="red"`, `size="small"`, etc.) **no** usan el prefijo: son valores de la API de React, no clases CSS.

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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} closeButton className="oui:bg-white">
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
        type="warning"
        color="red"
        buttonMode="double"
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
| `title` | `string` | — | Título del modal |
| `message` | `ReactNode` | — | Mensaje descriptivo (string o JSX) |
| `content` | `ReactNode` | — | Alias de `message` |
| `type` | `'warning' \| 'success' \| 'question' \| 'info' \| 'none'` | `'warning'` | Determina el icono y el color por defecto |
| `buttonMode` | `'single' \| 'double' \| 'confirm'` | — | `single` = un botón, `double` = Cancelar + Confirmar, `confirm` = No + Sí |
| `color` | `'blue' \| 'red' \| 'skyblue' \| 'yellow'` | — | Override manual del color del icono y título |
| `textButtonConfirm` | `string` | `'Confirmar'` | Texto del botón de confirmación |
| `textButtonCancel` | `string` | `'Cancelar'` | Texto del botón de cancelación |
| `onConfirm` | `() => void \| Promise<void>` | — | Acción al confirmar |
| `onCancel` | `() => void \| Promise<void>` | — | Acción al cancelar |
| `withoutAutoClose` | `boolean` | `false` | Evita que el modal se cierre automáticamente al confirmar/cancelar |
| `disabledConfirmButton` | `boolean` | `false` | Deshabilita el botón confirmar |
| `closeDisabled` | `boolean` | `false` | Deshabilita el cierre por click fuera y Escape |
| `closeButton` | `boolean` | `false` | Muestra botón X para cerrar |
| `alignJustify` | `boolean` | `false` | Alinea el texto del mensaje en justify en vez de centrado |
| `alignTop` | `boolean` | `false` | Alinea el modal al tope de la pantalla |
| `animated` | `boolean` | `true` | Habilita animación de entrada/salida |
| `preventBodyScroll` | `boolean` | `true` | Bloquea el scroll del body mientras el modal está abierto |
| `zIndexLevel` | `number` | `100` | Nivel de z-index |
| `className` | `string` | — | Clases adicionales |

---

### ModalLoading

Modal de carga con spinner animado y mensaje.

```tsx
import { ModalLoading } from "@votodigital-onpeui/react";

// Uso básico
<ModalLoading
  isOpen={loading}
  message="Procesando información..."
/>

// Con spinner personalizado
<ModalLoading
  isOpen={loading}
  message="Subiendo archivo..."
  spinner={<div className="oui:w-16 oui:h-16 oui:rounded-full oui:border-4 oui:border-white oui:border-t-transparent oui:animate-spin" />}
/>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | **(requerido)** |
| `onClose` | `() => void` | — | Callback al cerrar |
| `message` | `string` | `'Cargando...'` | Mensaje de carga |
| `spinner` | `ReactNode` | — | Spinner personalizado. Si no se provee, se usa el spinner por defecto |
| `animated` | `boolean` | `true` | Habilita animación de entrada/salida |
| `preventBodyScroll` | `boolean` | `true` | Bloquea el scroll del body |
| `zIndexLevel` | `number` | `100` | Nivel de z-index |
| `className` | `string` | — | Clases adicionales |

---

### ModalLoadingPercentage

Modal de carga con barra de progreso y porcentaje.

```tsx
import { ModalLoadingPercentage } from "@votodigital-onpeui/react";

<ModalLoadingPercentage
  isOpen={isOpen}
  message="Importando padrón electoral"
  percentage={progress}
/>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | **(requerido)** |
| `message` | `string` | — | **(requerido)** Texto que aparece sobre la barra de progreso |
| `percentage` | `number` | — | **(requerido)** Valor entre 0 y 100. Se clampea automáticamente |
| `alignTop` | `boolean` | `false` | Alinea el modal al tope de la pantalla en vez de al centro |
| `animated` | `boolean` | `true` | Habilita animación de entrada/salida |
| `preventBodyScroll` | `boolean` | `true` | Bloquea el scroll del body |
| `zIndexLevel` | `number` | `300` | Nivel de z-index |

---

### ModalGlobalProvider

Proveedor centralizado que gestiona los tres modales (ModalConfirm, ModalLoading, ModalLoadingPercentage) desde cualquier parte de la app sin props drilling. Usa Zustand internamente.

#### Setup

Envuelve tu app una sola vez:

```tsx
import { ModalGlobalProvider } from "@votodigital-onpeui/react";

function App() {
  return (
    <ModalGlobalProvider>
      <Router />
    </ModalGlobalProvider>
  );
}
```

#### Usar el modal de confirmación

```tsx
import { useModalGlobalStore } from "@votodigital-onpeui/react";

function MiComponente() {
  const { openModal, openModalWithClose } = useModalGlobalStore();

  const handleEliminar = async () => {
    // Retorna true (confirmar) o false (cancelar)
    const confirmed = await openModal({
      type: "warning",
      title: "¿Estás seguro?",
      message: "Esta acción no se puede deshacer.",
      buttonMode: "double",
      color: "red",
      textButtonConfirm: "Eliminar",
    });

    if (confirmed) {
      // lógica de eliminación
    }
  };

  const handleConX = async () => {
    // Retorna 'confirm' | 'cancel' | 'close'
    const result = await openModalWithClose({
      type: "info",
      title: "Aviso",
      message: "Revisa los datos antes de continuar.",
      buttonMode: "single",
    });
  };
}
```

#### Usar el modal de loading

```tsx
import { useModalLoadingStore } from "@votodigital-onpeui/react";

function MiComponente() {
  const { openLoading, closeLoading } = useModalLoadingStore();

  const handleGuardar = async () => {
    const sessionId = openLoading("Guardando...");
    try {
      await guardarDatos();
    } finally {
      closeLoading(sessionId);
    }
  };
}
```

#### Usar el modal de loading con porcentaje

```tsx
import { useModalLoadingPercentageStore } from "@votodigital-onpeui/react";

function MiComponente() {
  const { openLoadingPercentage, updatePercentage, closeLoadingPercentage } =
    useModalLoadingPercentageStore();

  const handleImportar = async () => {
    const sessionId = openLoadingPercentage("Importando padrón", 0);
    for (let i = 0; i <= 100; i += 10) {
      await procesarLote(i);
      updatePercentage(i, sessionId);
    }
    closeLoadingPercentage(sessionId);
  };
}
```

> **Nota sobre sessionId:** `openLoading`, `openLoadingPercentage` retornan un `sessionId`. Pasarlo a `closeLoading` / `closeLoadingPercentage` evita que una llamada tardía cierre un loading abierto por otra operación posterior.

#### Props de ModalGlobalProvider

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **(requerido)** |
| `zIndexLevel` | `number` | `200` | z-index del ModalConfirm |
| `zIndexLoading` | `number` | `300` | z-index del ModalLoading |
| `zIndexLoadingPercentage` | `number` | `300` | z-index del ModalLoadingPercentage |
| `animated` | `boolean` | `true` | Animación en todos los modales |
| `preventBodyScroll` | `boolean` | `true` | Scroll lock en todos los modales |
| `loadingSpinner` | `ReactNode` | — | Spinner personalizado para ModalLoading |
| `loadingPercentageAlignTop` | `boolean` | `false` | Alinea el ModalLoadingPercentage al tope |
| `defaultTextButtonConfirm` | `string` | — | Texto por defecto del botón confirmar |
| `defaultTextButtonCancel` | `string` | — | Texto por defecto del botón cancelar |
| `disableFocus` | `boolean` | `false` | Deshabilita el manejo de focus en todos los modales |

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

<IconCheck className="oui:w-6 oui:h-6 oui:text-onpe-green" />
<IconWarning className="oui:w-8 oui:h-8 oui:text-onpe-yellow" />
<IconSpinnerDesktop className="oui:w-12 oui:h-12 oui:text-white oui:animate-spin" />
```

### Navegadores

```tsx
import {
  IconChrome, IconChromeColor,
  IconEdge, IconEdgeColor,
  IconSafari, IconSafariColor,
  IconMozilla, IconMozillaColor,
} from "@votodigital-onpeui/react/icons";

// Monocromos (color via className de ONPE UI → prefijo oui:)
<IconChrome className="oui:w-6 oui:h-6 oui:text-onpe-blue" />

// A color (colores fijos propios del ícono)
<IconChromeColor className="oui:w-8 oui:h-8" />
```

### Sistemas Operativos

```tsx
import {
  IconAndroid,
  IconApple,
  IconHuawei,
  IconWindow,
} from "@votodigital-onpeui/react/icons";

<IconAndroid className="oui:w-6 oui:h-6 oui:text-onpe-skyblue" />
<IconApple className="oui:w-6 oui:h-6 oui:text-onpe-skyblue" />
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

<FaceBookIcon className="oui:w-6 oui:h-6 oui:text-onpe-blue" />
<YoutubeIcon className="oui:w-6 oui:h-6 oui:text-onpe-red" />
```

### ONPE

```tsx
import {
  IconLogoONPE,
  IconVotoDigital,
  IconElectionsGeneral,
  IconElectionsRegionalesYMunicipales,
} from "@votodigital-onpeui/react/icons";

<IconLogoONPE className="oui:w-24 oui:h-24 oui:text-onpe-blue" />
<IconVotoDigital className="oui:w-16 oui:h-16 oui:text-onpe-skyblue" />
```

---

## Paleta de colores ONPE

Los colores institucionales se exponen como utilidades del CSS de la librería.  
Como todas las utilidades llevan el prefijo de aislamiento, la forma de usarlas es `oui:` + `text-onpe-*` / `bg-onpe-*`:

| Token | Clase (ONPE UI) | Hex |
|-------|-----------------|-----|
| Azul principal | `oui:text-onpe-blue` / `oui:bg-onpe-blue` | `#003770` |
| Sky Blue | `oui:text-onpe-skyblue` / `oui:bg-onpe-skyblue` | `#0073cf` |
| Sky Blue Light | `oui:text-onpe-skyblue-light` / `oui:bg-onpe-skyblue-light` | `#69b2e8` |
| Light Sky Blue | `oui:text-onpe-light-skyblue` / `oui:bg-onpe-light-skyblue` | `#aaeff6` |
| Amarillo | `oui:text-onpe-yellow` / `oui:bg-onpe-yellow` | `#ffb81c` |
| Amarillo Light | `oui:text-onpe-yellow-light` / `oui:bg-onpe-yellow-light` | `#fff1d2` |
| Verde | `oui:text-onpe-green` / `oui:bg-onpe-green` | `#76bd43` |
| Rojo | `oui:text-onpe-red` / `oui:bg-onpe-red` | `#e3002b` |
| Dark Gray | `oui:text-onpe-dark-gray` / `oui:bg-onpe-dark-gray` | `#4f4f4f` |
| Gray | `oui:text-onpe-gray` / `oui:bg-onpe-gray` | `#bcbcbc` |
| Gray Light | `oui:text-onpe-gray-light` / `oui:bg-onpe-gray-light` | `#bdbdbd` |
| Gray Extra Light | `oui:text-onpe-gray-extra-light` / `oui:bg-onpe-gray-extra-light` | `#f2f2f2` |

> Si tu app también usa Tailwind y define sus propios colores `onpe-*` en el tema del host, eso es independiente: no hace falta para que funcionen los componentes de esta librería.

---

## Dependencias de componentes

```
Modal
├── Portal
└── IconCloseRadius

ModalConfirm           → Modal
ModalLoading           → Modal
ModalLoadingPercentage → Modal
ModalBrowserIncompatible → Modal + IconWarning + IconChromeColor + IconSafariColor + IconEdgeColor
ModalSystemIncompatible  → Modal + IconWarning + IconWindow + IconAndroid + IconApple
ModalDnieVersions        → Modal
ModalNfc                 → Modal + IconAndroid + IconApple

ModalGlobalProvider → ModalConfirm + ModalLoading + ModalLoadingPercentage
  useModalGlobalStore             (Zustand) — openModal, openModalWithClose
  useModalLoadingStore            (Zustand) — openLoading, closeLoading
  useModalLoadingPercentageStore  (Zustand) — openLoadingPercentage, updatePercentage, closeLoadingPercentage

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

El build genera las entradas JS/TS y el CSS aislado en `dist/`:

```
dist/
├── index.js / index.mjs / index.d.ts      → @votodigital-onpeui/react
├── components.js / components.mjs / ...   → @votodigital-onpeui/react/components
├── icons.js / icons.mjs / icons.d.ts      → @votodigital-onpeui/react/icons
├── hooks.js / modal.js / ...
└── styles.css                             → @votodigital-onpeui/react/styles.css
                                           (utilidades con prefix oui:, sin preflight)
```

`npm run build` ejecuta `tsup` y luego `build:css` (Tailwind CLI) para regenerar `styles.css`.

---

## Licencia

MIT © ONPE — Oficina Nacional de Procesos Electorales
