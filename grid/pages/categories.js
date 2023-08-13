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
import { Category } from '@/models/Category'
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

export default function Categories({ allCategories, allProducts }) {


    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    useEffect(() => {
        setProducts(allProducts)
        console.log(allProducts)
        setCategories(allCategories)
    }, [])


    return (
        <>
            <Head>
                <title>NextZone - Categories</title>

            </Head>
            <div className='overflow-x-hidden'>
                <Nav />

                <Center>
                    <CatHead className='flex gap-20 items-center border-b-2 border-gray-800 mt-4 mb-4 pb-2'>

                        <h1 className=' flex items-center gap-2 text-4xl  ' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                            Categories</h1>

                    </CatHead>
                    <div className='grid grid-cols-5 gap-4 mt-2'>

                        {categories.length && categories.map(cat => (
                            <>
                                <button
                                    className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'
                                > {cat.name}</button>
                            </>
                        ))}
                    </div>

                    <div>
                        {categories.length > 0 && categories.map((category) => {
                            return (
                                <div key={category._id}>
                                    <div className="text-blue-950 font-extrabold text-3xl flex gap-3 items-center justify-center md:ml-6 md:justify-normal mt-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                                        </svg>
                                        {category.name}
                                    </div>
                                    <div className="flex flex-wrap gap-3 items-center justify-center md:ml-6 md:justify-normal pt-7 pb-10 " >
                                        {console.log(category)}
                                        {products.length > 0 && products.filter(pdt => pdt.category?.name === category.name).map((product) => {
                                            { console.log(product) }
                                            return (
                                                <div key={product._id} className="h-[320px] w-[320px] flex flex-col items-center justify-center rounded-2xl pb-3 bg-gray-100">
                                                    <div className="p-8 pt-3 pl-12 h-[320px] w-[320px] object-contain">
                                                        <img className="h-[220px] w-[220px] object-contain rounded-2xl mix-blend-multiply" src={product.images[0]} alt="product-image" />
                                                    </div>
                                                    <div onClick={() => router.push(`/products/${product._id}`)} className="mt-[-80px] font-bold text-xl text-blue-800 cursor-pointer">
                                                        {product.title}
                                                    </div>
                                                    <div className="flex justify-between items-center gap-14 mt-1">
                                                        <span className="font-extrabold text-xl">
                                                            ₹{product.price}
                                                        </span>
                                                        <button onClick={() => addToCart(product._id, product.title)} className="w-[9rem] bg-blue-950 text-white rounded-xl flex p-2 font-bold gap-3 hover:text-blue-950 hover:border-blue-900 hover:bg-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                            </svg>
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div >
                </Center >
                <Footer />
            </div >
        </>)
}


export async function getServerSideProps() {

    await mongooseConnect();


    const allCategories = await Category.find({});
    const allProducts = await Product.find({}).populate('category');
    return {
        props: {

            allCategories: JSON.parse(JSON.stringify(allCategories)),
            allProducts: JSON.parse(JSON.stringify(allProducts)),
        }
    }
}