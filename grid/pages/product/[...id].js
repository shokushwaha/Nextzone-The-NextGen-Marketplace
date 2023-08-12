import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center"
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Nav from "@/components/Navbar";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useRouter } from "next/router";
const Title = styled.div`
font-size:2rem;
`;
const Wrapper = styled.div`
display: grid;
grid-template-columns: 0.8fr 1.2fr;
gap: 40px;
margin-top: 40px;
min-height: 60vh;


@media screen and (max-width: 550px) {
   
   display  :flex ;
   flex-direction: column;
   justify-content: center;
   
   }
`;

const WhiteBox = styled.div`
background: #fff;
border-radius: 10px;
padding:40px;

`;
const StyledBox = styled.div`

@media screen and (max-width: 550px) {
   
   display  :flex ;
   flex-direction: column;
   justify-content: center;
   gap:20px;

   }`;
export default function ProductPage({ product }) {

    const router = useRouter();

    const { addProduct } = useContext(CartContext);
    const addToCart = (id) => {
        addProduct(id);
    }


    const [review, setReview] = useState('');
    const addReview = async () => {
        if (review === "") {
            toast.error("Review can't be empty")
            return;
        }
        let productId = product._id;
        await axios.post('/api/addreview', { productId, review });
        console.log('review added')
        toast.success("Review added")
    }


    const [reviewArr, setReviewArr] = useState([]);
    useEffect(() => {
        setReviewArr(product.reviews)
    }, [])


    const ratingChanged = async (newRating) => {
        let stars = newRating;
        const id = router.query.id[0];
        const res = await axios.post('/api/rateproduct', { id, stars });
        if (res)
            toast.success("Ratings added")
    };

    let avgRatings = 0
    let tempRat = product.stars
    for (let i = 0; i < tempRat.length; i++) {
        avgRatings += tempRat[i];
    }
    avgRatings = avgRatings / tempRat.length;



    return (
        <>
            <Head>
                <title>NextZone - {product.title}</title>

            </Head>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="overflow-x-hidden">
                <Nav />
                <Center>
                    <Wrapper>
                        <WhiteBox>
                            <motion.div
                                className="container text-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}

                            >
                                <ProductImages images={product.images} />
                                <div className=" rounded-md shadow bg-slate-100 text-xl mt-40 mx-auto  flex flex-col items-center justify-center">
                                    Rate the product:
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={28}
                                        activeColor="#ffd700"
                                    />
                                </div>

                                <div className="mt-4 text-gray-500">
                                    Average ratings:
                                    <span className="text-gray-800 px-1 text-xl font-bold">
                                        {avgRatings}
                                    </span>
                                    / 5
                                </div>
                                <div className="text-gray-500">
                                    out of {tempRat.length} votes
                                </div>
                            </motion.div>
                        </WhiteBox>
                        <div >
                            <motion.div
                                className="container text-center"
                                initial={{ opacity: 0, x: "2000px" }}
                                animate={{ opacity: 1, x: "0px" }}
                                exit={{ opacity: 0, x: "2000px" }}
                                transition={{ duration: 1 }}
                            >

                                <Title>
                                    {product.title}
                                </Title>
                                <p>
                                    {product.description}
                                </p>
                                <StyledBox className="flex  items-center justify-between">

                                    <div className="mt-10 text-4xl">
                                        ${product.price}
                                        <div className="bg-yellow-300 rounded-md text-sm mt-2 px-2 py-1">
                                            {product.discount}% off
                                        </div>
                                    </div>

                                    <div>
                                        <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={() => addToCart(product._id)}>

                                            <div class="absolute inset-0 w-3 bg-sky-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                            <span class="relative text-black group-hover:text-white flex items-center justify-center gap-2 ">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                                Add To Cart</span>
                                        </button>


                                    </div>
                                </StyledBox>

                                <div className="flex flex-col mt-10" >
                                    <div className="text-gray-600 text-xl">
                                        Reviews
                                    </div>


                                    <div className="flex gap-4 p-2 items-center " >
                                        <input type="text" value={review} onChange={e => setReview(e.target.value)} placeholder="Add review" className="px-4 py-1 rounded-md shadow" required />
                                        <button onClick={addReview} className="bg-sky-200 hover:bg-sky-400 px-4 py-1 rounded-md shadow">Add</button>
                                    </div>

                                    {reviewArr.length === 0 ? <h1 className="text-gray-500 mb-4">No reviews yet</h1>

                                        : <>

                                            <h1 className="text-gray-500 py-4" >Past reviews</h1>
                                            <div>
                                                {reviewArr.length > 0 && reviewArr.map(r => (<>

                                                    <h1 className="flex gap-4 pb-1 items-center  border-b-2 border-green-400" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                                        </svg>

                                                        {r}</h1>
                                                </>))}
                                            </div>
                                        </>}
                                </div>
                            </motion.div>
                        </div>

                    </Wrapper>



                </Center>
            </div>
        </>
    )
}
export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}