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
        setRecommendedProducts(arr);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
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
                    <StyledTitle>You Recently Searched For</StyledTitle>

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