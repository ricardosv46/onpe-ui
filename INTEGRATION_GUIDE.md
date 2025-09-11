# Guía de Integración - @onpe/ui

## 🚀 Configuración Actualizada

Esta librería ahora está configurada para funcionar sin conflictos con proyectos que usan Tailwind CSS.

## 📦 Instalación

```bash
npm install @onpe/ui
```

## 🎨 Importación de Estilos

**IMPORTANTE**: Siempre importa el CSS compilado de la librería:

```javascript
// En tu archivo principal (main.js, index.js, App.js, etc.)
import "@onpe/ui/dist/index.css";
```

## 🔧 Configuración del Proyecto Host

Tu proyecto puede usar Tailwind CSS normalmente. La librería ONPE usa prefijos únicos (`onpe-`) para evitar conflictos.

### Ejemplo de configuración de Tailwind en tu proyecto:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@onpe/ui/**/*.{js,ts,jsx,tsx}", // Opcional: para autocompletado
  ],
  theme: {
    extend: {
      // Tu configuración personalizada
    },
  },
  plugins: [],
}
```

## 🎯 Uso de Componentes

### Importación de Componentes

```javascript
import { Button, Modal, Footer } from "@onpe/ui";
```

### Uso con Prefijos

Los componentes ONPE usan automáticamente el prefijo `onpe-` en sus clases CSS:

```jsx
// ✅ Correcto - Los componentes ONPE usan prefijos automáticamente
<Button variant="primary">Botón ONPE</Button>

// ✅ Correcto - Puedes usar clases ONPE con prefijos manualmente
<div className="onpe-bg-onpe-ui-blue onpe-text-white onpe-p-4">
  Contenido ONPE
</div>

// ✅ Correcto - Tu proyecto puede usar Tailwind normal
<div className="bg-blue-500 text-white p-4">
  Contenido del host
</div>
```

## 🎨 Colores ONPE Disponibles

Los siguientes colores están disponibles con el prefijo `onpe-`:

- `onpe-bg-onpe-ui-blue` - Azul ONPE (#003770)
- `onpe-bg-onpe-ui-skyblue` - Azul cielo (#0073cf)
- `onpe-bg-onpe-ui-skyblue-light` - Azul cielo claro (#69b2e8)
- `onpe-bg-onpe-ui-yellow` - Amarillo ONPE (#ffb81c)
- `onpe-bg-onpe-ui-light-skyblue` - Azul cielo muy claro (#aaeff6)
- `onpe-bg-onpe-ui-gray` - Gris ONPE (#bcbcbc)
- `onpe-bg-onpe-ui-gray-light` - Gris claro (#bdbdbd)
- `onpe-bg-onpe-ui-gray-extra-light` - Gris muy claro (#f2f2f2)
- `onpe-bg-onpe-ui-red` - Rojo ONPE (#e3002b)
- `onpe-bg-onpe-ui-dark-gray` - Gris oscuro (#4f4f4f)
- `onpe-bg-onpe-ui-green` - Verde ONPE (#76bd43)
- `onpe-bg-onpe-ui-yellow-light` - Amarillo claro (#fff1d2)

## 📝 Ejemplo Completo

```jsx
import React from 'react';
import { Button, Modal } from '@onpe/ui';
import '@onpe/ui/dist/index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Contenido del proyecto host */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Mi Aplicación
      </h1>
      
      {/* Botones del proyecto host */}
      <div className="mb-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Botón Host
        </button>
      </div>
      
      {/* Componentes ONPE */}
      <div className="onpe-ui-container">
        <Button variant="primary" className="onpe-mr-2">
          Botón ONPE Azul
        </Button>
        
        <Button variant="secondary" className="onpe-mr-2">
          Botón ONPE Amarillo
        </Button>
        
        <Button variant="success">
          Botón ONPE Verde
        </Button>
      </div>
      
      {/* Cards mixtas */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Card del host */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Card Host</h3>
          <p className="text-gray-600">Usando Tailwind del proyecto host</p>
        </div>
        
        {/* Card ONPE */}
        <div className="onpe-bg-onpe-ui-skyblue onpe-text-white onpe-p-6 onpe-rounded-lg onpe-shadow-lg">
          <h3 className="onpe-text-lg onpe-font-semibold">Card ONPE</h3>
          <p className="onpe-text-onpe-ui-light-skyblue">
            Usando colores oficiales de ONPE
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

## 🔄 Scripts de Desarrollo

### Para Desarrollo (Storybook)

```bash
npm run dev
# o
npm run storybook
```

Esto ejecuta Storybook con Tailwind sin prefijos para desarrollo.

### Para Producción

```bash
npm run build
```

Esto genera:
- `dist/index.css` - CSS compilado con prefijos `onpe-`
- `dist/*.js` - Archivos JavaScript de los componentes
- `dist/*.d.ts` - Definiciones de TypeScript

### Para Publicar

```bash
npm run publish
```

Esto ejecuta el build y publica a npm.

## ⚠️ Notas Importantes

1. **Siempre importa el CSS**: `import "@onpe/ui/dist/index.css"`
2. **Usa el contenedor**: Envuelve los componentes ONPE en `<div className="onpe-ui-container">`
3. **No mezcles clases**: No uses clases ONPE sin prefijo (`onpe-`) con clases Tailwind normales
4. **Prefijos automáticos**: Los componentes ya incluyen los prefijos automáticamente
5. **Sin conflictos**: Tu Tailwind del host funciona normalmente

## 🐛 Solución de Problemas

### Los estilos no se aplican
- Verifica que importaste el CSS: `import "@onpe/ui/dist/index.css"`
- Asegúrate de usar el contenedor: `<div className="onpe-ui-container">`

### Conflictos de estilos
- Los componentes ONPE usan prefijos `onpe-` automáticamente
- Tu proyecto puede usar Tailwind normal sin problemas

### Autocompletado no funciona
- Agrega `"./node_modules/@onpe/ui/**/*.{js,ts,jsx,tsx}"` al content de tu `tailwind.config.js`

## 📚 Recursos Adicionales

- [Documentación de Componentes](./README.md)
- [Storybook Local](./storybook-static/index.html)
- [Ejemplo de Integración](./ejemplo-integracion-actualizado.html)