import "@styles/globals.css";
import { LayoutProps } from "@projectTypes/dir";
import SideBar from "@ui/sideBar";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex flex-row bg-white h-screen">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
