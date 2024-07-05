import { Button, Table } from "antd";
import Layout from "../../components/Layout";
import { Plus } from "lucide-react";
import { useState } from "react";
import ModalInterface from "../../components/Modal";
import CreateBrand from "./CreateBrand";
import StoreManagerModal from "../stores/StoreManagerModal";

interface HeaderProps {
  setOpenBrand: (open: boolean) => void;
  setOpenManager: (open: boolean) => void;
}

function Header({ setOpenBrand, setOpenManager }: HeaderProps) {
  return (
    <div className="pb-10 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Brands</h1>
      <div className="flex gap-4">
        <Button onClick={() => setOpenBrand(true)} icon={<Plus size={15} />}>
          Create new brand
        </Button>
        <Button onClick={() => setOpenManager(true)} icon={<Plus size={15} />}>
          Create new brand manager
        </Button>
      </div>
    </div>
  );
}

export default function Brands() {
  const [openBrand, setOpenBrand] = useState(false);
  const [openManager, setOpenManager] = useState(false);

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
      <Header setOpenBrand={setOpenBrand} setOpenManager={setOpenManager} />
      <div className="flex flex-col gap-4">
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <ModalInterface
        open={openBrand}
        setOpen={setOpenBrand}
        title={"Create new brand"}
      >
        <CreateBrand setOpen={setOpenBrand} />
      </ModalInterface>
      <ModalInterface
        open={openManager}
        setOpen={setOpenManager}
        title={"Create store manager"}
      >
        <StoreManagerModal />
      </ModalInterface>
    </Layout>
  );
}
