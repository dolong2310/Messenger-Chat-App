import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <Providers>
      {children}
      <Toaster />
    </Providers>
  );
};

export default RootLayout;
