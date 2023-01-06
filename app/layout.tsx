import "@styles/globals.css";
import type { LayoutProps } from "@projectTypes/dir";
import SideBar from "@ui/sideBar";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex h-screen flex-row bg-white">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
