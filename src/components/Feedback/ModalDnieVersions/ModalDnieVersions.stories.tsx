import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalDnieVersions } from "./ModalDnieVersions";

const PlaceholderDnie = ({ label }: { label: string }) => (
  <div className="oui:w-full oui:h-full oui:min-h-[80px] oui:bg-gray-200 oui:rounded oui:flex oui:items-center oui:justify-center oui:text-sm oui:text-gray-500 oui:font-medium">
    {label}
  </div>
);

const meta: Meta<typeof ModalDnieVersions> = {
  title: "Components/Feedback/ModalDnieVersions",
  component: ModalDnieVersions,
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
        Ver versiones DNIe
      </button>
      <ModalDnieVersions
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        iconDnie1={<PlaceholderDnie label="DNIe v1" />}
        iconDnie2={<PlaceholderDnie label="DNIe v2" />}
        iconDnie3={<PlaceholderDnie label="DNIe v3" />}
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
    iconDnie1: <PlaceholderDnie label="DNIe versión 1" />,
    iconDnie2: <PlaceholderDnie label="DNIe versión 2" />,
    iconDnie3: <PlaceholderDnie label="DNIe versión 3" />,
  },
};
