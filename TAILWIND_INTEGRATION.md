# Integración con Tailwind CSS v4

## 🎯 Opción 1: Usar el preset de la librería (Recomendado)

### En tu proyecto:

```javascript
// tailwind.config.js
import onpePreset from '@onpe/ui/tailwind-preset';

export default {
  presets: [onpePreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@onpe/ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  // Tu configuración adicional...
}
```

### En tu CSS:

```css
@import 'tailwindcss';
@import '@onpe/ui/styles';
```

## 🎯 Opción 2: Solo usar los estilos de la librería

### En tu CSS:

```css
@import 'tailwindcss';
@import '@onpe/ui/styles';
```

## ✅ Ventajas:

- **Un solo Tailwind:** No hay conflictos
- **Colores ONPE:** Disponibles como `bg-onpe-ui-blue`
- **Sin duplicación:** Solo las clases que necesitas
- **Compatible:** Funciona con cualquier configuración de Tailwind

## 🚀 Ejemplo de uso:

```jsx
import { Button } from '@onpe/ui/components';

function MyComponent() {
  return (
    <div className="bg-onpe-ui-blue p-4">
      <Button color="skyblue" title="Mi botón" />
    </div>
  );
}
```
