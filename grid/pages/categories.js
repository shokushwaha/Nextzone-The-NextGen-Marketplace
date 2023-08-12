import Center from '@/components/Center'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import React, { useState, useEffect, useRef } from 'react'
import Catprod from '@/components/Catprod'
import CatIcon from '@/components/icons/CatIcon'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Nav from '@/components/Navbar'
import Head from 'next/head'
import Footer from '@/components/Footer'
const CatHead = styled.div`
@media screen and (max-width: 650px) {
   display  :flex ;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: 20px;
   margin-top: 10px;
   }
`;

const CatGrid = styled.div`

@media screen and (max-width: 650px) {
display: grid;
grid-template-columns: 1fr 1fr 1fr;
   
   }

@media screen and (max-width: 650px) {
display: grid;
grid-template-columns: 1fr 1fr;
   
   }
`;

export default function Categories({ allProducts }) {

    const [mobileArr, setMobileArr] = useState([]);
    const [laptopArr, setLaptopArr] = useState([]);
    const [trimmerArr, setTrimmerArr] = useState([]);
    const [speakerArr, setSpeakerArr] = useState([]);
    const [tvArr, setTvArr] = useState([]);
    const [headphonesArr, setHeadphonesArr] = useState([]);
    const [bluetoothArr, setBluetoothArr] = useState([]);

    useEffect(() => {
        const mob = filterByCategory(allProducts, '645ccccb94bda36bef3ee31a');
        setMobileArr(mob)

        const lap = filterByCategory(allProducts, '645cd08a94bda36bef3ee421');
        setLaptopArr(lap)

        const trim = filterByCategory(allProducts, '645ccdbe94bda36bef3ee35d');
        setTrimmerArr(trim)

        const spkr = filterByCategory(allProducts, '645ccd2c94bda36bef3ee33d');
        setSpeakerArr(spkr)

        const tvs = filterByCategory(allProducts, '645ccd0794bda36bef3ee330');
        setTvArr(tvs)

        const hdhn = filterByCategory(allProducts, '645ccd9794bda36bef3ee349');
        setHeadphonesArr(hdhn)

        const blth = filterByCategory(allProducts, '645ccdf394bda36bef3ee369');
        setBluetoothArr(blth)

    }, [])
    function filterByCategory(data, category) {
        return data.filter(item => item.category === category);
    }

    const targetRef1 = useRef(null);
    const targetRef2 = useRef(null);
    const targetRef3 = useRef(null);
    const targetRef4 = useRef(null);
    const targetRef5 = useRef(null);
    const targetRef6 = useRef(null);
    const targetRef7 = useRef(null);

    return (
        <>
            <Head>
                <title>NextZone - Categories</title>

            </Head>
            <div className='overflow-x-hidden'>
                <Nav />

                <Center>
                    <CatHead className='flex gap-20 items-center border-b-2 border-gray-800 '>

                        <h1 className=' flex items-center gap-2 text-4xl  ' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                            Categories</h1>
                        <CatGrid className=' grid grid-cols-4 gap-2  w-full py-4'>

                            <button onClick={() => targetRef1.current.scrollIntoView({ behavior: 'smooth' })}
                                className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'
                            >TV</button>
                            <button onClick={() => targetRef2.current.scrollIntoView({ behavior: 'smooth' })}
                                className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'>Laptop</button>
                            <button onClick={() => targetRef3.current.scrollIntoView({ behavior: 'smooth' })}
                                className='bg-white rounded-md shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'>Trimmer</button>
                            <button onClick={() => targetRef4.current.scrollIntoView({ behavior: 'smooth' })}
                                className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'>Headphone</button>
                            <button onClick={() => targetRef5.current.scrollIntoView({ behavior: 'smooth' })}
                                className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'>Bluetooth</button>
                            <button onClick={() => targetRef6.current.scrollIntoView({ behavior: 'smooth' })}
                                className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'>Speaker</button>
                            <button onClick={() => targetRef7.current.scrollIntoView({ behavior: 'smooth' })}
                                className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'>Phone</button>
                        </CatGrid>
                    </CatHead>

                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, y: "2000px" }}
                        animate={{ opacity: 1, y: "0px" }}
                        exit={{ opacity: 0, y: "2000px" }}
                        transition={{ duration: 1 }}
                    >

                        <div className='flex flex-col border-b-2 border-gray-400 pt-4' ref={targetRef1}>
                            <h1 className='text-4xl text-bold flex items-center gap-2 border-l-2 border-gray-800 pl-2'>
                                <CatIcon />
                                TV</h1>
                            <Catprod products={tvArr} />
                        </div>

                        <div className='flex flex-col border-b-2 border-gray-400 pt-4' ref={targetRef2}>
                            <h1 className='text-4xl text-bold flex items-center gap-2 border-l-2 border-gray-800 pl-2'> <CatIcon />Laptop</h1>
                            <Catprod products={laptopArr} />
                        </div>

                        <div className='flex flex-col border-b-2 border-gray-400 pt-2' ref={targetRef7}>
                            <h1 className='text-4xl text-bold flex items-center gap-2 border-l-2 border-gray-800 pl-2'> <CatIcon />Mobile</h1>
                            <Catprod products={mobileArr} />
                        </div>

                        <div className='flex flex-col border-b-2 border-gray-400 pt-2' ref={targetRef3}>
                            <h1 className='text-4xl text-bold flex items-center gap-2 border-l-2 border-gray-800 pl-2'> <CatIcon />Trimmer</h1>
                            <Catprod products={trimmerArr} />
                        </div>

                        <div className='flex flex-col border-b-2 border-gray-400 pt-2' ref={targetRef6}>
                            <h1 className='text-4xl text-bold flex items-center gap-2 border-l-2 border-gray-800 pl-2'> <CatIcon />Speaker</h1>
                            <Catprod products={speakerArr} />
                        </div>

                        <div className='flex flex-col border-b-2 border-gray-400 pt-2' ref={targetRef4}>
                            <h1 className='text-4xl text-bold flex items-center gap-2 border-l-2 border-gray-800 pl-2'> <CatIcon />Headphone</h1>
                            <Catprod products={headphonesArr} />
                        </div>

                        <div className='flex flex-col border-b-2 border-gray-400 pt-2' ref={targetRef5}>
                            <h1 className='text-4xl text-bold flex items-center gap-2 border-l-2 border-gray-800 pl-2'> <CatIcon />Bluetooth</h1>
                            <Catprod products={bluetoothArr} />
                        </div>
                    </motion.div>
                </Center>
                <Footer />
            </div>
        </>)
}


export async function getServerSideProps() {

    await mongooseConnect();

    const allProducts = await Product.find({});
    return {
        props: {

            allProducts: JSON.parse(JSON.stringify(allProducts)),
        }
    }
}