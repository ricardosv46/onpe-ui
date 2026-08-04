import type { Meta, StoryObj } from "@storybook/react";
import { FaceBookIcon } from "./FaceBookIcon";
import { InstagramIcon } from "./InstagramIcon";
import { TikTokIcon } from "./TikTokIcon";
import { WhatsappIcon } from "./WhatsappIcon";
import { XIcon } from "./XIcon";
import { YoutubeIcon } from "./YoutubeIcon";

const meta: Meta = {
  title: "Icons/Redes",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
    <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-6 oui:gap-8 oui:p-6">
      {[
        { icon: <FaceBookIcon className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "FaceBookIcon" },
        { icon: <InstagramIcon className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "InstagramIcon" },
        { icon: <TikTokIcon className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "TikTokIcon" },
        { icon: <WhatsappIcon className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "WhatsappIcon" },
        { icon: <XIcon className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "XIcon" },
        { icon: <YoutubeIcon className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "YoutubeIcon" },
      ].map(({ icon, name }) => (
        <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
          {icon}
          <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};
