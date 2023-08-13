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
import ProductBox from '@/components/ProductBox'
const CatHead = styled.div`
    @media screen and (max-width: 650px) {
    display  :flex ;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
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
            <Nav />
            <div className='overflow-x-hidden pl-[100px] pr-[150px] pt-5'>

                {/* <Center> */}
                <CatHead className='flex gap-20 items-center border-b-2 border-gray-800 mt-4 mb-4 '>

                    <h1 className=' flex items-center gap-2 text-4xl mb-2' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                        Categories</h1>

                </CatHead>
                <div className='grid grid-cols-7 gap-1'>

                    {categories.length && categories.map(cat => (
                        <>
                            <button onClick={() => { setFilterCategory(cat.name) }}
                                className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'
                            > {cat.name}</button>
                        </>
                    ))}
                    <button onClick={() => { setFilterCategory("") }}
                        className='bg-white rounded-md  shadow-md px-1 hover:bg-gray-800 hover:text-gray-200'
                    > Reset Filters</button>
                </div>

                <div>
                    {categories.length > 0 && categories.filter(ct => ct.name.includes(filterCategory)).map((category) => {
                        return (
                            <div key={category._id}>
                                <div className="text-blue-950 font-extrabold text-3xl flex gap-3 items-center justify-center md:ml-6 md:justify-normal mt-6 uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    {category.name}
                                </div>
                                <div className="flex flex-wrap gap-3 items-center justify-center md:ml-6 md:justify-normal pt-7 pb-10" >
                                    {console.log(category)}
                                    {products.length > 0 && products.filter(pdt => pdt.category?.name === category.name).map((product) => {
                                        { console.log(product) }
                                        return (
                                            <div key={product._id}>
                                                <ProductBox {...product} />
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div >
                {/* </Center > */}
            </div >
            <Footer />
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