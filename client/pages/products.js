import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";
import { motion } from "framer-motion";
import Nav from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useState } from "react";
const ProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
gap: 20px;
padding-top: 30px;
padding-bottom: 20px;
margin-left:-60px;

    @media screen and (max-width: 700px) {
        display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    
    }

    @media screen and (max-width: 550px) {
        display: grid;
    grid-template-columns: 1fr 1fr;
    
    }

    @media screen and (max-width: 400px) {
        display: grid;
    grid-template-columns: 1fr;
    
    }


`;
export default function ProductsPage({ products }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchRegex = new RegExp(searchTerm, 'i');
    const filteredProducts = products.filter((product) =>
        searchRegex.test(product.title)
    );
    return (
        <>
            <Head>
                <title>NextZone - All Products</title>

            </Head>
            <div className="overflow-x-hidden min-h-screen">

                <Nav />
                <Center>
                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >

                        <form class="flex items-center mt-6 ml-[-60px]">
                            <label for="voice-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                                    </svg>
                                </div>
                                <input type="text" value={searchTerm} onChange={handleSearch} id="voice-search" class="bg-gray-50 border border-gray-300 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] pl-10 p-2.5  dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by product name" required />
                                    <button type="button" class="absolute inset-y-0 right-[-0px] flex items-center pr-3">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                                        </svg>
                                    </button>
                            </div>
                            <button type="submit" class="inline-flex items-center justify-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-yellow-600 rounded-lg border border-yellow-500 hover:bg-b-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:focus:ring-blue-800 right-[200px] w-[15%]">
                                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>Search
                            </button>
                        </form>


                        <ProductsGrid>
                            {products.length > 0 && filteredProducts.map(product => (
                                <div key={product._id}>
                                    <ProductBox {...product} />
                                </div>
                            ))}
                        </ProductsGrid>
                    </motion.div>
                </Center>
            </div>
            <Footer />

        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { '_id': -1 } });

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))

        }
    };
}
