import Center from '@/components/Center'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { contractABI } from '@/contract-abi/abi';
import randomstring from 'randomstring';
const ethers = require('ethers');
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        if (!name || !email || !password || !phoneNum || !address) {
            toast.error("Fill all the fields")
            return;
        }

        e.preventDefault();
        const res = await axios.post('/api/register', { name, email, password, phoneNum, address });
        if (res) {
            if (router?.query?.account)
                mintTokens();
            toast.success("Registered successfully");
            router.push('/login');
        }
        else
            toast.error("Some error occured");
    }

    useEffect(() => {
        console.log(router.query.account)
    }, [])




    //   blockchain function 
    async function mintTokens() {
        try {

            const currentAccount = router.query.account
            const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER);

            const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
            const wallet = new ethers.Wallet(privateKey, provider);


            const contract = new ethers.Contract(contractAddress, contractABI, wallet);

            const recipientAddress = currentAccount;


            let amnt = 50;
            const amountToMint = ethers.utils.parseEther(amnt.toString());


            const randomNumber = randomstring.generate({
                length: 10,
                charset: 'numeric'
            })
            const tokenId = randomNumber;


            const tokenName = "Silver Token";


            const tokenSymbol = "Earned via Referal";

            const tx = await contract.mint(recipientAddress, amountToMint, tokenId, tokenName, tokenSymbol);



            const receipt = await tx.wait();
            let tHash = receipt.transactionHash
            const res = await axios.post('/api/createtoken', { currentAccount, tokenName, tokenSymbol, amnt, tHash });

            console.log('Tokens minted successfully!');

        } catch (error) {
            console.error('Error minting tokens:', error);
        }
    }






    return (
        <>
            <Head>
                <title>NextZone - Register</title>

            </Head>
            <Center>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <div className="flex flex-col items-center justify-center gap-20 md:flex-row h-[100vh]">
                    <motion.div
                        className="text-center ml-[-150px]"
                        initial={{ opacity: 0, y: "-2000px" }}
                        animate={{ opacity: 1, y: "0px" }}
                        exit={{ opacity: 0, y: "-2000px" }}
                        transition={{ duration: 1 }}
                    >
                        <Image src="/register.png" alt="login-image" width="1000" height="1000" />
                    </motion.div>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 1 }}
                    >
                        <div className='flex flex-col gap-8 px-8 items-center justify-center ml-[-200px]'>


                            <form onSubmit={handleRegister} className='flex gap-1 flex-col'>
                                <h1 className='text-blue-950 font-extrabold text-3xl mb-7 p-[-100px]'>NextZone Register</h1>
                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='flex gap-1 items-center ml-1' >

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                        Name

                                    </label >
                                    <input type="text" placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)} className=" pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-md focus:outline-none border-2 border-gray-300" />
                                </div>


                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='flex gap-1 items-center  ml-1' >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                        </svg>
                                        Email

                                    </label>
                                    <input type="text" placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)} className=" pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-md focus:outline-none border-2 border-gray-300" />
                                </div>


                                <div className='flex flex-col gap-1 mb-2'>

                                    <label className='flex gap-1 items-center  ml-1'  >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                        </svg>
                                        Password

                                    </label>
                                    <input type="password" placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} className=" pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-md focus:outline-none border-2 border-gray-300" />

                                </div>

                                <div className='flex flex-col gap-1 mb-2'>

                                    <label className='flex gap-1 items-center  ml-1'>


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        Phone Number

                                    </label>
                                    <input type="text" placeholder='Enter Your Phone Number' value={phoneNum} onChange={e => setPhoneNum(e.target.value)} className=" pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-md focus:outline-none border-2 border-gray-300" />
                                </div>


                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='flex gap-1 items-center  ml-1' >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                        Address
                                    </label>
                                    <input type="text" placeholder='Enter Your Address' value={address} onChange={e => setAddress(e.target.value)} className=" pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-md focus:outline-none border-2 border-gray-300" />

                                </div>
                                <button type='submit' className="w-[100%] md:w-[100%] bg-slate-700 text-white font-bold h-[2.5rem] rounded-md hover:border  hover:border-blue-950 hover:text-blue-950 hover:bg-white ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7" >
                                    <span>
                                        Register
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>

                            </form>
                            <span className='font-bold text-gray-500 mt-[-20px]'>Have an account? <span className='text-blue-600 cursor-pointer' onClick={() => router.push("/login")}>Login</span></span>
                        </div>
                    </motion.div>
                </div>
            </Center >
        </>
    )
}
