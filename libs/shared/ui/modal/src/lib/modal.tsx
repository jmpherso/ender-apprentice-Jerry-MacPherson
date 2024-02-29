import { Modal as MantineModal } from '@mantine/core';
import type { ModalProps as MantineModalProps } from '@mantine/core';

interface ModalProps extends MantineModalProps {
  title: string;
}

function Modal(props: Readonly<ModalProps>) {
  const { title, children, closeOnClickOutside = true, ...modalProps } = props;

  return (
    <MantineModal
      {...modalProps}
      closeButtonLabel="Exit"
      closeOnClickOutside={closeOnClickOutside}
      overlayOpacity={0.5}
      title={title}>
      {children}
    </MantineModal>
  );
}

export type { ModalProps };
export { Modal };
