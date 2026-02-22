import type { Meta, StoryObj } from "@storybook/react";
import { IconCheck } from "./IconCheck";
import { IconClose } from "./IconClose";
import { IconCloseRadius } from "./IconCloseRadius";
import { IconHome } from "./IconHome";
import { IconInfo } from "./IconInfo";
import { IconPhone } from "./IconPhone";
import { IconSpinnerDesktop } from "./IconSpinnerDesktop";
import { IconSpinnerMobile } from "./IconSpinnerMobile";
import { IconWarning } from "./IconWarning";
import { IconWarningNotRecommended } from "./IconWarningNotRecommended";

const meta: Meta = {
  title: "Icons/Actions",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-8 p-6">
      {[
        { icon: <IconCheck className="w-10 h-10 text-onpe-skyblue" />, name: "IconCheck" },
        { icon: <IconClose className="w-10 h-10 text-onpe-blue" />, name: "IconClose" },
        { icon: <IconCloseRadius className="w-10 h-10 text-onpe-red" />, name: "IconCloseRadius" },
        { icon: <IconHome className="w-10 h-10 text-onpe-blue" />, name: "IconHome" },
        { icon: <IconInfo className="w-10 h-10 text-onpe-skyblue" />, name: "IconInfo" },
        { icon: <IconPhone className="w-10 h-10 text-onpe-blue" />, name: "IconPhone" },
        { icon: <IconSpinnerDesktop className="w-10 h-10 text-onpe-blue" />, name: "IconSpinnerDesktop" },
        { icon: <IconSpinnerMobile className="w-10 h-10 text-onpe-blue" />, name: "IconSpinnerMobile" },
        { icon: <IconWarning className="w-10 h-10 text-onpe-skyblue" />, name: "IconWarning" },
        { icon: <IconWarningNotRecommended className="w-10 h-10 text-onpe-yellow" />, name: "IconWarningNotRecommended" },
      ].map(({ icon, name }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          {icon}
          <span className="text-xs text-gray-500 text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Spinner: Story = {
  render: () => (
    <div className="flex gap-8 items-center p-6">
      <div className="flex flex-col items-center gap-2">
        <IconSpinnerDesktop className="w-16 h-16 text-onpe-blue animate-spin" />
        <span className="text-xs text-gray-500">Desktop (animado)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconSpinnerMobile className="w-16 h-16 text-onpe-blue animate-spin" />
        <span className="text-xs text-gray-500">Mobile (animado)</span>
      </div>
    </div>
  ),
};
