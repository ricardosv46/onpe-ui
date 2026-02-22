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
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 p-6">
      {[
        { icon: <FaceBookIcon className="w-10 h-10 text-onpe-blue" />, name: "FaceBookIcon" },
        { icon: <InstagramIcon className="w-10 h-10 text-onpe-blue" />, name: "InstagramIcon" },
        { icon: <TikTokIcon className="w-10 h-10 text-onpe-blue" />, name: "TikTokIcon" },
        { icon: <WhatsappIcon className="w-10 h-10 text-onpe-blue" />, name: "WhatsappIcon" },
        { icon: <XIcon className="w-10 h-10 text-onpe-blue" />, name: "XIcon" },
        { icon: <YoutubeIcon className="w-10 h-10 text-onpe-blue" />, name: "YoutubeIcon" },
      ].map(({ icon, name }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          {icon}
          <span className="text-xs text-gray-500 text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};
