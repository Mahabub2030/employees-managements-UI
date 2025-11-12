import React from "react";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* <DashboardSidebar /> */}
      <h1>DashboardSide</h1>
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* <DashboardNavbar /> */}
        <h1>DashboardNabar</h1>
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
