import type { Meta, StoryObj } from "@storybook/react";
import { IconSearchBadge } from "./IconSearchBadge";
import { IconSearch } from "./IconSearch";

const meta: Meta = {
  title: "Icons/Search",
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
          { icon: <IconSearchBadge className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconSearchBadge" },
          { icon: <IconSearch className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconSearch" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
  ),
};
