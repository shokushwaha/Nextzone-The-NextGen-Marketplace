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
import RedemmedTokens from '@/components/RedemmedTokens';
import ExpiredToken from '@/components/ExpiredToken';
import TermsAndConditions from '@/components/TermsAndConditions';

const Rewards = () => {
    const { currentAccount } = useContext(CartContext);
    const [tokens, setTokens] = useState([]);
    const [expiredTokens, setExpiredTokens] = useState([]);
    const [redemmedTokens, setRedemmedTokens] = useState([]);
    async function fetchDetails() {
        console.log(currentAccount)
        const tok = await axios.post('/api/fetchtokens', { currentAccount });
        const expTok = await axios.post('/api/fetchexpiredtoken', { currentAccount });
        const redemeedTokens = await axios.post('/api/fetchredemmedrewards', { currentAccount })
        setTokens(tok.data)
        setExpiredTokens(expTok.data)
        setRedemmedTokens(redemeedTokens.data)
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

            <TermsAndConditions />

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

            {/* <Center> */}
            {tokens.length === 0 && <span className='flex flex-col'>
                <span className='text-gray-800 font-bold'>

                    You don't have any tokens!!
                </span>
                <button className='bg-neutral-800 text-gray-200 w-48 px-4 py-1 rounded-lg shadow-2xl mt-4 mx-auto'>Continue shopping...</button>
            </span>
            }
            <div className='grid grid-cols-5 w-[80vw] mx-auto place-items-center'>
                {tokens && tokens.map(token => (
                    <>
                        <TokenCard name={token.couponName} symbol={token.couponSymbol} price={token.couponPrice} issued={token.createdAt} expiry={token.expiryDate} hash={token.transactionHash} />
                    </>
                ))
                }
            </div>
            {/* </Center> */}


            {/* <div>
                <span className='flex items-center justify-center text-2xl font-bold mt-4'>Expired Tokens</span>
                <Center>
                    {expiredTokens.length === 0 && <span className='text-gray-400 flex items-center justify-center mt-4'>

                        Don't have any expired tokens!
                    </span>
                    }
                    <div className='grid grid-cols-4 content-between'>
                        {expiredTokens && expiredTokens.map(token => (
                            <>
                                <ExpiredToken name={token.couponName} symbol={token.couponSymbol} price={token.couponPrice} issued={token.createdAt} expiry={token.expiryDate} />
                            </>
                        ))
                        }
                    </div>
                </Center>
            </div> */}


            <div className='mx-auto w-[80vw]'>
                <span className='flex items-center justify-center text-2xl font-bold mt-4'>Redemmed Tokens</span>

                {redemmedTokens.length === 0 && <span className='text-gray-400 flex items-center justify-center mt-4'>

                    You havn't redemmed any tokens yet!
                </span>
                }
                <div className='grid grid-cols-6'>
                    {redemmedTokens && redemmedTokens.map(token => (
                        <>
                            <RedemmedTokens name={token.couponName} symbol={token.couponSymbol} price={token.couponPrice} usedOn={token.usedOn} />

                        </>
                    ))
                    }
                </div>

            </div>
            <Footer />

        </>
    )
}

export default Rewards