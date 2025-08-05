import MainLayouts from "@/common/components/layouts/MainLayouts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const authRoutes = ["/auth/login", "/auth/register"];

export default function App({ Component, pageProps, router }: AppProps) {
  const isAuthPage = authRoutes.includes(router.pathname);

  if (isAuthPage) {
    return <Component {...pageProps} />;
  }

  return (
    <MainLayouts>
      <Component {...pageProps} />
    </MainLayouts>
  );
}
