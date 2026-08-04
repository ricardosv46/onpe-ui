import type { Meta, StoryObj } from "@storybook/react";
import { IconCheckFilled } from "./IconCheckFilled";
import { IconCheck } from "./IconCheck";
import { IconCheckList } from "./IconCheckList";
import { IconInfo } from "./IconInfo";
import { IconQuestion } from "./IconQuestion";
import { IconWarning } from "./IconWarning";
import { IconWarningStrong } from "./IconWarningStrong";

const meta: Meta = {
  title: "Icons/Status",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
      <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8 oui:p-6">
        {[
          { icon: <IconCheckFilled className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCheckFilled" },
          { icon: <IconCheck className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCheck" },
          { icon: <IconCheckList className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCheckList" },
          { icon: <IconInfo className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconInfo" },
          { icon: <IconQuestion className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconQuestion" },
          { icon: <IconWarning className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconWarning" },
          { icon: <IconWarningStrong className="oui:w-10 oui:h-10 oui:text-onpe-yellow" />, name: "IconWarningStrong" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
  ),
};
