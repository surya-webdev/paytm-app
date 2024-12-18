"use client";

import { SessionProvider } from "next-auth/react";

export function Procted({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
