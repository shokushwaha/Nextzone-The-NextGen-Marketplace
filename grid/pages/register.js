import Center from '@/components/Center'
import axios from 'axios';
import React, { useState } from 'react'
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Head from 'next/head';
const StyledButton = styled.button`
width: 100%;
background-color: skyBlue;
color:black;
border:1px solid skyBlue;
padding: 4px 15px;
border-radius: 4px;
transition: all;
transition-duration: 200ms;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10px;
:hover{
  background-color: #32cd32;
  color: white;
  border:1px solid #32cd32;
    transform: scale(1.1);
    svg{
        display: flex;
      width: 100px;
    }
    span{
        display: none;
    }
}
`;
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNum, setPhoneNum] = useState(0);
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
            toast.success("Registered successfully");
            router.push('/login');
        }
        else
            toast.error("Some error occured");
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
                <div className="flex flex-col items-center justify-center gap-20  py-20 md:flex-row">
                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, y: "-2000px" }}
                        animate={{ opacity: 1, y: "0px" }}
                        exit={{ opacity: 0, y: "-2000px" }}
                        transition={{ duration: 1 }}
                    >

                        <div className='flex flex-col text-6xl items-center gap-4 md:text-8xl'>
                            NEXTZONE
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                        </div>
                    </motion.div>
                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 1 }}
                    >
                        <div className='flex flex-col gap-8 px-8'>


                            <form onSubmit={handleRegister}>
                                <h1 className='text-4xl pb-4 uppercase'>Register</h1>
                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='flex gap-1 items-center justify-start' >

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                        Name

                                    </label >
                                    <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} className='px-4 py-1 rounded-md border-b-2 border-blue-200 shadow' />
                                </div>


                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='flex gap-1 items-center justify-start' >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                        </svg>
                                        Email

                                    </label>
                                    <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='px-4 py-1 rounded-md border-b-2 border-blue-200 shadow' />
                                </div>


                                <div className='flex flex-col gap-1 mb-2'>

                                    <label className='flex gap-1 items-center justify-start'  >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                        </svg>
                                        Password

                                    </label>
                                    <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='px-4 py-1 rounded-md border-b-2 border-blue-200 shadow' />

                                </div>

                                <div className='flex flex-col gap-1 mb-2'>

                                    <label className='flex gap-1 items-center justify-start'>


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        Phone Number

                                    </label>
                                    <input type="number" placeholder='Phone Number' value={phoneNum} onChange={e => setPhoneNum(e.target.value)} className='px-4 py-1 rounded-md border-b-2 border-blue-200 shadow' />
                                </div>


                                <div className='flex flex-col gap-1 mb-2'>
                                    <label className='flex gap-1 items-center justify-start'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                        Address
                                    </label>
                                    <input type="text" placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} className='px-4 py-1 rounded-md border-b-2 border-blue-200 shadow' />

                                </div>
                                <StyledButton type='submit'  >
                                    <span>
                                        Register
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </StyledButton>

                            </form>
                            <div className='flex flex-col'>
                                Already have an account?
                                <Link href={'/login'} className='text-blue-600 '>
                                    Login here!
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Center >
        </>
    )
}
