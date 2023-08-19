import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import Confetti from 'react-confetti'
import uuid4 from 'uuid4'

import randomstring from 'randomstring';
import Mintloader from '@/components/Mintloader';
import TokenModal from '@/components/TokenModal';
import ScratchCard from 'react-scratchcard'

import { contractABI } from '@/contract-abi/abi';

const ethers = require('ethers');
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;



export default function Ordersuccess() {

    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [minting, setMinting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [ftName, setFTName] = useState('');
    const [ftSymbol, setFTSymbol] = useState('');
    const [ftAmnt, setFTAmnt] = useState(0);
    const [transactionHash, setTransactionHash] = useState('');
    const { loggedInUser, cartProducts, addProduct, removeProduct, clearCart, currentAccount } = useContext(CartContext);
    let id = loggedInUser?.data?._id;

    const handleClick = async () => {
        setMinting(true);
        await axios.post('/api/order', { id, cartProducts })
        const amt = router.query.amnt
        if (amt > 0) {
            console.log(amt)
            await axios.post('/api/deletetoken', { amt })
        }
        setClicked(true)
        toast.success("Order placed")
        localStorage.removeItem('cart')
        clearCart();
        mintTokens();

    }



    async function mintTokens() {
        try {

            const amount = router.query.name;
            let finalAmount = 0;
            let couponName = "";
            let couponSymbol = "";
            if (amount > 0 && amount < 1000) {
                couponName = "Bronze Token"
                couponSymbol = "Earned Via Purchase"
                finalAmount = Math.floor(amount * 0.01)
            }
            else if (amount >= 1000 && amount < 10000) {
                couponName = "Silver Token"
                couponSymbol = "Earned Via Purchase"
                finalAmount = Math.floor(amount * 0.01)
            }
            else if (amount >= 10000 && amount < 25000) {
                couponName = "Gold Token"
                couponSymbol = "Earned Via Purchase"
                finalAmount = Math.floor(amount * 0.01)
            }
            else {
                couponName = "Premium Token"
                couponSymbol = "Earned Via Purchase"
                finalAmount = Math.floor(amount * 0.01)
            }

            if (finalAmount > 500)
                finalAmount = 500

            setFTName(couponName);
            setFTSymbol(couponSymbol)
            setFTAmnt(finalAmount)



            const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER);

            const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
            const wallet = new ethers.Wallet(privateKey, provider);


            const contract = new ethers.Contract(contractAddress, contractABI, wallet);

            const recipientAddress = currentAccount;


            let amnt = finalAmount;
            const amountToMint = ethers.utils.parseEther(amnt.toString());


            const randomNumber = randomstring.generate({
                length: 10,
                charset: 'numeric'
            })
            const tokenId = randomNumber;


            const tokenName = couponName;


            const tokenSymbol = couponSymbol;

            const tx = await contract.mint(recipientAddress, amountToMint, tokenId, tokenName, tokenSymbol);



            const receipt = await tx.wait();
            setTransactionHash(receipt.transactionHash);
            let tHash = receipt.transactionHash
            const res = await axios.post('/api/createtoken', { currentAccount, tokenName, tokenSymbol, amnt, tHash });

            console.log('Tokens minted successfully!');
            setMinting(false);
            setModalOpen(true);
            console.log(res.data)

        } catch (error) {
            console.error('Error minting tokens:', error);
        }
    }

    const settings = {
        height: 400,
        width: 400,
        image: '/scratchCard.jpg',
        finishPercent: 60,
        onComplete: () => console.log("scratch card won")
    }




    if (minting)
        return <>

            <Mintloader />
        </>

    return (
        <>
            <Head>
                <title>NextZone - Order Success</title>

            </Head>
            <Navbar />

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {/* <Center> */}
            {
                clicked ?
                    <Confetti className=' mx-auto'
                        width={1000}
                        height={800}
                    />
                    : null}
            {
                (clicked && !minting && modalOpen) ? <div className='flex flex-col items-center justify-center gap-4 h-[80vh] '>

                    <div>

                        <ScratchCard {...settings}>
                            <TokenModal ftName={ftName} ftSymbol={ftSymbol} ftAmnt={ftAmnt} transactionHash={transactionHash} />
                            <button onClick={() => setModalOpen(false)} className=' absolute left-[160px] bg-yellow-400 px-8 py-1 mt-1 rounded-md shadow-xl hover:bg-yellow-500'>Ok</button>
                        </ScratchCard>
                    </div>

                </div> : null
            }
            {
                !modalOpen &&
                <div className='flex flex-col gap-4 items-center justify-center min-h-[80vh]'>

                    <span className='mt-4 text-xl'>

                        You have to pay a amount of
                        <span className='px-2 text-2xl text-bold'>

                            ₹
                            {router.query.name}
                        </span>
                        at the time of delivery
                    </span>

                    {!clicked ?
                        <button onClick={handleClick} className='bg-green-400 w-2/5 rounded-md shadow px-4 py-1 ' >Confirm Order</button>
                        : <span className='text-center text-green-600 text-2xl text-bold'>Order Placed Successfully</span>}
                </div>
            }

            {/* </Center> */}
            <Footer />
        </>
    )
}
