import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Acepto los términos y condiciones",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const ControlledCheckbox = (args: React.ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return <Checkbox {...args} checked={checked} onChange={(event_) => setChecked(event_.target.checked)} />;
};

export const Default: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
};

export const Checked: Story = {
  args: { checked: true },
  render: (args) => <ControlledCheckbox {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, label: "Deshabilitado" },
  render: (args) => <ControlledCheckbox {...args} />,
};

export const WithoutLabel: Story = {
  args: { label: undefined },
  render: (args) => <ControlledCheckbox {...args} />,
};
