import { Button, Table } from "antd";
import Layout from "../../components/Layout";
import { Plus } from "lucide-react";
import { useState } from "react";
import ModalInterface from "../../components/Modal";
import CreateProduct from "./CreateProduct";

interface HeaderProps {
  setOpen: (open: boolean) => void;
}

function Header({ setOpen }: HeaderProps) {
  return (
    <div className="pb-10 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="flex gap-4">
        <Button onClick={() => setOpen(true)} icon={<Plus size={15} />}>
          Create new Product
        </Button>
      </div>
    </div>
  );
}

export default function Products() {
  const [open, setOpen] = useState(false);

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
      <Header setOpen={setOpen} />
      <div className="flex flex-col gap-4">
        <Table dataSource={dataSource} columns={columns} />
      </div>

      <ModalInterface
        open={open}
        setOpen={setOpen}
        title={"Create new product"}
      >
        <CreateProduct />
      </ModalInterface>
    </Layout>
  );
}
