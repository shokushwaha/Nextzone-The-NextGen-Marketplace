
import { useEffect } from "react";
import styled from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";
import { motion } from "framer-motion";

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
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding-bottom: 4px;
gap:10px;
`;
export default function NewProducts({ products }) {

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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </span>
                        New Arrivals</StyledTitle>

                    <ProductsGrid>
                        {products.length > 0 && products.map(product => (
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
