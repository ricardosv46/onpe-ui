import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalBrowserIncompatible } from "./ModalBrowserIncompatible";

const meta: Meta<typeof ModalBrowserIncompatible> = {
  title: "Components/ErrorHandling/ModalBrowserIncompatible",
  component: ModalBrowserIncompatible,
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
        Mostrar modal (navegador incompatible)
      </button>
      <ModalBrowserIncompatible
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
