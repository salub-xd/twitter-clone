import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-auto sm:w-[600px] flex flex-col gap-y-5 items-center justify-center shadow-md border ">
      <Navbar />
      {children}
    </div>
  );
}

export default SettingsLayout;