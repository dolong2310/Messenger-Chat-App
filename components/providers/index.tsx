import AuthProvider from "@/contexts/AuthContext";
import React from "react";
import StatusProvider from "./StatusProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <StatusProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </StatusProvider>
    </AuthProvider>
  );
};

export default Providers;
