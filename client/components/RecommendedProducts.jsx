import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import ProductBox from "./ProductBox";
import Center from "./Center";
import { motion } from "framer-motion";
import styled from "styled-components";

const ProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
gap: 20px;
padding-top: 30px;
padding-bottom: 20px;
margin-left:-60px;
justify-content: space-between;


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
const StyledTitle = styled.div`
font-weight: 900;
font-size: 2rem;
padding-top: 20px;
border-bottom: 2px solid black;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding-bottom: 4px;
margin: auto 0;
`;

import axios from 'axios';
const Recommendation = ({ prodNum }) => {
    const { loggedInUser } = useContext(CartContext);
    const userId = loggedInUser.data._id;

    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await axios.post("/api/fetchrecommendation", { userId });
        let arr = res.data
        arr = arr.reverse()
        arr=arr.slice(0,prodNum)
        setRecommendedProducts(arr);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    if (recommendedProducts.length === 0)
        return <>

        </>
    return (
        <>

            <Center>
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, x: "2000px" }}
                    animate={{ opacity: 1, x: "0px" }}
                    exit={{ opacity: 0, x: "2000px" }}
                    transition={{ duration: 1 }}
                >
                    <StyledTitle>

                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                            </svg>
                        </span>
                        You Recently Searched For
                    </StyledTitle>

                    <ProductsGrid>
                        {recommendedProducts.length > 0 && recommendedProducts.map(product => (
                            <div key={product._id}>
                                <ProductBox {...product} />
                            </div>
                        ))}
                    </ProductsGrid>
                </motion.div>
            </Center>
        </>
    )
}

export default Recommendation