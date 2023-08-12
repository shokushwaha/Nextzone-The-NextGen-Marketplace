import { CartContext } from '@/components/CartContext'
import Center from '@/components/Center';
import Header from '@/components/Header';
import Nav from "@/components/Navbar";
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import Footer from '@/components/Footer';
import TokenCard from '@/components/TokenCard';



const Rewards = () => {
    const { currentAccount } = useContext(CartContext);
    const [tokens, setTokens] = useState([]);
    async function fetchDetails() {
        console.log(currentAccount)
        const res = await axios.post('/api/fetchtokens', { currentAccount });
        setTokens(res.data)
        console.log(res)
    }
    useEffect(() => {

        fetchDetails();
    }, [])
    return (
        <>
            <Head>
                <title>NextZone - Rewards</title>

            </Head>
            <Nav />



            <div className='flex items-center justify-end  py-2 pr-2 bg-neutral-800'>
                <span className='mr-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                    </svg>

                </span>
                <span className='text-gray-400'>

                    Wallet Address:
                </span>
                <span className='ml-2 text-yellow-400'>

                    {currentAccount}
                </span>
            </div>

            <div className='flex items-center justify-center text-4xl py-2 mt-2 text-neutral-800 font-extrabold'>

                NextZone Rewards
            </div>

            <Center>
                {tokens.length === 0 && <span>

                    Loading rewards
                </span>
                }
                <div className='grid grid-cols-4'>
                    {tokens && tokens.map(token => (
                        <>
                            <TokenCard name={token.couponName} symbol={token.couponSymbol} price={token.couponPrice} issued={token.createdAt} />
                        </>
                    ))
                    }
                </div>
            </Center>

        </>
    )
}

export default Rewards