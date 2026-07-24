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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
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
