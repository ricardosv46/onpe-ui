import type { Meta, StoryObj } from "@storybook/react";
import { IconInitials } from "./IconInitials";
import { IconUserAdd } from "./IconUserAdd";
import { IconUserCheck } from "./IconUserCheck";
import { IconUser } from "./IconUser";
import { IconUserHeader } from "./IconUserHeader";
import { IconUserInfo } from "./IconUserInfo";
import { IconUserProfileBlue } from "./IconUserProfileBlue";
import { IconUserProfileNew } from "./IconUserProfileNew";
import { IconUserProfileNewGray } from "./IconUserProfileNewGray";

const meta: Meta = {
  title: "Icons/Users",
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
          { icon: <IconInitials className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconInitials" },
          { icon: <IconUserAdd className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUserAdd" },
          { icon: <IconUserCheck className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUserCheck" },
          { icon: <IconUser className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUser" },
          { icon: <IconUserHeader className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUserHeader" },
          { icon: <IconUserInfo className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUserInfo" },
          { icon: <IconUserProfileBlue className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUserProfileBlue" },
          { icon: <IconUserProfileNew className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUserProfileNew" },
          { icon: <IconUserProfileNewGray className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUserProfileNewGray" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
  ),
};
