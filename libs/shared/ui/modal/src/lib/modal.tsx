import { Modal as MantineModal, ModalProps as MantineModalProps } from '@mantine/core';

type ModalProps = MantineModalProps & {
  title: string;
};

function Modal(props: ModalProps) {
  const { title, children, closeOnClickOutside = true, ...modalProps } = props;

  return (
    <MantineModal
      {...modalProps}
      title={title}
      overlayOpacity={0.5}
      closeOnClickOutside={closeOnClickOutside}
      closeButtonLabel="Exit">
      {children}
    </MantineModal>
  );
}

export type { ModalProps };
export { Modal };
