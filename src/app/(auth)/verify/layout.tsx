import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="verify">
            {children}
      </main>
  )
};

export default Layout;
