import NavBar from "@/components/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {children}
    </div>
  );
};
export default Layout;
