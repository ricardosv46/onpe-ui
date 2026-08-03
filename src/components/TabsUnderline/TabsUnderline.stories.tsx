import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TabsUnderline } from "./TabsUnderline";

const meta: Meta<typeof TabsUnderline> = {
  title: "Components/TabsUnderline",
  component: TabsUnderline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { key: "logos", label: "Logos de Organización Política" },
  { key: "fotos", label: "Fotos de Candidatos" },
];

export const Default: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState("logos");
    return (
      <div className="oui:w-[500px]">
        <TabsUnderline tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />
      </div>
    );
  },
};
