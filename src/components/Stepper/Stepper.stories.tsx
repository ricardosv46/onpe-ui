import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    total: 4,
    active: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480 }}>
      <Stepper {...args} />
    </div>
  ),
};

export const LastStep: Story = {
  args: { active: 4 },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Stepper {...args} />
    </div>
  ),
};

const InteractiveStepper = () => {
  const [active, setActive] = useState(1);
  return (
    <div style={{ width: 480 }}>
      <Stepper total={5} active={active} onSelectItem={setActive} />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveStepper />,
};
