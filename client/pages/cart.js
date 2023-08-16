import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Input from "@/components/Input";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "@/components/Footer";
import { Toaster, toast } from "react-hot-toast";
import Confetti from 'react-confetti'
import Nav from "@/components/Navbar";
import ProductSider from "@/components/ProductSider";
import { ToastContainer } from "react-toastify";

const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 1.2fr 0.8fr;
gap: 40px;
@media screen and (max-width: 550px) {
display  :flex ;
flex-direction: column;
justify-content: center;
}
`;

const Box = styled.div`
width:70%;
background-color: #fff;
border: 10px;
padding: 20px;
padding-left:10px;
min-height:90vh;
overflow-x: hidden;
`;


const StyledButton = styled.button`
width: 100%;
background-color: transparent;
color:green ;
border:1px solid green;
padding: 4px 15px;
border-radius: 4px;
transition: all;
transition-duration: 200ms;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10px;
:hover{
    background-color: green;
    color: white;
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

const StyledTable = styled.table`
width: 100%;
th{
    padding: 10px 0px;
    text-align: left;
    text-transform: uppercase;
    color: #bbb;
    font-size: 0.8rem;
    border-bottom: 2px solid black;
}
tr{
    border-bottom: 2px solid #f0f0f0;
}
img{
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 4px;
}
`;
const ProductCell = styled.div`
display: flex;
flex-direction: column;
padding-bottom: 20px;
padding-top: 4px;
margin-top:20px;

`;
const QuantityButton = styled.button`
width: 30%;
font-size: 1.5rem;
border: 2px solid #f0f0f0;
border-radius: 10px;
margin: 0px 10px;

@media screen and (max-width: 770px) {

    font-size: 1.2rem;
    width: 15%;
    text-align: center;
    }

    @media screen and (max-width: 430px) {
    font-size: 1.2rem;
    width: 15%;
    }
`;

const CityHolder = styled.div`
display: flex;
gap:10px;
`;
const ClearButton = styled.button`
background-color: #ff8080;
padding: 2px 8px;
border-radius: 4px;
:hover{
    background-color: #ff3333;
    box-shadow  :0px 0px 4px #ff3333 ;
}

`;
export default function CartPage() {

    const { loggedInUser, fetchUpdatedUserDetails, cartProducts, addProduct, removeProduct, clearCart, currentAccount } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [finalPrice, setFinalPrice] = useState(0);
    const router = useRouter();
    useEffect(() => {
        if (cartProducts?.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then(response => setProducts(response.data));
        }
        else {
            setProducts([]);
        }

    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);
    const moreOfThisProduct = (id) => {
        addProduct(id);
    }
    const lessOfThisProduct = (id) => {
        removeProduct(id);
    }

    const clearAll = () => {
        clearCart();
        setProducts([]);
    }

    let total = 0;
    let dp = 0
    for (const productId of cartProducts) {

        const price = products.find(p => p._id === productId)?.price || 0;
        const tempDp = products.find(p => p._id === productId)?.discount || 0;
        console.log(tempDp)
        total += price;
        dp = dp + Math.floor((price - (price * tempDp) / 100))
    }


    let id = loggedInUser?.data?._id;
    const goToPayment = async () => {
        if (!name || !city || !email || !postalCode || !streetAddress || !country) {
            alert("Fill all the details");
            return;
        }

        await axios.post('/api/order', { id, cartProducts });
        console.log(dp)
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country,
            cartProducts, dp
        });
        // console.log(response)
        if (response.data.url) {
            // clearCart();
            window.location = response.data.url;
        }
        else {
            alert("Some error occured")
        }


    }




    const payOnDelivery = async () => {
        if (!name || !city || !email || !postalCode || !streetAddress || !country) {

            alert("Fill all the details");
            return;
        }

        let userData = localStorage.getItem('loggedInUser');
        userData = JSON.parse(userData);
        let updatedUser = { ...userData };

        for (const cartProduct of cartProducts) {
            updatedUser.data.orders.push(cartProduct);
        }
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        await axios.post('/api/order', { id, cartProducts });




        if (finalPrice !== 0) {
            const response = await axios.post('/api/checkoutpod', {
                name, email, city, postalCode, streetAddress, country,
                cartProducts, finalPrice
            });
            console.log(response)
            router.push(
                {
                    pathname:
                        '/ordersuccess',
                    query: {
                        name: finalPrice,
                        amnt: selectedDiscountPrice
                    }
                }

            );
        }
        else {
            const response = await axios.post('/api/checkoutpod', {
                name, email, city, postalCode, streetAddress, country,
                cartProducts, dp
            });
            console.log(response)
            let temp = 0
            router.push(
                {
                    pathname:
                        '/ordersuccess',
                    query: {
                        name: dp,
                        amnt: temp
                    }
                }

            );
        }
        fetchUpdatedUserDetails();
    }

    // cart coupons
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedToken, setSelectedToken] = useState('');
    const [tokensLoaded, setTokensLoaded] = useState(false);
    const [selectedDiscountPrice, setSelectedDiscountPrice] = useState(0);
    async function fetchTokens() {
        setTokensLoaded(false);
        const res = await axios.post('/api/fetchtokens', { currentAccount });
        setOptions(res.data)
        setTokensLoaded(true);
    }
    useEffect(() => {

        fetchTokens();
    }, []);
    const handleOptionChange = (event) => {

        setSelectedDiscountPrice(event.target.value);
        setSelectedOption(event.target.value);
        if (dp - event.target.value < 0) {
            toast.error("Coupon cannot be applied");
            setSelectedOption("");

            return;
        }
        setFinalPrice(dp - event.target.value > 0 ? dp - event.target.value : dp);
    };


    if (isSuccess) {
        return (
            <>
                <Head>
                    <title>NextZone - Cart</title>

                </Head>
                <Nav />

                <Center>
                    <ToastContainer
                        position="top-right"
                        reverseOrder={false}
                    />
                    <Confetti className=' mx-auto'
                        width={1000}
                        height={800}
                    />
                    <Box>
                        <div className="flex flex-col gap-10">

                            <div className='flex flex-col gap-4 mt-4 bg-green-200 p-4 rounded-md shadow'>

                                <h1>Payment Successfull!</h1>
                                <p>Thanks for your Order</p>
                            </div>
                            <div className='text-gray-400 font-bold border-b-2 border-gray-400 px-4 py-2 w-1/3' >

                                <Link href={'/'}>Go To Home....</Link>
                            </div>
                        </div>
                    </Box>
                </Center>
            </>
        )
    }

    return (
        <div className="overflow-x-hidden">
            <Nav />
            {/* <Center> */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}

            >
                <ColumnsWrapper>
                    <Box>
                        <h2 className='text-blue-950 font-extrabold text-3xl mb-7 uppercase'>NextZone - Cart</h2>
                        {!cartProducts?.length && (
                            <>
                                <div>
                                    Your cart is empty
                                </div>

                            </>
                        )}
                        {
                            products?.length > 0 && (
                                <StyledTable>
                                    <thead>
                                        <tr>

                                            <th className="pl-6"><span className='ml-[4.6rem] text-blue-950 font-bold text-xl mb-7 align-middle'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Product</span></th>
                                            <th className="pl-6"><span className='ml-8 text-blue-950 font-bold text-xl mb-7 align-middle'>&nbsp;&nbsp;&nbsp;Quantity</span></th>
                                            <th><span className='ml-4 text-blue-950 font-bold text-xl mb-7 align-middle'>Price</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                        {products.map(product => (
                                            <>
                                                <tr key={product._id}>
                                                    <ProductCell>

                                                        <td className="object-contain">
                                                            <img className='ml-12 align-middle h-[150px] w-[200px]' src={product.images[0]} alt="image" />
                                                        </td>
                                                        <td> <span className="uppercase ml-[-10px] mt-4 text-blue-950 font-bold">{product.title}</span></td>
                                                    </ProductCell>
                                                    <td >


                                                        <QuantityButton onClick={() => lessOfThisProduct(product._id)} >-</QuantityButton>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                        <QuantityButton onClick={() => moreOfThisProduct(product._id)}>+</QuantityButton>
                                                    </td>
                                                    <td>₹{cartProducts.filter(id => id === product._id).length * product.price}</td>

                                                </tr>

                                            </>
                                        )
                                        )
                                        }
                                    </tbody>
                                </StyledTable>


                            )
                        }
                    </Box>

                    {/* {!!cartProducts?.length && ( */}
                    <Box className="ml-[-305px]">
                        <div className="fixed overflow-hidden h-[100vh]">

                            <StyledTable>
                                <tr>
                                    <td className="flex flex-col pl-3">
                                        <div>
                                            <span className="text-gray-800 font-bold text-2xl">
                                                Total Amount : &nbsp;
                                            </span>
                                            <span className="text-gray-400 line-through text-2xl">
                                                ₹{total}
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-gray-800 font-bold text-2xl">
                                                Amount After Discount : &nbsp;
                                            </span>
                                            <span className={finalPrice !== 0 ? "line-through text-gray-400 text-2xl" : "" + "text-gray-800 font-bold text-2xl"}
                                            >
                                                ₹{dp}
                                            </span>
                                        </div>
                                        {finalPrice !== 0 ?
                                            <div className="mt-2">
                                                <span className="text-gray-800 font-bold text-2xl">
                                                    Grand Total  : &nbsp;
                                                </span>
                                                <>
                                                    <span className="text-gray-800 font-bold text-2xl">
                                                        ₹{finalPrice}
                                                    </span>
                                                </>
                                            </div> :
                                            <div className="mt-2">
                                                <span className="text-gray-800 font-bold text-2xl">
                                                    Grand Total  : &nbsp;
                                                </span>
                                                <>
                                                    <span className="text-gray-800 font-bold text-2xl">
                                                        ₹{dp}
                                                    </span>
                                                </>
                                            </div>
                                        }
                                        {
                                            tokensLoaded &&
                                            <div className="px-2 mt-6 mb-6 shadow-lg">

                                                <select id="dropdown" value={selectedOption} onChange={handleOptionChange}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 peer pl-3 rounded-md"
                                                >
                                                    <option value="">Select your token</option>
                                                    {options.map(option => (
                                                        <>
                                                            <option key={option._id} value={option.couponPrice}>
                                                                {option.couponPrice} {option.couponName}
                                                            </option>
                                                        </>
                                                    ))}
                                                </select>
                                            </div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pl-4 pr-4">
                                        <button className="w-[100%] md:w-[100%] bg-neutral-800 text-white font-bold h-[2.5rem] rounded-md hover:border  hover:border-blue-950 hover:text-gray-200 hover:bg-neutral-600 ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7" onClick={clearAll}>
                                            Clear Cart
                                        </button>
                                    </td>
                                </tr>
                            </StyledTable>


                            <h2 className='text-blue-950 font-extrabold text-3xl mt-10 mb-4 uppercase'>Order Information</h2>


                            <Input type="text"
                                required
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={e => setName(e.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                required
                                value={email}

                                name="email"
                                onChange={e => setEmail(e.target.value)} />
                            <CityHolder>
                                <Input type="text"
                                    placeholder="City"
                                    required
                                    value={city}
                                    name="city"
                                    onChange={e => setCity(e.target.value)} />
                                <Input type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    required
                                    onChange={e => setPostalCode(e.target.value)} />
                            </CityHolder>
                            <Input type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                required
                                name="streetAddress"
                                onChange={e => setStreetAddress(e.target.value)} />
                            <Input type="text"
                                placeholder="Country"
                                value={country}
                                required
                                name="country"
                                onChange={e => setCountry(e.target.value)} />

                            <button className="w-[100%] md:w-[100%] bg-neutral-800 text-white font-bold h-[2.5rem] rounded-md hover:border  hover:border-blue-950 hover:text-gray-200 hover:bg-neutral-600 ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7 mt-3" onClick={goToPayment}>
                                <span>
                                    Continue To Payment
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 hidden">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                            <button className="w-[100%] md:w-[100%] bg-neutral-800 text-white font-bold h-[2.5rem] rounded-md hover:border  hover:border-blue-950 hover:text-gray-200 hover:bg-neutral-600 ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7 mt-2" onClick={payOnDelivery}>
                                <span>
                                    Pay on Delivery
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 hidden">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>

                        </div>
                    </Box>
                    <div className="absolute ml-[68.7vw]">
                        <ProductSider />
                    </div>

                    {/* )} */}



                </ColumnsWrapper>
            </motion.div>
            {/* </Center> */}
            {/* <Footer /> */}

        </div >
    )
}
