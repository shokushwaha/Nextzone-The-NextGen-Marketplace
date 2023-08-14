import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";
import Tilt from 'react-parallax-tilt';

const Bg = styled.div`
color: #fff;
background-color: #222;
padding: 40px 0px;
`;

const Title = styled.h1`
  margin:0;
  font-weight  :normal  ;
  font-size: 2rem;
  padding: 10px 0px;
`;

const Desc = styled.p`
   color: #aaa;
   font-size: 0.8rem;

`;

const Wrapper = styled.div`
display: grid;
grid-template-columns: 1.2fr 0.8fr;
gap:40px;
img{
    max-width: 100%;
}



@media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column-reverse;

  }

`;

const Column = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ButtonWrapper = styled.div`
display: flex;
gap: 10px;
margin-top: 20px;
`;

const StyledImage = styled.img`
border-radius: 4px;
box-shadow: 0px 10px 10px gray;
transition: all;
transition-duration: 200ms;
mix-blend-mode: multiply;
:hover{
    transform: translateY(-4px);
    transform: scale(1.05);
}
`;

export default function Featured({ product }) {


    const { addProduct } = useContext(CartContext);
    const addFeaturedToCart = () => {
        addProduct(product._id);
    }


    return (
        <>
            <Bg>

                <Center>


                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, x: "-2000px" }}
                        animate={{ opacity: 1, x: "0px" }}
                        exit={{ opacity: 0, x: "-2000px" }}
                        transition={{ duration: 1 }}
                    >
                        <Wrapper>
                            <Column>
                                <div className="flex flex-col items-center justify-center pt-8 ">

                                    <Title>{product.title}</Title>
                                    <Desc>{product.description.substring(0, 500)}...</Desc>
                                    <ButtonWrapper>
                                        <ButtonLink white outlined href={'/product/' + product._id}>
                                            Read More</ButtonLink>
                                        <Button primary size="l" onClick={addFeaturedToCart} >
                                            <CartIcon />
                                            Add To Cart</Button>
                                        <h1 className="  text-black bg-yellow-300 rounded-md px-2 flex md:gap-2 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        </svg>
                                            {product.discount}% off</h1>
                                    </ButtonWrapper>
                                </div>

                            </Column>
                            <Column>
                                <Tilt>
                                    
                                <StyledImage src="https://res.cloudinary.com/dt21djrjq/image/upload/v1691917562/yymttc4usxa1foowi9jq.jpg" alt="featured image" className="w-[300px]"/>
                                </Tilt>


                            </Column>

                        </Wrapper>
                    </motion.div>
                </Center>
            </Bg>
        </>
    )
}

