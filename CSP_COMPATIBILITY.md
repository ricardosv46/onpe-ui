# 🔒 Compatibilidad con Content Security Policy (CSP)

## 🚨 Problema Identificado

El proyecto host tiene **Content Security Policy (CSP)** configurado que bloquea estilos inline:

```html
<meta http-equiv="Content-Security-Policy" content="style-src 'self' https://fonts.googleapis.com;">
```

Esto causaba errores como:
```
Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self' https://fonts.googleapis.com"
```

## ✅ Solución Implementada

### **1. Cambio en Rollup Config**
```javascript
// rollup.config.js
postcss({
  extract: true, // ✅ Generar archivos CSS externos para CSP
  modules: false,
  autoModules: false,
}),
```

### **2. CSS como Archivo Externo**
- **Antes**: Estilos inline en `<style>` tags
- **Ahora**: Archivo CSS externo `dist/index.css`

### **3. Build Actualizado**
```bash
npm run build
```

Esto genera:
- `dist/index.css` - Archivo CSS externo compatible con CSP
- `dist/*.js` - Archivos JavaScript de componentes
- `dist/*.d.ts` - Definiciones de TypeScript

## 🚀 Cómo Usar con CSP

### **1. Instalar la Librería**
```bash
npm install @onpe/ui
```

### **2. Importar CSS Externo**
```tsx
// ✅ CORRECTO - Importar CSS externo
import '@onpe/ui/dist/index.css';
import { ModalConfirm } from '@onpe/ui/components';

// ❌ INCORRECTO - No importar CSS
import { ModalConfirm } from '@onpe/ui/components';
```

### **3. Configurar CSP**
```html
<!-- CSP que permite archivos CSS del mismo dominio -->
<meta http-equiv="Content-Security-Policy" content="style-src 'self' https://fonts.googleapis.com;">
```

### **4. Usar Componentes**
```tsx
import { ModalConfirm } from '@onpe/ui/components';
import { useState } from 'react';

function MiComponente() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>
      
      <ModalConfirm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmación"
        message="¿Estás seguro de continuar?"
        icon="warning"
        color="blue"
        onConfirm={() => console.log("Confirmado")}
        textButtonConfirm="Confirmar"
        textButtonCancel="Cancelar"
        twoButtons={true}
      />
    </div>
  );
}
```

## 🔧 Configuración del Proyecto Host

### **Vite/Webpack**
```javascript
// vite.config.js
export default {
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
```

### **Next.js**
```javascript
// next.config.js
module.exports = {
  experimental: {
    esmExternals: true,
  },
};
```

### **Create React App**
```javascript
// No configuración adicional necesaria
// Solo importar el CSS: import '@onpe/ui/dist/index.css';
```

## 🧪 Testing con CSP

### **1. Archivo de Prueba**
```bash
# Abrir test-csp-compatibility.html en el navegador
```

### **2. Verificar en Consola**
- ✅ Sin errores de CSP
- ✅ Estilos se aplican correctamente
- ✅ Componentes funcionan normalmente

### **3. Verificar en Network Tab**
- ✅ `dist/index.css` se carga correctamente
- ✅ Status 200 para el archivo CSS

## 📋 Checklist de Compatibilidad

- [ ] **CSS Externo**: `dist/index.css` se genera correctamente
- [ ] **Sin Inline Styles**: No hay `<style>` tags en el HTML
- [ ] **CSP Compatible**: `style-src 'self'` permite el archivo CSS
- [ ] **Importación Correcta**: `import '@onpe/ui/dist/index.css'`
- [ ] **Componentes Funcionan**: Modal, Button, etc. se ven correctamente

## 🐛 Solución de Problemas

### **Error: "Refused to apply inline style"**
```bash
# Solución: Verificar que se esté importando el CSS
import '@onpe/ui/dist/index.css';
```

### **Error: "Failed to load resource"**
```bash
# Solución: Verificar que el archivo CSS existe
ls node_modules/@onpe/ui/dist/index.css
```

### **Componentes sin estilos**
```bash
# Solución: Verificar orden de importación
import '@onpe/ui/dist/index.css'; // ← PRIMERO
import { ModalConfirm } from '@onpe/ui/components'; // ← DESPUÉS
```

## 📚 Recursos Adicionales

- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [ONPE UI Documentation](./README.md)

---

**✅ La librería ahora es completamente compatible con CSP y se puede usar en proyectos con políticas de seguridad estrictas.**
