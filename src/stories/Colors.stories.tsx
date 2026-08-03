import type { Meta, StoryObj } from "@storybook/react";

interface ColorToken {
  name: string;
  hex: string;
}

const colors: ColorToken[] = [
  { name: "onpe-primary", hex: "#C8171E" },
  { name: "onpe-primary-dark", hex: "#A01218" },
  { name: "onpe-primary-light", hex: "#E53E44" },
  { name: "onpe-secondary", hex: "#1A3A6B" },
  { name: "onpe-secondary-dark", hex: "#0F2347" },
  { name: "onpe-secondary-light", hex: "#2A5499" },
  { name: "onpe-blue", hex: "#003770" },
  { name: "onpe-blue-dark", hex: "#062A50" },
  { name: "onpe-skyblue", hex: "#0073cf" },
  { name: "onpe-skyblue-light", hex: "#69b2e8" },
  { name: "onpe-yellow", hex: "#ffb81c" },
  { name: "onpe-light-skyblue", hex: "#aaeff6" },
  { name: "onpe-gray", hex: "#bcbcbc" },
  { name: "onpe-gray-light", hex: "#bdbdbd" },
  { name: "onpe-gray-extra-light", hex: "#f2f2f2" },
  { name: "onpe-red", hex: "#e3002b" },
  { name: "onpe-dark-gray", hex: "#4f4f4f" },
  { name: "onpe-green", hex: "#76bd43" },
  { name: "onpe-yellow-light", hex: "#FFF1D2" },
  { name: "onpe-black", hex: "#000000" },
  { name: "onpe-white", hex: "#ffffff" },
];

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({ name, hex }: ColorToken) => (
  <div className="oui:w-40 oui:rounded oui:border oui:border-onpe-gray-extra-light oui:overflow-hidden">
    <div className="oui:h-16" style={{ backgroundColor: hex }} />
    <div className="oui:p-2 oui:text-xs">
      <p className="oui:font-bold oui:break-all">{name}</p>
      <p className="oui:text-onpe-dark-gray oui:uppercase">{hex}</p>
    </div>
  </div>
);

export const Palette: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      {colors.map((color) => (
        <ColorSwatch key={color.name} {...color} />
      ))}
    </div>
  ),
};
