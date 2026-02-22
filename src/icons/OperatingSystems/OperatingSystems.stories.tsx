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
    <div className="grid grid-cols-4 gap-8 p-6">
      {[
        { icon: <IconAndroid className="w-10 h-10 text-onpe-skyblue" />, name: "IconAndroid" },
        { icon: <IconApple className="w-10 h-10 text-onpe-skyblue" />, name: "IconApple" },
        { icon: <IconHuawei className="w-10 h-10 text-onpe-skyblue" />, name: "IconHuawei" },
        { icon: <IconWindow className="w-10 h-10 text-onpe-skyblue" />, name: "IconWindow" },
      ].map(({ icon, name }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          {icon}
          <span className="text-xs text-gray-500 text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};
