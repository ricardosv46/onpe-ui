import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { IconCheck } from "../../icons/Actions/IconCheck";
import { IconHome } from "../../icons/Actions/IconHome";
import { IconPhone } from "../../icons/Actions/IconPhone";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "blue",
        "skyblue",
        "skyblue-light",
        "yellow",
        "light-skyblue",
        "gray",
        "gray-light",
        "gray-extra-light",
        "red",
        "dark-gray",
        "green",
        "yellow-light",
        "primary",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["small", "normal", "large"],
    },
    colorBgIcon: {
      control: { type: "select" },
      options: [
        undefined,
        "blue",
        "skyblue",
        "skyblue-light",
        "yellow",
        "light-skyblue",
        "gray",
        "gray-light",
        "gray-extra-light",
        "red",
        "dark-gray",
        "green",
        "yellow-light",
        "primary",
      ],
    },
    hoverEffect: { control: "boolean" },
    disableEnterClick: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Colores principales
export const Primary: Story = {
  args: {
    color: "primary",
    title: "Botón Primario",
  },
};

export const Blue: Story = {
  args: {
    color: "blue",
    title: "Botón Azul",
  },
};

export const Skyblue: Story = {
  args: {
    color: "skyblue",
    title: "Botón Skyblue",
  },
};

export const Red: Story = {
  args: {
    color: "red",
    title: "Botón Rojo",
  },
};

export const Green: Story = {
  args: {
    color: "green",
    title: "Botón Verde",
  },
};

export const Yellow: Story = {
  args: {
    color: "yellow",
    title: "Botón Amarillo",
  },
};

// Tamaños
export const Small: Story = {
  args: {
    color: "primary",
    size: "small",
    title: "Pequeño",
  },
};

export const Normal: Story = {
  args: {
    color: "primary",
    size: "normal",
    title: "Normal",
  },
};

export const Large: Story = {
  args: {
    color: "primary",
    size: "large",
    title: "Grande",
  },
};

// Estados especiales
export const Disabled: Story = {
  args: {
    color: "primary",
    title: "Deshabilitado",
    disabled: true,
  },
};

// Galería de todos los colores
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="primary" title="Primario" />
      <Button color="blue" title="Azul" />
      <Button color="skyblue" title="Skyblue" />
      <Button color="skyblue-light" title="Skyblue Light" />
      <Button color="yellow" title="Amarillo" />
      <Button color="light-skyblue" title="Light Skyblue" />
      <Button color="gray" title="Gris" />
      <Button color="gray-light" title="Gris Light" />
      <Button color="gray-extra-light" title="Gris Extra Light" />
      <Button color="red" title="Rojo" />
      <Button color="dark-gray" title="Gris Oscuro" />
      <Button color="green" title="Verde" />
      <Button color="yellow-light" title="Amarillo Light" />
    </div>
  ),
};

// Galería de todos los tamaños
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button color="primary" size="small" title="Pequeño" />
      <Button color="primary" size="normal" title="Normal" />
      <Button color="primary" size="large" title="Grande" />
    </div>
  ),
};

// Con icono
export const WithIcon: Story = {
  args: {
    color: "primary",
    title: "Con Icono",
    icon: <IconCheck className="w-6 h-6 text-white" />,
  },
};

export const WithIconCustomBg: Story = {
  args: {
    color: "skyblue",
    title: "Icono con fondo diferente",
    icon: <IconHome className="w-6 h-6 text-white" />,
    colorBgIcon: "blue",
  },
};

export const WithIconDisabled: Story = {
  args: {
    color: "primary",
    title: "Icono deshabilitado",
    icon: <IconPhone className="w-6 h-6 text-white" />,
    disabled: true,
  },
};

// Galería de iconos con distintos colores de fondo
export const AllIconColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="blue" title="Blue" icon={<IconCheck className="w-6 h-6 text-white" />} />
      <Button color="skyblue" title="Skyblue" icon={<IconCheck className="w-6 h-6 text-white" />} />
      <Button color="red" title="Rojo" icon={<IconCheck className="w-6 h-6 text-white" />} colorBgIcon="dark-gray" />
      <Button color="green" title="Verde" icon={<IconCheck className="w-6 h-6 text-white" />} colorBgIcon="blue" />
      <Button color="yellow" title="Amarillo" icon={<IconHome className="w-6 h-6 text-white" />} colorBgIcon="red" />
    </div>
  ),
};

// Con hover activo
export const WithHover: Story = {
  args: {
    color: "primary",
    title: "Con hover",
    hoverEffect: true,
  },
};
