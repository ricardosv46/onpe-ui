import type { Meta, StoryObj } from "@storybook/react";
import { IconAndroid } from "./IconAndroid";
import { IconApple } from "./IconApple";
import { IconHuawei } from "./IconHuawei";
import { IconWindow } from "./IconWindow";

const meta: Meta = {
  title: "Icons/OperatingSystems",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
    <div className="oui:grid oui:grid-cols-4 oui:gap-8 oui:p-6">
      {[
        { icon: <IconAndroid className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconAndroid" },
        { icon: <IconApple className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconApple" },
        { icon: <IconHuawei className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconHuawei" },
        { icon: <IconWindow className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconWindow" },
      ].map(({ icon, name }) => (
        <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
          {icon}
          <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};
