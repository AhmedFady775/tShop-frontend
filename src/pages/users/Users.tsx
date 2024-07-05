import { Button, Table } from "antd";
import Layout from "../../components/Layout";
import { Plus } from "lucide-react";
import { useState } from "react";
import ModalInterface from "../../components/Modal";
import StoreManagerModal from "../stores/StoreManagerModal";
import BrandManagerModal from "../brands/BrandManagerModal";

interface HeaderProps {
  setOpenManager: (open: boolean) => void;
  setOpenBrand: (open: boolean) => void;
}

function Header({ setOpenManager, setOpenBrand }: HeaderProps) {
  return (
    <div className="pb-10 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="flex gap-4">
        <Button onClick={() => setOpenManager(true)} icon={<Plus size={15} />}>
          Create new user
        </Button>
        <Button onClick={() => setOpenBrand(true)} icon={<Plus size={15} />}>
          Create new admin
        </Button>
      </div>
    </div>
  );
}

export default function Users() {
  const [openManager, setOpenManager] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

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
      <Header setOpenManager={setOpenManager} setOpenBrand={setOpenBrand} />
      <div className="flex flex-col gap-4">
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <ModalInterface
        open={openManager}
        setOpen={setOpenManager}
        title={"Create store manager"}
      >
        <StoreManagerModal />
      </ModalInterface>
      <ModalInterface
        open={openBrand}
        setOpen={setOpenBrand}
        title={"Create brand manager"}
      >
        <BrandManagerModal />
      </ModalInterface>
    </Layout>
  );
}
