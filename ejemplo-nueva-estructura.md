# 🎯 **Nueva Estructura ONPE UI con Barriles**

## 📁 **Estructura Mejorada**

```
src/components/
└── onpe/                     # 🏠 RAIZ PRINCIPAL
    ├── index.ts              # Exporta todo
    ├── ui/                   # Componentes básicos
    │   ├── index.ts
    │   ├── Button.tsx
    │   ├── Modal.tsx
    │   ├── Overlay.tsx
    │   ├── Portal.tsx
    │   └── Show.tsx
    ├── modals/               # Modales especializados
    │   ├── index.ts
    │   ├── ModalConfirm.tsx
    │   ├── ModalLoading.tsx
    │   ├── ModalBrowserIncompatible.tsx
    │   └── ModalSystemIncompatible.tsx
    └── icons/                # Todos los iconos organizados
        ├── index.ts
        ├── actions/          # Iconos de acciones
        │   ├── index.ts
        │   ├── IconHome.tsx
        │   ├── IconClose.tsx
        │   ├── IconCheck.tsx
        │   └── IconWarning.tsx
        ├── browsers/         # Iconos de navegadores
        │   ├── index.ts
        │   ├── IconChrome.tsx
        │   ├── IconFirefox.tsx
        │   └── IconSafari.tsx
        ├── systems/          # Iconos de sistemas
        │   ├── index.ts
        │   ├── IconWindows.tsx
        │   ├── IconApple.tsx
        │   └── IconAndroid.tsx
        └── onpe/             # Iconos ONPE
            ├── index.ts
            ├── IconVotoDigital.tsx
            └── IconElectionsGeneral.tsx
```

## 🚀 **Comandos de la CLI**

### **Crear Estructura Inicial**
```bash
npx @onpe/ui init
```

### **Instalar Componentes**
```bash
# Componentes básicos
npx @onpe/ui add button
npx @onpe/ui add modal

# Modales especializados
npx @onpe/ui add modal-confirm
npx @onpe/ui add modal-browser-incompatible

# Iconos por categorías
npx @onpe/ui add icon-home
npx @onpe/ui add icon-chrome
npx @onpe/ui add icon-windows
npx @onpe/ui add icon-voto-digital
```

## 📦 **Opciones de Importación**

### **1. Importación Directa (Específica)**
```tsx
// Componentes
import { Button } from '../onpe/ui/Button';
import { Modal } from '../onpe/ui/Modal';

// Iconos
import { IconHome } from '../onpe/icons/actions/IconHome';
import { IconChrome } from '../onpe/icons/browsers/IconChrome';
import { IconWindows } from '../onpe/icons/systems/IconWindows';
import { IconVotoDigital } from '../onpe/icons/onpe/IconVotoDigital';
```

### **2. Importación con Barril (Recomendada)**
```tsx
// Componentes por categoría
import { Button, Modal, Overlay } from '../onpe/ui';
import { ModalConfirm, ModalLoading } from '../onpe/modals';

// Iconos por categoría
import { IconHome, IconClose, IconCheck } from '../onpe/icons/actions';
import { IconChrome, IconFirefox, IconSafari } from '../onpe/icons/browsers';
import { IconWindows, IconApple, IconAndroid } from '../onpe/icons/systems';
import { IconVotoDigital, IconElectionsGeneral } from '../onpe/icons/onpe';
```

### **3. Importación desde Raíz (Más Simple)**
```tsx
// Todo desde la raíz
import { 
  Button, 
  Modal, 
  IconHome, 
  IconChrome, 
  IconWindows, 
  IconVotoDigital 
} from '../onpe';
```

## 🎯 **Ejemplo Práctico**

```tsx
import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  IconHome, 
  IconChrome, 
  IconWindows 
} from '../onpe';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        <IconHome className="w-6 h-6 inline mr-2" />
        Mi Aplicación ONPE
      </h1>
      
      <div className="space-y-4">
        <Button 
          color="primary" 
          title="Abrir Modal" 
          onClick={() => setIsOpen(true)} 
        />
        
        <div className="flex space-x-2">
          <IconChrome className="w-8 h-8" />
          <IconWindows className="w-8 h-8" />
        </div>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        closeButton={true}
        overlayColor="blue"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Modal de Ejemplo</h2>
          <p className="mb-4">Este es un ejemplo de la nueva estructura.</p>
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

export default App;
```

## ✅ **Ventajas de la Nueva Estructura**

1. **🏠 Raíz Principal**: Todo está bajo `onpe/` como contenedor principal
2. **📁 Organización Clara**: Cada tipo de componente tiene su carpeta
3. **🔄 Barriles Automáticos**: Los archivos `index.ts` se crean automáticamente
4. **📦 Importaciones Flexibles**: 3 niveles de importación según necesidad
5. **🚀 Escalable**: Fácil agregar nuevas categorías
6. **🎯 Intuitivo**: Fácil de encontrar y usar

## 🔧 **Comandos Útiles**

```bash
# Ver ayuda
npx @onpe/ui --help

# Crear estructura inicial
npx @onpe/ui init

# Instalar componente
npx @onpe/ui add button

# Instalar icono
npx @onpe/ui add icon-home

# Ver componentes disponibles
npx @onpe/ui add --help
```

¡La nueva estructura está lista para usar! 🎉
