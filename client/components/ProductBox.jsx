import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Tilt from 'react-parallax-tilt';

const WhiteBox = styled(Link)`
background-color: #fff;
padding: 10px;
display: flex;
align-items: center;
justify-content: center;
height: 170px;
border-radius: 10px;
`;
const ProductWrapper = styled.div`
width:240px;
border-radius: 10px;
`;

const StyledTitle = styled(Link)`
text-transform: capitalize;
font-weight: 800;
margin: 0;
`;

const StyledImage = styled.img`
height: 150px;
object-fit: contain;
mix-blend-mode: multiply;
`
const ProductInfoBox = styled.div`
margin-top: 10px;
`;
const PriceRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 4px;
`;
const SubPrice = styled.div`
 display: flex;
 flex-direction: column;
 
`;
const Price = styled.div`
font-size: 1.3rem;
font-weight: 900;
`;
const Discount = styled.div`
font-size: 0.8rem;
color: gray;
background-color: yellow;
width:60px;
display: flex ;
justify-content: center ;
align-items :center;
`;

const StyledButton = styled.button`
background-color: transparent;
color:green ;
border:1px solid green;
border-radius: 4px;
transition: all;
transition-duration: 100ms;
display: flex ;
padding: 3px;
gap:1 ;


:hover{
    background-color: green;
    color: white;
    transform: scale(1.1);
}
`;
export default function ProductBox({ _id, title, description, images, price, discount }) {
    const { addProduct } = useContext(CartContext);
    const url = '/product/' + _id;

    return (
        <>
            <Tilt>

                <ProductWrapper className="hover:shadow-2xl p-2 hover:bg-white transition duration-300 ease-in-out">

                    <WhiteBox href={url}>
                        <StyledImage src={images[0]} alt="image" />
                    </WhiteBox>

                    <ProductInfoBox>

                        <StyledTitle href={url}>
                            {title}
                        </StyledTitle>

                        <PriceRow>

                            <SubPrice>

                                <Price>

                                    ₹{price}
                                </Price>
                                <Discount>
                                    {discount}% off
                                </Discount>
                            </SubPrice>

                            <div>

                                <StyledButton primary onClick={() => addProduct(_id)} >
                                    <CartIcon /> <span className="ml-2">Add To Cart</span>
                                </StyledButton>
                            </div>
                        </PriceRow>
                    </ProductInfoBox>
                </ProductWrapper>
            </Tilt >
        </>
    )
}