import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LogOut,
  User,
  Trello,
  Store,
  Package,
  Layers3,
  LayoutDashboard,
  Waypoints,
  ChevronsUpDown,
  BadgeCent,
} from "lucide-react";
import { Alert, Dropdown } from "antd";
import { useUserStore } from "../store/user.store";
import Loading from "./Loading";

interface User {
  name: string;
  email: string;
  type: string;
}

export default function SideNav() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const user = useUserStore();

  const handleLogout = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/users/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });

    if (res.status === 200) {
      setLoading(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
      <Alert message="Success Tips" type="success" showIcon />;
    } else {
      setLoading(false);
      <Alert message="Error" type="error" showIcon />;
    }
  };

  const { pathname } = useLocation();
  const navItems = [
    {
      id: 0,
      name: "Dashboard",
      icon: <LayoutDashboard />,
      href: "/dashboard",
    },
    {
      id: 1,
      name: "Users",
      icon: <User />,
      href: "/users",
    },
    {
      id: 2,
      name: "Brands",
      icon: <Trello />,
      href: "/brands",
    },
    {
      id: 3,
      name: "Stores",
      icon: <Store />,
      href: "/stores",
    },
    {
      id: 4,
      name: "Orders",
      icon: <Package />,
      href: "/orders",
    },
    {
      id: 5,
      name: "Products",
      icon: <Layers3 />,
      href: "/products",
    },
    {
      id: 6,
      name: "Categories",
      icon: <Waypoints />,
      href: "/categories",
    },
    {
      id: 7,
      name: "Offers",
      icon: <BadgeCent />,
      href: "/offers",
    },
  ];

  const items = [
    {
      key: "1",
      label: <span>View profile</span>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <span onClick={handleLogout} className="text-blue-500">
          logout
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-l-xl border-r justify-between flex flex-col z-50 w-[300px] pt-8 pb-4 overflow-hidden">
      {loading && <Loading />}
      <div className="flex flex-col px-8">
        <p className="text-5xl font-thin mb-20">TShop.</p>
        <div className="flex flex-col gap-2 text-secondary-350 font-medium">
          <p className="text-secondary-250">MAIN</p>
          {navItems.map((item) => (
            <Link
              className={`flex items-center p-3 rounded-lg hover:bg-secondary-100 transition-all gap-4 ${
                pathname.includes(item.href) &&
                "bg-secondary-100 text-primary-400"
              }`}
              to={item.href}
              key={item.id}
            >
              {item.icon}
              <p className="text-sm">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center rounded-lg transition justify-between px-4">
        <div className="gap-2 flex items-center">
          <div className="relative">
            <img
              src="https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg"
              className="w-12 rounded-full"
            />
            <span className="h-2 w-2 outline outline-2 outline-white bg-green-500 rounded-full absolute bottom-0 right-0" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow
        >
          <span className="hover:bg-secondary-100 p-2 rounded-lg transition-all cursor-pointer">
            <ChevronsUpDown size={15} />
          </span>
        </Dropdown>
      </div>
    </div>
  );
}
