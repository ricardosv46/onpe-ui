import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputArea } from "./InputArea";

const meta: Meta<typeof InputArea> = {
  title: "Components/InputArea",
  component: InputArea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    placeholder: "Escribe un comentario...",
  },
};

export default meta;
type Story = StoryObj<typeof InputArea>;

const ControlledInputArea = (args: React.ComponentProps<typeof InputArea>) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <div style={{ width: 360 }}>
      <InputArea {...args} value={value} onChange={(event_) => setValue(event_.target.value)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledInputArea {...args} />,
};

export const WithError: Story = {
  args: { error: "Este campo es obligatorio", autoBlur: true },
  render: (args) => <ControlledInputArea {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, value: "No editable" },
  render: (args) => <ControlledInputArea {...args} />,
};
