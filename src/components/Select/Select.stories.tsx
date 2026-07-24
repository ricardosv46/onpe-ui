import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const options = [
  { label: "Lima", value: "lim" },
  { label: "Arequipa", value: "aqp" },
  { label: "Cusco", value: "cus" },
  { label: "Opción muy larga para probar truncate y el menú con scroll del select personalizado ONPE", value: "long" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    name: "demo-select",
    placeHolder: "-Seleccionar-",
    options,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const ControlledSelect = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <div style={{ width: 360 }}>
      <Select {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledSelect {...args} />,
};

export const WithLabel: Story = {
  args: { label: "Departamento" },
  render: (args) => <ControlledSelect {...args} />,
};

export const WithError: Story = {
  args: { label: "Departamento", error: "Debe seleccionar una opción", value: "" },
  render: (args) => <ControlledSelect {...args} />,
};

export const Loading: Story = {
  args: { loading: true, label: "Cargando..." },
  render: (args) => <ControlledSelect {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, value: "lim", label: "Deshabilitado" },
  render: (args) => <ControlledSelect {...args} />,
};

export const EmptyOptions: Story = {
  args: { options: [], label: "Sin opciones" },
  render: (args) => <ControlledSelect {...args} />,
};
