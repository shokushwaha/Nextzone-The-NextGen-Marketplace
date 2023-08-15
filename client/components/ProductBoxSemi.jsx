import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Tilt from 'react-parallax-tilt';

const WhiteBox = styled(Link)`
background-color: transparent;
padding: 10px;
display: flex;
align-items: center;
justify-content: center;
width: 100px;
border-radius: 10px;
margin-left:10px;
`;
const ProductWrapper = styled.div`
width:200px;
`;

const StyledTitle = styled(Link)`
text-transform: capitalize;
font-weight: 800;
margin: 0;
text-align: center;
`;

const StyledImage = styled.img`
height: 100px;
object-fit: contain;
mix-blend-mode: multiply;
border-radius: 10px;
margin-right:15px;
`
const ProductInfoBox = styled.div`
margin-top: 10px;
display: flex;
flex-direction: column;
/* align-items: center; */
align-items: start;
justify-content: center;
`;
const PriceRow = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
margin-top: 4px;
`;
const SubPrice = styled.div`
 display: flex;
 gap: 10px;
 align-items: center;
 justify-content: center;
 margin-bottom: 8px;
 
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
export default function ProductBoxSemi({ _id, title, description, images, price, discount }) {
    const { addProduct } = useContext(CartContext);
    const url = '/product/' + _id;

    return (
        <>
            <Tilt>

                <ProductWrapper className="hover:shadow-2xl p-2 border-b-2 border-gray-400 flex">

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
                            </SubPrice>

                            <div>

                                <StyledButton primary onClick={() => addProduct(_id)} >
                                    <CartIcon />
                                </StyledButton>
                            </div>
                        </PriceRow>
                    </ProductInfoBox>
                </ProductWrapper>
            </Tilt >
        </>
    )
}