import SideNav from "./SideNav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="w-[calc(100vw-300px)] p-10 bg-secondary-100">
        {children}
      </div>
    </div>
  );
}
