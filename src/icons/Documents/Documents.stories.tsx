import type { Meta, StoryObj } from "@storybook/react";
import { IconAddFile } from "./IconAddFile";
import { IconDomainReport } from "./IconDomainReport";
import { IconDownload } from "./IconDownload";
import { IconEditFile } from "./IconEditFile";
import { IconExcel } from "./IconExcel";
import { IconPdf } from "./IconPdf";
import { IconReport } from "./IconReport";
import { IconUpload } from "./IconUpload";

const meta: Meta = {
  title: "Icons/Documents",
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
          { icon: <IconAddFile className="oui:w-10 oui:h-10" />, name: "IconAddFile" },
          { icon: <IconAddFile disabled className="oui:w-10 oui:h-10" />, name: "IconAddFile (disabled)" },
          { icon: <IconAddFile className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconAddFile (custom)" },
          { icon: <IconDomainReport className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconDomainReport" },
          { icon: <IconDownload className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconDownload" },
          { icon: <IconEditFile className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconEditFile" },
          { icon: <IconExcel className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconExcel" },
          { icon: <IconPdf className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconPdf" },
          { icon: <IconReport className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconReport" },
          { icon: <IconUpload className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUpload" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
  ),
};
