import { DialogProps } from "@headlessui/react";
import { ReactNode } from "react";

export type ModalProps = DialogProps<"div"> & {
  title: string;
  children: ReactNode;
};
