
import { useEffect } from "react";
import styled from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";
import { motion } from "framer-motion";

const ProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
const StyledTitle = styled.div`
font-weight: 900;
font-size: 2rem;
padding-top: 20px;
border-bottom: 2px solid black;
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
                    <StyledTitle>New Arrivals</StyledTitle>

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
