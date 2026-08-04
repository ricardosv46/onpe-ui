import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentType, SVGProps } from "react";

// Carga todos los iconos de todas las subcarpetas (excluye stories y specs a nivel
// de patrón, no solo al filtrar el resultado: un glob no-negado ejecuta igual los
// módulos de Icons.spec.tsx, que importa vitest y rompe el bundle de Storybook).
// Se actualiza sola cuando se agreguen o quiten iconos, sin tocar este archivo.
const modules = import.meta.glob(
  ["./**/*.tsx", "!./**/*.stories.tsx", "!./**/*.spec.tsx"],
  { eager: true }
);

type Entry = { name: string; category: string; Comp: ComponentType<SVGProps<SVGSVGElement>> };
type Group = { title: string; names: string[] };

// Mismos subgrupos que arma cada categoría en su propio .stories.tsx (ver Actions.stories.tsx
// y Navigation.stories.tsx), para que el orden acá coincida con el de sus secciones y los
// iconos parecidos sigan apareciendo juntos.
const CATEGORY_GROUPS: Record<string, Group[]> = {
  Actions: [
    { title: "Cerrar / Quitar (misma idea, distinto peso y estilo)", names: ["IconClose", "IconCloseRadius", "IconRemove"] },
    { title: "Otras acciones", names: [] }, // resto va acá (ver fallback abajo)
  ],
  Navigation: [
    { title: "Flechas", names: ["IconArrowLeft", "IconArrowRight", "IconArrowDownBadge", "IconArrowLR"] },
    { title: "Paginador", names: ["IconArrowLeftDoublePaginator", "IconArrowLeftPaginator", "IconArrowRightPaginator", "IconArrowRightDoublePaginator"] },
  ],
};

function collectEntries(): Entry[] {
  const entries: Entry[] = [];
  const seen = new Set<unknown>();

  for (const [filePath, module_] of Object.entries(modules)) {
    if (filePath.includes(".stories.") || filePath.includes(".spec.")) continue;

    const category = filePath.split("/")[1];
    const m = module_ as Record<string, unknown>;

    for (const [exportName, exp] of Object.entries(m)) {
      if (exportName === "default") continue;
      if (typeof exp !== "function") continue;
      if (seen.has(exp)) continue;
      seen.add(exp);
      entries.push({ name: exportName, category, Comp: exp as ComponentType<SVGProps<SVGSVGElement>> });
    }
  }

  return entries;
}

function groupsFor(category: string, catEntries: Entry[]): { title: string; entries: Entry[] }[] {
  const byName = new Map(catEntries.map((e) => [e.name, e]));
  const explicit = CATEGORY_GROUPS[category];

  if (!explicit) {
    return [{ title: "", entries: [...catEntries].sort((a, b) => a.name.localeCompare(b.name)) }];
  }

  const used = new Set<string>();
  const groups = explicit.map((g) => {
    if (g.names.length === 0) return g; // relleno con el resto, se resuelve abajo
    const groupEntries = g.names.map((n) => byName.get(n)).filter((e): e is Entry => !!e);
    groupEntries.forEach((e) => used.add(e.name));
    return { title: g.title, entries: groupEntries };
  }) as { title: string; entries: Entry[] }[];

  const rest = catEntries.filter((e) => !used.has(e.name)).sort((a, b) => a.name.localeCompare(b.name));
  const emptyGroupIndex = explicit.findIndex((g) => g.names.length === 0);
  if (emptyGroupIndex !== -1) {
    groups[emptyGroupIndex] = { title: explicit[emptyGroupIndex].title, entries: rest };
  } else if (rest.length > 0) {
    groups.push({ title: "Otros", entries: rest });
  }

  return groups.filter((g) => g.entries.length > 0);
}

const meta: Meta = {
  title: "Icons/00-Overview",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => {
    const entries = collectEntries();
    const byCategory = entries.reduce<Record<string, Entry[]>>((acc, e) => {
      (acc[e.category] ||= []).push(e);
      return acc;
    }, {});
    const categories = Object.keys(byCategory).sort();

    return (
      <div className="oui:p-8">
        <p className="oui:mb-8 oui:text-sm oui:text-gray-500">
          {entries.length} iconos en {categories.length} categorías
        </p>
        {categories.map((cat) => (
          <div key={cat} className="oui:mb-12">
            <h2 className="oui:text-lg oui:font-bold oui:mb-1 oui:text-gray-800">{cat}</h2>
            <p className="oui:text-xs oui:text-gray-400 oui:mb-4">{byCategory[cat].length} iconos</p>
            {groupsFor(cat, byCategory[cat]).map((group, i) => (
              <div key={group.title || i} className="oui:mb-6">
                {group.title && (
                  <h3 className="oui:mb-3 oui:text-xs oui:font-semibold oui:text-gray-600">{group.title}</h3>
                )}
                <div className="oui:grid oui:grid-cols-4 sm:oui:grid-cols-6 md:oui:grid-cols-8 lg:oui:grid-cols-10 oui:gap-6">
                  {group.entries.map(({ name, Comp }) => (
                    <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
                      <Comp className="oui:w-8 oui:h-8 oui:text-onpe-blue" />
                      <span className="oui:text-[10px] oui:text-gray-500 oui:text-center oui:break-all">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
