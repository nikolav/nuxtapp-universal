import { NuxtIcon } from "#components";
export const renderIcon = (name: string, config?: any) =>
  h(NuxtIcon, { ...Object(config), name });
