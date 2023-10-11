import { ModalProps } from "@/shared/components/Modal/types";
import { Dialog } from "@headlessui/react";
import { FC } from "react";

const Modal: FC<ModalProps> = ({
  title,
  children,
  className,
  ...dialogProps
}) => {
  return (
    <Dialog {...dialogProps} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-teal-100 min-h-[300px] p-4 rounded-2xl">
          <Dialog.Title className="text-lg">{title}</Dialog.Title>
          <div className={className as string}>{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
