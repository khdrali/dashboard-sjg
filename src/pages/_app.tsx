import MainLayouts from "@/common/components/layouts/MainLayouts";
import { PosProvider } from "@/common/context/PostContext";
import "@/styles/globals.css";
import "@fullcalendar/core";
import "@fullcalendar/daygrid";
import "@fullcalendar/timegrid"; // kalau kamu pakai timeGridPlugin

import type { AppProps } from "next/app";

const authRoutes = ["/auth/login", "/auth/register"];

export default function App({ Component, pageProps, router }: AppProps) {
  const isAuthPage = authRoutes.includes(router.pathname);

  if (isAuthPage) {
    return <Component {...pageProps} />;
  }

  return (
    <MainLayouts>
      <PosProvider>
        <Component {...pageProps} />
      </PosProvider>
    </MainLayouts>
  );
}
