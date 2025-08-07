import Loading from "@/common/components/loading/Loading";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/sales");
    }, 1000);
  }, []);
  return (
    <div
      className={`w-full overflow-hidden  ${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  p-8 pb-20 gap-16 sm:p-20`}
    >
      <Loading />
    </div>
  );
}
