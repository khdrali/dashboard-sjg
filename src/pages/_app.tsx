import MainLayouts from "@/common/components/layouts/MainLayouts";
import { PosProvider } from "@/common/context/PostContext";
import { ProductProvider } from "@/common/context/ProdukContext";
import "@/styles/globals.css";
import "@fullcalendar/core";
import "@fullcalendar/daygrid";
import "@fullcalendar/timegrid"; // kalau kamu pakai timeGridPlugin

import type { AppProps } from "next/app";

const authRoutes = ["/auth/login", "/auth/register", "/", "/404"];

export default function App({ Component, pageProps, router }: AppProps) {
  const isAuthPage = authRoutes.includes(router.pathname);

  if (isAuthPage) {
    return <Component {...pageProps} />;
  }

  return (
    <MainLayouts>
      <PosProvider>
        <ProductProvider>
          <Component {...pageProps} />
        </ProductProvider>
      </PosProvider>
    </MainLayouts>
  );
}
