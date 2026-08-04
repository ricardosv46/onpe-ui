import type { Meta, StoryObj } from "@storybook/react";
import { IconArrowLeft } from "./IconArrowLeft";
import { IconArrowRight } from "./IconArrowRight";
import { IconArrowDownBadge } from "./IconArrowDownBadge";
import { IconArrowLR } from "./IconArrowLR";
import {
  IconArrowLeftDoublePaginator,
  IconArrowLeftPaginator,
  IconArrowRightPaginator,
  IconArrowRightDoublePaginator,
} from "./IconPaginatorArrows";

const meta: Meta = {
  title: "Icons/Navigation",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
    <div className="oui:p-6">
      <h3 className="oui:mb-4 oui:text-sm oui:font-semibold oui:text-gray-700">Flechas</h3>
      <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8 oui:mb-8">
        {[
          { icon: <IconArrowLeft className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowLeft" },
          { icon: <IconArrowRight className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowRight" },
          { icon: <IconArrowDownBadge className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowDownBadge" },
          { icon: <IconArrowLR className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowLR" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>

      <h3 className="oui:mb-4 oui:text-sm oui:font-semibold oui:text-gray-700">Paginador</h3>
      <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8">
        {[
          { icon: <IconArrowLeftDoublePaginator className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowLeftDoublePaginator" },
          { icon: <IconArrowLeftPaginator className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowLeftPaginator" },
          { icon: <IconArrowRightPaginator className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowRightPaginator" },
          { icon: <IconArrowRightDoublePaginator className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowRightDoublePaginator" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
