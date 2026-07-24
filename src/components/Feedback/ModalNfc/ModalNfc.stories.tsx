import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalNfc } from "./ModalNfc";

const PlaceholderNfc = ({ label }: { label: string }) => (
  <div className="oui:w-full oui:min-h-[80px] oui:bg-gray-200 oui:rounded oui:flex oui:items-center oui:justify-center oui:text-sm oui:text-gray-500 oui:font-medium">
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

function DefaultStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
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
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const Abierto: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    iconNfc1: <PlaceholderNfc label="Imagen NFC Android" />,
    iconNfc2: <PlaceholderNfc label="Imagen NFC iPhone" />,
  },
};
