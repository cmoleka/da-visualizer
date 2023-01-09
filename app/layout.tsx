import "@styles/globals.scss";
import type { LayoutProps } from "@projectTypes/dir";
import SideBar from "@ui/sideBar";
import { AnalyticsWrapper } from '@ui/analytics';

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head />
      <body className="h-full w-full">
        <div className="flex h-full flex-row bg-white">
          <SideBar />
          <section className="w-full h-full">
            <div className="w-4/5 py-4 container mx-auto space-y-4 h-full flex flex-col items-start justify-center">
              {children}
              <AnalyticsWrapper />
            </div></section>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
