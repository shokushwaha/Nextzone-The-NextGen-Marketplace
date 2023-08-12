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
grid-template-columns: 1fr 1fr 1fr ;
gap: 30px;
padding-top: 30px;
padding-bottom: 20px;



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
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search by product name"
                            className="mt-4 w-1/2 flex items-center justify-center px-4 py-2 rounded-md shadow placeholder:text-gray-400  "
                        />

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
