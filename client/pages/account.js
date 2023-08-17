import { CartContext } from '@/components/CartContext'
import Nav from "@/components/Navbar";
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import Footer from '@/components/Footer';
import ProductSider from '@/components/ProductSider';
import CartIcon from '@/components/icons/CartIcon';
import { Toaster, toast } from 'react-hot-toast';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

const StyledDiv = styled.div`

@media screen and (max-width: 650px) {
    
    display  :flex ;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    
    }
    
`;


export default function Account() {
    const { loggedInUser, setLoggedInUser, setLoggedIn, cartProducts, setCartProducts, currentAccount } = useContext(CartContext);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [orders, setOrders] = useState([]);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoggedInUser(JSON.parse(localStorage.getItem('loggedInUser')))
        if (loggedInUser) {
            setId(loggedInUser?.data?._id)
            setName(loggedInUser?.data?.name);
            setEmail(loggedInUser?.data?.email);
            setPhoneNum(loggedInUser?.data?.phoneNum);
            setAddress(loggedInUser?.data?.address);


            const uniqueSet = new Set(loggedInUser?.data?.orders);
            const uniqueArray = [...uniqueSet];
            setOrders(uniqueArray);

            const temp = loggedInUser?.data?.cart;
            for (let i = 0; temp && i < temp.length; i++) {
                if (!cartProducts.includes(temp[i]))
                    setCartProducts(prev => [...prev, temp[i]])
            }

        }
    }, [])


    const handleDeleteAccount = async () => {
        const res = await axios.delete('/api/user', id);
        if (res) {
            router.push('/register');

        }
    }
    const [orderArr, setOrderArr] = useState([]);

    const showOrders = async () => {
        axios.post('/api/cart', { ids: orders }).then(response => {
            setOrderArr(response.data)
            setShowOrderButton(true)
            console.log(response.data)
        });
    }

    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [showOrderButton, setShowOrderButton] = useState(false);
    const updateUser = async (e) => {
        e.preventDefault();
        await axios.post('/api/updateuser', { id, name, email, phoneNum, address });
        setEditButtonClicked(false);
    }


    const handleCopyClick = () => {
        const textToCopy = `http://localhost:3001/register?account=${currentAccount}`;
        try {
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            toast.success("Refer Link Copied")
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return (
        <>
            <Head>
                <title>NextZone - Account</title>

            </Head>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Nav />


            <StyledDiv className='flex gap-2'>
                {!editButtonClicked ?
                    <div className='flex flex-col gap-4 bg-white items-center  w-[28vw] pl-8  '>
                        <div className='flex flex-col gap-2 items-start justify-start'>
                            <h1 className='text-3xl pt-4 font-extrabold uppercase' >Account Details</h1>
                            <span className='flex items-end justify-start gap-2'>
                                <span className='text-md font-extrabold'>Hi</span>
                                <span className='text-xl uppercase'>{name}</span>
                            </span>
                        </div>
                        <div className='flex flex-col gap-4 pt-4 pr-6'>

                            <div className='flex items-center gap-4'>
                                <span className='flex  items-center gap-2 text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    Name:
                                </span>
                                <span>
                                    {name}
                                </span>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <span className='flex  items-center gap-2 text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                    </svg>

                                    Email:
                                </span>
                                <span>
                                    {email}
                                </span>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <span className='flex  items-center gap-2 text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                </svg>


                                    Metamask:
                                </span>
                                <span>
                                    {currentAccount.substring(0, 8)}....{currentAccount.substring(20, 30)}
                                </span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='flex  items-center gap-2 text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>

                                    Phone Number:
                                </span>
                                <span>
                                    {phoneNum}
                                </span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='flex  items-center gap-2 text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>

                                    Address:
                                </span>
                                <span>
                                    {address}
                                </span>
                            </div>
                            <div>
                                <button className='bg-sky-400 rounded-md w-full text-center hover:bg-sky-500 px-4 py-1 shadow mb-[-10px]' onClick={() => setEditButtonClicked(true)}>Edit Details</button>
                            </div>
                            <div>
                                <button className='bg-red-400 rounded-md w-full text-center hover:bg-red-500 px-4 py-1 shadow mb-[-10px]' onClick={() => {
                                    setLoggedIn(false)
                                    localStorage.removeItem('loggedIn');
                                    localStorage.removeItem('loggedInUser');
                                    router.push("/login")
                                }}  >LogOut</button>
                            </div>
                            <div>
                                <button className='bg-gray-400 rounded-md w-full text-center hover:bg-gray-500 px-4 py-1 shadow ' onClick={handleDeleteAccount}  >Delete Account</button>
                            </div>

                            <div className='flex items-center justify-center gap-2  bg-gray-200  rounded-md shadow-lg mt-1 p-6'>
                                <span className='flex items-center justify-center'>
                                    <img src="/refer.png" className='w-40' />
                                </span>
                                <span className='text-gray-600 font-extrabold flex flex-col item-start  gap-2'>

                                    <span>
                                        Refer your frineds and earn a token worth  ₹ 100
                                    </span>
                                    <span className='flex items-center gap-2'>

                                        <span className='bg-white px-1 rounded-md py-2'>
                                            https://localhost:3001/refer/
                                        </span>
                                        <span onClick={handleCopyClick} className='cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                            </svg>

                                        </span>
                                    </span>
                                </span>
                            </div>
                            <div className="flex gap-2 items-center justify-center">
                                <span className='text-gray-600 font-extrabold text-sm w-[100px]'>
                                    Share and Earn
                                </span>
                                <TwitterShareButton url={`http://localhost:3001/register?account=${currentAccount}`}>
                                    <TwitterIcon size={32} round={true} />
                                </TwitterShareButton>
                                <WhatsappShareButton url={`http://localhost:3001/register?account=${currentAccount}`}>
                                    <WhatsappIcon size={32} round={true} />
                                </WhatsappShareButton>
                                <TelegramShareButton url={`http://localhost:3001/register?account=${currentAccount}`}>
                                    <TelegramIcon size={32} round={true} />
                                </TelegramShareButton>
                                <FacebookShareButton url={`http://localhost:3001/register?account=${currentAccount}`}>
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                                <EmailShareButton url={`http://localhost:3001/register?account=${currentAccount}`}>
                                    <EmailIcon size={32} round={true} />
                                </EmailShareButton>
                                <PinterestShareButton url={`http://localhost:3001/register?account=${currentAccount}`}>
                                    <PinterestIcon size={32} round={true} />
                                </PinterestShareButton>
                            </div>
                        </div>
                    </div>

                    :

                    <div className='mt-4'>
                        <form onSubmit={updateUser} className='flex flex-col gap-2' >
                            <h1 className='text-2xl'>Edit Details</h1>
                            <div className='flex flex-col mb-2'>
                                <label >Name:</label>
                                <input type="text" placeholder='name' value={name} onChange={e => setName(e.target.value)} className='px-2 py-1 rounded-md bg-green-100 shadow' />
                            </div>


                            <div className='flex flex-col mb-2' >
                                <label>Email: </label>
                                <input type="text" placeholder='name' value={email} onChange={e => setEmail(e.target.value)} className='px-2 py-1 rounded-md bg-green-100 shadow' />
                            </div>

                            <div className='flex flex-col mb-2'>
                                <label>Phone Number:</label>
                                <input type="text" placeholder='name' value={phoneNum} onChange={e => setPhoneNum(e.target.value)} className='px-2 py-1 rounded-md bg-green-100 shadow' />
                            </div>

                            <div className='flex flex-col mb-2'>
                                <label>Address:</label>
                                <input type="text" placeholder='name' value={address} onChange={e => setAddress(e.target.value)} className='px-2 py-1 rounded-md bg-green-100 shadow' />
                            </div>
                            <button type='submit' className='bg-green-400 hover:bg-green-500 rounded-md py-1' >Update</button>
                            <button onClick={() => setEditButtonClicked(false)}
                                className='bg-sky-400 hover:bg-sky-500 rounded-md py-1'
                            >Back</button>
                        </form>
                    </div>
                }
                <div>
                    <h1 className='text-3xl py-4 bg-white px-8 w-[41vw] font-extrabold uppercase text-center '>
                        Orders History
                    </h1>

                    {
                        orders && orders.length === 0 ? <>
                            <div className='text-gray-600 text-center mx-auto flex flex-col gap-4 items-center justify-center bg-white pb-[20vh]'>
                                <span>
                                    You haven&apos;t ordered any items yet
                                </span>
                                <button onClick={() => router.push('/')} className='bg-blue-200 px-4 py-2 shadow-lg rounded-lg hover:bg-blue-400 hover:scale-110'>Start shopping....</button>

                                <img src={"/cart.jpg"} className='w-[360px] rounded-md shadow-xl animate-pulse' />
                            </div>
                        </> : <>
                            <div className='flex flex-col gap-2 bg-white'>


                                {
                                    showOrderButton ?

                                        <>
                                            <h1 className='text-gray-800 text-center mb-4 mt-[-12px]'>You have ordered these items in the past</h1>
                                            <button onClick={() => setShowOrderButton(false)} className=' bg-sky-400  rounded-md px-4 py-1 hover:cursor-pointer w-[400px] mx-auto mb-8' >Close List</button>

                                        </>

                                        :
                                        <>
                                            <div className='flex flex-col items-center  min-h-[90vh]'>

                                                <h1 className='text-gray-800 text-center mb-4 mt-[-12px]'>
                                                    Get past orders
                                                </h1>
                                                <button onClick={showOrders} className='bg-green-400 rounded-md hover:bg-green-500 px-4 py-1 w-[400px] mx-auto mb-8 hover:animate-pulse'>Show Orders</button>

                                                <img src={"/cart.jpg"} className='w-[360px] rounded-md shadow-xl animate-pulse' />
                                            </div>
                                        </>
                                }

                            </div>

                            <div className='bg-white'>

                                {showOrderButton ?
                                    <>

                                        {
                                            orderArr.length > 0 && orderArr.map(order => (
                                                <>
                                                    <div
                                                        key={order._id}
                                                        className='flex gap-4 border-b-2 border-gray-400  py-2 mb-8  px-8'>
                                                        <div>
                                                            <img src={order.images[0]} alt="image" className='w-40 ' />
                                                        </div>
                                                        <div className='flex flex-col gap-2'>

                                                            <span>
                                                                <span className='text-gray-600' >
                                                                    Name: &nbsp;
                                                                </span>
                                                                {order.title}
                                                            </span>

                                                            <span>
                                                                <span className='text-gray-600' >
                                                                    Price: &nbsp;
                                                                </span>
                                                                ₹{order.price}
                                                            </span>
                                                            <span>
                                                                <span className='text-gray-600' >
                                                                    Ordered on: &nbsp;
                                                                </span>
                                                                {order.updatedAt.substring(0, 10)}
                                                            </span>
                                                            <span className='text-gray-600 hover:text-gray-800'>
                                                                <Link href={'/product/' + order._id}>

                                                                    More Info
                                                                </Link>
                                                            </span>

                                                        </div>
                                                        <div className='flex items-start justify-end'>
                                                            <button className='bg-yellow-400 rounded-md shadow-lg px-2 py-2 flex items-center justify-center gap-2 ml-12 mt-20 w-[150px]'>
                                                                <CartIcon />
                                                                <span>
                                                                    Buy Again
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </>
                                    : null}
                            </div>

                        </>
                    }
                </div>
                <div className='h-[100vh] bg-white'>
                    <ProductSider />
                </div>
            </StyledDiv>

            <div className='mt-[-25px]'>
                <Footer />
            </div>

        </>
    )
}
