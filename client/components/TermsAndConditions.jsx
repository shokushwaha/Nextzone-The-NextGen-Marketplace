import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { motion } from 'framer-motion'
import ForwardIcon from './ForwardIcon';
import { CartContext } from './CartContext';
import InfoIcon from './InfoIcon';
const TermsAndConditions = ({ setShowTermsAndConditions }) => {
    const router = useRouter();
    const { setShowNavBar } = useContext(CartContext)

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: "2000px" }}
                animate={{ opacity: 1, x: "0px" }}
                exit={{ opacity: 0, x: "2000px" }}
                transition={{ duration: 0.4 }}
            >

                <div className='bg-slate-100 w-[60vw] absolute right-0   shadow-[rgba(0,_0,_0,_1)_0px_0px_900px] z-100 pl-4' >
                    <div className='absolute right-4 top-6 cursor-pointer hover:scale-125 ' onClick={() => {
                        setShowTermsAndConditions(false)
                        setShowNavBar(true)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2 items-start justify-start pl-4 border-l-[8px] py-2 border-yellow-500 ml-4 mt-4 mb-8'>
                        <span className='text-3xl uppercase font-extrabold'>

                            Terms & Conditions
                        </span>
                        <span className='text-lg '>
                            Kindly read through the following terms and conditions before accessing the website.
                        </span>
                    </div>


                    <div className='flex flex-col gap-2 pl-4 pr-4'>
                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Token Issuing & Redemption Policy
                                    </span>
                                </span>
                            </span>

                            <ul className='pl-6 text-gray-500  '>
                                <li className='flex items-center gap-4 '>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold'>
                                            User
                                        </span>
                                        will be able to see
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            Reciept
                                        </span>
                                        of every token issued on Etherscan (ie can see the
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            proof
                                        </span>
                                        of every token minted on the blockchain network)

                                    </span>
                                </li>
                                <li className='flex items-center gap-4 '>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold'>
                                            Issuing Policy:
                                        </span>
                                        On every purchase, a
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            Fungible Token
                                        </span>
                                        will be issued worth of
                                        <span className='mx-1 text-gray-800 font-bold'>
                                            10%
                                        </span>
                                        of Total Amount Spent and will be credited to your MetaMask Account

                                    </span>
                                </li>
                                <li className='flex items-center gap-4 ml-4'>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold'>
                                            Premium Token
                                        </span>
                                        will be credited on a purchase
                                        <span className='mx-1 text-gray-800'>
                                            greater than
                                        </span>
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            ₹ 25000
                                        </span>


                                    </span>
                                </li>
                                <li className='flex items-center gap-4 ml-4'>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold'>
                                            Gold Token
                                        </span>
                                        will be credited on a purchase
                                        <span className='mx-1 text-gray-800'>
                                            ranges between
                                        </span>
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            ₹ 10000 & ₹ 25000
                                        </span>


                                    </span>
                                </li>
                                <li className='flex items-center gap-4 ml-4 '>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold'>
                                            Silver Token
                                        </span>
                                        will be credited on a purchase
                                        <span className='mx-1 text-gray-800'>
                                            ranges between
                                        </span>
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            ₹ 1000 & ₹ 10000
                                        </span>
                                    </span>
                                </li>
                                <li className='flex items-center gap-4 ml-4 '>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold'>
                                            Bronze Token
                                        </span>
                                        will be credited on a purchase
                                        <span className='mx-1 text-gray-800'>
                                            lesser than
                                        </span>
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            ₹ 1000
                                        </span>


                                    </span>
                                </li>
                                <li className='flex items-center gap-4 '>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold mt-1'>
                                            Expiring Policy:
                                        </span>
                                        Every token credited
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            will expire after a certain amount of time

                                        </span>
                                        which is specified on every token as
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            Expiry Date
                                        </span>

                                    </span>
                                </li>
                                <li className='flex items-center gap-4 '>
                                    <InfoIcon />
                                    <span >
                                        <span className='text-gray-800 mr-1 font-bold mt-1'>
                                            Redeem Policy:
                                        </span>
                                        At the time of checkout from cart
                                        <span className='mx-1 text-gray-800 font-extrabold'>
                                            every user will get a option of selecting token
                                        </span>
                                        (*if they have)
                                        from a dropdown which will reduce the total amount by the value of token


                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Definitions
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4 '>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        "Website" refers to
                                        <span className='font-extrabold mx-2 text-lg'>
                                            NextZone
                                        </span>
                                        , including all pages and content.
                                    </span>
                                </li>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        "User," "you," and "your" refer to any person accessing or using the website.
                                    </span>
                                </li>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                    <span>
                                        "Products" refers to the items available for sale on our website.
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Use Of This Website
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        You must be at least 18 years old or the legal age in your jurisdiction to use our website.
                                    </span>
                                </li>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        You agree not to use our website for any unlawful purposes or in a way that violates these terms and conditions.
                                    </span>
                                </li>
                            </ul>
                        </div>





                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Product Information
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                    <span>
                                        We strive to provide accurate and up-to-date product information on our website. We guarantee the accuracy, completeness, or reliability of any product descriptions, images, or specifications.
                                    </span>
                                </li>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                    <span>
                                        Prices, availability, and promotions are subject to change without notice
                                    </span>
                                </li>

                            </ul>
                        </div>





                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Orders & Payments
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        By placing an order on our website, you are making an offer to purchase the selected products. We reserve the right to accept or decline your order at our discretion.
                                    </span>
                                </li>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        Payment must be made at the time of placing the order. We accept list accepted payment methods like Stripe & Cash On Delivery.
                                    </span>
                                </li>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        You are responsible for any taxes, customs duties, or fees associated with your order.
                                    </span>
                                </li>
                            </ul>
                        </div>







                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Shipping & Delivery
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        We offer shipping to a wide range of locations. Shipping times and costs may vary based on your location and the shipping method you choose.
                                    </span>
                                </li>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        We are not responsible for any delays, damages, or losses caused by the shipping carrier.
                                    </span>
                                </li>

                            </ul>
                        </div>


                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Intellectual Property
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        All content on our website, including text, images, logos, and graphics, is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or modify any content without our prior written consent.
                                    </span>
                                </li>


                            </ul>
                        </div>


                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Changes to Terms & Conditions
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                    <span>
                                        We reserve the right to modify or update these terms and conditions at any time without notice. Changes will be effective immediately upon posting on our website.
                                    </span>
                                </li>


                            </ul>
                        </div>


                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Governing Law & Jurisdication
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        These terms and conditions are governed by the laws of Government. Any disputes arising from or related to these terms will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
                                    </span>
                                </li>


                            </ul>
                        </div>


                        <div className='flex flex-col items-start justify-start   py-2 '>
                            <span className='flex items-center gap-2 justify-center'>
                                <span className='text-2xl mb-2 pl-1 pr-2 font-extrabold text-gray-600 border-l-[4px]  py-2 border-yellow-500 '>
                                    <span className='pl-4'>
                                        Policy
                                    </span>
                                </span>
                            </span>
                            <ul className='pl-6 text-gray-500 '>
                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        By using our website and making a purchase, you acknowledge that you have read, understood, and agreed to these terms and conditions.
                                    </span>
                                </li>

                                <li className='flex items-center gap-4'>
                                    <span>
                                        <InfoIcon />

                                    </span>
                                    <span>
                                        If you have any questions or concerns about these terms, please contact us at
                                        <span className='font-extrabold ml-2 text-lg'>
                                            support@nextzone.com.
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className='h-[345px]'></div>

                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default TermsAndConditions