import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"
import Head from "next/head";
// import { useRouter } from "next/router";

export default function Layout({ children }) {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="bg-gray-200 w-screen h-screen flex items-center align-middle px-28">
                <Head><title>Ecommerce - Admin Panel Login</title></Head>
                <div className="w-full flex items-center justify-center">

                    <h1 className="flex flex-col gap-4 items-center px-20">
                        <span className="text-8xl text-black uppercase">
                            NextZone
                        </span>
                        <span className=" flex gap-4 items-center text-gray-800 text-6xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                            </svg>
                            Admin
                        </span>
                    </h1>
                    <div className="text-center first-letter:flex flex-col items-center justify-center gap-10    ">

                        <button
                            onClick={() => signIn('google')}
                            className="bg-white p-2 px-4 rounded-lg hover:bg-black hover:text-gray-200 hover:shadow-xl"
                        >
                            Login with Google
                        </button>

                        <div className="flex flex-col gap-4 mt-10 flex-wrap">
                            <span className="">If you are not an Admin access, request for admin by sending your Gmail</span>
                            <button className="bg-gray-400 p-2 px-4 rounded-lg hover:bg-white">
                                <a href="mailto:shobhitkushwaha1406@gmail.com">
                                    Request for Admin Access
                                </a>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bgPrimary min-w-screen min-h-screen flex items-center align-middle">
            <div className="w-full min-h-screen flex">
                <Nav />
                <div className="bg-bgSecondary flex-grow h-full min-h-screen  pb-10   ">
                    {children}
                </div>
            </div>
        </div>
    );
}
