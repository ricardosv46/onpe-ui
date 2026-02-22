import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalNfc } from "./ModalNfc";

const PlaceholderNfc = ({ label }: { label: string }) => (
  <div className="w-full min-h-[80px] bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500 font-medium">
    {label}
  </div>
);

const meta: Meta<typeof ModalNfc> = {
  title: "Components/Feedback/ModalNfc",
  component: ModalNfc,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
        >
          Ver información NFC
        </button>
        <ModalNfc
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          iconNfc1={<PlaceholderNfc label="Imagen NFC Android" />}
          iconNfc2={<PlaceholderNfc label="Imagen NFC iPhone" />}
        />
      </>
    );
  },
};

export const Abierto: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    iconNfc1: <PlaceholderNfc label="Imagen NFC Android" />,
    iconNfc2: <PlaceholderNfc label="Imagen NFC iPhone" />,
  },
};
