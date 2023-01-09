import "@styles/globals.scss";
import type { LayoutProps } from "@projectTypes/dir";
import SideBar from "@ui/sideBar";
import { AnalyticsWrapper } from "@ui/analytics";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head />
      <body className="h-full w-full bg-white dark:bg-gray-900">
        <div className="flex flex-row">
          <SideBar />
          <section className="h-full w-full">
            <div className="container mx-auto flex h-full w-full flex-col items-start justify-center space-y-4 p-4">
              {children}
              <AnalyticsWrapper />
            </div>
          </section>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
