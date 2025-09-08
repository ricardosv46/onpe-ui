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

```bash
npm install @onpe/ui
`` ` esolo logica verdad ?

## 📖 Uso Básico

### Importar estilos

```css
@import "@onpe/ui/styles";
```

### Usar componentes

```tsx
import { Button } from '@onpe/ui/components';

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Votar Ahora
      </Button>
      <Button variant="outline" size="lg">
        Ver Resultados
      </Button>
    </div>
  );
}
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

## 🧩 Componentes Disponibles

### Button

Botón versátil con múltiples variantes y tamaños.

```tsx
import { Button } from '@onpe/ui/components';

// Variantes
<Button variant="primary">Primario</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Tamaños
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>

// Estados
<Button loading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>
```

### Props del Button

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Estilo del botón |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `loading` | `boolean` | `false` | Estado de carga |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `children` | `ReactNode` | - | Contenido del botón |

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
.text-blue          /* Azul principal */
.text-skyblue       /* Sky blue */
.text-yellow        /* Amarillo */
.text-green         /* Verde */
.text-red           /* Rojo */
.text-gray          /* Gris */
.text-dark-gray     /* Gris oscuro */
```

### Colores de Fondo
```css
.bg-blue            /* Fondo azul */
.bg-skyblue         /* Fondo sky blue */
.bg-yellow          /* Fondo amarillo */
.bg-green           /* Fondo verde */
.bg-red             /* Fondo rojo */
.bg-gray            /* Fondo gris */
.bg-gray-light      /* Fondo gris claro */
.bg-gray-extra-light /* Fondo gris muy claro */
```

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

## 📞 Soporte

- 📧 Email: desarrollo@onpe.gob.pe
- 🐛 Issues: [GitHub Issues](https://github.com/ricardosv46/onpe-ui/issues)
- 📖 Documentación: [Storybook](https://onpe-ui-components.netlify.app)
- 🔗 Repositorio: [GitHub](https://github.com/ricardosv46/onpe-ui)

---

**Desarrollado con ❤️ para la democracia peruana** 🇵🇪