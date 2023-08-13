import Center from '@/components/Center'
import Nav from '@/components/Navbar'
import React from 'react'
import Head from 'next/head'
import Footer from '@/components/Footer'
const Termsandconditions = () => {
    return (
        <>
            <Head>
                <title>NextZone - Terms & Conditions</title>

            </Head>

            <Nav />

            <Center>
                <div className='flex items-center justify-center text-4xl font-extrabold mt-8 uppercase gap-4'>
                    <span>
                        <img src="/agreement.png" alt='tc' className='w-28' />
                    </span>
                    <span>
                        Terms & Conditions
                    </span>
                </div>

                <div className='flex flex-col gap-4 mt-8'>

                    <div className='flex flex-col items-start justify-start bg-white px-4 py-2 rounded-md shadow-md'>
                        <span className='flex items-center gap-2 justify-center'>

                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                                </svg>

                            </span>
                            <span className='text-2xl mb-2 pl-1 pr-2 '>
                                Definitons
                            </span>
                        </span>
                        <span className='w-40 bg-black h-[2px] mt-[-4px]'></span>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li className='flex items-center gap-4'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>

                                </span>
                                <span>
                                    All the pages and content of this websiet NextZone are all subject to concern of NextZone Team
                                </span>
                            </li>
                            <li className='flex items-center gap-4'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>

                                </span>
                                <span>
                                    All the pages and content of this websiet NextZone are all subject to concern of NextZone Team
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-2xl mb-2 pl-1 pr-2 '>
                            Use Of The Website
                        </span>
                        <span className='w-32 bg-black h-[2px] mt-[-4px]'></span>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-2xl mb-2 pl-1 pr-2 '>
                            Product Information
                        </span>
                        <span className='w-32 bg-black h-[2px] mt-[-4px]'></span>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                        </ul>
                    </div>


                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-2xl mb-2 pl-1 pr-2 '>
                            Orders & Payments
                        </span>
                        <span className='w-32 bg-black h-[2px] mt-[-4px]'></span>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-2xl mb-2 pl-1 pr-2 '>
                            Shipping & Delivery
                        </span>
                        <span className='w-32 bg-black h-[2px] mt-[-4px]'></span>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-2xl mb-2 pl-1 pr-2 '>
                            Token Issuing Policy
                        </span>
                        <span className='w-32 bg-black h-[2px] mt-[-4px]'></span>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-2xl mb-2 pl-1 pr-2 '>
                            Changes To Terms & Conditions
                        </span>
                        <span className='w-32 bg-black h-[2px] mt-[-4px]'></span>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                            <li>All the pages and content of this websiet NextZone are all subject to concern of NextZone Team </li>
                        </ul>
                    </div>
                </div>
            </Center >

            <Footer />
        </>
    )
}

export default Termsandconditions