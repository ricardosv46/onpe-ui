import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalDnieVersions } from "./ModalDnieVersions";

const PlaceholderDnie = ({ label }: { label: string }) => (
  <div className="w-full h-full min-h-[80px] bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500 font-medium">
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
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
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
