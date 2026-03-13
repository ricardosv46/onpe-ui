import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalSystemIncompatible } from "./ModalSystemIncompatible";

const meta: Meta<typeof ModalSystemIncompatible> = {
  title: "Components/ErrorHandling/ModalSystemIncompatible",
  component: ModalSystemIncompatible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Mostrar modal (sistema incompatible)
      </button>
      <ModalSystemIncompatible
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const Abierto: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
