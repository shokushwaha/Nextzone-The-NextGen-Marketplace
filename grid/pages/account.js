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





// blockchain imports 

const ethers = require('ethers');
const contractAddress = '0x0264F907e859512504834a02D83D4249772cca0b';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserTokenCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getUserTokenDetails",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userTokenDetails",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenSymbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];



const StyledDiv = styled.div`

min-height: 90vh;
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
    const router = useRouter();

    useEffect(() => {
        setLoggedInUser(JSON.parse(localStorage.getItem('loggedInUser')))
        if (loggedInUser) {
            setId(loggedInUser?.data?._id)
            setName(loggedInUser?.data?.name);
            setEmail(loggedInUser?.data?.email);
            setPhoneNum(loggedInUser?.data?.phoneNum);
            setAddress(loggedInUser?.data?.address);
            setOrders(loggedInUser?.data?.orders);

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

        });

    }



    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [showOrderButton, setShowOrderButton] = useState(false);
    const updateUser = async (e) => {
        e.preventDefault();
        await axios.post('/api/updateuser', { id, name, email, phoneNum, address });

        setEditButtonClicked(false);
    }

    //   blockchain functions 

    async function getUserTokens() {
        try {

            const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/tEdqiRHnu5uAVS_bEI3WmJb61MLGjHdm');
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const tokenCount = await contract.getUserTokenCount(currentAccount);
            const userTokens = [];
            for (let i = 0; i < tokenCount; i++) {
                const tokenDetails = await contract.getUserTokenDetails(currentAccount, i);
                userTokens.push(tokenDetails);
            }

            console.log('User tokens:', userTokens);


            const num = parseInt(userTokens[0][3], 10) / 1000000000000000000;
            console.log(num);
        } catch (error) {
            console.error('Error fetching user tokens:', error);
        }
    }


    return (
        <>
            <Head>
                <title>NextZone - Account</title>

            </Head>
            <Nav />
            <Center>

                <StyledDiv className='flex  justify-between'>
                    {!editButtonClicked ?
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-4xl py-4' >Account Details</h1>
                            <div className='flex items-center gap-4'>
                                <span className='flex  items-center gap-2'>
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
                                <span className='flex  items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                </svg>

                                    Email:
                                </span>
                                <span>
                                    {email}
                                </span>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <span className='flex  items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                </svg>


                                    Metamask:
                                </span>
                                <span>
                                    {currentAccount.substring(0, 8)}....{currentAccount.substring(20, 24)}
                                </span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='flex  items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>

                                    Phone Number:
                                </span>
                                <span>
                                    {phoneNum}
                                </span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='flex  items-center gap-2'>
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
                                <button className='bg-sky-400 rounded-md w-full text-center hover:bg-sky-500 px-4 py-1 shadow ' onClick={() => setEditButtonClicked(true)}  >Edit Details</button>
                            </div>
                            <div>
                                <button className='bg-red-400 rounded-md w-full text-center hover:bg-red-500 px-4 py-1 shadow ' onClick={() => {
                                    setLoggedIn(false)
                                    localStorage.removeItem('loggedIn');
                                    localStorage.removeItem('loggedInUser');
                                    router.push("/login")
                                }}  >LogOut</button>
                            </div>
                            <div>
                                <button className='bg-gray-400 rounded-md w-full text-center hover:bg-gray-500 px-4 py-1 shadow ' onClick={handleDeleteAccount}  >Delete Account</button>
                            </div>

                            <div className='bg-gray-400 rounded-md w-full text-center hover:bg-gray-500 px-4 py-1 shadow ' onClick={getUserTokens}>Fetch Coupons</div>
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
                        <h1 className='text-4xl py-4'>
                            Orders History
                        </h1>

                        {
                            orders && orders.length === 0 ? <>
                                <div className='text-gray-600'>
                                    You haven&apos;t ordered any items yet
                                </div>
                            </> : <>
                                <div className='flex flex-col gap-2'>


                                    {
                                        showOrderButton ?

                                            <>
                                                <h1 className='text-gray-800'>You have ordered these items in the past</h1>
                                                <button onClick={() => setShowOrderButton(false)} className=' bg-sky-400 w-full rounded-md px-4 py-1 hover:cursor-pointer' >Close List</button>

                                            </>

                                            :
                                            <>
                                                <h1 className='text-gray-800'>
                                                    Get past orders
                                                </h1>
                                                <button onClick={showOrders} className='bg-green-400 rounded-md hover:bg-green-500 px-4 py-1'>Show Orders</button>
                                            </>
                                    }

                                </div>


                                {showOrderButton ?
                                    <>

                                        {
                                            orderArr.length > 0 && orderArr.map(order => (
                                                <>
                                                    <div
                                                        key={order._id}
                                                        className='flex gap-4 border-b-2 border-gray-400 px-4 py-2 mb-8'>
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
                                                                ${order.price}
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
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </>
                                    : null}

                            </>
                        }
                    </div>
                </StyledDiv>
            </Center>
            <Footer />

        </>
    )
}
