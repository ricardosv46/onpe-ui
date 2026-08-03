import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Opción",
    name: "demo-radio",
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => <Radio {...args} />,
};

export const Checked: Story = {
  args: { checked: true, label: "Seleccionado" },
  render: (args) => <Radio {...args} readOnly />,
};

export const Disabled: Story = {
  args: { disabled: true, label: "Deshabilitado" },
  render: (args) => <Radio {...args} />,
};

const RadioGroup = () => {
  const [value, setValue] = useState("lima");
  const options = [
    { label: "Lima", value: "lima" },
    { label: "Arequipa", value: "arequipa" },
    { label: "Cusco", value: "cusco" },
  ];

  return (
    <div className="oui:flex oui:flex-col oui:gap-2">
      {options.map((option) => (
        <Radio
          key={option.value}
          name="group-radio"
          label={option.label}
          checked={value === option.value}
          onChange={() => setValue(option.value)}
        />
      ))}
    </div>
  );
};

export const Group: Story = {
  render: () => <RadioGroup />,
};
