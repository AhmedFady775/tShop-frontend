import { Button, Table } from "antd";
import Layout from "../../components/Layout";
import { Plus } from "lucide-react";
import { useState } from "react";
import ModalInterface from "../../components/Modal";
import CreateStore from "./CreateStore";
import StoreManagerModal from "./StoreManagerModal";

interface HeaderProps {
  setOpenStore: (open: boolean) => void;
  setOpenStoreManager: (open: boolean) => void;
}

function Header({ setOpenStore, setOpenStoreManager }: HeaderProps) {
  return (
    <div className="pb-10 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Stores</h1>
      <div className="flex gap-4">
        <Button onClick={() => setOpenStore(true)} icon={<Plus size={15} />}>
          Create new Store
        </Button>
        <Button
          onClick={() => setOpenStoreManager(true)}
          icon={<Plus size={15} />}
        >
          Create new Store Manager
        </Button>
      </div>
    </div>
  );
}

export default function Stores() {
  const [openStore, setOpenStore] = useState(false);
  const [openStoreManager, setOpenStoreManager] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Layout>
      <Header
        setOpenStore={setOpenStore}
        setOpenStoreManager={setOpenStoreManager}
      />
      <div className="flex flex-col gap-4">
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <ModalInterface
        open={openStore}
        setOpen={setOpenStore}
        title={"Create new store"}
      >
        <CreateStore setOpen={setOpenStore} />
      </ModalInterface>
      <ModalInterface
        open={openStoreManager}
        setOpen={setOpenStoreManager}
        title={"Create new store manager"}
      >
        <StoreManagerModal />
      </ModalInterface>
    </Layout>
  );
}
