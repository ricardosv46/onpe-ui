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

## ⚠️ Importante sobre Estilos

### Opción 1: Librería Completa (Recomendado)
Esta librería **NO requiere** que instales TailwindCSS en tu proyecto. Los estilos ya están compilados y optimizados. Solo necesitas crear tu propio archivo CSS con las variables personalizadas:

#### Crear archivo CSS personalizado
Crea un archivo llamado `onpe-ui.css` en la raíz de tu proyecto:

```css
/* Solo definimos nuestras variables y estilos personalizados */



:root {
  --blue: #003770;
  --skyblue: #0073cf;
  --skyblue-light: #69b2e8;
  --yellow: #ffb81c;
  --light-skyblue: #aaeff6;
  --gray: #bcbcbc;
  --gray-light: #bdbdbd;
  --gray-extra-light: #f2f2f2;
  --red: #e3002b;
  --dark-gray: #4f4f4f;
  --green: #76bd43;
  --yellow-light: #FFF1D2;
}

@theme {
  --color-onpe-ui-blue: var(--blue);
  --color-onpe-ui-skyblue: var(--skyblue);
  --color-onpe-ui-skyblue-light: var(--skyblue-light);
  --color-onpe-ui-yellow: var(--yellow);
  --color-onpe-ui-light-skyblue: var(--light-skyblue);
  --color-onpe-ui-gray: var(--gray);
  --color-onpe-ui-gray-light: var(--gray-light);
  --color-onpe-ui-gray-extra-light: var(--gray-extra-light);
  --color-onpe-ui-red: var(--red);
  --color-onpe-ui-dark-gray: var(--dark-gray);
  --color-onpe-ui-green: var(--green);
  --color-onpe-ui-yellow-light: var(--yellow-light);
}


button{
  cursor: pointer;
}


@keyframes fastBlink {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
.fast-blink {
  animation: fastBlink 0.8s ease-in-out infinite;
}
```

#### Importar el archivo CSS en tu proyecto
```tsx
// En tu archivo principal (index.tsx, App.tsx, etc.)
import './onpe-ui.css';
import { Button } from '@onpe/ui/components';
```

### Opción 2: Componentes Individuales
Si instalas componentes individualmente con la CLI, **SÍ necesitas** instalar y configurar TailwindCSS en tu proyecto.

## 📖 Uso Básico

### Opción 1: Usar la Librería Completa

#### Importar estilos
```tsx
// Importar tu archivo CSS personalizado
import './onpe-ui.css';
import { Button } from '@onpe/ui/components';
```

#### Usar componentes
```tsx
import './onpe-ui.css';
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
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="p-4">
      <Button 
        color="primary" 
        title="Abrir Modal" 
        onClick={() => setIsOpen(true)} 
      />
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        closeButton={true}
        overlayColor="blue"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Contenido del Modal</h2>
          <p className="mb-4">Este es un ejemplo de modal con contenido.</p>
          <Button 
            color="green" 
            title="Cerrar" 
            onClick={() => setIsOpen(false)} 
          />
        </div>
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

#### Ejemplo Básico
```tsx
import { Button } from '@onpe/ui/components';

function App() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Botones ONPE</h2>
      
      {/* Colores disponibles */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Colores:</h3>
        <div className="flex flex-wrap gap-2">
          <Button color="primary" title="Primario" />
          <Button color="blue" title="Azul" />
          <Button color="skyblue" title="Sky Blue" />
          <Button color="green" title="Verde" />
          <Button color="yellow" title="Amarillo" />
          <Button color="red" title="Rojo" />
        </div>
      </div>

      {/* Tamaños */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tamaños:</h3>
        <div className="flex items-center gap-2">
          <Button color="primary" title="Pequeño" size="small" />
          <Button color="primary" title="Mediano" size="normal" />
          <Button color="primary" title="Grande" size="large" />
        </div>
      </div>

      {/* Estados */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Estados:</h3>
        <div className="flex gap-2">
          <Button color="primary" title="Normal" />
          <Button color="primary" title="Deshabilitado" disabled />
        </div>
      </div>
    </div>
  );
}
```

#### Ejemplo con Funcionalidad
```tsx
import { Button } from '@onpe/ui/components';
import { useState } from 'react';

function VotingApp() {
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVoted(true);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Sistema de Votación</h2>
      
      {!voted ? (
        <div className="space-y-4">
          <p className="text-gray-600">¿Desea votar por esta opción?</p>
          <Button 
            color="primary" 
            title={loading ? "Procesando..." : "Votar Ahora"}
            onClick={handleVote}
            disabled={loading}
            size="large"
          />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-4">¡Voto registrado exitosamente!</p>
          <Button 
            color="green" 
            title="Ver Resultados"
            onClick={() => setVoted(false)}
          />
        </div>
      )}
    </div>
  );
}
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

#### Ejemplo Básico
```tsx
import { Modal } from '@onpe/ui/components';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="p-4">
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Abrir Modal
      </button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        closeButton={true}
        overlayColor="blue"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Título del Modal</h2>
          <p className="mb-4">Este es el contenido del modal.</p>
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}
```

#### Ejemplo Avanzado - Modal de Confirmación
```tsx
import { Modal } from '@onpe/ui/components';
import { useState } from 'react';

function DeleteConfirmation() {
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  const handleDelete = (itemName) => {
    setItemToDelete(itemName);
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Lógica para eliminar el elemento
    console.log(`Eliminando: ${itemToDelete}`);
    setShowModal(false);
    setItemToDelete('');
  };

  return (
    <div className="p-4">
      <div className="space-y-2">
        <button 
          onClick={() => handleDelete('Usuario 1')}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Eliminar Usuario 1
        </button>
        <button 
          onClick={() => handleDelete('Documento 2')}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Eliminar Documento 2
        </button>
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        closeButton={true}
        overlayColor="red"
        closeDisabled={false}
      >
        <div className="p-6 text-center">
          <div className="mb-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Confirmar Eliminación
            </h3>
            <p className="text-sm text-gray-500">
              ¿Está seguro de que desea eliminar <strong>{itemToDelete}</strong>? 
              Esta acción no se puede deshacer.
            </p>
          </div>
          
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
```

#### Ejemplo - Modal de Formulario
```tsx
import { Modal } from '@onpe/ui/components';
import { useState } from 'react';

function UserForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    setIsOpen(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Agregar Usuario
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        closeButton={true}
        overlayColor="skyblue"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Nuevo Usuario</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Guardar Usuario
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
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

## 🚀 Ejemplos Completos de Aplicaciones

### Aplicación de Votación Electrónica
```tsx
import { Button, Modal, Show } from '@onpe/ui/components';
import { useState } from 'react';

function VotingApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voted, setVoted] = useState(false);

  const candidates = [
    { id: '1', name: 'Juan Pérez', party: 'Partido Democrático' },
    { id: '2', name: 'María García', party: 'Partido Progresista' },
    { id: '3', name: 'Carlos López', party: 'Partido Independiente' }
  ];

  const handleVote = () => {
    setVoted(true);
    setShowConfirmModal(false);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Votación ONPE
          </h1>
          <p className="text-gray-600">
            Seleccione su candidato preferido
          </p>
        </div>

        <Show when={currentStep === 1}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Candidatos Disponibles:</h2>
            {candidates.map((candidate) => (
              <div 
                key={candidate.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedCandidate === candidate.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.party}</p>
                  </div>
                  {selectedCandidate === candidate.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="pt-4">
              <Button 
                color="primary" 
                title="Continuar" 
                size="large"
                disabled={!selectedCandidate}
                onClick={() => setCurrentStep(2)}
              />
            </div>
          </div>
        </Show>

        <Show when={currentStep === 2}>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Confirmar Voto</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-600 mb-2">Ha seleccionado:</p>
              <p className="font-semibold text-lg">
                {candidates.find(c => c.id === selectedCandidate)?.name}
              </p>
              <p className="text-gray-600">
                {candidates.find(c => c.id === selectedCandidate)?.party}
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                color="gray" 
                title="Volver" 
                onClick={() => setCurrentStep(1)}
              />
              <Button 
                color="primary" 
                title="Confirmar Voto" 
                onClick={() => setShowConfirmModal(true)}
              />
            </div>
          </div>
        </Show>

        <Show when={currentStep === 4}>
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                ¡Voto Registrado Exitosamente!
              </h2>
              <p className="text-gray-600">
                Su voto ha sido procesado correctamente. Gracias por participar en la democracia.
              </p>
            </div>
            
            <Button 
              color="green" 
              title="Ver Resultados" 
              size="large"
              onClick={() => window.location.reload()}
            />
          </div>
        </Show>

        {/* Modal de Confirmación */}
        <Modal 
          isOpen={showConfirmModal} 
          onClose={() => setShowConfirmModal(false)}
          closeButton={true}
          overlayColor="blue"
        >
          <div className="p-6 text-center">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Confirmar Voto
              </h3>
              <p className="text-sm text-gray-500">
                ¿Está seguro de que desea votar por{' '}
                <strong>{candidates.find(c => c.id === selectedCandidate)?.name}</strong>?
                Esta acción no se puede deshacer.
              </p>
            </div>
            
            <div className="flex justify-center space-x-3">
              <Button
                color="gray"
                title="Cancelar"
                onClick={() => setShowConfirmModal(false)}
              />
              <Button
                color="primary"
                title="Confirmar Voto"
                onClick={handleVote}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default VotingApp;
```

### Dashboard de Administración
```tsx
import { Button, Modal, Show } from '@onpe/ui/components';
import { useState } from 'react';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@onpe.gob.pe', role: 'Admin' },
    { id: 2, name: 'María García', email: 'maria@onpe.gob.pe', role: 'Usuario' },
    { id: 3, name: 'Carlos López', email: 'carlos@onpe.gob.pe', role: 'Usuario' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Usuario'
  });

  const addUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'Usuario' });
    setShowUserModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard ONPE</h1>
              <p className="text-gray-600">Panel de administración del sistema electoral</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Administrador</span>
              <Button color="primary" title="Cerrar Sesión" size="small" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab('elections')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'elections'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Elecciones
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Reportes
            </button>
          </nav>
        </div>

        {/* Users Tab */}
        <Show when={activeTab === 'users'}>
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Gestión de Usuarios</h2>
                <Button 
                  color="green" 
                  title="Agregar Usuario" 
                  onClick={() => setShowUserModal(true)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'Admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button color="skyblue" title="Editar" size="small" />
                          <Button color="red" title="Eliminar" size="small" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Show>

        {/* Elections Tab */}
        <Show when={activeTab === 'elections'}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Gestión de Elecciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Elecciones Generales</h3>
                <p className="text-blue-700 text-sm mt-1">14 de abril, 2024</p>
                <Button color="blue" title="Ver Detalles" size="small" />
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">Elecciones Regionales</h3>
                <p className="text-green-700 text-sm mt-1">28 de octubre, 2024</p>
                <Button color="green" title="Ver Detalles" size="small" />
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900">Elecciones Municipales</h3>
                <p className="text-yellow-700 text-sm mt-1">15 de diciembre, 2024</p>
                <Button color="yellow" title="Ver Detalles" size="small" />
              </div>
            </div>
          </div>
        </Show>

        {/* Reports Tab */}
        <Show when={activeTab === 'reports'}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Reportes del Sistema</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Reporte de Participación Electoral</h3>
                  <p className="text-sm text-gray-600">Generado el 15 de abril, 2024</p>
                </div>
                <Button color="primary" title="Descargar PDF" size="small" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Estadísticas de Usuarios</h3>
                  <p className="text-sm text-gray-600">Generado el 14 de abril, 2024</p>
                </div>
                <Button color="primary" title="Descargar PDF" size="small" />
              </div>
            </div>
          </div>
        </Show>

        {/* Add User Modal */}
        <Modal 
          isOpen={showUserModal} 
          onClose={() => setShowUserModal(false)}
          closeButton={true}
          overlayColor="skyblue"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Usuario</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="usuario@onpe.gob.pe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Admin">Administrador</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  color="gray"
                  title="Cancelar"
                  onClick={() => setShowUserModal(false)}
                />
                <Button
                  color="green"
                  title="Agregar Usuario"
                  onClick={addUser}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AdminDashboard;
```

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
```tsx
/* Verificar que tengas la importación correcta */
import './onpe-ui.css';
import { Button } from '@onpe/ui/components';
```

**Solución: Verificar rutas de importación**
```tsx
// ✅ CORRECTO: Importar tu archivo CSS personalizado
import './onpe-ui.css';
import { Button } from '@onpe/ui/components';

// ❌ INCORRECTO: No importar el archivo CSS
import { Button } from '@onpe/ui/components';
```

**Solución: Verificar configuración de bundler**
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@onpe/ui': path.resolve(__dirname, 'node_modules/@onpe/ui')
    }
  }
};

// vite.config.js
export default {
  resolve: {
    alias: {
      '@onpe/ui': path.resolve(__dirname, 'node_modules/@onpe/ui')
    }
  }
};
```

**Solución: Verificar orden de importación**
```tsx
// ✅ CORRECTO - Importar estilos ANTES de los componentes
import '@onpe/ui/styles';
import { Button } from '@onpe/ui/components';

// ❌ INCORRECTO - Importar estilos DESPUÉS de los componentes
import { Button } from '@onpe/ui/components';
import '@onpe/ui/styles';
```

### Problemas con Estilos

**Los componentes se ven sin estilos**
```bash
# Verificar que la librería esté instalada
npm list @onpe/ui

# Verificar que los estilos estén en node_modules
ls node_modules/@onpe/ui/dist/
```

**Solución: Verificar importación de estilos**
```tsx
// En tu archivo principal (index.tsx o App.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@onpe/ui/styles'; // ← IMPORTANTE: Importar estilos primero
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Solución: Verificar configuración de CSS**
```css
/* En tu archivo CSS principal */
@import "@onpe/ui/styles";

/* O si usas CSS modules */
@import "~@onpe/ui/styles";
```

**Los colores personalizados no funcionan**
```tsx
// Verificar que estés usando las clases correctas
<div className="bg-onpe-ui-blue text-white p-4">
  Contenido con colores ONPE
</div>

// Verificar que los estilos estén importados
import '@onpe/ui/styles';
```

**Solución: Verificar configuración de Tailwind (para componentes individuales)**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'onpe-ui-blue': '#003770',
        'onpe-ui-skyblue': '#0073cf',
        // ... resto de colores
      }
    },
  },
}
```

### Problemas con Storybook

**Error: "Failed to fetch dynamically imported module"**
- Verificar que el archivo `preview.ts` importe correctamente `../src/styles.css`
- Asegurar que Tailwind CSS esté configurado correctamente
- Verificar que PostCSS esté configurado

**Solución: Configuración completa de Storybook**
```typescript
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.css = {
      ...config.css,
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    };
    return config;
  },
};

export default config;
```

```typescript
// .storybook/preview.ts
import type { Preview } from "@storybook/react";
import "../src/styles.css"; // ← Importar estilos

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

## 🚀 Guía Rápida de Solución

### ¿Los componentes no se ven con estilos?

**Paso 1: Verificar instalación**
```bash
npm list @onpe/ui
```

**Paso 2: Crear archivo CSS personalizado**
```css
/* Crear archivo onpe-ui.css en la raíz del proyecto */
:root {
  --blue: #003770;
  --skyblue: #0073cf;
  /* ... resto de variables */
}

@theme {
  --color-onpe-ui-blue: var(--blue);
  /* ... resto de colores */
}
```

**Paso 3: Importar estilos**
```tsx
// En tu archivo principal (index.tsx)
import './onpe-ui.css';
import { Button } from '@onpe/ui/components';
```

**Paso 4: Verificar orden de importación**
```tsx
// ✅ CORRECTO
import './onpe-ui.css';
import { Button } from '@onpe/ui/components';

// ❌ INCORRECTO
import { Button } from '@onpe/ui/components';
// Falta importar el archivo CSS
```

### ¿Los colores no funcionan?

**Solución: Usar clases correctas**
```tsx
// ✅ CORRECTO
<div className="bg-onpe-ui-blue text-white p-4">
  Contenido
</div>

// ❌ INCORRECTO
<div className="bg-blue-500 text-white p-4">
  Contenido
</div>
```

### ¿Storybook no funciona?

**Solución: Configuración completa**
```typescript
// .storybook/preview.ts
import "../src/styles.css";

// .storybook/main.ts
viteFinal: async (config) => {
  config.css = {
    ...config.css,
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  };
  return config;
},
```

### ¿CLI no instala componentes?

**Solución: Verificar comandos**
```bash
# ✅ CORRECTO
npx onpe-ui add button
npx onpe-ui add modal

# ❌ INCORRECTO
npx onpe-ui add Button
npx onpe-ui add Modal
```

### ¿Portal no funciona?

**Solución: Agregar elemento HTML**
```html
<!-- En public/index.html -->
<div id="root"></div>
<div id="portal"></div>
```

## 📞 Soporte

- 📧 Email: desarrollo@onpe.gob.pe
- 🐛 Issues: [GitHub Issues](https://github.com/ricardosv46/onpe-ui/issues)
- 📖 Documentación: [Storybook](https://onpe-ui-components.netlify.app)
- 🔗 Repositorio: [GitHub](https://github.com/ricardosv46/onpe-ui)
- 📦 NPM: [@onpe/ui](https://www.npmjs.com/package/@onpe/ui)

---

**Desarrollado con ❤️ para la democracia peruana** 🇵🇪