import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import Analytics from "@/components/Analytics";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Order } from "@/models/Orders";
import { mongooseConnect } from "@/lib/mongoose";
export default function Home() {
  const { data: session } = useSession();

  function MyMobileComponent() {
    return <h1 className="flex justify-center items-center min-h-screen min-w-screen bg-bgPrimary text-white " >Sorry the admin panel can only be accessed by Desktop</h1>
  }
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)

  }, []);

  if (!isDesktop) return <MyMobileComponent />


  return (
    <Layout>
      <Head><title>Home</title></Head>
      <div className="flex text-blue-900 justify-between p-4 items-center overflow-hidden">
        <h2 className="flex items-end gap-2">Hello, <b>{session?.user?.name}</b>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>

        </h2>
        <div className="flex gap-2pr-2 rounded-lg text-black bg-gray-300 overflow-hidden items-center justify-center">

          <img src={session?.user?.image} alt="" className="h-10 w-10" />
          <span className="px-2">{session?.user?.name}</span>
        </div>


      </div>
      <Analytics />

    </Layout>
  );
}

