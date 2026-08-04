import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";
import { IconPhone } from "../../icons/Contact/IconPhone";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    placeholder: "Escribe aquí...",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const ControlledInput = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <div style={{ width: 320 }}>
      <Input {...args} value={value} onChange={(event_) => setValue(event_.target.value)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
};

export const WithIcon: Story = {
  args: { icon: IconPhone, placeholder: "Teléfono" },
  render: (args) => <ControlledInput {...args} />,
};

export const Password: Story = {
  args: { type: "password", placeholder: "Contraseña" },
  render: (args) => <ControlledInput {...args} />,
};

export const WithError: Story = {
  args: { error: "Este campo es obligatorio", autoBlur: true },
  render: (args) => <ControlledInput {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, value: "No editable" },
  render: (args) => <ControlledInput {...args} />,
};
