import React, { useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Center from "./Center";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartProducts, currentAccount, showNavBar } = useContext(CartContext);
    const inActiveLink = ' hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium flex flex-col items-center ';
    const activeLink = ' hover:bg-gray-800 text-white px-3 py-1 flex flex-col items-center font-bold border-b-2 border-gray-200';
    const router = useRouter();
    if (!showNavBar)
        return <>
            <div className="bg-neutral-800 w-[100vw] h-16">

            </div>
        </>
    return (
        <div className="bg-neutral-800 flex items-center justify-center p-2 mt-[-10px] pt-4" >

            {/* <Center> */}
            <motion.div
                className=" text-center"
                initial={{ opacity: 0, y: "-200px" }}
                animate={{ opacity: 1, y: "0px" }}
                exit={{ opacity: 0, y: "-200px" }}
                transition={{ duration: 1 }}
            >

                <div>
                    <nav className="bg-neutral-800">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 text-white uppercase text-4xl font-bold cursor-pointer"
                                        onClick={() => router.push('/')} >
                                        NextZone
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-center space-x-4 ">
                                            <Link
                                                href={'/'}
                                                className={router.pathname === '/' ? activeLink : inActiveLink}

                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                </svg>

                                                Home
                                            </Link>

                                            <Link
                                                href={'/products'}
                                                className={router.pathname === '/products' ? activeLink : inActiveLink}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                                </svg>
                                                All Products
                                            </Link>

                                            <Link
                                                href={'/categories'}
                                                className={router.pathname === '/categories' ? activeLink : inActiveLink}
                                            > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                                </svg>
                                                Categories
                                            </Link>

                                            <Link
                                                href={'/account'}
                                                className={router.pathname === '/account' ? activeLink : inActiveLink}
                                            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="flex flex-col">
                                                    <span>

                                                        Account
                                                    </span>
                                                    <span className="text-sm font-thin text-gray-400">
                                                        (
                                                        {currentAccount.substr(0, 10)}
                                                        )
                                                    </span>
                                                </span>
                                            </Link>

                                            <Link
                                                href={'/cart'}
                                                className={router.pathname === '/cart' ? activeLink : inActiveLink}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                </svg>
                                                Cart ({cartProducts.length})
                                            </Link>
                                            <Link
                                                href={'/rewards'}
                                                className={router.pathname === '/rewards' ? activeLink : inActiveLink + "border-2 border-yellow-400 "}

                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gold" className="w-6 h-6 animate-pulse">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                                <span className="text-yellow-400 font-extrabold ">


                                                    Rewards
                                                </span>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden pl-4">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        type="button"
                                        className="bg-neutral-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        aria-controls="mobile-menu"
                                        aria-expanded="false"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        {!isOpen ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                                            </svg>

                                        ) : (
                                            <svg
                                                className="block h-6 w-6 "
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Transition
                            show={isOpen}
                            enter="transition ease-out duration-100 transform"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-75 transform"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {(ref) => (
                                <div className="md:hidden" id="mobile-menu">
                                    <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        <Link
                                            href={'/'}
                                            className="hover:bg-gray-700 text-white  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>

                                            Home
                                        </Link>

                                        <Link
                                            href={'/products'}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                            </svg>

                                            All Products
                                        </Link>

                                        <Link
                                            href={'/categories'}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                            </svg>
                                            Categories
                                        </Link>

                                        <Link
                                            href={'/account'}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                            Account
                                        </Link>

                                        <Link
                                            href={'/cart'}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>

                                            Cart ({cartProducts.length})
                                        </Link>



                                        <Link
                                            href={'/rewards'}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>

                                            Rewards
                                        </Link>

                                    </div>
                                </div>
                            )}
                        </Transition>
                    </nav>


                </div>
            </motion.div>
            {/* </Center> */}
        </div>
    );
}

export default Nav;