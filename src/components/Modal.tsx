import { Modal } from "antd";

interface ModalInterfaceProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function ModalInterface({
  open,
  setOpen,
  title,
  children,
}: ModalInterfaceProps) {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      {children}
    </Modal>
  );
}
