import type { Meta, StoryObj } from "@storybook/react";
import { IconCandidateNacional1 } from "./IconCandidateNacional1";
import { IconCandidateNacional2 } from "./IconCandidateNacional2";
import { IconCandidateNacional3 } from "./IconCandidateNacional3";
import { IconCedulaElectoral } from "./IconCedulaElectoral";
import { IconCredenciales } from "./IconCredenciales";
import { IconLogoCedula } from "./IconLogoCedula";
import { IconDocumentList } from "./IconDocumentList";
import { IconParams } from "./IconParams";

const meta: Meta = {
  title: "Icons/Election",
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
          { icon: <IconCandidateNacional1 className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCandidateNacional1" },
          { icon: <IconCandidateNacional2 className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCandidateNacional2" },
          { icon: <IconCandidateNacional3 className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCandidateNacional3" },
          { icon: <IconCedulaElectoral className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCedulaElectoral" },
          { icon: <IconCredenciales className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconCredenciales" },
          { icon: <IconLogoCedula className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconLogoCedula" },
          { icon: <IconDocumentList className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconDocumentList" },
          { icon: <IconParams className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconParams" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
  ),
};
